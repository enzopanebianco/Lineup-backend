import { Repository } from 'typeorm'
import { appDataSource } from "../database/connection"
import { Lineup } from "../models/Lineup"
import { IBaseRepository } from './baseRepository'
import { PlayerRepository } from './playerRepository'

export class LineupRepository implements IBaseRepository<Lineup>{

    private _lineupContext: Repository<Lineup> = appDataSource.getRepository(Lineup)
    private playerRepository = new PlayerRepository()

    async getAll() {
        return await this._lineupContext.find()
    }

    async getById(id: string) {
        return await this._lineupContext.findOne({ where: { id }, relations: ['players'] })
    }

    async create(lineup: Lineup) {
        this._lineupContext.create(lineup)
        const createdLineup = await this._lineupContext.save(lineup)

        return createdLineup
    }

     delete(id: string) {
         this.playerRepository.delete(parseInt(id))
         this._lineupContext.delete({ id })
         
    }

    async update(id: string, lineup: Lineup) {
        await this._lineupContext.update({ id }, lineup)
        const updatedLineup = await this.getById(id)

        return updatedLineup
    }
}