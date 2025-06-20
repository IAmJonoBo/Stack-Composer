import type React from 'react';

const Settings: React.FC = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <div className="bg-gray-100 rounded p-4">
      <p className="text-gray-700">
        No account required. <br />
        Cloud sync coming soon.
      </p>
    </div>
  </div>
);

export default Settings;
