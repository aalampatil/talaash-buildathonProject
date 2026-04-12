import { User } from "./user.model.js";
import type { Request, Response } from "express";
import {
  userValidationSchema,
  type UserDTO,
} from "../../common/validations/user.validation.js";
import { Tenant } from "../tenant/tenant.model.js";
import { Landlord } from "../landord/landlord.model.js";
import ApiError from "../../common/utils/api-error.js";
import { getAuth } from "@clerk/express";

export class UserController {
  public async handleUserRegister(req: Request, res: Response) {
    try {
      const data = userValidationSchema.parse(req.body);

      const user = await User.create(data);

      if (user.role === "tenant") {
        await Tenant.create({
          userId: user._id,
          clerkId: user.clerkId,
        });
      }

      if (user.role === "landlord") {
        await Landlord.create({
          userId: user._id,
          clerkId: user.clerkId,
        });
      }

      return res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async handleGetUser(req: Request, res: Response) {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) throw ApiError.badRequest();
    const user = await User.findOne({ clerkId });
    console.log(user);
    if (!user) throw ApiError.notfound;
    return res.status(201).json({ user });
  }
}
