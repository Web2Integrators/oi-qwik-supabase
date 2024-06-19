import { formAction$, valiForm$ } from '@modular-forms/qwik';

import { createClient } from '../utils/server';
import { UpdatePasswordForm, UpdatePasswordSchema } from '../types/types';

type ResponseData = {
  userId: string | undefined;
};
export const useUpdatePassword = formAction$<UpdatePasswordForm, ResponseData>(
  async (values, headers) => {
    const newPassword = values.password2;
    const oldPassword = values.password;
    const supabase = createClient(headers.cookie, headers.env);

    const verifyResponse = await supabase.rpc('verify_user_password', {
      password: oldPassword,
    });
    if (verifyResponse.data === false) {
      return {
        status: 'error',
        message: `Old password doesn't match.Please try again' || 'An error has occurred.`,
        data: { userId: '' },
      };
    }

    const { error, data } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (data.user) {
      return {
        status: 'success',
        message:
          'Your password has been changed successfully. You can now log in with your new credentials',
        data: { userId: '' },
      };
    }
    if (error) {
      return {
        status: 'error',
        message:
          error?.message === 'Invalid login credentials'
            ? error?.message + ' or Please Register'
            : error?.message || 'An error has occurred.',
        data: { userId: '' },
      };
    }
  },
  valiForm$(UpdatePasswordSchema)
);
