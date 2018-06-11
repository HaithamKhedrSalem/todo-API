import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import {getConnection} from "typeorm";
import * as bcrypt from "bcryptjs";

import { User } from "../../user/models/user";

class Auth {

  public initialize = () => {
    passport.use("jwt", this.getStrategy());
    return passport.initialize();
  }

  public authenticate = (callback) => passport.authenticate(
    "jwt", { session: false, failWithError: true }, callback);

  public genToken = (user: User): Object => {
    let expires = moment().utc().add({ days: 7 }).unix();
    let token = jwt.encode({
        exp: expires,
        username: user.username
    }, process.env.JWT_SECRET);
    return {
        token: "JWT " + token,
        expires: moment.unix(expires).format()
    };
  }

  public comparePassword = (
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
      req.app.set('user', user);
      if (user === null) {
          return done(null, false, { message: "The user in the token was not found" });
      }
      return done(null, {});
    });
  }

}

export default new Auth();