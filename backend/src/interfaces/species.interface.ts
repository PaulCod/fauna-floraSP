import type { Request, Response } from "express"
import type { CreateSpecieDTO, SpecieCategory, SpecieResponseDTO } from "../dtos/species.dto.ts"
import type { Category } from "../../generated/prisma/enums.ts"

export interface ISpeciesService {
    create(data: CreateSpecieDTO): Promise<SpecieResponseDTO> 
    delete(id: string): Promise<SpecieResponseDTO>
    getAll(category?: Category): Promise<SpecieResponseDTO[]>
}

export interface ISpeciesController {
    create(req: Request, res: Response): Promise<Response> 
    delete(req: Request, res: Response): Promise<Response> 
    getAll(req: Request, res: Response): Promise<Response> 
    getByCategory(req: Request, res: Response): Promise<Response> 
}