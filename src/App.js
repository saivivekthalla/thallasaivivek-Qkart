import Register from "./components/Register";
import Products from "./components/Products"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./components/Login"
import ipConfig from "./ipConfig.json";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout"
import Thanks from "./components/Thanks"

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <Router>
    <div className="App">
      {/* <Login/> */}
      <Switch>
          <Route path="/register">
          <Register />
          </Route>
          <Route path="/login">
          <Login/>
          </Route>
          <Route path="/cart">
          <Cart/>
          </Route>
          <Route path="/checkout">
          <Checkout/>
          </Route>
          <Route path="/thanks">
          <Thanks/>
          </Route>
          <Route path="/">
          <Products/>
          </Route>
          
      </Switch>    
      
    </div>
    </Router>
  );
}

export default App;
