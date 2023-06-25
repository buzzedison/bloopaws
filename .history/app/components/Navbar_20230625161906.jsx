import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex items-center bg-gray-100 px-4 py-2">
      <div className="logo text-gray-900 font-bold text-xl">Logo</div>
      <ul className="flex flex-grow justify-end md:px-8">
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg">
          <Link href="/"className="text-gray-900">About
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg">
          <Link href="/"className="text-gray-900">Services
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg">
          <Link href="/"className="text-gray-900">Resources
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg">
          <Link href="/"className="text-gray-900">Portfolio
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg">
          <Link href="/"className="text-gray-900">Brands
          </Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/"className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
