import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import Logo from '../components/Logo';
import { Store } from '../Store';
import { Alert } from '@material-ui/lab';
import { createOrder } from '../actions';
import './OrderDetails.css'; 

export default function CompleteOrderScreen(props) {
  const styles = useStyles();
  const { state, dispatch } = useContext(Store);
  const { order } = state;
  const { loading, error, newOrder, number, bill } = state.orderCreate;
  const [foodReceived, setFoodReceived] = useState(false); // State flag for food received

  const handleGotFood = () => {
    // Update state to indicate that food has been received
    setFoodReceived(true);
    // Additional logic for handling food received can be added here
  };

  useEffect(() => {
    if (order.orderItems.length > 0) {
      console.log('yUVARAJ FROM cOMPLETE SCREEN',order)
      createOrder(dispatch, order);
    }
  }, [order]);

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          <Logo large></Logo>
          {loading ? (
            <CircularProgress></CircularProgress>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h3"
                component="h3"
              >
                Your order has been placed
              </Typography>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h1"
                component="h1"
              >
                Thank you!
              </Typography>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h3"
                component="h3"
              >
                Your order number is {number}
              </Typography>
              {/* Table integration */}
              <div className={`order-details-container ${foodReceived ? 'black-white' : ''}`}>
                <h2>Order Details</h2>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          {/* Conditionally render the image if food is received */}
                          {foodReceived && (
                            <img
                              src="https://www.onlygfx.com/wp-content/uploads/2020/05/expired-stamp-3.png"
                              alt="Expired"
                              style={{ width: '50px', height: 'auto' }}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* End of Table integration */}
            </>
          )}
        </Box>
      </Box>
      
      <Box className={[styles.center, styles.space]}>
        <Button
          onClick={handleGotFood}
          variant="contained"
          color="primary"
          className={styles.largeButton}
        >
          I Got my food
        </Button>
      </Box>
    </Box>
  );
}
