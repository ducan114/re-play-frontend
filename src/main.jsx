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
import TopView from './routes/topview';
import TopLike from './routes/toplike';
import DashbroadRoute from './routes/dashbroad';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<Profile />} />
          <Route path='admin' element={<Admin />} />
          <Route path='dashbroad' element={<DashbroadRoute />} />
          <Route path='films'>
            <Route path='topview' element={<TopView />} />
            <Route path='toplike' element={<TopLike />} />
            <Route path=':slug'>
              <Route index element={<Film />} />
              <Route path=':episodeNumber' element={<Episode />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
