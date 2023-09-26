"use client"
import {useState, useEffect} from 'react'
import { getProviders, signIn} from "next-auth/react"

type Provider = {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
  signinUrlParams?: Record<string, string | null>
}

type Providers = Record <string, Provider>

function AuthProviders() {
  const [providers, setProviders] = useState<Providers  
  | null>(null)
  useEffect (()=> {
   const fetchProviders = async()=>{
     const providers = await getProviders()
     setProviders(providers)

   }
fetchProviders();
  }, [providers, setProviders])

  //write the providers if statement to check value of providers

   if (providers) {
    return (
      <div className="flex flex-col items-center">
        {Object.values(providers).map((provider) => (
          <button key={provider.name} onClick={() => signIn(provider.signinUrl,
           {callbackUrl: "/"})}>
            Sign in with {provider.name}
          </button>))}
          </div>
        
        )
        
          }
}

export default AuthProviders