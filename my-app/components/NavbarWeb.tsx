// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import "@/styles/NavbarWeb.css";
// import { usePathname } from 'next/navigation';

// const NavbarWeb = () => {
//   const pathname = usePathname();

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <img src="/images/logoPro2.png" alt="Logo" className="logImg" />
//       </div>
//       <div className="menu">
//         <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
//           Product 
//         </Link>
//         <Link href="/dashboard/inventory" className={pathname === '/dashboard/inventory' ? 'active' : ''}>
//           Solution
//         </Link>
//         <Link href="/dashboard/vendor" className={pathname === '/dashboard/vendor' ? 'active' : ''}>
//           Features
//         </Link>
//         <Link href="/dashboard/insights" className={pathname === '/dashboard/insights' ? 'active' : ''}>
//           Pricing
//         </Link>
//         <Link href="/dashboard/predictions" className={pathname === '/dashboard/predictions' ? 'active' : ''}>
//           Testimonials
//         </Link>
       
//       </div>
//     </nav>
//   );
// };

// export default NavbarWeb;
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faUsers, faCogs } from '@fortawesome/free-solid-svg-icons';
import ProfileButton from './ProfileButton';
import '../src/styles/NavbarWeb.css';

const NavbarWeb = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="logo">
      <Link href="/">
      <img src="/images/logoPro3.png" alt="Logo" className="logImg" />
      </Link>
      </div>
      <div className="menu">
      <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
           Product 
         </Link>
         <Link href="/dashboard/inventory" className={pathname === '/dashboard/inventory' ? 'active' : ''}>
           Solution
         </Link>
         <Link href="/dashboard/vendor" className={pathname === '/dashboard/vendor' ? 'active' : ''}>
          Features
         </Link>
         <Link href="/dashboard/insights" className={pathname === '/dashboard/insights' ? 'active' : ''}>
           Pricing
         </Link>
         <Link href="/dashboard/predictions" className={pathname === '/dashboard/predictions' ? 'active' : ''}>
           Testimonials
         </Link>
      </div>
      <div className="authButtons">
        <Link href="/signup">
          <button className="signUp">Sign Up</button>
        </Link>
        <Link href="/login">
          <button className="logIn">Log In</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarWeb;

// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
