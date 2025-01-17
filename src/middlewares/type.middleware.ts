import { StudentType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

// HOF  = função de ordem suprema
// allowedTypes = tipos permitidos

export class TypeMiddleware {
  public static validate(allowedTypes?: StudentType[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const type = req.authStudent.type;

      if (!allowedTypes) {
        return next();
      }

      if (type && !allowedTypes.includes(type)) {
        const alloweds = allowedTypes.join(", ");
        const path = req.path;

        res.status(401).json({
          ok: false,
          message: `Somente estudante do(s) tipo(s) ${alloweds} pode acessar a rota  ${path}`,
        });
      }

      next();
    };
  }
}
