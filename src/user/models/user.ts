import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany} from "typeorm";
import {IsEmail} from "class-validator";
import {getConnection} from "typeorm";

import {Todo} from "../../todo/models/todo";
import * as bcrypt from "bcryptjs";


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  username: string;

  @Column({nullable: false, unique: true})
  @IsEmail()
  email: string;

  @Column({nullable: false})
  password: string;

  @OneToMany(type => Todo, todo => todo.user) // note: we will create author property in the Photo class below
  todos: Todo[];

  @BeforeInsert()
  hashPassword() {
  	let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

}
