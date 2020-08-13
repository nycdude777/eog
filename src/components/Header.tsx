import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Weather from '../Features/Weather/Weather';

import { useAppStyles } from '../appStyles';

export default () => {

  const styles = useAppStyles();

  const name = "Rick's";

  

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={styles.classify('grow')} >
          {name} EOG React Visualization Assessment
        </Typography>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};
