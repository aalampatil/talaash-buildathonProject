import ApiError from "./api-error.js";

export const requireParam = (value: unknown, name: string): string => {
  if (!value || Array.isArray(value))
    throw ApiError.badRequest(`Invalid ${name}`);
  return value as string;
};
