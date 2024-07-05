import React, { useState, useEffect } from 'react';
import Footer from '../Component/Footer';
import Spinner from '../Animation/Spinner';

const Tasks = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed

    // Cleanup the timeout
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner margin={9} />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-center text-white p-4">
        <h1 className="text-2xl font-bold">Complete the mission, earn the commission!</h1>
        <p className="text-muted-foreground mt-2">But hey, only qualified actions unlock the LAR galaxy! ✨</p>
        <div className="flex justify-center mt-4">
          <button 
            className={`py-2 px-4 rounded-l-full ${isCompleted ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-black'}`}
            onClick={() => setIsCompleted(false)}
          >
            New
          </button>
          <button 
            className={`py-2 px-4 rounded-r-full ${isCompleted ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'}`}
            onClick={() => setIsCompleted(true)}
          >
            Completed
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {isCompleted && (
            <div className="bg-zinc-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Join YouTube</h2>
                <p className="text-primary text-gold-400">10'000 LAR</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="bg-primary text-primary-foreground py-2 px-4 rounded-lg">Go</button>
                <img aria-hidden="true" alt="check-mark" src="https://openui.fly.dev/openui/24x24.svg?text=✔" />
              </div>
            </div>
          )}
          {!isCompleted && (
            <>
              <div className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-semibold">Invite 5 Friends</p>
                  <p className="text-gold-400">15'000 LAR</p>
                </div>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-full">Start</button>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-semibold">Invite 10 Friends</p>
                  <p className="text-gold-400">25'000 LAR</p>
                </div>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-full">Start</button>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-semibold">Invite 20 Friends</p>
                  <p className="text-gold-400">50'000 LAR</p>
                </div>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-full">Start</button>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-semibold">Invite 50 Friends</p>
                  <p className="text-gold-400">200'000 LAR</p>
                </div>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-full">Start</button>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-semibold">Invite 100 Friends</p>
                  <p className="text-gold-400">500'000 LAR</p>
                </div>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-full">Start</button>
              </div>
            </>
          )}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 p-4 flex justify-around">
          {/* Footer content */}
        </div>
        <div className="w-full max-w-md fixed bottom-0 left-0 flex justify-around py-1">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Tasks;
