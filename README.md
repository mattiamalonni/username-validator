# Username Validator

![npm](https://img.shields.io/npm/v/username-validator)
![License: MIT](https://img.shields.io/npm/l/username-validator)
![Test](https://img.shields.io/github/actions/workflow/status/mattiamalonni/username-validator/test.yml?branch=main)

A robust TypeScript library for validating usernames with customizable rules, blacklist, and profanity filtering.

## Features

- Minimum and maximum length enforcement
- Blacklist and profanity word filtering
- Allowed character sets (letters, numbers, underscores, dashes, etc.)
- Customizable options

## Installation

```bash
npm install username-validator
```

## Usage

```typescript
import { UsernameValidator, validate } from "username-validator";

const validator = new UsernameValidator();
const result = validator.validate("yourUsername");

if (result.isValid) {
  // Username is valid
} else {
  // Handle errors
  console.log(result.errors);
}
```

---

You can also import the `validate` function directly from the library:

```typescript
import { validate } from "username-validator";

// Uses default configuration
const result = validate("yourUsername");

// You can override defaults by passing a second argument
const customResult = validate("yourUsername", { minLength: 8, maxLength: 30 });
```

## Options

You can customize the validator by passing options to the constructor:

| Option              | Type                                                                  | Default Value                                     | Description                                     |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| `minLength`         | `number`                                                              | `6`                                               | Minimum allowed username length                 |
| `maxLength`         | `number`                                                              | `20`                                              | Maximum allowed username length                 |
| `blacklist`         | `string[]`                                                            | Built-in blacklist + profanity                    | List of forbidden words                         |
| `allowedCharacters` | `["letters", "numbers", "underscores", "dashes", "spaces", "emojis"]` | `["letters", "numbers", "underscores", "dashes"]` | Allowed character types                         |
| `trim`              | `boolean`                                                             | `true`                                            | Trim whitespace from username                   |
| `lowercase`         | `boolean`                                                             | `false`                                           | Convert username to lowercase before validation |
| `uppercase`         | `boolean`                                                             | `false`                                           | Convert username to uppercase before validation |

## Validation Result

The `validate` method returns an object with the following properties:

- `username`: The username that was validated (after any configured transformations like trimming or case conversion).
- `isValid`: A boolean indicating whether the username passed all validation checks.
- `errors`: An array of error objects. Each error describes a specific reason why the username is invalid (e.g., too short, contains blacklisted word, invalid characters, etc.).

If the username is valid, `errors` will be an empty array and `isValid` will be `true`. If invalid, `errors` will contain one or more error objects, and `isValid` will be `false`.

Example result for an invalid username:

```json
{
  "username": "meh",
  "isValid": false,
  "errors": [{ "code": "minLength", "message": "Username must be at least 4 characters long." }]
}
```

Example result for a valid username:

```json
{
  "username": "validuser",
  "isValid": true,
  "errors": []
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
