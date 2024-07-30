import { Router } from 'express';
import { startShift, endShift, startLunch, endLunch, getShifts } from '../controllers/pointController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/start-shift', authMiddleware, startShift);
router.post('/end-shift', authMiddleware, endShift);
router.post('/start-lunch', authMiddleware, startLunch);
router.post('/end-lunch', authMiddleware, endLunch);
router.get('/shifts/:userId', authMiddleware, getShifts);

export default router;
