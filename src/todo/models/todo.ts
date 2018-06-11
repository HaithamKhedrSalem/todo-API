import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne} from "typeorm";
import {IsDate} from "class-validator";

import {User} from "../../user/models/user";
import * as bcrypt from "bcryptjs";


@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    subject: string;

    @Column({nullable: true})
    @IsDate()
    datetime: Date;

    @ManyToOne(type => User, user => user.todos)
    user: User;
}
