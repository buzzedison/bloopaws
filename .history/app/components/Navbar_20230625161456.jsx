import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center ">

        <div className="logo"> Logo</div>
        <div className="navbar">

            <ul className="flex float-right px-4 ">
                <Link className="px-4 mt-3"href="/"> <li> About</li></Link>
                <Link className="px-4 mt-3" href="/"> <li> Services</li></Link>
                <Link className="px-4 mt-3" href="/"> <li> Resources</li></Link>
                <Link className="px-4 mt-3" href="/"> <li> Portfolio</li></Link>
                <Link className="px-4 mt-3" href="/"> <li> Brands</li></Link>
            </ul>
            <button className="flex"> Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar