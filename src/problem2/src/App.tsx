import './App.css';

import * as React from 'react';
import { CurrencySwapper } from '@components/Form/CurrencySwapper';

const App: React.FC = () => {

  return (
    <div className="h-screen relative bg-gradient-to-r from-[#040e43] to-[#0a146e] pt-[96px] md:pt-8">
      <div className="m-auto grid max-w-[1024px] gap-6 px-4 md:mt-24 md:gap-12 md:px-10">
        <CurrencySwapper />
      </div>
    </div>
  );
};

export default App;