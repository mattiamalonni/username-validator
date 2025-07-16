import { UsernameValidatorOptions, ValidationError, ValidationPayload } from "./types";

import blacklist from "./blacklist.json";
import profanity from "./profanity.json";

/**
 * Default options for the UsernameValidator.
 * These can be overridden by passing a configuration object to the constructor.
 */
export const defaultBlacklist = [...blacklist, ...profanity];

/**
 * Default options for the UsernameValidator.
 * These can be overridden by passing a configuration object to the constructor.
 */
export const defaultUsernameValidatorOptions: Required<UsernameValidatorOptions> = {
  trim: true,
  minLength: 6,
  maxLength: 20,
  lowercase: false,
  uppercase: false,
  blacklist: defaultBlacklist,
  allowedCharacters: ["letters", "numbers", "underscores", "dashes"],
};

/**
 * A class to validate usernames based on various criteria.
 * It checks for length, blacklisted words, and allowed characters.
 */
export class UsernameValidator {
  private trim: boolean;
  private minLength: number;
  private maxLength: number;
  private convertToLowercase: boolean;
  private convertToUppercase: boolean;
  private blacklist: string[];
  private allowedCharacters: UsernameValidatorOptions["allowedCharacters"];

  constructor(options: UsernameValidatorOptions = {}) {
    this.blacklist = options.blacklist ?? defaultUsernameValidatorOptions.blacklist;
    this.minLength = options.minLength ?? defaultUsernameValidatorOptions.minLength;
    this.maxLength = options.maxLength ?? defaultUsernameValidatorOptions.maxLength;
    this.trim = options.trim ?? defaultUsernameValidatorOptions.trim;
    this.convertToLowercase = options.lowercase ?? defaultUsernameValidatorOptions.lowercase;
    this.convertToUppercase = options.uppercase ?? defaultUsernameValidatorOptions.uppercase;
    this.allowedCharacters = options.allowedCharacters ?? defaultUsernameValidatorOptions.allowedCharacters;
  }

  /**
   * Constructs a regular expression based on the allowed characters.
   * This regex is used to validate that the username only contains permitted characters.
   * @returns A RegExp object that matches allowed characters.
   */
  private getAllowedCharactersRegex(): RegExp {
    const allowedChars = [];
    if (this.allowedCharacters!.includes("letters")) {
      allowedChars.push("a-zA-Z");
    }
    if (this.allowedCharacters!.includes("numbers")) {
      allowedChars.push("0-9");
    }
    if (this.allowedCharacters!.includes("underscores")) {
      allowedChars.push("_");
    }
    if (this.allowedCharacters!.includes("dashes")) {
      allowedChars.push("-");
    }
    if (this.allowedCharacters!.includes("spaces")) {
      allowedChars.push(" ");
    }
    if (this.allowedCharacters!.includes("emojis")) {
      allowedChars.push("\\p{Emoji}");
    }
    return new RegExp(`^[${allowedChars.join("")}]+$`, "u");
  }

  /**
   * Validates a username against the configured rules.
   * @param username The username to validate.
   * @returns An object containing the validation result and any errors.
   */
  validate(username: string, options?: UsernameValidatorOptions): ValidationPayload {
    if (options) {
      const validator = new UsernameValidator(options);
      return validator.validate(username);
    }

    const errors: ValidationError[] = [];

    if (this.trim) username = username.trim();
    if (this.convertToLowercase) username = username.toLowerCase();
    if (this.convertToUppercase) username = username.toUpperCase();

    if (username.length < this.minLength) {
      errors.push({ code: "minLength", message: `Username must be at least ${this.minLength} characters long.` });
    }
    if (username.length > this.maxLength) {
      errors.push({ code: "maxLength", message: `Username must be at most ${this.maxLength} characters long.` });
    }

    if (this.blacklist.some((word) => username.toLocaleLowerCase().includes(word))) {
      errors.push({ code: "blacklist", message: `Username contains a blacklisted word.` });
    }

    const allowedRegex = this.getAllowedCharactersRegex();
    if (!allowedRegex.test(username)) {
      errors.push({ code: "invalidCharacters", message: `Username contains invalid characters.` });
    }

    return { username, isValid: errors.length === 0, errors };
  }
}
