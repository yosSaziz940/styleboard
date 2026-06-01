export type Language = 'en' | 'ar';
export type Page = 'home' | 'categories' | 'outfit-detail' | 'about' | 'ai-builder' | 'articles';

export interface WardrobeItem {
  id: string;
  name: string;
  nameAr: string;
  category: 'shirt' | 'trouser';
  color: string;
  colorName: string;
  colorNameAr: string;
  imageUrl: string;
  type: string; // e.g., "Oversized", "Slim Fit", "Linen"
  typeAr: string;
}

export interface Outfit {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: 'casual' | 'work' | 'evening' | 'sport' | 'modest';
  imageUrl: string;
  tags: string[];
  tagsAr: string[];
  items: {
    top: string;
    bottom: string;
    shoes: string;
    accessories: string[];
  };
  itemsAr: {
    top: string;
    bottom: string;
    shoes: string;
    accessories: string[];
  };
  likes: number;
  season: 'summer' | 'winter' | 'spring-fall' | 'all';
  bodyType: 'athletic' | 'slim' | 'average' | 'broad-shoulder';
  budget: 'budget' | 'medium' | 'premium';
  occasion: string;
  occasionAr: string;
}
