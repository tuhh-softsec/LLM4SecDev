import React from 'react';
import './App.css';
import Chip from './widgets/chips';
import Searchbar from './widgets/searchbar';

function App() {
  return (
    <div className="App">
      <div>
        <div className='title has-text-centered text-xl'>LLM4SEC (Name in progress)</div>
      </div>
      <div className='w-9/12 m-auto'>
        <Searchbar />
        <div className='rounded border-slate-200 border-2 p-2'>
          <div className='text-left my-2'>
            Select the tasks the LLM needs to perform:
          </div>
          <div className='flex flex-wrap gap-2'>
            <Chip text='Vulnerbility Prediction' />
            <Chip text='Vulnerbility Repair' />
            <Chip text='Secure Code Generation' />

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
