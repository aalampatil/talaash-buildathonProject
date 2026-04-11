import { User } from "./user.model.js";
import type { Request, Response } from "express";
import { userValidationSchema } from "../../common/validations/user.validation.js";
import { Tenant } from "../tenant/tenant.model.js";
import { Landlord } from "../landord/landlord.model.js";

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

      if (user.role === "tenant") {
        await Tenant.create({
          userId: user._id,
        });
      }

      if (user.role === "landlord") {
        await Landlord.create({
          userId: user._id,
        });
      }
      return res.status(201).json({
        success: validatedResult.success,
        user: user,
        error: validatedResult.error?.issues,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
