import type { Category } from "../../generated/prisma/enums.ts";

export enum SpecieCategory {
    ANIMAL,
    PLANTA
}

export interface CreateSpecieDTO {
    name: string;
    details: string;
    category: Category;
    slug: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    status: string;
}

export interface SpecieResponseDTO extends CreateSpecieDTO {
    id: string
    createdAt: Date
}

export interface SpecieUpdateDTO {
  name?: string
  details?: string
  category?: SpecieCategory
  status?: string
  slug?: string
  imageUrl?: string
  latitude?: number
  longitude?: number
}