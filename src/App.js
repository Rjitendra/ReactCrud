import React from "react";
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { Nav } from "./component/nav/nav";
import { Home } from "./component/home/home";
import { Users } from "./component/user/user";



export default function App() {
  const { pathname } = useLocation();  
  return (
    <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
 );
}