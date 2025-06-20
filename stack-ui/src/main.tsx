// Entry point for Stack Composer UI
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Wizard from './pages/Wizard';
import Settings from './pages/Settings';

const App = () => (
  <div className="min-h-screen bg-white">
    <Wizard />
    <Settings />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
