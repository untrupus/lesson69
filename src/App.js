import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Header from "./components/Header";
import Show from "./components/Show/Show";
import {Container} from "@material-ui/core";
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Container >
                        <Route path="/" exact render={() => <h1>Find your favorite show</h1>}/>
                        <Route path="/shows/:id" exact component={Show}/>
                    </Container>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
