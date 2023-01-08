import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/admin/*" element={<PrivateRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
