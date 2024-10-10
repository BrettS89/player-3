import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { Library } from '../pages/library'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
};
