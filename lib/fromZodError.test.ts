import { describe, test, expect } from 'vitest';
import { z as zod } from '@deboxsoft/module-core';

import { fromZodError } from './fromZodError.ts';
import { ValidationError } from './ValidationError.ts';

describe('fromZodError()', () => {
  test('handles ZodError', () => {
    const schema = zod.string().email();

    try {
      schema.parse('foobar');
    } catch (err) {
      if (err instanceof zod.ZodError) {
        const validationError = fromZodError(err);
        expect(validationError).toBeInstanceOf(ValidationError);
        expect(validationError.message).toMatchInlineSnapshot(
          `"Validation error: Invalid email"`
        );
        expect(validationError.details).toMatchInlineSnapshot(`
            [
              {
                "code": "invalid_string",
                "message": "Invalid email",
                "path": [],
                "validation": "email",
              },
            ]
        `);
      }
    }
  });

  test('throws a dev-friendly TypeError on invalid input', () => {
    const input = new Error("I wish I was a ZodError, but I'm not");

    try {
      // @ts-expect-error input class Error
      fromZodError(input);
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      // @ts-expect-error invalid zod
      expect(err.message).toMatchInlineSnapshot(
        `"Invalid zodError param; expected instance of ZodError. Did you mean to use the "fromError" method instead?"`
      );
    }
  });
});
