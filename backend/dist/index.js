// src/index.ts
import express from "express";
import cors from "cors";

// src/db/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// generated/prisma/enums.ts
var Category = {
  ANIMAL: "ANIMAL",
  PLANTA: "PLANTA"
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Category {\n  ANIMAL\n  PLANTA\n}\n\nmodel Specie {\n  id        String   @id @default(uuid())\n  name      String\n  details   String\n  category  Category\n  slug      String   @unique\n  imageUrl  String   @map("image_url")\n  latitude  Float\n  longitude Float\n  status    String   @db.VarChar(50)\n  createdAt DateTime @default(now()) @map("created_at")\n\n  @@map("species")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Specie":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"details","kind":"scalar","type":"String"},{"name":"category","kind":"enum","type":"Category"},{"name":"slug","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String","dbName":"image_url"},{"name":"latitude","kind":"scalar","type":"Float"},{"name":"longitude","kind":"scalar","type":"Float"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"}],"dbName":"species"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/db/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });
var prisma_default = prisma;

// src/services/species.service.ts
var SpeciesService = class {
  async create(data) {
    const specie = await prisma_default.specie.create({ data });
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
  async delete(id) {
    const specie = await prisma_default.specie.findUnique({
      where: { id }
    });
    if (!specie) {
      throw new Error("Especie nao existe");
    }
    return await prisma_default.specie.delete({ where: { id } });
  }
  async getAll(category) {
    const species = category ? await prisma_default.specie.findMany({ where: { category } }) : await prisma_default.specie.findMany();
    return species.map((s) => ({
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
};
var species_service_default = SpeciesService;

// src/controller/species.controller.ts
import "express";

// src/validate/species.ts
import { z } from "zod";

// src/dtos/species.dto.ts
var SpecieCategory = /* @__PURE__ */ ((SpecieCategory3) => {
  SpecieCategory3[SpecieCategory3["ANIMAL"] = 0] = "ANIMAL";
  SpecieCategory3[SpecieCategory3["PLANTA"] = 1] = "PLANTA";
  return SpecieCategory3;
})(SpecieCategory || {});

// src/validate/species.ts
var createSpecieSchema = z.object({
  name: z.string().min(3),
  details: z.string().min(5),
  category: z.enum(Object.values(Category)),
  status: z.string().min(3),
  slug: z.string(),
  imageUrl: z.url(),
  latitude: z.number(),
  longitude: z.number()
});

// src/controller/species.controller.ts
import "console";
var SpeciesController = class {
  speciesService;
  constructor(speciesService2) {
    this.speciesService = speciesService2;
  }
  async create(req, res) {
    const parsed = createSpecieSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues
      });
    }
    const specie = await this.speciesService.create(parsed.data);
    return res.status(201).json(specie);
  }
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Id invalido"
      });
    }
    try {
      await this.speciesService.delete(id);
      return res.status(200).json({
        message: "Specie deletada com sucesso"
      });
    } catch (err) {
      return res.status(404).json({
        error: "Specie n\xE3o encontrada"
      });
    }
  }
  async getAll(req, res) {
    try {
      const species = await this.speciesService.getAll();
      return res.status(200).json(species);
    } catch (err) {
      return res.status(400).json({
        error: err
      });
    }
  }
  async getByCategory(req, res) {
    const { category } = req.query;
    if (typeof category !== "string") {
      return res.status(400).json({
        error: "Categoria invalida"
      });
    }
    if (!Object.values(SpecieCategory).includes(category)) {
      return res.status(400).json({
        error: "Categoria inv\xE1lida"
      });
    }
    try {
      const species = await this.speciesService.getAll(category);
      return res.status(200).json(species);
    } catch (err) {
      return res.status(400).json({
        error: "Categoria invalida"
      });
    }
  }
};
var species_controller_default = SpeciesController;

// src/routes.ts
import { Router as Router2 } from "express";
var Routes = class {
  speciesController;
  constructor(speciesController2) {
    this.speciesController = speciesController2;
  }
  start() {
    const routes2 = Router2();
    routes2.post("/species", this.speciesController.create.bind(this.speciesController));
    routes2.get("/species", this.speciesController.getAll.bind(this.speciesController));
    routes2.get("/species/category", this.speciesController.getByCategory.bind(this.speciesController));
    routes2.delete("/species/:id", this.speciesController.delete.bind(this.speciesController));
    return routes2;
  }
};
var routes_default = Routes;

// src/index.ts
var app = express();
var speciesService = new species_service_default();
var speciesController = new species_controller_default(speciesService);
var routes = new routes_default(speciesController);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes.start());
app.listen("4060", () => {
  console.log("OK");
});
