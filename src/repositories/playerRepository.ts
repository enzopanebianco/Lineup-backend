import { Repository } from "typeorm";
import { appDataSource } from "../database/connection";
import { Player } from "../models/Player";
import { IBaseRepository } from "./baseRepository";

export class PlayerRepository {
    private _playerContext: Repository<Player>

    constructor() {
        this._playerContext = appDataSource.getRepository(Player)
    }

    async getById(id: string) {
        const player = await this._playerContext.findOne({ where: { id } })
        return player
    }

    async add(players: Player[], lineupId: string) {
        await this._playerContext
            .createQueryBuilder()
            .insert()
            .values(players)
            .execute()
        const createdPlayers = await this.getByLineupId(lineupId)

        return createdPlayers
    }

    async getByLineupId(lineupId: string) {
        const players = await this._playerContext.find({
            where: { lineup: { id: lineupId } }
        })

        return players
    }

    async update(id: string, player: Player) {
        await this._playerContext.update({ id }, player)
        const updatedPlayer = await this.getById(id)

        return updatedPlayer
    }
    async delete(lineupId: number) {
       const result =  await this._playerContext.delete({ lineupId })

       return result
    }

}