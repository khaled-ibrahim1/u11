import Success from "./Success";  
import Pay from "./Pay";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/pay">
                    <Pay/>
                </Route>
                <Route path="/pay">
                    <Success/>
                </Route>
            </Switch>
        </Router>  
    );
};