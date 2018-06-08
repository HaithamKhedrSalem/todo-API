import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne} from "typeorm";
import {User} from "./User";
import * as bcrypt from "bcryptjs";


@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    subject: string;

    @Column({nullable: true})
    datetime: Date;

    @ManyToOne(type => User, user => user.todos)
    user: User;
}
