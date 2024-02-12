import React, { useContext } from 'react';
import { Box, Button, Fade, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Store } from '../Store';
import { setOrderType } from '../actions';
import { useStyles } from '../styles';
import Logo from '../components/Logo';

export default function HomeScreen() {
  const { dispatch } = useContext(Store);
  const styles = useStyles();
  const history = useHistory();

  const chooseHandler = (orderType) => {
    setOrderType(dispatch, orderType);
    history.push('/login');
  };

  const chooseHandlerAdmin = () => {
    setOrderType(dispatch, 'admin');
    history.push('/adminlogin');
  };

  const typographyStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // White color
  };

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navy]}>
        <Box className={[styles.main, styles.center]}>
          <Logo large />
          <Typography
            className={styles.center}
            gutterBottom
            variant="h3"
            component="h3"
            style={{ fontSize: '2rem', textAlign: 'center' }}
          />
          <Box className={styles.cards}>
            <Button
              className={[styles.card, styles.space, styles.button]}
              variant="contained"
              color="primary" // Change color to primary
              onClick={chooseHandlerAdmin}
              style={{ width: '200px', padding: '10px', transition: 'background-color 0.3s ease', backgroundColor: '#800000' }} // Add fixed width, hover effect, and maroon color
            >
              <Typography variant="h3" component="p" style={typographyStyles}>
                Admin
              </Typography>
            </Button>
            <Button
              className={[styles.card, styles.space, styles.button]}
              variant="contained"
              color="primary"
              onClick={() => chooseHandler('Take out')}
              style={{ width: '200px', padding: '10px', transition: 'background-color 0.3s ease', backgroundColor: '#800000' }} // Add fixed width, hover effect, and maroon color
            >
              <Typography variant="h3" component="p" style={{ ...typographyStyles }}>
                User
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
