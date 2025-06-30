import { Router } from 'express';
import { updateHighScore } from '../controllers/userController';

const router = Router();

router.put('/:id/highscore', updateHighScore as any);

export default router;