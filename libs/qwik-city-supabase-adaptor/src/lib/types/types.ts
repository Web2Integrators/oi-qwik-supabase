import {
  email,
  type Input,
  minLength,
  object,
  string,
  forward,
  custom,
} from "valibot";

/**
 * 1.SignUp form schema
 */
export const RegisterSchema = object(
  {
    email: string([
      minLength(1, "Please enter your email."),
      email("The email address is badly formatted."),
    ]),
    password: string([
      minLength(1, "Please enter your password."),
      minLength(8, "Your password must have 8 characters or more."),
    ]),
    password2: string(),
    name: string([minLength(1, "Please enter your Name.")]),
    companyName: string([minLength(1, "Please enter your Company Name.")]),
    phone: string([
      minLength(1, "Please enter your phone number."),
      // regex(/^\+?(?:[0-9] ?){6,14}[0-9]$/, "Please enter a valid phone number."),
    ]),
  },
  [
    forward(
      custom(
        (input) => input.password === input.password2,
        "The two passwords do not match.",
      ),
      ["password2"],
    ),
  ],
);
export type RegisterForm = Input<typeof RegisterSchema>;

/**
 * 2.SignIn form schema
 */
export const SignInSchema = object({
  email: string([
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  password: string([
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
});
export type SignInForm = Input<typeof SignInSchema>;

/**
 * 3.Update password form schema
 */
export const UpdatePasswordSchema = object({
  password: string([
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
  password2: string([
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
});
export type UpdatePasswordForm = Input<typeof UpdatePasswordSchema>;

/**
 * 4.Forgot password form schema
 */
export const ForgotPasswordSchema = object({
  email: string([
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
});
export type ForgotPasswordForm = Input<typeof ForgotPasswordSchema>;




