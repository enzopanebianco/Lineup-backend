import { DataSource } from 'typeorm'
import { Lineup } from '../models/Lineup'
import { Player } from '../models/Player'

export const appDataSource = new DataSource(
    {
        database: 'lineup',
        username: 'root',
        password: 'root',
        host: 'localhost',
        port: 3306,
        type: "mysql",
        entities: [
            Lineup,
            Player,
        ],
    }
)

appDataSource.initialize()