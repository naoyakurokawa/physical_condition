import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect,useState } from 'react'
import { useCookies } from 'react-cookie';
import { RecoilRoot } from 'recoil';

export default function Layout({children, title = "HP by Next.js"}){
  const [cookies, setCookie, removeCookie] = useCookies(['login_token']);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const checkIsLogin = ()=>{
    if(!cookies.login_token){
      setIsLogin(false)
      router.push('/')
      return
    }else{
      setIsLogin(true)
    }
  }
  const logout = () =>{
    removeCookie('login_token', { path: '/' });
    localStorage.removeItem("userId");
    router.push('/')
  }
  useEffect(()=>{
    checkIsLogin();
  },[])
  return (
      <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono">
        <Head>
          <title>{title}</title>
        </Head>
        <header>
          <nav className="bg-gray-800 w-screen">
            <div className="flex items-center pl-8 h-14">
              <div className="flex space-x-4">
                {/* <Link href="/">
                  <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                    Home
                  </a>
                </Link>
                <Link href="/blog-page">
                  <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                    Blog
                  </a>
                </Link> */}
                {isLogin ? (
                  <p className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded cursor-pointer" onClick={logout}>
                    Logout
                  </p>
                ) : (
                  <p className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">
                    ようこそ
                  </p>
                )}
              </div>
            </div>

          </nav>
        </header>
        <main className="flex flex-1 justify-center items-center flex-col w-screen">
          {children}
        </main>
        <footer className="w-full h-12 flex justify-center items-center border-t">
            @kurokawa
        </footer>
      </div>
  );
}