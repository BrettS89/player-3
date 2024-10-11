import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { Library } from '../pages/library'

export const Router = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
      <Routes>
        <Route path='/' element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
};
