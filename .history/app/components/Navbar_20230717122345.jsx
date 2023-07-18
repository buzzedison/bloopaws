// Client
import { useState } from 'react';
import Link from 'next/link';

/**
 * Dropdown menu component that displays a list of links.
 * 
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the dropdown menu.
 * @param {Array} props.links - The list of links to display in the dropdown menu.
 */
const DropdownMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
        {title}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 p-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-lg">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.path}>
                <a className="block">{link.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * Navigation bar component.
 */
const Navbar = () => {
  // Common properties for menu items
  const menuItemProps = "px-4 py-2 hover:bg-gray-200 rounded-lg text-gray-900";

  return (
    <nav className="flex items-center bg-gray-100 px-4 py-2">
      <div className="logo text-gray-900 font-bold text-xl">Bloop</div>
      <ul className="flex flex-grow justify-end md:px-8">
        <DropdownMenu
          title="Services"
          links={[
            { path: '/service1', label: 'Service 1' },
            { path: '/service2', label: 'Service 2' },
          ]}
        />
        <DropdownMenu
          title="Resources"
          links={[
            { path: '/resource1', label: 'Resource 1' },
            { path: '/resource2', label: 'Resource 2' },
          ]}
        />
        <li className={menuItemProps}>
          <Link href="/"><a>Portfolio</a></Link>
        </li>
        <li className={menuItemProps}>
          <Link href="/"><a>Brands</a></Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/">
            <a className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">Sign Up</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
