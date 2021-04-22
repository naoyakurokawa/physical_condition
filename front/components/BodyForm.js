import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import {GetUserBySessionRequest} from '../lib/user_pb';
import {UserServiceClient} from '../lib/UserServiceClientPb';
import {CreateBodyRequest} from '../lib/post_pb';
import {PostServiceClient} from '../lib/PostServiceClientPb';
import { useCookies } from 'react-cookie';
import "react-datepicker/dist/react-datepicker.css"
import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';

export default function BodyForm() {
  const [userId, setUserId] = useState(0);
  const [weight, setBodyWeight] = useState("");
  const [fat, setBodyFat] = useState("");
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['login_token']);
  const metadata = {'login_token': cookies.login_token}
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(today)
  const [registDate, setBodyDate] = useState('')
  const handleChange = (date) => {
    setBodyDate(date.toLocaleDateString())
    setDisplayDate(date)
  }
  registerLocale('ja', ja);

  const checkIsLogin = ()=>{
    if(!cookies.login_token){
      router.push('/')
      return
    }
  }

  const getLoginUser = async () => {
    try {
      const userRequest = new GetUserBySessionRequest();
      const token = cookies.login_token;
      userRequest.setToken(token);
      const userClient = new UserServiceClient("http://localhost:8080");
      const userResponse = await userClient.getUserBySession(userRequest);
      setUserId(userResponse.toObject().userList[0].id);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  const registBody = async (e) => {
    e.preventDefault();
    try {
      const request = new CreateBodyRequest();
      if(!registDate){
        request.setDate(displayDate.toLocaleDateString());
      }else{
        request.setDate(registDate);
      }
      request.setWeight(weight);
      request.setFat(fat);
      request.setUserId(userId);
      console.log(request);
      const client = new PostServiceClient("http://localhost:8080");
      const response = await client.createBody(request, metadata);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  useEffect(()=>{
    checkIsLogin();
    getLoginUser();
  },[])

  return (
    <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
      <div className="px-4 py-8 sm:px-10">
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm leading-5">
            <span className="px-2 text-gray-500 bg-white"> 日々の身体情報を記録 </span>
          </div>
        </div>
        <div className="mt-6">
          <form className="mt-8 space-y-6" onSubmit={registBody}>
            <div className="w-full space-y-6">
              <div className="w-full">
                <div className="relative">
                  <DatePicker
                    locale="ja"
                    selected={displayDate}
                    onChange={handleChange}
                    dateFormat="yyyy年MM月dd日"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="weight"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="体重(kg)"
                    onChange={(e) => {
                      setBodyWeight(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="fat"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="体脂肪(%)"
                    onChange={(e) => {
                      setBodyFat(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    登録
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
          <p className="text-xs leading-5 text-gray-500">記録による日々の現状、変化の参考に。</p>
        </div>
      </div>
    </div>
  );
}
