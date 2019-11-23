import React from 'react';
import StopWatch from './components/StopWatch'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

function App() {
  const classes = useStyles()
  return (
    <div className="App" className={classes.app}>
      <StopWatch />
    </div>
  );
}

export default App;
