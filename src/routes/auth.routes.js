import { Router } from "express";
import {login, register, logout, profile,verifyToken, profileAdmin} from '../controllers/auth.controller.js';
import {authRequired, authUser} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schemas.js'
const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema) ,login);
router.post('/logout', logout);
router.get('/profileUser',authUser,profile);
router.get('/profileAdmin',authRequired, profileAdmin)
router.get('/verify',verifyToken);
//router.get('/profile',authUser,profile);
export default router;
