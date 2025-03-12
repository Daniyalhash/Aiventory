'use client'; 
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "@/styles/LoginPage.css";
import { useRouter } from 'next/navigation';

const ForgotPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const router = useRouter();
    console.log("ForgotPage component loaded");

    const handleResetRequest = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch('http://127.0.0.1:8000/aiventory/forgot_password/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            console.log("Request sent");
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setIsError(false);
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setMessage(data.error || "Unexpected server error. Please try again.");
                setIsError(true);
            }
        } catch (error) {
            console.error('Error requesting password reset:', error);
            setMessage('Something went wrong. Please try again.');
            setIsError(true);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginLeft">
                <div className="loginText">
                    <h1 className="welcometext">Forgot Password?</h1>
                    <p className="subtext">
                        Enter your email address and we’ll send you instructions to reset your password.
                    </p>
                </div>

                <form className="loginform" onSubmit={handleResetRequest}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="inputfield"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="loginbutton">
                        Send Reset Instructions
                    </button>
                </form>

                <div className={`messageContainer ${message ? 'show' : 'hide'} ${isError ? 'error' : 'success'}`}>
                    <div className="message-content">
                        <span className="close-icon" onClick={() => setMessage("")}>✖</span>
                        {message}
                    </div>
                </div>
            </div>

            <div className="loginright">
                <div className="logoRight">
                    <Link href="/">
                        <Image
                            src="/images/logoPro2.png"
                            alt="Logo"
                            className="logImg"
                            width={100}
                            height={100}
                            style={{ cursor: 'pointer' }}
                        />
                    </Link>
                </div>
                <video
                    className="animatedVideo"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/video/vid2.mp4"
                    type="video/mp4"
                ></video>
            </div>
        </div>
    );
};

export default ForgotPage;
