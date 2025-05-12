import express from 'express';
import exampleController from '../controller/protectedcontroller.js';
import verifyToken from '../middleware/authmiddleware.js';    

const router = express.Router();

router.get('/', verifyToken, exampleController.securedExample);

export default router;
