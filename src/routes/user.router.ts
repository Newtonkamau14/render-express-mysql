import { Router } from "express";
import userController from "../controllers/user.controller";
const router = Router();

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUserById);
router.route("/add").post(userController.addUser);
router.route("/update/:id").patch(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteUser);
router.route("/add-qr/:id").post(userController.createUserQRCode)
router.route("/get-qr/:id").get(userController.getUserQRCode)

export default router;
