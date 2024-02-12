import React, { useContext } from 'react';
import {
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { useStyles } from '../styles';
import Logo from '../components/Logo';
import { setPaymentType } from '../actions';
import { Store } from '../Store';

export default function HomeScreen(props) {
  const { dispatch } = useContext(Store);
  const styles = useStyles();

  const selectHandler = (paymentType) => {
    setPaymentType(dispatch, paymentType);
    if (paymentType === 'Pay here') {
      props.history.push('/payment');
    } else {
      props.history.push('/complete');
    }
  };

  const buttonStyles = {
    backgroundColor: '#a52a2a', // Lighter shade of maroon
    color: '#fff',
    padding: '8px 20px', // Smaller padding
    margin: '10px', // Add some margin
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    fontSize: '1.2rem', // Smaller font size
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };

  return (
    <Box className={[styles.root, styles.navy]} display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box className={[styles.main, styles.center]}>
        <Logo large />
        <Typography
          className={styles.center}
          gutterBottom
          variant="h3"
          component="h3"
        >
          Select payment type
        </Typography>
        <Box className={styles.cards} display="flex" justifyContent="center">
          <Button
            variant="contained"
            style={buttonStyles}
            onClick={() => selectHandler('Pay here')}
          >
            PayNow
          </Button>
          {/* Add some gap */}
          <Box m={2}></Box>
          <Button
            variant="contained"
            style={buttonStyles}
            onClick={() => selectHandler('At counter')}
          >
            Counter
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
