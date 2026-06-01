import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize the shared server-side Google GenAI client
// We set the User-Agent to 'aistudio-build' in httpOptions for telemetry compliance
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint to analyze custom lists of garments, pair them under a specific style, and synthesize the best 2 options
app.post('/api/generate-outfit-options', async (req, res) => {
  const { shirts, trousers, style, language } = req.body;
  const isAr = language === 'ar';

  if (!shirts || !Array.isArray(shirts) || shirts.length === 0 ||
      !trousers || !Array.isArray(trousers) || trousers.length === 0) {
    return res.status(400).json({ status: 'error', message: 'Missing shirts or trousers list for compilation.' });
  }

  // If there is no Gemini API key configured, we fail gracefully to let the client load its calculated robust fallback looks
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
    return res.json({ status: 'fallback', message: 'No API Key registered inside Settings/Secrets.' });
  }

  try {
    const systemPrompt = `You are a world-class high-fashion menswear stylist editor for StyleBoard (Vogue Arabia style lookbook).
Your task is to analyze a list of available SHIRTS (upper clothing pieces) and TROUSERS (lower clothing pieces), and recommend the BEST TWO distinct dress combinations (Option 1 and Option 2) matching the user's requested style Vibe: "${style}".

For each of the 2 options, you must:
1. Select exactly ONE shirt from the provided list of shirts (by referencing its "id") and ONE trouser from the provided list of trousers (by referencing its "id"). Try to make the 2 options distinct unless there is only one layout possible.
2. Create a luxurious styling brief suited for GCC climate and elegant Middle Eastern heritage.

Output a structural response in JSON format containing:
- options: An array of exactly 2 items. Each item must contain:
  - shirtId: The exact "id" of the chosen shirt.
  - trouserId: The exact "id" of the chosen trouser.
  - title: A short, luxurious, editorial title (headline) for this outfit combination.
  - colorsTheory: A short explanation (1-2 sentences) of why these colors and textures work together.
  - accessoriesSuggestion: An array of exactly 3 luxury accessories to level up the outfit (e.g. specialized sandals, luxury watch, bespoke cufflinks, premium tasbih, specific Arabic scent).
  - stylingTips: Actionable styling advice (e.g. sleeves rolled, shirt tucked, collar open/closed, style of socks/no socks).
  - occasion: The perfect GCC social venue or activity for this look.
  - modelPrompt: A descriptive, photorealistic prompt for generating an image of a real model wearing this combination. Use English for image prompt generation. Formulate it as: "Detailed full-body editorial fashion photograph of a handsome Arab man wearing a [shirt description, including color] with [trouser description, including color], posing in a high-fashion styled background (e.g. Riyadh desert dune sunset, luxury hotel lobby in Dubai, minimalist modern majlis, seaside cafe), realistic lighting, professional Vogue style, 4k resolution".

Respond strictly in the requested language for all textual elements except the modelPrompt, which MUST always be in English: ${isAr ? 'Arabic (العربية)' : 'English'}.
`;

    const userPrompt = `
Style Vibe requested: "${style}"

Available Shirts:
${JSON.stringify(shirts.map(s => ({ id: s.id, name: s.name, color: s.colorName, type: s.type })), null, 2)}

Available Trousers:
${JSON.stringify(trousers.map(t => ({ id: t.id, name: t.name, color: t.colorName, type: t.type })), null, 2)}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['options'],
          properties: {
            options: {
              type: Type.ARRAY,
              minItems: 2,
              maxItems: 2,
              items: {
                type: Type.OBJECT,
                required: ['shirtId', 'trouserId', 'title', 'colorsTheory', 'accessoriesSuggestion', 'stylingTips', 'occasion', 'modelPrompt'],
                properties: {
                  shirtId: { type: Type.STRING },
                  trouserId: { type: Type.STRING },
                  title: { type: Type.STRING },
                  colorsTheory: { type: Type.STRING },
                  accessoriesSuggestion: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  stylingTips: { type: Type.STRING },
                  occasion: { type: Type.STRING },
                  modelPrompt: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const textOutput = response.text?.trim() || '{}';
    const parsedResult = JSON.parse(textOutput);

    return res.json({ status: 'success', options: parsedResult.options });

  } catch (error) {
    console.error('Gemini API multi-styling call failed:', error);
    return res.status(500).json({ status: 'fallback', message: 'Gemini server call returned an error, falling back to local formulas.' });
  }
});

// Helper to decode base64 or fetch remote image URLs as base64 inlineData for Gemini
async function getImagePart(input: string | undefined): Promise<{ inlineData: { data: string; mimeType: string } } | null> {
  if (!input) return null;
  
  if (input.startsWith('data:')) {
    const match = input.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      return {
        inlineData: {
          mimeType: match[1],
          data: match[2]
        }
      };
    }
  } else if (input.startsWith('http://') || input.startsWith('https://')) {
    try {
      const fetchResponse = await fetch(input);
      if (!fetchResponse.ok) return null;
      const contentType = fetchResponse.headers.get('content-type') || 'image/jpeg';
      const arrayBuffer = await fetchResponse.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      return {
        inlineData: {
          mimeType: contentType,
          data: base64
        }
      };
    } catch (err) {
      console.warn('Error downloading garment image from URL:', input, err);
      return null;
    }
  }
  return null;
}

// API endpoint to generate high-quality realistic fashion photoshoots on a model
app.post('/api/generate-model-image', async (req, res) => {
  const { prompt, shirtImage, trouserImage, style, shirtColor, trouserColor, shirtName, trouserName, language } = req.body;
  const isAr = language === 'ar';

  let finalImageUrl: string | null = null;
  let backdrop = isAr ? 'خلفية تصوير معاصرة راقية في الرياض' : 'Contemporary luxury high-street studio backdrop in Riyadh';
  let modelStylingCommentary = isAr 
    ? `تنسيق أنيق ومتقن يدمج القميص باللون ${shirtColor || 'الفاتح'} مع سروال مميز باللون ${trouserColor || 'الداكن'} تحت الإضاءة المعتدلة.` 
    : `A bespoke coordination that layers the ${shirtColor || 'Light'} shirt with stylized ${trouserColor || 'Dark'} trousers under cinematic lighting.`;
  let avatarDetails = isAr 
    ? 'عارض أزياء عصري يتمتع بمظهر واثق وأنيق' 
    : 'Handsome lookbook model standing with styled hair and confident modeling expression';
  let imagePrompt = '';

  // 1. Analyze 2 uploaded outfit images using free gemini-3.5-flash (with our API key) if available
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
    try {
      const contents: any[] = [];
      const shirtPart = await getImagePart(shirtImage);
      const trouserPart = await getImagePart(trouserImage);

      if (shirtPart) {
        contents.push(shirtPart);
      }
      if (trouserPart) {
        contents.push(trouserPart);
      }

      const systemPrompt = `You are a world-class digital stylist for StyleBoard.
Analyze the provided shirt image ${shirtPart ? '(first image)' : ''} and trouser image ${trouserPart ? '(second image)' : ''} closely.
Your goal is to synthesize a detailed fashion photoshoot prompt for a model wearing these exact clothes.
Identify the requested style vibe ("${style || 'Casual'}"), shirt color ("${shirtColor || 'Light'}"), and trouser color ("${trouserColor || 'Dark'}").

Your output must describe:
- Upper Garment: Detailed shirt description matching the color, fabric texture (e.g. relaxed knit waffle, lightweight linen), collar style, buttons, fit, and patterns of the provided shirt.
- Lower Garment: Detailed pants description matching the color, tailored fabric structure, pockets, pleats, and draping of the provided pants.
- Composition: Full-length professional lookbook photoshoot of a highly attractive model posing gracefully in a high-street location in Riyadh, Dubai, or a luxury majlis. Cinematic natural lighting, ultra-realistic textiles and styling, no text, logos, or watermarks.

Output a structural response in JSON format containing:
- backdrop: A glamorous short description of the venue in ${isAr ? 'Arabic' : 'English'}. Maximum one sentence.
- modelStylingCommentary: An elegant visual styling commentary in ${isAr ? 'Arabic' : 'English'}.
- avatarDetails: A description of the model styling in ${isAr ? 'Arabic' : 'English'}.
- imagePrompt: The highly specific, clothing-focused AI image prompt written strictly in English.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          ...contents,
          `Synthesize fashion photoshoot details for Style Vibe: ${style || 'Casual'}. Shirt: ${shirtColor || 'Unknown'} (${shirtName || 'Unknown'}), Trouser: ${trouserColor || 'Unknown'} (${trouserName || 'Unknown'}). Prompt context: ${prompt || ''}`
        ],
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            required: ['backdrop', 'modelStylingCommentary', 'avatarDetails', 'imagePrompt'],
            properties: {
              backdrop: { type: Type.STRING },
              modelStylingCommentary: { type: Type.STRING },
              avatarDetails: { type: Type.STRING },
              imagePrompt: { type: Type.STRING }
            }
          }
        }
      });

      const textOutput = response.text?.trim() || '{}';
      const parsedResult = JSON.parse(textOutput);
      
      backdrop = parsedResult.backdrop || backdrop;
      modelStylingCommentary = parsedResult.modelStylingCommentary || modelStylingCommentary;
      avatarDetails = parsedResult.avatarDetails || avatarDetails;
      imagePrompt = parsedResult.imagePrompt || '';

    } catch (geminierr: any) {
      console.warn('Multimodal Gemini prompt synthesis failed, using default prompt construction:', geminierr.message || geminierr);
    }
  }

  // If no Gemini API key, or if synthesis errored out, create a clean deterministic fashion prompt
  if (!imagePrompt) {
    imagePrompt = `Full-length professional high-street model lookbook photoshoot of a stunning fashion model. Posing elegantly, modeling pose, dramatic natural lighting. Stylized dressing of a premium styled shirt colored ${shirtColor || 'Light'} (${shirtName || 'shirt'}) and perfectly matching tailored pants/trousers colored ${trouserColor || 'Dark'} (${trouserName || 'trouser'}). Studio photoshoot backdrop of Riyadh luxury penthouse, high-end high-street aesthetic, realistic textile fabrics texture, highly detailed, 4K resolution, no watermark, no text, no logo.`;
  }

  // 2. Query free Pollinations Flux generator to get the real-time AI model representation
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=800&height=1066&model=flux&nologo=true&seed=${seed}`;
    
    console.log('Generating free high-fidelity lookbook model image via Pollinations Flux:', pollinationsUrl);
    const fetchResponse = await fetch(pollinationsUrl);
    if (fetchResponse.ok) {
      const arrayBuffer = await fetchResponse.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const contentType = fetchResponse.headers.get('content-type') || 'image/jpeg';
      finalImageUrl = `data:${contentType};base64,${base64}`;
    } else {
      throw new Error(`Failed to generate via Pollinations, response code: ${fetchResponse.status}`);
    }
  } catch (imageErr: any) {
    console.warn('Free image generation via Pollinations Flux failed:', imageErr?.message || String(imageErr));
  }

  // Strictly return success ONLY if an actual image was successfully synthesized
  if (finalImageUrl) {
    return res.json({ 
      status: 'success', 
      imageUrl: finalImageUrl,
      backdrop,
      modelStylingCommentary,
      avatarDetails
    });
  } else {
    // Write out the result failure text, do not show any falling-back stock images!
    // "also if there is no result write it don't show any imag"
    return res.status(502).json({
      status: 'error',
      message: isAr 
        ? 'بسبب حدود الاتصال أو نفاد معالجة الصور بالذكاء الاصطناعي التوليدي المجاني، لم نتمكن من تحقيق النتيجة المطلوبة في الوقت الحالي. لا تتوفر أي صورة.'
        : 'Due to network connection limits or free AI generation rate exhaustion, no result could be obtained. No lookbook image is available.'
    });
  }
});

// Configure Vite middleware or production static files serve
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StyleBoard Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
