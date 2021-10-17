import Home from './components/Home';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import FAQ from './components/FAQ';
import Resources from './components/Resources';


function App() {
  return (
    // <Home/>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/faq' component={FAQ} />
        <Route exact path='/resources' component={Resources} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
