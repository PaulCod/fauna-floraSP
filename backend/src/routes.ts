import { Router } from "express";
import type { ISpeciesController } from "./interfaces/species.interface.ts";

class Routes {
    speciesController: ISpeciesController

    constructor(speciesController: ISpeciesController){
        this.speciesController = speciesController
    }

    start(): Router {
        const routes = Router()

        // species
        routes.post("/species", this.speciesController.create.bind(this.speciesController))
        routes.get("/species", this.speciesController.getAll.bind(this.speciesController))
        routes.get("/species/category", this.speciesController.getByCategory.bind(this.speciesController))
        routes.delete("/species/:id", this.speciesController.delete.bind(this.speciesController))

        return routes
    }
}   

export default Routes