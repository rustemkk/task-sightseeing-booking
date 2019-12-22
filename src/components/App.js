import AppBar from '@material-ui/core/AppBar';
import ExploreIcon from '@material-ui/icons/Explore';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import TourPickerForm from 'forms/TourPickerForm';


const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(4, 0, 4),
  },
}));

const App = () => {

  const s = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ExploreIcon className={s.icon} />
          <Typography variant="h6" color="inherit" noWrap>Tour Booking App</Typography>
        </Toolbar>
      </AppBar>
      <div className={s.content}>
        <TourPickerForm />
      </div>
    </>
  );
};

export default App;