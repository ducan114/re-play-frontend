import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './routes/home';
import Login from './routes/login';
import NotFound from './components/NotFound';
import Profile from './routes/profile';
import Admin from './routes/admin';
import Film from './routes/film';
import Episode from './routes/episode';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/films/:slug' element={<Film />} />
          <Route path='/films/:slug/:episodeNumber' element={<Episode />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
