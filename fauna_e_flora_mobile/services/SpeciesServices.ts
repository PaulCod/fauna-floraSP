import { SpecieResponseDTO } from "@/dtos/species.dto";

export async function getAllSpecies(): Promise<SpecieResponseDTO[]> {
  const API_URL = "http://10.0.2.2:4060";

  try {
    const res = await fetch(`${API_URL}/species`);
    if (!res.ok) throw new Error("Erro API");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
