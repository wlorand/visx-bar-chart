import React from 'react';

// child components
import LetterBars from './components/LetterBars';

// styles
import './app.css';

function App() {
  return (
    <div>
      <h1 className="app-title">Visx Bar Chart Take One</h1>
      {/* d3-style props: width, height for svg  */}
      <LetterBars width={640} height={480} />
    </div>
  );
}

export default App;
