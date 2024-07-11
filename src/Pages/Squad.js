import React, { useState, useEffect } from 'react';
import { addUserToSquad, getUserFromSquad, getUserFromHome } from '../utils/firestoreFunctions';
import Footer from '../Component/Footer';
import { ClipLoader } from 'react-spinners';
import './bg.css';

const Squad = () => {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState("743737380");
  const [squadData, setSquadData] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  window.Telegram.WebApp.expand();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        setUserId(user.id);
      } else {
        console.error('User data is not available.');
      }
    } else {
      console.error('Telegram WebApp script is not loaded.');
    }
  }, []);

  useEffect(() => {
    const fetchSquadData = async () => {
      try {
        const data = await getUserFromSquad(userId);
        setSquadData(data);
      } catch (error) {
        console.error('Error fetching squad data:', error);
      }
    };

    if (userId) {
      fetchSquadData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await getUserFromHome(userId);
        setHomeData(data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHomeData();
    }
  }, [userId]);

  const copyToClipboard = () => {
    const reflink = `https://t.me/ThelunarCoin_bot?start=ref_${userId}`;

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

  const calculateTotal = () => {
    if (homeData && squadData) {
      return homeData.HomeBalance + squadData.totalBalance;
    }
    return 0;
  };

  const handleClaim = async () => {
    const updatedTotalBalance = squadData.totalBalance + squadData.referralEarnings;
    const updatedSquadData = {
      ...squadData,
      totalBalance: updatedTotalBalance,
      referralEarnings: 0
    };

    setSquadData(updatedSquadData);

    try {
      await addUserToSquad(userId, updatedSquadData);
    } catch (error) {
      console.error('Error updating squad data:', error);
    }
  };

  if (loading) {
       return (
      <div className="min-h-screen flex justify-center items-center bg-cover text-white p-4">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-white text-4xl font-normal">
            <ClipLoader
              color="#FFD700" // Golden color
              size={60}
              speedMultiplier={1}
            />
          </h1>
        </div>
      </div>
    );
  } return (
    <div className="min-h-screen bg-cover text-white  flex flex-col items-center space-y-4">
      <h1 className="text-center text-4xl font-normal">
        The bigger the tribe, <br /> the better the vibe!
      </h1>
      <div className="bg-zinc-800 bg-opacity-70 p-4 rounded-xl w-full max-w-md space-y-2">
        <p className="text-zinc-400 text-center">Total squad balance</p>
        <p className="text-center text-3xl font-normal">
          {calculateTotal().toLocaleString()} <span className="text-golden-moon">LAR</span>
        </p>
      </div>
      <div className="bg-zinc-800 bg-opacity-70 p-4 rounded-xl w-full max-w-md space-y-2">
        <p className="text-zinc-400 text-center">Your rewards</p>
        <p className="text-center text-3xl font-normal">
          {squadData?.referralEarnings.toLocaleString() || '0'} <span className="text-golden-moon">LAR</span>
        </p>
        <p className="text-sm mb-4 text-center">10% of your friends' earnings</p>
        <div className="flex p-1 justify-center">
          <button className="bg-golden-moon px-4 py-2 rounded-xl" onClick={handleClaim}>Claim</button>
        </div>
      </div>
      <div className="bg-zinc-800 bg-opacity-70 p-4 rounded-xl w-full max-w-md space-y-2">
        <div className="flex justify-between bg-opacity-70 text-sm items-center bg-zinc-700 rounded-lg py-2 px-3">
          <p className="flex items-center">
            <img aria-hidden="true" alt="team-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👥" className="mr-2" />
            Your team
          </p>
          <p>{squadData?.referralCount || '0'} users</p>
        </div>
        <div>
          {squadData?.referrals.map((referral, index) => (
            <div key={index} className="flex font-normal text-sm  justify-between items-center px-3">
              <p className="flex items-center">
                <img aria-hidden="true" alt="user-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👤" className="mr-2" />
                {referral.username}
              </p>
              <p className="text-primary">{referral.referralBonus.toLocaleString()} <span className="text-golden-moon">LAR</span></p>
            </div>
                    )) || <p className="text-center text-sm text-zinc-400">No referrals yet.</p>}
        </div>
      </div>
      <div className="w-full max-w-md flex space-x-2 mt-5">
        <button className="flex-1 bg-gradient-to-r from-golden-moon py-2 rounded-lg" onClick={copyToClipboard}>
          Invite friends
        </button>
        <button className="bg-zinc-700 bg-opacity-70 p-2 rounded-lg" onClick={copyToClipboard}>
          {copied ? <span>Copied!</span> : <span>Copy</span>}
        </button>
      </div>
      <div className="w-full max-w-md sticky bottom-0 left-0 flex text-white bg-zinc-900 justify-around py-1">
        <Footer />
      </div>
    </div>
  );
  };

export default Squad;
