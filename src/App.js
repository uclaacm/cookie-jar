import React from 'react';
import { Switch, Route, useHistory } from "react-router-dom"
import { AppBar, Button, Toolbar } from "@material-ui/core"
import makeStyles from "@material-ui/core/styles/makeStyles"
import './App.css';
import './App.sass';

import Landing from './Components/Landing/Landing.js'
import Bake from './Components/Bake/Bake.js'
import Shop from './Components/Shop/Shop.js'
import Buy from './Components/Buy/Buy.js'

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    fontSize: '2rem',
  },
  home: {
    fontWeight: 'bold',
  },
  page: {
    fontSize: '2rem',
  }
}))

function App() {
  const classes = useStyles()
  const history = useHistory()

  const sendTo = (location) => {
    console.log(location)
    history.push(location)
  }

  return (
    <>
      <AppBar style={{backgroundColor: '#ffc107'}} position="fixed">
      {/* <AppBar style={{backgroundImage: 'url(./navbar.png)', backgroundColor: '#ffc107'}} position="fixed"> */}
        <Toolbar>
          <div className={classes.title}> 
            <Button color="inherit" className="is-family-primary" onClick={() => sendTo("/")}>
              Cookie Jar
            </Button>
          </div>
          <Button color="inherit" className="is-family-primary" onClick={() => sendTo("/bake")}>
            Bake
          </Button>
          
          <Button color="inherit" className="is-family-primary" onClick={() => sendTo("/shop")}>
            Shop
          </Button>
          <Button color="inherit" className="is-family-primary" onClick={() => sendTo("/buy")}>
            Buy
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/bake">
          <Bake />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/buy">
          <Buy />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <div className="is-size-5 is-family-primary">Made with ❤️ by <a href='https://teachla.uclaacm.com/'>acm.teachla</a> &copy; 2021 + graphics from Creative Commons and <a href="ttps://www.svgrepo.com/">svgrepo.com</a></div>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
