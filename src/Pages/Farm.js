import React, { useState, useEffect } from 'react';
import Footer from '../Component/Footer';
import { addUserToFarm, getUserFromFarm, updateHomeBalance, getUserFromHome } from '../utils/firestoreFunctions';
import FormattedTime from '../Component/FormattedTime';

const Farm = () => {
  const [userData, setUserData] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [userId, setUserId] = useState("12345");
  const [buttonText, setButtonText] = useState("Start");

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserFromFarm(userId);
      if (data) {
        const currentTime = Math.floor(Date.now() / 1000);
        const elapsed = currentTime - data.LastFarmActiveTime;

        if (elapsed > 0) {
          const newFarmTime = data.FarmTime - elapsed;
          if (newFarmTime <= 0) {
            setUserData({
              ...data,
              FarmTime: 0,
              FarmReward: data.FarmReward + data.FarmTime * 0.1,
              LastFarmActiveTime: currentTime,
            });
            setButtonText("Claim");
          } else {
            setUserData({
              ...data,
              FarmTime: newFarmTime,
              FarmReward: data.FarmReward + elapsed * 0.1,
              LastFarmActiveTime: currentTime,
            });
            setButtonText("Farming...");
          }
        }
      } else {
        const initialData = {
          FarmTime: 60,
          FarmReward: 0,
          LastFarmActiveTime: Math.floor(Date.now() / 1000),
        };
        await addUserToFarm(userId, initialData);
        setUserData(initialData);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchHomeData = async () => {
      const data = await getUserFromHome(userId);
      setHomeData(data);
    };

    fetchHomeData();
  }, [userId]);

  useEffect(() => {
    let interval;
    if (buttonText === "Farming...") {
      interval = setInterval(() => {
        if (userData) {
          const currentTime = Math.floor(Date.now() / 1000);
          const elapsed = currentTime - userData.LastFarmActiveTime;

          if (elapsed > 0) {
            const newFarmTime = userData.FarmTime - elapsed;
            if (newFarmTime <= 0) {
              setUserData((prevState) => ({
                ...prevState,
                FarmTime: 0,
                FarmReward: prevState.FarmReward + prevState.FarmTime * 0.1,
                LastFarmActiveTime: currentTime,
              }));
              setButtonText("Claim");
            } else {
              setUserData((prevState) => ({
                ...prevState,
                FarmTime: newFarmTime,
                FarmReward: prevState.FarmReward + elapsed * 0.1,
                LastFarmActiveTime: currentTime,
              }));
            }
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [buttonText, userData]);

  useEffect(() => {
    const saveUserData = async () => {
      if (userId && userData) {
        await addUserToFarm(userId, userData);
      }
    };

    const handleBeforeUnload = (e) => {
      saveUserData();
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    const saveInterval = setInterval(saveUserData, 10000); // Save user data every 10 seconds

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(saveInterval);
      saveUserData();
    };
  }, [userId, userData]);

  const handleButtonClick = async () => {
    if (buttonText === "Start") {
      setButtonText("Farming...");
      setUserData((prevState) => ({
        ...prevState,
        LastFarmActiveTime: Math.floor(Date.now() / 1000),
      }));
    } else if (buttonText === "Claim" && homeData) {
      const newHomeBalance = homeData.HomeBalance + userData.FarmReward;
      await updateHomeBalance(userId, newHomeBalance);
      setUserData((prevState) => ({
        ...prevState,
        FarmReward: 0,
        FarmTime: 60,
      }));
      setButtonText("Start");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-4 space-y-6">
        <h1 className="text-4xl font-normal">Farm LAR tokens</h1>
        <p className="text-zinc-400 text-center">
          Level up with token farming!<br />
          Claim LAR and keep the farm poppin!
        </p>
        <div className="bg-zinc-800 text-red-700 w-full max-w-md px-4 py-2 rounded-xl text-center">
          Current farming era: <span className="text-yellow-900">⏰</span> <FormattedTime time={userData?.FarmTime} />
        </div>
        <div className="bg-zinc-800 text-card-foreground p-2 rounded-3xl w-full max-w-md text-center min-h-[40vh] flex flex-col justify-center space-y-4">
          <p className="text-zinc-400 text-muted-foreground">Farming era reward</p>
          <p className="text-4xl font-normal text-primary">
            {userData?.FarmReward.toFixed(1)} <span className="text-golden-moon">LAR</span>
          </p>
        </div>
        <div className="space-y-6 w-full flex items-center flex-col">
          <button
            className={`text-white hover:bg-secondary/80 px-6 py-3 rounded-xl w-full max-w-md ${buttonText === "Farming..." ? "bg-zinc-800" : "bg-golden-moon"}`}
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
        <div className="w-full max-w-md bg-zinc-900 fixed bottom-0 left-0 flex justify-around py-1">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Farm;
