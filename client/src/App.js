import './App.css';
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import Login from './pages/signup-login/Login';
import Signup from './pages/signup-login/Signup';
import Home from './pages/home/Home';
import CreateBlog from './pages/createBlog/CreateBlog';
import LoginData from './context/LoginData';
import { useState } from 'react';
import BlogDescription from './pages/blogDescription/BlogDescription';
import UpdateBlog from './pages/updateBlog/UpdateBlog';



function PrivateRoute({isAuthenticated, ...props}) {
    return isAuthenticated ?
    <>
        <Outlet />
    </>
    :
    <Navigate replace={true}  to='/login' />
}


function App() {

    const [isAuthenticated, isUserAuthenticated] = useState(false);

    return (
        <LoginData>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path='/login' element={<Login isUserAuthenticated = {isUserAuthenticated} />} />
                        <Route path='/signup' element={<Signup />} />

                        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                            <Route path='/' element={<Home />} />
                        </Route>

                        <Route path='/create-blog' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />}>
                            <Route path='/create-blog' element={<CreateBlog />} />
                        </Route>

                        <Route path='/blog-description/:id' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />}>
                            <Route path='/blog-description/:id' element={<BlogDescription />} />
                        </Route>

                        <Route path='/update-blog/:id' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />}>
                            <Route path='/update-blog/:id' element={<UpdateBlog />} />
                        </Route>

                    </Routes>
                </div>
            </Router>
        </LoginData>
    );
}

export default App;
