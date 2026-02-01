import prisma from "../db/prisma.ts"
import { Category } from "../../generated/prisma/enums.ts"
import type { Request, Response } from "express"
import type {ISpeciesService} from "../interfaces/species.interface.ts"
import type { CreateSpecieDTO, SpecieResponseDTO, SpecieCategory } from "../dtos/species.dto.ts"

class SpeciesService implements ISpeciesService {
    async create(data: CreateSpecieDTO): Promise<SpecieResponseDTO> {
        const specie = await prisma.specie.create({data})

        return {
        id: specie.id,
        name: specie.name,
        details: specie.details,
        category: specie.category,
        slug: specie.slug,
        imageUrl: specie.imageUrl,
        latitude: specie.latitude,
        longitude: specie.longitude,
        status: specie.status,
        createdAt: specie.createdAt
    };
    }

    async delete(id: string): Promise<SpecieResponseDTO> {
        const specie = await prisma.specie.findUnique({
            where: {id}
        })

        if(!specie){
            throw new Error("Especie nao existe")
        }

        return await prisma.specie.delete({where: {id}})
    }

    async getAll(category?: Category): Promise<SpecieResponseDTO[]> {
        const species = category
            ? await prisma.specie.findMany({ where: { category } })
            : await prisma.specie.findMany();

        return species.map(s => ({
            id: s.id,
            name: s.name,
            details: s.details,
            category: s.category,
            slug: s.slug,
            imageUrl: s.imageUrl,
            latitude: s.latitude,
            longitude: s.longitude,
            status: s.status,
            createdAt: s.createdAt
        }));
    }
}

export default SpeciesService