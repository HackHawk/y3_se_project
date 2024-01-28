import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
        <footer class="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
  
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
    <div class="col-span-full lg:col-span-1">
      <Link class="flex-none text-xl font-semibold dark:text-white" href="/" aria-label="Brand">Enho Books</Link>
      <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">4 kilo, Below Romina Hotel, Addis Ababa, Ethiopia</p>
    </div>
    

    <div>
      <h4 class="text-lg font-semibold text-gray-900 uppercase dark:text-gray-100">Navigate</h4>
      <div class="mt-3 grid space-y-3 text-lg">
        <p><Link class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" href="/">Home</Link></p>
        <p><Link class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" href="/search">Search Books</Link></p>
      </div>
    </div>
    

    <div>
      <h4 class="text-md font-semibold text-gray-900 uppercase dark:text-gray-100">Legal</h4>
      <div class="mt-3 grid space-y-3 text-lg">
        <p><Link class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" href="#">Privacy Policy</Link></p>
        <p><Link class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" href="#">Terms of Service</Link></p>
      </div>
    </div>
    

    
    <div class="col-span-2 md:col-span-4 lg:col-span-2">
      <h4 class="text-lg font-semibold text-gray-900 uppercase dark:text-gray-100">Follow Us</h4>
      <div class="mt-3 space-x-4">
        <Link class="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" href="https://t.me/yourtelegramchannel" target="_blank" aria-label="Telegram">
          <svg class="flex-shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M81.486,130.178,52.2,120.636s-3.5-1.42-2.373-4.64c.232-.664.7-1.229,2.1-2.2,6.489-4.523,120.106-45.36,120.106-45.36s3.208-1.081,5.1-.362a2.766,2.766,0,0,1,1.885,2.055,9.357,9.357,0,0,1,.254,2.585c-.009.752-.1,1.449-.169,2.542-.692,11.165-21.4,94.493-21.4,94.493s-1.239,4.876-5.678,5.043A8.13,8.13,0,0,1,146.1,172.5c-8.711-7.493-38.819-27.727-45.472-32.177a1.27,1.27,0,0,1-.546-.9c-.093-.469.417-1.05.417-1.05s52.426-46.6,53.821-51.492c.108-.379-.3-.566-.848-.4-3.482,1.281-63.844,39.4-70.506,43.607A3.21,3.21,0,0,1,81.486,130.178Z"/></svg>
        </Link>
        <Link class="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" href="https://www.facebook.com/yourfacebookpage" target="_blank" aria-label="Facebook">
          <svg class="flex-shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.042 4.388 23.094 10.125 24v-8.523H7.078v-3.404h3.047v-2.6c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.236 2.686.236v2.953h-1.513c-1.494 0-1.956.925-1.956 1.874v2.205h3.328l-.532 3.404h-2.796V24C19.612 23.094 24 18.042 24 12.073z"/></svg>
        </Link>
      </div>
    </div>
    
  </div>
  

  <div class="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
    <p class="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">© 2024 Bookstore Name. All rights reserved.</p>
  </div>
</footer>
  )
}

export default Footer