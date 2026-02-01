enum Category {
  ANIMAL,
  PLANTA,
}

export interface SpecieResponseDTO {
  id: string;
  name: string;
  details: string;
  category: Category;
  slug: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  status: string;
  createdAt: Date;
}
