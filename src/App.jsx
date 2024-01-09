
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Auth from './Pages/Auth/index';
import Signup from './Pages/Auth/Signup';
import ExpenseTracker from './Pages/ExpenseTracker';
import { ToastContainer } from 'react-toastify';
import Contact from './Pages/Contact/Contact';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
 <Routes>
  <Route path = "/" exact element = {<ExpenseTracker/>} ></Route>
  <Route path = "/login" exact element = {<Auth/>} ></Route>
  <Route path = "/signup" exact element = {<Signup/>} ></Route>
  <Route path = "/contact" exact element = {<Contact/>} ></Route>
  
 </Routes>
 <ToastContainer toastStyle={{ backgroundColor: "grey" }} />
    </BrowserRouter>
  );
}

export default App;
