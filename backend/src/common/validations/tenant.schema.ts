import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const tenantValidationSchema = z.object({
  userId: objectId,

  householdType: z.enum(["family", "single", "room"]).optional(),

  propertyType: z.enum(["1BHK", "2BHK", "3BHK"]).optional(),

  preferences: z
    .object({
      location: z.string().optional(),
      city: z.string().optional(),
      budget: z.number().optional(),
    })
    .optional(),

  savedProperties: z.array(objectId).optional(),

  shortlistedProperties: z.array(objectId).optional(),
});

export type tenant = z.infer<typeof tenantValidationSchema>;
