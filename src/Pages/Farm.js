import React from 'react';
import Footer from '../Component/Footer';

const Farm = () => {
  return (
    <>
      <div className="min-h-screen  bg-zinc-900 text-white flex flex-col items-center p-4 space-y-6">
        <h1 className="text-2xl font-bold">Farm LAR tokens</h1>
        <p className="text-muted-foreground text-center">Level up with token farming!<br />Claim CEXP and keep the farm poppin!</p>
        <div className="bg-zinc-800  text-secondary-foreground px-4 py-2 rounded-lg text-center">
          Current farming era: 03:59:23
        </div>
        <div className="relative bg-zinc-800 text-card-foreground p-10 rounded-xl w-full max-w-md text-center">
          <p className="text-muted-foreground">Farming era reward</p>
          <p className="text-4xl  font-bold text-primary">1.77 <span className="text-primary-foreground">LAR</span></p>
        </div>
        <div className="space-y-6 w-full flex items-center flex-col">
        <button className="bg-zinc-800  text-secondary-foreground hover:bg-secondary/80 px-6 py-2 rounded-lg w-full max-w-md">Claim</button>
       </div> 
       <div className="w-full max-w-md fixed bottom-0 left-0 flex justify-around py-1">
        <Footer />
      </div>
      </div>
    </>
  );
};

export default Farm;
