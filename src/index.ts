import { UsernameValidatorOptions, ValidationPayload } from "./types";
import { UsernameValidator } from "./username-validator";

export * from "./types";
export * from "./username-validator";

export const validate = (username: string, options?: UsernameValidatorOptions): ValidationPayload => {
  const validator = new UsernameValidator();
  return validator.validate(username, options);
};
