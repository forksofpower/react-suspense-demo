import { Suspense } from 'react';
// import { fetchColor } from './api/fetchColor';

import './App.css';
import colorResource from './resources/colorResource';
// const resource = fetchColor();
const resource = colorResource();

const RandomColor = () => {
  const color = resource.read();
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: 100,
          height: 100,
          marginRight: 16,
          backgroundColor: color.hex_value,
        }}
      ></div>
      <h1>Color name: {color.color_name}</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Random Color Generator</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <RandomColor />
      </Suspense>
    </div>
  );
}

export default App;
