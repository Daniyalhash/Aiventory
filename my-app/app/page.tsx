
import Front from '@/components/Front';
import LoginPage from '@/components/LoginPage';
import NavbarWeb from '@/components/NavbarWeb';
import LandingPage from '@/components/LandingPage';
import Text from '@/components/Text';

import Why from '@/components/Why';
import Features from '@/components/Features';
import '@/styles/globals.css';
import Phone from '@/components/Phone';
import Laptop from '@/components/Laptop';
import Plan from '@/components/Plan';
import Help from '@/components/Help';

import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <div className='Home'>
      <NavbarWeb />
      <LandingPage />
      <Why />
      <Features />
      <Phone />
      <Text />
      <Laptop />
      <Plan />
      <Testimonials />
      <Footer />
    </div>
  );
}



