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
  code: "minLength" | "maxLength" | "blacklist" | "invalid";
  message: string;
};

export type ValidationPayload = {
  username: string;
  normalized: string;
  isValid: boolean;
  errors: { code: string; message: string }[];
};
