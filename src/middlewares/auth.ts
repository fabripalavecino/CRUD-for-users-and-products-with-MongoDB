import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const isValidHostName = (req:Request, res:Response, next:NextFunction): void => {
  const validHosts = ["localhost", "fabri.es"];
  if (validHosts.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: "ACCESS_DENIED" });
  }
};

const isAuth = (req:Request, res:Response, next:NextFunction): void => {
  try {
    const { token } = req.headers;
    if (token) {
      const data: any = jwt.verify(token as string, process.env.JWT_SECRET!);
      if (data.userId !== req.body.userId && data.role !== "admin") {
        throw {
          code: 403,
          status: "ACCESS_DENIED",
          message: "Missing permission or invalid role",
        };
      }
      req.sessionData = { userId: data.userId };
      next();
    } else {
      throw {
        code: 403,
        status: "ACCESS_DENIED",
        message: "Missing header token",
      };
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.status || "ERROR", message: error.message });
  }
};

const isAdmin = (req:Request, res:Response, next:NextFunction): void => {
  try {
    const { role } = req.sessionData;
    console.log("is Admin", role);
    if (role !== "admin") {
      throw {
        code: 403,
        status: "ACCESS_DENIED",
        message: "Invalid role",
      };
    } 
    next();
    
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.status || "ERROR", message: error.message });
  }
};
export { isAuth, isValidHostName, isAdmin };
