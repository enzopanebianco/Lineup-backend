import express, { Response, Request } from 'express'
import { LineupController } from './controllers/lineupController'
import { PlayerController } from './controllers/playerController'

const router = express()

//LINEUPS
router.get('/lineups', (_, res: Response) => {
    LineupController.getLineups(res)
})
router.get('/lineups/:id', (req: Request, res: Response) => {
    LineupController.getLineupById(req, res)
})

router.post('/lineups', (req: Request, res: Response) => {
    LineupController.createLineup(req, res)
})
router.delete('/lineups/:id', (req: Request, res: Response) => {
    LineupController.deleteLineup(req, res)
})
router.put('/lineups/:id', (req: Request, res: Response) => {
    LineupController.updateLineup(req, res)
})

//PLAYERS
router.post('/players/:lineupId', (req: Request, res: Response) => {
    PlayerController.createPlayer(req, res)
})

router.put('/players/:id', (req: Request, res: Response) => {
    PlayerController.updatePlayer(req, res)
})

export default router