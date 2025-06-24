import brevlyLogo from '../assets/Logo.svg'

export function App() {

  return ( 
    <div className="min-h-screen flex flex-col items-center md:items-start md:pl-3">
    {/* Logo */}
    <div className="h-[25px] w-[96px] mb-[25px] mt-8 ">
      <img src={brevlyLogo} alt="Brevly logo" />
    </div>

    {/* Content: Form + List */}
    <div className="w-full flex flex-col md:flex-row gap-3 md:gap-8 px-3 md:px-0">
      {/* Form Area */}
      <div className="w-full md:w-1/3 md:mb-0 bg-gray-100 rounded-lg">
        <form className="bg-white p-4 shadow rounded space-y-4">
          <div>
            <label className="block text-sm font-medium">Link original</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Link encurtado</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Salvar link
          </button>
        </form>
      </div>

      {/* List Area */}
      <div className="w-full md:w-2/3 bg-gray-100 rounded-lg">
        <div className="bg-white p-4 shadow rounded space-y-2">
          <h2 className="text-xl font-semibold mb-2">Meus Links</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
}
  



