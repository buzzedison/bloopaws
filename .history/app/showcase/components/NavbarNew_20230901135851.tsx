import { NavLinks } from "../../constant";
import Link from "next/link"
import AuthProviders from "./AuthProviders";

export default function NavBarNew() {
  const session ={}
  return (
    <>
      <div className="flex flex-1">
        <ul className="xl:flex hidden text-small gap-7 mt-24">
          {NavLinks && NavLinks.length > 0 && // add this check here
            NavLinks.map((link) => (
              <Link href={link.href} key={link.text}>
                {link.text}
              </Link>
            ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session ? (
          <>
            
            <Link href="/createProfile">Share Work</Link>
          </>
        ) :  (
          <AuthProviders/>
        )
        }
      </div>
    </>
  );
}