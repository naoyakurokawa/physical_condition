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

  return (
  <div className="w-8/12 bg-white py-10">
    <div className="header flex items-end justify-between mb-12">
        <div className="title text-center w-full">
            <p className="text-4xl font-bold text-gray-800 mb-4">
                日々の記録
            </p>
            <p className="text-2xl font-light text-gray-400">
                身体情報や食事を記録して振り返り、改善することでコンディションを整えましょう！
            </p>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-12">
            <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 m-auto">
                <a href="#" className="w-full block h-full">
                    <img alt="meal photo" src="img/meal.jpg" className="max-h-40 w-full object-cover"/>
                    <div className="bg-white dark:bg-gray-800 w-full p-4">
                        <p className="text-gray-800 dark:text-white text-xl font-medium mb-2 text-center">
                            食事
                        </p>
                        <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                            カロリー、タンパク質、糖質、脂質を記録できます。
                        </p>
                        <div className="flex items-center mt-4">
                          <div className="flex items-center justify-between gap-4 w-full mt-8">
                            <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                記録
                            </button>
                            <button type="button" className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                見る
                            </button>
                          </div>
                        </div>
                    </div>
                </a>
            </div>
            <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
                <a href="#" className="w-full block h-full">
                    <img alt="meal photo" src="img/weight-scale.jpg" className="max-h-40 w-full object-cover"/>
                    <div className="bg-white dark:bg-gray-800 w-full p-4">
                        <p className="text-gray-800 dark:text-white text-xl font-medium mb-2 text-center">
                            からだ
                        </p>
                        <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                            体重、体脂肪を記録できます。体重計は準備下さいね。
                        </p>
                        <div className="flex items-center mt-4">
                          <div className="flex items-center justify-between gap-4 w-full mt-8">
                            <Link href="/body/input">
                              <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                  記録
                              </button>
                            </Link>
                            <Link href="/body/list">
                              <button type="button" className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                  見る
                              </button>
                            </Link>
                          </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
  );
}
