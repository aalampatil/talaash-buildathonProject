import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const tenantValidationSchema = z.object({
  userId: objectId,
  clerkId: z.string(),
  preferences: z
    .object({
      householdType: z.enum(["family", "single", "room"]).optional(),
      propertyType: z.enum(["1BHK", "2BHK", "3BHK"]).optional(),
      location: z.string().optional(),
      city: z.string().optional(),
      minBudget: z.number().optional(),
      maxBudget: z.number().optional(),
    })
    .optional(),

  savedProperties: z.array(objectId).optional(),

  shortListedProperties: z.array(objectId).optional(),
});

export type TenantDTO = z.infer<typeof tenantValidationSchema>;

export const tenantPreferencesUpdateSchema = z.object({
  householdType: z.enum(["family", "single", "room"]).optional(),
  propertyType: z.enum(["1BHK", "2BHK", "3BHK"]).optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  minBudget: z.number().optional(),
  maxBudget: z.number().optional(),
});

export type TenantPreferenceDTO = z.infer<typeof tenantValidationSchema>;
