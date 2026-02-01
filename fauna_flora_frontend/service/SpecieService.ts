import "dotenv/config"
import type { SpecieResponseDTO } from "@/dtos/species.dto";

export async function getAllSpecies(): Promise<SpecieResponseDTO[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
    
    const res = await fetch(`${baseUrl}/species`, {
        cache: 'no-store'
    });

    if(!res.ok) {
        console.error("Status do erro:", res.status);
        throw new Error("Erro ao buscar espécies");
    }
    
    return res.json();
}