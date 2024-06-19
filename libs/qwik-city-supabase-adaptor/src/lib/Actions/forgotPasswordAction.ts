
import { formAction$, valiForm$ } from '@modular-forms/qwik';


import { createClient } from '../utils/server';
import { ForgotPasswordForm, ForgotPasswordSchema } from '../types/types';
 

type ResponseData = {
  userId: string|undefined;
};
export const useForgotPassword = formAction$<ForgotPasswordForm,ResponseData>(
  async (values,headers) => {
      const email = values.email;
      const supabase = createClient(headers.cookie, headers.env);
      const { error ,data} = await supabase.auth.resetPasswordForEmail(email);
  if(data){ 
    return {
      status: 'success',
      message: 'A password reset email has been sent to your registered email address. Please check your inbox',
      data: { userId: ''}
    };
  }
  if(error){
    return {
      status: 'error',
      message: error?.message || 'An error has occurred.',
      data: { userId: ''}
    };
  }
  
  // Add a return statement for the case where neither `data` nor `error` is truthy
  return {
    status: 'error',
    message: 'An unknown error has occurred.',
    data: { userId: ''}
  };
  },
  valiForm$(ForgotPasswordSchema)
);


