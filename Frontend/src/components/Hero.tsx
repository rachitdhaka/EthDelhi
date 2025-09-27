import { ChevronDownIcon } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Hero() {
  return <div className="py-32 flex flex-col items-center text-center">
      <h1 className="text-5xl md:text-7xl font-semibold max-w-4xl mx-auto leading-tight">
        Unleash the power of <br />
        RWA using OsamaBoom
      </h1>

      <div className="mt-12 flex flex-col items-center space-y-8">
        <ConnectButton />
        <div className="flex flex-col items-center cursor-pointer group">
          <span className="text-sm text-gray-400 group-hover:text-white transition">
            Learn more
          </span>
          <ChevronDownIcon className="h-5 w-5 mt-2 text-gray-400 group-hover:text-white transition animate-bounce" />
        </div>
      </div>
    </div>;
}
