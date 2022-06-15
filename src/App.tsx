import { Suspense, lazy } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  NavLink,
} from 'react-router-dom';

import './App.css';

// Static Import HomePage
import HomePage from './pages/home';

// Lazy Load Pages
const RandomColorPage = lazy(() => import('./pages/random-color'));
const LaunchesPage = lazy(() => import('./pages/launches'));
const OhCrapPage = lazy(() => import('./pages/oh-crap'));

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
        <li>
          <NavLink to="oh-crap">Oh, Crap!</NavLink>
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
            <Route path="/oh-crap" element={<OhCrapPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
