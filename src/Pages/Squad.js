import React, { useState, useEffect } from 'react';
import Footer from '../Component/Footer';

const Squad = () => {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState(1); // Set userId to 1

  useEffect(() => {
    window.Telegram.WebApp.expand();
  }, []);

  const copyToClipboard = () => {
    const reflink = `https://t.me/yourcoinhot_bot?start=ref_${userId}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(reflink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }).catch(err => {
        console.error('Failed to copy text:', err);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = reflink;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 flex flex-col items-center space-y-6">
      <h1 className="text-center text-xl font-bold">
        The bigger the tribe, the better the vibe!
      </h1>
      <div className="bg-zinc-800 p-4 rounded-lg w-full max-w-md space-y-2">
        <p className="text-muted-foreground text-center font-light">Total squad balance</p>
        <p className="text-center text-3xl font-semi-bold">
          41’753.81 <span className="text-primary">LAR</span>
        </p>
      </div>
      <div className="bg-zinc-800 p-4 rounded-lg w-full max-w-md space-y-2 ">
        <p className="text-muted-foreground text-center font-light">Your rewards</p>
        <p className="text-center text-3xl font-semibold">
          5.60 <span className="text-primary">LAR</span>
        </p>
        <p className="text-muted-foreground mb-4 text-center ">10% of your friends earnings</p>
        <div className="flex justify-center">
          <button className="bg-purple-800 px-4 py-2 rounded-lg inline-block">Claim</button>
        </div>
        </div>
      <div className="bg-zinc-800 p-4 rounded-lg w-full max-w-md space-y-2">
        <div className="flex justify-between items-center bg-zinc-700 rounded-lg py-2 px-3">
          <p className="text-muted-foreground flex items-center">
            <img aria-hidden="true" alt="team-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👥" className="mr-2" />
            Your team
          </p>
          <p className="text-muted-foreground">1 users</p>
        </div>
        <div className="flex justify-between items-center px-3">
          <p className="flex items-center">
            <img aria-hidden="true" alt="user-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👤" className="mr-2" />
            Akin Ola
          </p>
          <p className="text-primary">56.00 LAR</p>
        </div>
      </div>
      <div className="w-full max-w-md flex space-x-2 mt-5">
        <button className="flex-1 bg-gradient-to-r from-purple-800 to-indigo-800 py-2 rounded-lg" onClick={copyToClipboard}>
          Invite friends
        </button>
        <button className="bg-zinc-700 p-2 rounded-lg" onClick={copyToClipboard}>
          {copied ? <span>Copied!</span> : <span>Copy</span>}
        </button>
      </div>
      <div className="w-full max-w-md fixed bottom-0 left-0 flex justify-around py-1">
        <Footer />
      </div>
    </div>
  );
};

export default Squad;
