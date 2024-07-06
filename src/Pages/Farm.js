import React from 'react';
import Footer from '../Component/Footer';

const Farm = () => {
  window.Telegram.WebApp.expand();
  return (
    <>
  <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-4 space-y-6">
  <h1 className="text-4xl font-normal">Farm LAR tokens</h1>
  <p className="text-zinc-400 text-center ">
    Level up with token farming!<br />
    Claim LAR and keep the farm poppin!
  </p>
  <div className="bg-zinc-800 text-red-700 px-4 py-2 rounded-lg text-center">
    Current farming era:<span className="text-yellow-900">⏰</span> 03:59:23
  </div> 
  <div className="bg-zinc-800 text-card-foreground p-2 rounded-xl w-full max-w-md text-center min-h-[40vh] flex flex-col justify-center space-y-4">
    <p className="text-zinc-400 text-muted-foreground">Farming era reward</p>
    <p className="text-4xl font-normal text-primary">
      1.77 <span className="text-golden-moon">LAR</span>
    </p>
  </div>
  <div className="space-y-6 w-full flex items-center flex-col">
    <button className="bg-zinc-800  text-zinc-400 hover:bg-secondary/80 px-6 py-3 rounded-lg w-full max-w-md">
      Claim
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
