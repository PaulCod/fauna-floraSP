import { Router, type Request, type Response } from "express";
import type { ISpeciesController, ISpeciesService } from "../interfaces/species.interface.ts";
import { createSpecieSchema } from "../validate/species.ts";
import { error } from "node:console";
import { SpecieCategory } from "../dtos/species.dto.ts";
import type { Category } from "../../generated/prisma/enums.ts";

class SpeciesController implements ISpeciesController{
    speciesService: ISpeciesService
    
    constructor(speciesService: ISpeciesService) {
        this.speciesService = speciesService
    }

    async create(req: Request, res: Response): Promise<Response> {
        const parsed = createSpecieSchema.safeParse(req.body)

        if(!parsed.success) {
            return res.status(400).json({
                error: parsed.error.issues
            })
        }

        const specie = await this.speciesService.create(parsed.data)

        return res.status(201).json(specie)
    }

    async delete(req: Request<{id: string}>, res: Response): Promise<Response> {
        const {id} = req.params

        if(!id) {
            return res.status(400).json({
                error: "Id invalido"
            })
        }

        try {
            await this.speciesService.delete(id)

            return res.status(200).json({
                message: "Specie deletada com sucesso"
            })
        } catch (err) {
            return res.status(404).json({
                error: "Specie não encontrada"
            })
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const species = await this.speciesService.getAll()
            return res.status(200).json(species)
        } catch(err){
            return res.status(400).json({
                error: err
            })
        } 
    }

    async getByCategory(req: Request, res: Response): Promise<Response> {
        const {category} = req.query

        if(typeof category !== "string") {
            return res.status(400).json({
                error: "Categoria invalida"
            })
        }

        if (!Object.values(SpecieCategory).includes(category as unknown as SpecieCategory)) {
            return res.status(400).json({
                error: "Categoria inválida"
            })
        }

        try {
            const species = await this.speciesService.getAll(category as Category)

            return res.status(200).json(species)

        } catch(err) {
            return res.status(400).json({
                error: "Categoria invalida"
            })
        }
    }
    
}

export default SpeciesController