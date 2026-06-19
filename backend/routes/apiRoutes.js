import { Router } from 'express'
import {
	getHeatmap,
	logScan,
	verifyMedicine,
} from '../controllers/medicineController.js'
import { checkInteractions } from '../controllers/interactionController.js'
import { register, login, getCurrentUser } from '../controllers/authController.js'
import verifyToken from '../middleware/auth.js'

const router = Router()

// Auth routes
router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/me', getCurrentUser)

// Protected medicine routes
router.get('/verify', verifyMedicine)
router.post('/scan-log', verifyToken, logScan)
router.get('/heatmap', verifyToken, getHeatmap)
router.post('/interactions', verifyToken, checkInteractions)

export default router
