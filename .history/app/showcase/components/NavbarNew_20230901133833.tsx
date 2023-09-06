import { NavLinks } from "../../constant";
import Link from "next/link"
export default function NavBarNew (){
    return (
        <>
        <div className="flex flex-1">

            <ul className="xl:flex hidden text-small gap-7">
            {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
            </ul>
        </div>
        </>
    )
}