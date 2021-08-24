import './App.scss';

import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import Opening from "./components/Opening";
import AppFirstPage from './components/AppFirstPage';
import NewText from "./components/AddText";
import AppTyping from "./components/AppTyping";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p><span>Typing</span> master App</p>
      </header>
      <BrowserRouter>
        <Switch>
        <Route exact path ='/' component={Opening}/>
        <Route exact path ='/first/page' component={AppFirstPage}/>
        <Route exact path ='/app/add-text' component={NewText}/>
        <Route exact path ='/app/typing/:text' component={AppTyping}/>
        </Switch>
        </BrowserRouter>
      <footer className="App-footer">
        <p>Created by Marcin Malinowski</p>
      </footer>

    </div>
  );
}

export default App;
