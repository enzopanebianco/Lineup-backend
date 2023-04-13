import { DataSource } from 'typeorm'
import { Lineup } from '../models/Lineup'
import { Player } from '../models/Player'

export const appDataSource = new DataSource(
    {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        type: "mysql",
        entities: [
            Lineup,
            Player,
        ],
    }
)

appDataSource.initialize()