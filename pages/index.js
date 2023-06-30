import Layout from "@/components/Layout";

import {useSession} from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  console.log(session)
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, 
        {/* <b>{session?.token?.email}</b> */}
        <b>{session?.token?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        {/* <img src={session?.token?.image} alt="" className="w-6 h-6"/> */}
        <span className="px-2">
          {session?.token?.name}
        </span>
      </div>
    </div>
  </Layout>
}
