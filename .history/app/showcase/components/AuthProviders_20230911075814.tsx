"use client"
import {useState, useEffect} from 'react'
import { getProviders, signIn} from "next-auth/react"

type Provider = {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
  signinUrlParams?: Record<string, string> | null
}

type Providers = Record <string, Provider>

const AuthProviders =()=> {
  const [providers, setProviders] = useState<Providers  
  | null>(null)
  useEffect (()=> {
   const fetchProviders = async()=>{

     const providers = await getProviders()
     setProviders(providers)

   }
fetchProviders();
  }, [])

  //write the providers if statement to check value of providers

   if (providers) {
    return (
      <div className="flex flex-col items-center">
        {Object.values(providers).map((provider) => (
          <button key={provider.id} onClick={() => signIn(provider.signinUrl,
           {callbackUrl: "/"})}>
            Sign in with {provider.id}
          </button>))}
          </div>
        
        )
        
          }
          
            else {
              return <div>Loading or No Providers Available</div>;
            }
}

export default AuthProviders