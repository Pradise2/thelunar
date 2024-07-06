import React from 'react'

const RewardCard = () => {
  return (
    <body>
    <div class="flex items-center justify-center min-h-screen bg-zinc-500 backdrop-blur-2xl">
      <div class="bg-zinc-800 text-white rounded-xl p-6 shadow-lg w-80">
        <div class="flex flex-col items-center">
          <div class="bg-green-500 rounded-full p-2 mb-4">
            <img aria-hidden="true" alt="checkmark" src="https://openui.fly.dev/openui/24x24.svg?text=✔️" />
          </div>
          <h2 class="text-lg font-semibold mb-2">Woo hoo!</h2>
          <p class="text-4xl font-medium text-white mb-2">+56 <span class="text-golden-moon-500">LAR</span></p>
          <p class="text-center text-gray-300 mb-4">Stay shining, keep grinding, in every cloud, find that silver lining. Get more LAR!</p>
          <button class="bg-transparent border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-zinc-500 transition-colors">
            Morrrre!
          </button>
        </div>
      </div>
    </div>
  </body>
  
  
  )
}

export default RewardCard