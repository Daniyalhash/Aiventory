'use client'; 

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import '@/styles/LoginPage.css';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setMessage('Invalid or expired reset link.');
      setIsError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/aiventory/reset-password/', {
        token,
        newPassword: password,
      });

      if (response.status === 200) {
        setMessage('Password reset successfully! Redirecting to login...');
        setIsError(false);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      setMessage('Failed to reset password. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginLeft">
        <div className="logocontainer">
          <div className="logo">
            <img src="/images/logoPro.png" alt="Logo" className="logImg" hidden />
          </div>
        </div>

        <div className="loginText">
          <h1 className="welcometext">Reset your password</h1>
        </div>

        <form className="loginform" onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            className="inputfield"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="inputfield"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <p className="login-text">Minimum 6 characters</p>

          <button type="submit" className="loginbutton">
            Reset Password
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

export default ResetPasswordPage;
