import Auth from '../../auth/controllers/authControllers';


class JWTAuthMiddleware{

  public auth = (request, response, next): any => {
    return Auth.authenticate((err, user, info) => {
      if (err){
        return next(err);
      }
      if (user == 'undefined') {
        if (info.name === "TokenExpiredError") {
          return response.status(401).json(
            { message: "Your token has expired. Please generate a new one" });
        }
        else {
          return response.status(401).json({ message: info.message });
        }
      }
      return next();
    })
    (request, response, next);
    }
}

export default new JWTAuthMiddleware();
