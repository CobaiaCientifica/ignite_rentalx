import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

import { ensureAdmin } from "../middleware/ensureAdmin";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationsRoutes };
