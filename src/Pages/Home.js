import React from 'react';
import Footer from '../Component/Footer';

const Home = () => {
  window.Telegram.WebApp.expand();
  return (
    <>
   <div className="bg-gradient-to-b from-black to-zinc-900 min-h-screen text-white flex flex-col items-center p-4 space-y-4">
  <div className="bg-zinc-800 rounded-lg p-4 w-full max-w-md text-center">
    <p className="text-zinc-400">Your Lunar Tokens</p>
    <p className="text-4xl font-normal">22’128.42 <span className="text-purple-400">LAR</span></p>
  </div>
  <div className="text-center">
    <p>Tap, tap, tap! Can’t stop, won’t stop!</p>
    <p>Timer shows refill, but the fun won’t flop! <span>👍</span></p>
  </div>

  <div className="flex space-x-4">
    <div className="  bg-opacity-70 rounded-xl px-9 py-2 text-center">
      <p className="text-purple-500">0 taps left</p>
    </div>
    <div className="bg-zinc-800 bg-opacity-70 rounded-xl px-9 py-2 text-center flex items-center space-x-2">
      <span className="text-yellow-900">⏰</span>
      <p className="text-yellow-500">01:18:43</p>
    </div>
  </div>

  <div className="relative mb-6 pb-6"> 
        <img src="https://placehold.co/200x200" alt="CEXP Coin" className="w-50 h-50 rounded-full" />
    <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 pb-8 ">
      <button className="bg-white text-black font-normal px-4 py-2 rounded-full shadow-lg">TAP-TAP-TAP</button>
    </div>
    <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 pt-3 ml-0"> 
      <button className="bg-white text-black font-normal px-4 py-2 rounded-full shadow-lg">MORRR!!!</button>
    </div>
  </div>

  <div className="bg-zinc-800 rounded-xl p-2 w-full max-w-md flex text-sm font-normal justify-between items-center py-5">
    <p className="px-3 text-lg">80 <span className="text-purple-400 px-2 text-lg">LAR</span></p>
    <button className="bg-purple-700 p-2 px-3 rounded-lg">
      Claim
    </button>
  </div>
  <div className="w-full max-w-md fixed bottom-0 left-0 flex justify-around py-1">
    <Footer />
  </div>
</div>


    </>
  );
}

export default Home;
