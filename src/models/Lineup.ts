import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Player } from './Player'

@Entity("lineups")
export class Lineup {

    @PrimaryGeneratedColumn()
    id: string

    @Column({nullable:false})
    title: string

    @Column({nullable:false})
    description: string

    @Column({nullable:false})
    formation: string

    @Column({default:()=>'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({default:()=>'CURRENT_TIMESTAMP'})
    updatedAt: Date

    @Column({nullable:false})
    primaryColor: string

    @Column({nullable:false})
    secondaryColor: string

    @Column({nullable:false})
    team: string

    @Column({nullable:false,})
    userId:string

    @OneToMany(()=>Player,(player)=>player.lineup)
    players:Player[]

}