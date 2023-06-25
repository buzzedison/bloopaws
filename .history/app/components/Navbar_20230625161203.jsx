import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center ">

        <div className="logo"> Logo</div>
        <div className="navbar">

            <ul className="flex items-right px-4">
                <Link href="/"> <li> About</li></Link>
                <Link href="/"> <li> Services</li></Link>
                <Link href="/"> <li> Resources</li></Link>
                <Link href="/"> <li> Portfolio</li></Link>
                <Link href="/"> <li> Brands</li></Link>
            </ul>
            <button className=""> Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar