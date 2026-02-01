"use client"

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { SpecieResponseDTO } from "@/dtos/species.dto";
import { getAllSpecies } from "@/service/SpecieService";


const SpeciesMap = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <div style={{ height: "80vh", width: "100%", background: "#eee" }}>Carregando mapa...</div>
});

export default function Home() {
  const [species, setSpecies] = useState<SpecieResponseDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllSpecies()
      .then((data) => setSpecies(data))
      .finally(() => setLoading(false))
  }, [])

  console.log(species)
  if(loading) return <p>Carregando especies...</p>

  return (
    <div>
      <SpeciesMap species={species}/>
    </div>
  );
}