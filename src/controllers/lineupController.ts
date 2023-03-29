import { Request, Response } from 'express'
import { LineupRepository } from '../repositories/lineupRepository'

export abstract class LineupController {
    private static lineupRepository = new LineupRepository()

    static async getLineups(res: Response) {
        try {
            res.json(await this.lineupRepository.getAll())
        } catch (error) {
            return res.status(400).send("Erro ao listar lineups!")
        }
    }

    static async getLineupById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const lineup = await this.lineupRepository.getById(id)
            if (!lineup) {
               return res.status(404)
                    .send({ message: "Nenhuma lineup com este id foi encontrada" })
            }
            res.json(lineup)
        } catch (error) {
            console.error(error )
            res.status(400).send({ message: "Erro ao listar lineup por id" })
        }
    }

    static async createLineup(req: Request, res: Response) {
        try {
            res.status(201).json(await this.lineupRepository.create(req.body))
        } catch (error) {
            res.status(400).send({ message: "Erro ao criar lineup" })
        }
    }

    static async deleteLineup(req: Request, res: Response) {
        try {
            const { id } = req.params
            const lineup = await this.lineupRepository.getById(id)
            if (lineup) {
                await this.lineupRepository.delete(id)
                return res.sendStatus(204)
            }
           return res.status(404).send({ message: "Nenhuma lineup com este id foi encontrada" })
        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "Erro ao deletar lineup" })
        }
    }

    static async updateLineup(req: Request, res: Response) {
        try {
            const { id } = req.params
            const lineup = await this.lineupRepository.getById(id)
            if (lineup) {
                return res.json( await this.lineupRepository.update(id, req.body))
            }
           return res.status(404)
                .send({ message: "Nenhuma lineup com este id foi encontrada" })
        } catch (error) {
            res.status(400).send({ message: "Erro ao atualizar lineup" })
        }
    }
}
