import { useState,useContext } from "react";
import { useRouter } from "next/router";
import {CreateUserRequest,LoginRequest} from '../lib/user_pb';
import {UserServiceClient} from '../lib/UserServiceClientPb';
import { useCookies } from 'react-cookie';
import { StateContext } from "../context/StateContext";


export default function Auth() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['login_token']);
  const metadata = {'login_token': cookies.login_token};

  const login = async () => {
    try {
      const request = new LoginRequest();
      request.setName(username);
      request.setPassword(password);
      const client = new UserServiceClient("http://localhost:8080");
      const response = await client.login(request, {})
      .then((response) => {
        if (response.status === 400) {
          throw "authentication failed";
        } else if(response.toObject().islogin){
          setCookie('login_token', response.toObject().token, { path: '/' });
          localStorage.setItem('userId', response.toObject().id);
          router.push('/mypage')
          return
        }
      })
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  const authUser = async (e) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      try {
        const request = new CreateUserRequest();
        request.setName(username);
        request.setPassword(password);
        const client = new UserServiceClient("http://localhost:8080");
        const response = await client.createUser(request, {});
        login();
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray">
          {isLogin ? "ログイン" : "会員登録"}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={authUser}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm">
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer font-medium text-gray hover:text-indigo-500"
            >
              {isLogin ? "会員登録がまだの方はこちら" : "ログインに切り替え"}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {isLogin ? "ログイン" : "会員登録"}
          </button>
        </div>
      </form>
    </div>
  );
}
