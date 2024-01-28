
const page = () => {
  return (
    
<div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  
  <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
        Your Profile
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Manage your name, password and account settings.
      </p>
    </div>

    <form>
      
      <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
        
        <div class="sm:col-span-3">
          <label for="af-account-full-name" class="inline-block text-lg text-gray-800 mt-2.5 dark:text-gray-200">
            Full name
          </label>
        </div>
        

        <div class="sm:col-span-9">
          <div class="sm:flex">
            <input id="af-account-full-name" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px mr-5 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-lg relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Maria" />
            <input type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-lg relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Boone" />
          </div>
        </div>
        

        <div class="sm:col-span-3">
          <label for="af-account-email" class="inline-block text-lg text-gray-800 mt-2.5 dark:text-gray-200">
            Email
          </label>
        </div>
        

        <div class="sm:col-span-9">
          <input id="af-account-email" type="email" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-lg rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="maria@site.com" />
        </div>
        

        <div class="sm:col-span-3">
          <label for="af-account-password" class="inline-block text-lg text-gray-800 mt-2.5 dark:text-gray-200">
            Password
          </label>
        </div>
        

        <div class="sm:col-span-9">
          <div class="space-y-2">
            <input id="af-account-password" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter current password" />
            <input type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter new password" />
          </div>
        </div>
        
        
      </div>
      

      <div class="mt-5 flex justify-end gap-x-2">
        <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-lg font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Cancel
        </button>
        <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Save changes
        </button>
      </div>
    </form>
  </div>

</div>

  )
}

export default page