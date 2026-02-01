import "dotenv/config"
import express from "express"
import cors from "cors"

import SpeciesService from "./services/species.service.ts"
import SpeciesController from "./controller/species.controller.ts"
import Routes from "./routes.ts"


const app = express()
const PORT = process.env.PORT || 4060 

const speciesService = new SpeciesService()
const speciesController = new SpeciesController(speciesService)
const routes = new Routes(speciesController)

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes.start())

app.listen(Number(PORT), "0.0.0.0", () => {
    console.log("OK")
})