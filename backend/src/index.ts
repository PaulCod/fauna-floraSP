import express from "express"
import cors from "cors"

import SpeciesService from "./services/species.service.ts"
import SpeciesController from "./controller/species.controller.ts"
import Routes from "./routes.ts"


const app = express()

const speciesService = new SpeciesService()
const speciesController = new SpeciesController(speciesService)
const routes = new Routes(speciesController)

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes.start())

app.listen("4060", () => {
    console.log("OK")
})