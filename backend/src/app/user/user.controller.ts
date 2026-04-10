import { User } from "./user.model.js";
import type { Request, Response } from "express";
import { userValidationSchema } from "../../validations/user.schema.js";

export class UserController {
  public async handleUserRegister(req: Request, res: Response) {
    try {
      const unvalidated = req.body;
      const validatedResult =
        await userValidationSchema.safeParseAsync(unvalidated);
      console.log(validatedResult.data);

      const user = await User.create({
        ...validatedResult.data,
      });

      return res.json({
        success: validatedResult.success,
        user: user,
        error: validatedResult.error?.issues,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
