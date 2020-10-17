import React from 'react';

// child components
import LetterBars from './components/LetterBars';

// styles
import './app.css';

function App() {
  return (
    <div>
      <h1 className="app-title">Visx Bar Chart (not yet responsive) </h1>
      {/* great d3-style props: width, height for svg  */}
      <LetterBars width={320} height={400} />
    </div>
  );
}

export default App;
