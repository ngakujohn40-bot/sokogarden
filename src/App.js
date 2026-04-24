import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Signup from './components/Signup';
import Signin from './components/Signin';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Addproduct from './components/Addproduct';






function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <header className="App-header">
        <h1 className='text-'>Sokogarden - Buy & Sell Online</h1>
      </header>

      {/* navigation links */}
      <nav className='m-4 bg-'>
        <Link to="/" className='btn btn-primary mx-2'>Home</Link> | 
        <Link to="/addproduct" className='btn btn-secondary mx-2'>Addproduct</Link> |
        <Link to="/signup" className='btn btn-warning mx-2'>Sign Up</Link> |
        <Link to="/signin" className='btn btn-danger mx-2'>Sign In</Link> 
        
      </nav>

      {/* Routes section */}
      <Routes>
        {/* home page default page load when app opens */}
        <Route path='/' element={<Getproducts />}/>
        <Route path='/addproduct' element={<Addproduct />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/makepayment' element={<Makepayment />} />
        

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
