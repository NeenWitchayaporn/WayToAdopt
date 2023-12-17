import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";import './App.css';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Adoption from './pages/Adoption';
import AdoptionQuestion from './pages/AdoptionQuestion';
import AllPost from './pages/AllPost';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import PostResult from './pages/PostResult';
import ViewAnswer from './pages/ViewAnswer';
import ConfirmSuccess from './pages/ConfirmSuccess';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';
import Introduction from './pages/Introduction';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdopterContact from './pages/AdopterContact';


const Layout = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('');

  // Define an array of paths where NavBar should not be displayed
  const excludedPaths = ['/', '/Introduction', '/Register', '/Login'];

  // Get the current location
  const location = useLocation();

  useEffect(() => {
    // Update the current path when location changes
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  // Check if the current path is not in the excluded paths array
  const showNavBar = !excludedPaths.includes(currentPath);

  return (
    <div>
      {showNavBar && <Navbar />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
              <Route path="/Introduction" exact element={<Introduction/>} />
              <Route path="/Register" exact element={<Register />} />
              <Route path="/Login" exact element={<Login />} />
              <Route path="/Profile" exact element={<Profile />} />
              <Route path='/' exact element={<Introduction/>}/>
              <Route path='/Home' exact element={<Home/>}/>
              <Route path='/Search' exact element={<Search/>}/>
              <Route path='/SearchResult' exact element={<SearchResult/>}/>
              <Route path='/Adoption' exact element={<Adoption/>}/>
              <Route path='/Adoption/Question' exact element={<AdoptionQuestion/>}/>
              <Route path='/AllPost' exact element={<AllPost/>}/>
              <Route path='/CreatePost' exact element={<CreatePost/>}/>
              <Route path='/PostDetail' exact element={<PostDetail/>}/>
              <Route path='/PostResult' exact element={<PostResult/>}/>
              <Route path='/ViewAnswer' exact element={<ViewAnswer/>}/>
              <Route path='/ConfirmSuccess/:title' exact element={<ConfirmSuccess/>}/>
              <Route path="/AdopterContact" exact element={<AdopterContact/>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
