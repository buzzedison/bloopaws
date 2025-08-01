import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "../../../constant"
import { getCurrentUser } from "../../../lib/session";
import { signOut } from "next-auth/react";
import AuthProviders from "./AuthProviders";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";

const NavbarNew = async () => {

  const session = await getCurrentUser()

  return (
    <nav className='flex justify-between items-center p-4'>
      
      <div className='flex-1 flex justify-start gap-10'>
        <Link href='/'>
          <Image src='/logo.svg' width={116} height={43} alt='logo' />
        </Link>

        <div className='hidden xl:flex'>
          {NavLinks.map((link) => (
            <Link 
              key={link.text}
              href={link.href}
              className='px-4 py-2 text-gray-500 hover:text-black transition'
            >
              {link.text}
            </Link>  
          ))}
        </div>
      </div>
      
      <div className='flex items-center gap-4'>
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            
            <Link href="/create-project">
              <Button title='Share work' /> 
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>

    </nav>
  );
}

export default NavbarNew;