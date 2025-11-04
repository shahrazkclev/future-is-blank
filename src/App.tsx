import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#121212',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>CleverPoly Scriptor</h1>
      <p>Your app is ready!</p>
      <button 
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          border: 'none',
          background: '#646cff',
          color: 'white',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Count: {count}
      </button>
      <p style={{ marginTop: '40px', opacity: 0.7 }}>
        ✓ GitHub connected<br />
        ✓ Cursor ready<br />
        ✓ package.json unlocked
      </p>
    </div>
  );
}

export default App;
