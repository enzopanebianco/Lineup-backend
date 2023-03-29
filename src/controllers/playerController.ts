import { Request, Response } from "express"
import { Player } from "../models/Player"
import { PlayerRepository } from "../repositories/playerRepository"

export abstract class PlayerController {
    private static playerRepository = new PlayerRepository()

    static async createPlayer(req: Request, res: Response) {
        try {
            const { lineupId } = req.params
            let players = req.body.players as Player[]

            if (players.length !== 11) {
                return res.status(400)
                    .send({ message: 'Número de jogadores inválido, deve ser exatamente 11' })
            }

            players = players.map(player => {
                player.lineupId = parseInt(lineupId)
                return player
            })
            return res.json(await this.playerRepository.add(players, lineupId))

        } catch (error) {

            return res.status(400).send({ message: "Erro ao criar jogador" })
        }
    }

    static async updatePlayer(req: Request, res: Response) {
        try {
            const { id } = req.params
            const player = await this.playerRepository.getById(id)
            if (!player) {
                return res.status(404).send({ message: "Nenhum jogador encontrado com este id" })
            }
            res.json(await this.playerRepository.update(id, req.body))
        } catch (error) {
            return res.status(400).send({ message: "Erro ao atualizar jogador" })
        }
    }
}