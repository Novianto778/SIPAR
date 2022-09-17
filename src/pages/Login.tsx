import TextField from 'components/form/TextField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useSignIn from 'hooks/useSignIn';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useEffect } from 'react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type loginTypes = z.infer<typeof loginSchema>;

const Login = () => {
  const { user, signIn, error } = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginTypes>({
    resolver: zodResolver(loginSchema),
  });

  const redirectPath = location?.state || ROUTES.HOME;

  const onSubmit = async (data: loginTypes) => {
    signIn(data);
  };

  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [user, redirectPath, navigate]);

  return (
    <section className="h-screen">
      <div className="px-20 py-12 h-full mx-auto lg:mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center flex-wrap h-full gap-6 text-gray-800">
          <div className="hidden lg:block w-full">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone"
            />
          </div>
          <div className="w-full max-w-lg mx-auto">
            <h2 className="text-center text-xl mb-8 font-semibold">
              Login to Your Account
            </h2>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{error.message}</span>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                placeholder="Masukkan email"
                spacing={6}
                {...register('email')}
                error={errors.email?.message}
                label="Email"
              />
              <TextField
                placeholder="Masukkan password"
                type="password"
                spacing={6}
                {...register('password')}
                error={errors.password?.message}
                label="Password"
              />

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#!"
                  className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
