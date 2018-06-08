import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import {getConnection, getRepository} from "typeorm";
import * as bcrypt from "bcryptjs";

import { User } from "../models/User";

class Auth {

  public initialize = () => {
    passport.use("jwt", this.getStrategy());
    return passport.initialize();
  }

  public authenticate = (callback) => passport.authenticate(
    "jwt", { session: false, failWithError: true }, callback);

  private genToken = (user: User): Object => {
    let expires = moment().utc().add({ days: 7 }).unix();
    let token = jwt.encode({
        exp: expires,
        username: user.username
    }, process.env.JWT_SECRET);
    return {
        token: "JWT " + token,
        expires: moment.unix(expires).format(),
        user: user.id
    };
  }

  public login = async (req, res) => {
    try {
      req.checkBody("username", "Invalid username").notEmpty();
      req.checkBody("password", "Invalid password").notEmpty();
      let errors = req.validationErrors();
      if (errors){
          throw errors;
      }
      let user = await getConnection().manager.findOne(
        User, {username: req.body.username});
      if (user === null){
          throw "User not found"
      };

      let success = this.comparePassword(user.password, req.body.password);
      if (success === false){
          throw "Invalid password";
      }
      res.status(200).json(this.genToken(user));
    }
    catch (err) {           
      res.status(401).json({ "message": "Invalid credentials", "errors": err });
    }
  }

  private comparePassword = (
      userPassword: string, candidatePassword: string): boolean => {
    return bcrypt.compareSync(candidatePassword, userPassword);
  }

  private getStrategy = (): Strategy => {
    const params = {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        passReqToCallback: true
    };

    return new Strategy(params, async (req, payload: any, done) => {
      let user = await getConnection().manager.findOne(
        User, {username: payload.username});
      if (user === null) {
          return done(null, false, { message: "The user in the token was not found" });
      }
      return done(null, {});
    });
  }

}

export default new Auth();