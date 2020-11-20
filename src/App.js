import React, {useState} from 'react';
import { Switch, Route, useHistory } from "react-router-dom"
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"
import makeStyles from "@material-ui/core/styles/makeStyles"
import './App.css';

import Landing from './Components/Landing/Landing.js'
import Bake from './Components/Bake/Bake.js'
import Shop from './Components/Shop/Shop.js'
import Buy from './Components/Buy/Buy.js'

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}))

function App() {
  const classes = useStyles()
  const history = useHistory()

  const sendTo = (location) => {
    console.log(location)
    history.push(location)
  }

  const [showBakeModal, setShowBakeModal] = useState(true);
  const closeBakeModal =()=>{setShowBakeModal(false)};

  return (
    <>
      <AppBar style={{backgroundColor: '#ffc107'}} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={() => sendTo("/")}>
              Cookie Jar
            </Button>
          </Typography>
          <Button color="inherit" onClick={() => sendTo("/bake")}>
            Bake
          </Button>
          <Button color="inherit" onClick={() => sendTo("/shop")}>
            Shop
          </Button>
          <Button color="inherit" onClick={() => sendTo("/buy")}>
            Buy
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/bake">
          <Bake showBakeModal={showBakeModal} closeBakeModal={closeBakeModal}/>
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
    </>
  );
}

export default App;
