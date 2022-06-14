import { Suspense, lazy } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  NavLink,
} from 'react-router-dom';

import './App.css';

// Lazy Loaded Page Components
const HomePage = lazy(() => import('./pages/home'));
const RandomColorPage = lazy(() => import('./pages/random-color'));
const LaunchesPage = lazy(() => import('./pages/launches'));

function NavList() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="random-color">Random Color</NavLink>
        </li>
        <li>
          <NavLink to="launches">Launches</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <>
      <Router>
        <NavList />
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/random-color" element={<RandomColorPage />} />
            <Route path="/launches" element={<LaunchesPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
