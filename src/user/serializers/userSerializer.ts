import { User } from "../models/user";

export class UserSerializer{

  public static serialize(user: User){
    delete user.password;
    return user;
  }
}

export default new UserSerializer();
