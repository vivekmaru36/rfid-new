import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/api/axios';
import ErrorStrip from '../ErrorStrip';

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirm password state
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is present, redirect to login if not
    if (!token) {
        navigate('/');
    }
  }, [token, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {

      console.log('Request Data:', { password, confirmPassword });

      // Call the server API to reset the password
      const response = await axios.post(`/auth/reset-password/${token}`, { password });
      console.log('Full Response:', response);
      setSuccessMessage(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      // Always navigate to the login page after attempting to reset the password
      navigate('/login'); // Update this path based on your actual login route
    }
  };

  return (
    <main className="relative z-0 flex h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-400 to-slate-300 text-slate-950 dark:from-slate-800 dark:to-slate-950 dark:text-slate-300">
      <section className="z-0 w-[65%] justify-self-center rounded-lg bg-slate-100 opacity-80 hover:opacity-100 focus:opacity-100 dark:bg-[#060913] sm:w-[min(50%,360px)] md:w-[min(40%,360px)] xl:w-[min(23%,360px)] ">
        <form
          className="tracking-wide placeholder:text-slate-200 dark:placeholder:text-violet-200 p-4"
          onSubmit={handleResetPassword}
        >
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <div className="input-group mb-4">
            <label className="text-slate-600 dark:text-violet-200">New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-2 block h-12 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-2 pl-3 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
            />
          </div>
          <div className="input-group mb-4">
            <label className="text-slate-600 dark:text-violet-200">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mb-2 block h-12 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-2 pl-3 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
            />
          </div>
          <button
            type="submit"
            className="mb-4 flex h-12 w-full items-center justify-center gap-1 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-2 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-wait dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus:bg-slate-900 lg:mb-2"
          >
            Reset Password
          </button>
        </form>
        {error && <ErrorStrip error={error} />}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {error && <p className="text-green-600">{error}</p>}
      </section>
    </main>
  );
};

export default ResetPasswordForm;
