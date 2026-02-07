import { env } from '../config/env';

export const Users = {
  valid: {
    email: env.TN_EMAIL,
    password: env.TN_PASSWORD
  },
  invalid: {
    email: 'invalid_user@example.com',
    password: 'wrong_password'
  }
};
