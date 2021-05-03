import Link from "next/link"
import { useState,useEffect,useContext } from "react";
import {GetBodyListRequest} from '../lib/post_pb';
import {PostServiceClient} from '../lib/PostServiceClientPb';

export default function BodyList() {
  const [BodyList, setBodyList] = useState({});
  const [targetMonth, setMonth] = useState("");
  const [isGraph, setIsGraph] = useState(false);
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const displayYearMonth = year + '-' + '0' + month;

  const getBodyList = async (month) => {
    try {
      const postRequest = new GetBodyListRequest();
      postRequest.setUserId(localStorage.getItem("userId"));
      postRequest.setMonth(month);
      const postClient = new PostServiceClient("http://localhost:8080");
      const postResponse = await postClient.getBodyList(postRequest);
      setBodyList(postResponse.toObject().bodylistList);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  const handleChange = (date) => {
    setMonth(date);
    getBodyList(date);
  }

  useEffect(()=>{
    setMonth(displayYearMonth);
    getBodyList(displayYearMonth);
  },[])

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="flex">
        <div className="my-2">
          <label className="text-gray-700">
            Select Month
            <input
              type="month"
              value={targetMonth}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></input>
          </label>
        </div>
        <div className="w-full text-right my-4">
          <button
            type="button"
            onClick={() => setIsGraph(!isGraph)}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              {isGraph ? "表でみる" : "グラフで見る"}
          </button>
        </div>
      </div>
      {isGraph ? (
        <div class="flex flex-col items-center justify-center w-full h-full px-10 py-20 text-gray-700 bg-gray-100">
          <div class="flex flex-col items-center w-full max-w-screen-md p-6 pb-6 bg-white rounded-lg shadow-xl sm:p-8">
            <h2 class="text-xl font-bold">体重・体脂肪推移</h2>
            <span class="text-sm font-semibold text-gray-500">{targetMonth}</span>
            <div class="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
              {
                Object.keys(BodyList).map((key) => {
                  return (
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                      <div className={'relative flex justify-center w-full h-' + Math.round(BodyList[key].weight) + 'px bg-indigo-200'}>{BodyList[key].weight}</div>
                      <div className={'relative flex justify-center w-full h-' + BodyList[key].fat + 'px bg-indigo-300'}>{BodyList[key].fat}</div>
                      <span className="absolute bottom-0 text-xs font-bold">{BodyList[key].date.slice(-2)}</span>
                    </div>
                  )
                })
              }
            </div>
            <div className="flex w-full mt-3">
              <div className="flex items-center ml-4">
                <span className="block w-4 h-4 bg-indigo-300"></span>
                <span className="ml-1 text-xs font-medium">Fat(%)</span>
              </div>
              <div className="flex items-center ml-4">
                <span className="block w-4 h-4 bg-indigo-200"></span>
                <span className="ml-1 text-xs font-medium">Weight(kg)</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-800">
                  <th scope="col" className="px-5 py-3 border-b border-gray-200 text-gray-300 text-left text-sm font-normal">
                      Date
                  </th>
                  <th scope="col" className="px-5 py-3 border-b border-gray-200 text-gray-300 text-left text-sm font-normal">
                      Weight(kg)
                  </th>
                  <th scope="col" className="px-5 py-3 border-b border-gray-200 text-gray-300 text-left text-sm font-normal">
                      Fat(%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(BodyList).map((key) => {
                    return (
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {BodyList[key].date}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {BodyList[key].weight}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {BodyList[key].fat}
                          </p>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}
      <div className="text-center">
        <Link href="/mypage">
          <button type="button" className="py-2 px-4 my-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-1/2 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              戻る
          </button>
        </Link>
      </div>
    </div>
  );
}
