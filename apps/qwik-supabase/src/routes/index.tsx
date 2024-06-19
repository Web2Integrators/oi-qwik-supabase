import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { ResponseData, useForm, valiForm$ } from '@modular-forms/qwik';
import { useSignIn } from '@oi-workspace/qwik-city-supabase-adaptor';
import { SignInForm, SignInSchema } from 'libs/qwik-city-supabase-adaptor/src/lib/types/types';
import { LuArrowBigLeft } from "@qwikest/icons/lucide";
import { TextInput } from '../components/TextInput';

export default component$(() => {
  const [signinForm, { Form, Field }] = useForm<SignInForm, ResponseData>({
    loader: { value: { email: "", password: "" } },
    action: useSignIn(),
    validate: valiForm$(SignInSchema),
  });

  return (
    <>
      <div class="mx-auto max-w-md">
        <a
          class="btn mb-2 font-medium text-purple-600 transition duration-150 ease-in-out hover:text-purple-400"
          href="/"
        >
          <LuArrowBigLeft class="text-2xl" />
        </a>
        <Form class="space-y-12 border-2 border-gray-100 md:space-y-14 lg:space-y-16 ">
          <div class="space-y-4">
            <Field name="email">
              {(field, props) => (
                <div class="form-control w-full">
                  <TextInput
                    {...props}
                    value={field.value}
                    error={field.error}
                    type="email"
                    label="Email"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <div class="form-control w-full">
                  <TextInput
                    {...props}
                    value={field.value}
                    error={field.error}
                    type="password"
                    label="Password"
                    placeholder="********"
                    required
                  />
                </div>
              )}
            </Field>
            <div class="mt-2 text-center">
              <div class="text-lg text-slate-400">
                Did you forgot password?{" "}
                <a
                  class="font-medium text-purple-500 transition duration-150 ease-in-out hover:text-purple-400"
                  href="/forgotpassword"
                >
                  Click here
                </a>
              </div>
            </div>
          </div>

          <div class="m-2">
            <button class="btn btn-primary w-full" type="submit">
              {signinForm.submitting ? (
                <>
                  <span class="loading loading-spinner"></span>{" "}
                  <span>..Sign In processing</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>
          
        </Form>
        <div class="mt-5 text-center">
          <div class="text-lg text-slate-400">
            Don't have an account?{" "}
            <a
              class="font-medium text-purple-500 transition duration-150 ease-in-out hover:text-purple-400"
              href="/signup"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
