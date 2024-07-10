import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PulseLoader } from 'react-spinners';
import FormattedTime from '../Component/FormattedTime';
import { addUserToHome, getUserFromHome } from '../utils/firestoreFunctions';
import './Home.css'; // Make sure to import the CSS file
import coin from './coin1.png';
import RewardCard from '../Component/RewardCard';
import Footer from '../Component/Footer';
import './bg.css'

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTapButton, setShowTapButton] = useState(false);
  const [showMorrButton, setShowMorrButton] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isVibrating, setIsVibrating] = useState(false); // State for vibration
  const [showRewardCard, setShowRewardCard] = useState(false); // State to control RewardCard visibility

  const tapButtonShowCount = 12; // Show TAP-TAP-TAP button after 3 clicks
  const morrButtonShowCount = 20; // Show MORRR!!! button after 6 clicks

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
    const fetchUserData = async () => {
      const data = await getUserFromHome(userId);
      if (data) {
        setUserData(data);
      } else {
        const initialData = {
          HomeBalance: 0,
          TapPoint: 1000,
          TapTime: 300,
          TapClaim: 0,
          LastActiveTime: Math.floor(Date.now() / 1000),
        };
        await addUserToHome(userId, initialData);
        setUserData(initialData);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userData) {
        const currentTime = Math.floor(Date.now() / 1000);
        const elapsed = currentTime - userData.LastActiveTime;

        if (elapsed > 0) {
          const newTapTime = userData.TapTime - elapsed;
          if (newTapTime <= 0) {
            setUserData((prevState) => ({
              ...prevState,
              TapTime: 300,
              TapPoint: 1000,
              LastActiveTime: currentTime,
            }));
          } else {
            setUserData((prevState) => ({
              ...prevState,
              TapTime: newTapTime,
              LastActiveTime: currentTime,
            }));
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [userData]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (userId) {
        addUserToHome(userId, userData);
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (userId && userData) {
        addUserToHome(userId, userData);
      }
    };
  }, [userId, userData]);

  const handleTap = () => {
    // Check if TapPoint is greater than 0
    if (userData.TapPoint > 0) {
      // Trigger vibration
      if (navigator.vibrate) {
        navigator.vibrate(100); // Vibrate for 100ms
      }
  
      // Update TapPoint and TapClaim
      setUserData((prevState) => ({
        ...prevState,
        TapPoint: prevState.TapPoint - 1,
        TapClaim: prevState.TapClaim + 1,
      }));
  
      // Increment click count and show buttons
      setClickCount((prevCount) => {
        const newCount = prevCount + 1;
  
        // Show the TAP-TAP-TAP button after the specified number of clicks
        if (newCount % tapButtonShowCount === 0) {
          setShowTapButton(true);
          setTimeout(() => setShowTapButton(false), 600);
        }
  
        // Show the MORRR!!! button after the specified number of clicks
        if (newCount % morrButtonShowCount === 0) {
          setShowMorrButton(true);
          setTimeout(() => setShowMorrButton(false), 600);
        }
  
        return newCount;
      });

      // Trigger vibration animation
      setIsVibrating(true);
      setTimeout(() => setIsVibrating(false), 100); // Stop vibration after the animation duration
    }
  };

  const handleClaim = () => {
    // Vibrate when claiming
    if (navigator.vibrate) {
      navigator.vibrate(500); // Vibrate for 500ms
    }

    // Show RewardCard and update userData
    setUserData((prevState) => ({
      ...prevState,
      HomeBalance: prevState.HomeBalance + prevState.TapClaim,
      TapClaim: 0,
    }));
    setShowRewardCard(true);

    // Hide RewardCard after 2 seconds
    setTimeout(() => setShowRewardCard(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PulseLoader margin={9} />
      </div>
    );
  }

  return (
    <div className="bg-cover  bg-gradient-to-b from-black to-zinc-900 min-h-screen text-white flex flex-col items-center p-4 space-y-4">
      <div className="bg-zinc-800 bg-opacity-70 rounded-lg p-4 w-full max-w-md text-center">
        <p className="text-zinc-500">Your Lunar Tokens</p>
        <p className="text-4xl font-normal">{userData?.HomeBalance.toLocaleString()} <span className="text-golden-moon">LAR</span></p>
      </div>
      <div className="text-center">
        <p>Tap, tap, tap! Can’t stop, won’t stop!</p>
        <p>Timer shows refill, but the fun won’t flop! <span role="img" aria-label="thumbs up">👍</span></p>
      </div>

      <div className="flex space-x-4">
        <div className="bg-zinc-800 bg-opacity-70 rounded-xl px-9 py-2 text-center">
          <p className="text-golden-moon">{userData?.TapPoint} taps </p>
        </div>
        <div className="bg-zinc-800 bg-opacity-70 rounded-xl px-7 py-2 text-center flex items-center space-x-2">
          <span className="text-yellow-900">⏰</span>
          <p className="text-red-700"><FormattedTime time={userData?.TapTime}/></p>
        </div>
      </div>

      <div className="relative mb-6 pb-6">
        <motion.img
          id="click"
          onClick={handleTap}
          src={coin}
          alt="LAR Coin"
          className="w-55 h-56 rounded-full"
          animate={isVibrating ? { x: [0, -10, 0, 10, 0] } : {y:[0, -10, 0, 10, 0]}}
          transition={{ duration: 0.2 }}
        />
        {showTapButton && (
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 pb-8 button-animation move-tap">
            <button className="bg-white bg-opacity-70 text-black font-normal px-4 py-2 rounded-full shadow-lg">TAP-TAP-TAP</button>
          </div>
        )}
        {showMorrButton && (
          <div className="absolute  top-0 left-0 -translate-x-1/4 -translate-y-1/4 pt-3 ml-0 button-animation move-morr">
            <button className="bg-white bg-opacity-70 text-black font-normal px-4 py-2 rounded-full shadow-lg">MORRR!!!</button>
          </div>
        )}
      </div>
      <div className="bg-zinc-800 bg-opacity-70 rounded-xl p-2 w-full max-w-md flex text-sm font-normal justify-between items-center py-5">
        <p className="px-3 text-xl font-normal">{userData?.TapClaim.toLocaleString()} <span className="text-golden-moon px-2 text-xl font-normal">LAR</span></p>
        <button className="bg-golden-moon p-2 px-3 rounded-lg" onClick={handleClaim}>
          Claim
        </button>
      </div>

      <AnimatePresence>
        {showRewardCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={() => setShowRewardCard(false)} // Click anywhere to close RewardCard
          >
            <RewardCard onClose={() => setShowRewardCard(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md fixed bottom-0 left-0 flex justify-around bg-zinc-900 py-1">
<Footer />
</div>
</div>
);
};

export default Home;