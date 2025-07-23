import { Router } from "express";
import userController from "../controllers/user.controller";
import { validateRequest } from "../middleware/middleware";
import { bodyValidator, paramsValidator } from "../lib/validator";
const router = Router();

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(validateRequest(paramsValidator), userController.getUserById);
router
  .route("/add")
  .post(validateRequest(bodyValidator), userController.addUser);
router.route("/update/:id").patch(validateRequest(paramsValidator),validateRequest(bodyValidator),userController.updateUser);
router.route("/delete/:id").delete(validateRequest(paramsValidator),userController.deleteUser);
router.route("/add-qr/:id").post(validateRequest(paramsValidator),userController.createUserQRCode);
router
  .route("/get-qr/:id")
  .get(validateRequest(paramsValidator), userController.getUserQRCode);

export default router;
