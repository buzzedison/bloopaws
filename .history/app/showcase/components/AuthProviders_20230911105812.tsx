"use client"
import { useState, useEffect } from 'react';
import { getProviders, signIn } from 'next-auth/react';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        console.log('Fetched providers:', res);
        setProviders(res);
      } catch (error) {
        console.error('Failed to fetch providers:', error);
      }
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div className="flex flex-col items-center">
        {Object.values(providers).map((provider: Provider, i) => (
          <button
            key={i}
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Sign in with {provider.id}
          </button>
        ))}
      </div>
    );
  } else {
    return <div>Loading or No Providers Available</div>;
  }
};

export default AuthProviders;
