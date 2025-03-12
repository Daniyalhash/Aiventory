'use client'
import '@/styles/login.css';

import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();
    const handleClick = () => {
        router.push('/login'); // Adjust this route if needed
    };

    return (
        <div>
           <button onClick={handleClick}>
            Login
           </button>
        </div>
    );
}

export default LoginPage;
