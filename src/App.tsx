import React from 'react';

// child components
import LetterBars from './components/LetterBars';

// styles
import './app.css';

function App() {
  return (
    <div>
      <h1 className="app-title">Visx Bar Chart</h1>
      <LetterBars width={640} height={800} />
    </div>
  );
}

export default App;
