import { CopyIcon } from '@phosphor-icons/react';
import brevlyLogo from '../assets/Logo.svg'
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

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
            <Input id='original-link'type="text" label="Link Original" placeholder='link original'
            />
          </div>
          <div>
            <Input id='shortened-link'type="text" label="Link Encurtado"
            
            />
          </div>
          <Button
          >
            Salvar link
          </Button>
          <Button size="secondary">
            <CopyIcon size={16}/>
            Copiar
          </Button>
          <br />
          <Button size="icon" >
            <CopyIcon size={16}/>
          </Button>
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
  



