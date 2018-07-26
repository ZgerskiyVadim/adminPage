import express from 'express';
const router = express.Router();
import userRouter from './user';
import groupRouter from './group';

router.use(userRouter);
router.use(groupRouter);

export default router;
