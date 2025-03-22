'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faUsers, faCogs } from '@fortawesome/free-solid-svg-icons';
import ProfileButton from './ProfileButton';
import '../src/styles/navbar.css';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logoPro.png" alt="Logo" className="logImg" />
      </div>
      <div className="menu">
        <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
          <FontAwesomeIcon icon={faHome} className="icon" />
          Dashboard
        </Link>
        <Link href="/dashboard/inventory" className={pathname === '/dashboard/inventory' ? 'active' : ''}>
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          Inventory
        </Link>
        <Link href="/dashboard/vendor" className={pathname === '/dashboard/vendor' ? 'active' : ''}>
          <FontAwesomeIcon icon={faUsers} className="icon" />
          Vendor
        </Link>
        <Link href="/dashboard/insights" className={pathname === '/dashboard/insights' ? 'active' : ''}>
          <FontAwesomeIcon icon={faUsers} className="icon" />
          Insights
        </Link>
    
        <Link href="/dashboard/future" className={pathname === '/dashboard/future' ? 'active' : ''}>
          <FontAwesomeIcon icon={faUsers} className="icon" />
          Future
        </Link>
        <Link href="/dashboard/setting" className={pathname === '/dashboard/setting' ? 'active' : ''}>
          <FontAwesomeIcon icon={faCogs} className="icon" />
          Settings
        </Link>
      </div>
      <ProfileButton />
    </nav>
  );
};

export default Navbar;

// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
