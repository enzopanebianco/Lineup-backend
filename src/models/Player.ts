import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lineup } from "./Lineup";

@Entity('players')
export class Player{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    name:string

    @Column()
    xPointAttack:string

    @Column()
    yPointAttack:string

    @Column()
    xPointDefense:string

    @Column()
    yPointDefense:string

    @Column()
    position:string

    @Column()
    lineupId:number

    @ManyToOne(()=>Lineup,(lineup)=>lineup.players)
    lineup:Lineup
}