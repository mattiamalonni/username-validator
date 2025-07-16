export type UsernameValidatorOptions = {
  minLength?: number;
  maxLength?: number;
  trim?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  blacklist?: string[];
  allowedCharacters?: Array<"letters" | "numbers" | "underscores" | "dashes" | "spaces" | "emojis">;
};

export type ValidationError = {
  code: "minLength" | "maxLength" | "reservedUsername" | "blacklist" | "invalidCharacters";
  message: string;
};

export type ValidationPayload = {
  username: string;
  isValid: boolean;
  errors: { code: string; message: string }[];
};
