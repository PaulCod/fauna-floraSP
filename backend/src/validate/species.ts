import {z} from "zod"
import { SpecieCategory } from "../dtos/species.dto.ts";
import { Category } from "../../generated/prisma/enums.ts";

export const createSpecieSchema = z.object({
  name: z.string().min(3),
  details: z.string().min(5),
  category: z.enum(Object.values(Category)),
  status: z.string().min(3),
  slug: z.string(),
  imageUrl: z.url(),
  latitude: z.number(),
  longitude: z.number(),
});