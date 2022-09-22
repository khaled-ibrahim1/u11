import Product from "./Pages/Product";
import Home from "./Pages/Home";
import Success from "./Pages/reactStripe.js/Success";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import UserList from "./components/UserList";
import CreateUser from "./AdminPages/CreateUser";
import User from "./AdminPages/User";
import AdminLogin from "./AdminPages/adminLogin";
import NavBarAdmin from "./components/NavbarAdmin";
import { useSelector } from "react-redux";



import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from "react-router-dom";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const admin = useSelector((state) => state.user?.currentUser?.isAdmin);

  return (
    <Router>
      <Switch>
      <Route path="/login">{user ? <Redirect to="/" /> :
            <Login />}
          </Route>
        <Route exact path="/">
          <Home />
        </Route>
        
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/success">
          <Success />
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>
      
        <Route path="/register">
         <Register /> 
        </Route>
        <Route path="/adminlogin">{admin ? <Redirect to="/adminpage" /> :
            <AdminLogin/>}
          </Route>

        {admin && (
          <>
        <Route path="/adminpage">
          <NavBarAdmin/> 
         <UserList /> 
        </Route>
        <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/CreateNewUser">
                <CreateUser />
              </Route>
              </>
        )}
      </Switch>
    </Router>
  );
};
export default App;
