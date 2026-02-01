import "dotenv/config"
import express, {type Request, type Response, type NextFunction } from "express"
import {rateLimit} from "express-rate-limit"
import cors from "cors"
import helmet from "helmet"

import SpeciesService from "./services/species.service.ts"
import SpeciesController from "./controller/species.controller.ts"
import Routes from "./routes.ts"



const app = express()
const PORT = process.env.PORT || 4060 
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
	message: { error: 'Muitas requisições, tente novamente em 15 minutos.' }
})

const speciesService = new SpeciesService()
const speciesController = new SpeciesController(speciesService)
const routes = new Routes(speciesController)

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://upload.wikimedia.org"], // Autoriza Wikipedia
      },
    },
  })
);
app.use(cors({
  origin: ['https://fauna-flora-sp.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(limiter)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes.start())
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado no servidor!' });
});

app.listen(Number(PORT), "0.0.0.0", () => {
    console.log("OK")
})