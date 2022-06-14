import { Suspense } from 'react';
// import { fetchColor } from './api/fetchColor';

import './App.css';
// import colorResource from './resources/colorResource';
import launchResource from './resources/launchResource';
// const resource = fetchColor();
// const resource = colorResource();
const resource = launchResource();

const Launches = () => {
  const launches = resource.read();
  return <pre>{JSON.stringify(launches, null, 2)}</pre>;
};

// const RandomColor = () => {
//   const color = resource.read();
//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <div
//         style={{
//           width: 100,
//           height: 100,
//           marginRight: 16,
//           backgroundColor: color.hex_value,
//         }}
//       ></div>
//       <h1>Color name: {color.color_name}</h1>
//     </div>
//   );
// };

function App() {
  return (
    <div>
      <h1>Launches</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        {/* <RandomColor /> */}
        <Launches />
      </Suspense>
    </div>
  );
}

export default App;
