import './App.css';
import * as apiCalls from './Api/apiCalls'
import { LoginPageOld } from './Pages/LoginPageOld'
import UserSignUpPage from './Pages/UserSignUpPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainHeader from './Components/MainHeader'
import HomePage from './Pages/HomePage'
import OtherPage from './Pages/OtherPage'
import { replace } from 'formik';

function App() {

  const actions = {
    postLogin: apiCalls.login,
    postSignUp: apiCalls.signUp,
  }
  return (
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/other" element={<OtherPage />} />
        <Route path="/login" element={<LoginPageOld actions={actions} />} />
        <Route path="/signup" element={<UserSignUpPage actions={actions} />} />


       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
