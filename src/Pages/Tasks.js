import React from 'react'
import Footer from '../Component/Footer'

const Tasks = () => {
  return (
    <>
    <div class="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-center text-white p-4">
  <h1 class="text-2xl font-bold">Complete the mission, earn the commission!</h1>
  <p class="text-muted-foreground mt-2">But hey, only qualified actions unlock the CEXP galaxy! ✨</p>
  <div class="flex justify-center mt-4">
    <button class="bg-white text-black py-2 px-4 rounded-l-full">New</button>
    <button class="bg-zinc-800 text-zinc-400 py-2 px-4 rounded-r-full">Completed</button>
  </div>
  <div class="mt-6 space-y-4">
    <div class="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
      <div>
        <p class="font-semibold">Invite 5 Friends</p>
        <p class="text-blue-400">15'000 CEXP</p>
      </div>
      <button class="bg-blue-600 text-white py-2 px-4 rounded-full">Start</button>
    </div>
    <div class="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
      <div>
        <p class="font-semibold">Invite 10 Friends</p>
        <p class="text-blue-400">25'000 CEXP</p>
      </div>
      <button class="bg-blue-600 text-white py-2 px-4 rounded-full">Start</button>
    </div>
    <div class="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
      <div>
        <p class="font-semibold">Invite 20 Friends</p>
        <p class="text-blue-400">50'000 CEXP</p>
      </div>
      <button class="bg-blue-600 text-white py-2 px-4 rounded-full">Start</button>
    </div>
    <div class="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
      <div>
        <p class="font-semibold">Invite 50 Friends</p>
        <p class="text-blue-400">200'000 CEXP</p>
      </div>
      <button class="bg-blue-600 text-white py-2 px-4 rounded-full">Start</button>
    </div>
    <div class="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
      <div>
        <p class="font-semibold">Invite 100 Friends</p>
        <p class="text-blue-400">500'000 CEXP</p>
      </div>
      <button class="bg-blue-600 text-white py-2 px-4 rounded-full">Start</button>
    </div>
  </div>
  <div class="fixed bottom-0 left-0 right-0 bg-zinc-900 p-4 flex justify-around">
</div>
    </div>
    <div className="w-full max-w-md fixed bottom-0 left-0 flex justify-around py-1">
    <Footer />
  </div>
    </>
  )
}

export default Tasks