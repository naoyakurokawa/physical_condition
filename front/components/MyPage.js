import { useState } from "react";
import { useRouter } from "next/router";
import {CreateUserRequest} from '../lib/user_pb';
import {UserServiceClient} from '../lib/UserServiceClientPb';
import Cookie from "universal-cookie";
import Link from "next/link"

const cookie = new Cookie();

export default function MyPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const login = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
        {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const options = { path: "/" };
          cookie.set("access_token", data.access, options);
        });
      router.push("/main-page");
    } catch (err) {
      alert(err);
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
        // login();
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  };

  return (
  <div class="w-8/12 bg-white p-12">
    <div class="header flex items-end justify-between mb-12">
        <div class="title">
            <p class="text-4xl font-bold text-gray-800 mb-4">
                Lastest articles
            </p>
            <p class="text-2xl font-light text-gray-400">
                All article are verified by 2 experts and valdiate by the CTO
            </p>
        </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-12">
            <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 m-auto">
                <a href="#" class="w-full block h-full">
                    <img alt="meal photo" src="img/meal.jpg" class="max-h-40 w-full object-cover"/>
                    <div class="bg-white dark:bg-gray-800 w-full p-4">
                        <p class="text-gray-800 dark:text-white text-xl font-medium mb-2 text-center">
                            食事
                        </p>
                        <p class="text-gray-400 dark:text-gray-300 font-light text-md">
                            Work at home, remote, is the new age of the job, every person can work at home....
                        </p>
                        <div class="flex items-center mt-4">
                          <div class="flex items-center justify-between gap-4 w-full mt-8">
                            <button type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                記録
                            </button>
                            <button type="button" class="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                見る
                            </button>
                          </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
                <a href="#" class="w-full block h-full">
                    <img alt="meal photo" src="img/weight-scale.jpg" class="max-h-40 w-full object-cover"/>
                    <div class="bg-white dark:bg-gray-800 w-full p-4">
                        <p class="text-gray-800 dark:text-white text-xl font-medium mb-2 text-center">
                            からだ
                        </p>
                        <p class="text-gray-400 dark:text-gray-300 font-light text-md">
                            Work at home, remote, is the new age of the job, every person can work at home....
                        </p>
                        <div class="flex items-center mt-4">
                          <div class="flex items-center justify-between gap-4 w-full mt-8">
                            <Link href="/body/input">
                              <button type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                  記録
                              </button>
                            </Link>
                            <button type="button" class="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                見る
                            </button>
                          </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
  );
}
