import React, { useContext, useEffect } from 'react';
import { Store } from '../Store';
import { listOrders } from '../actions';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useStyles } from '../styles';
import { Alert } from '@material-ui/lab';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import ExpiredLogo from '../components/WaitingLogo'; // Import the ExpiredLogo component

export default function AdminScreen(props) {
  const styles = useStyles();

  const { state, dispatch } = useContext(Store);
  const { orders, loading, error } = state.orderList;
  const setOrderStateHandler = async (order, action) => {
    try {
      await Axios.put('/api/orders/' + order._id, {
        action: action,
      });
      listOrders(dispatch);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    listOrders(dispatch);
  }, [dispatch]); // Include dispatch in the dependency array

  return (
    <Box className={[styles.root]}>
      <Helmet>
        <title>Admin Orders</title>
      </Helmet>

      <Box className={[styles.main]}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="Orders">
              <TableHead>
                <TableRow>
                  <TableCell>Order Number</TableCell>
                  <TableCell align="right">Price&nbsp;(₹)</TableCell>
                  <TableCell align="right">Count</TableCell>
                  <TableCell align="right">Items</TableCell>

                  <TableCell align="right">State</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.name}>
                    <TableCell component="th" scope="row">
                      {order.number}
                    </TableCell>
                    <TableCell align="right">{order.totalPrice}</TableCell>
                    <TableCell align="right">
                      {order.orderItems.length}
                    </TableCell>
                    <TableCell align="right">
                      {order.orderItems.map((item) => (
                        <Box key={item.id}>
                          {item.name} x {item.quantity}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {/* Conditionally render based on order state */}
                      {order.isCanceled ? (
                        <ExpiredLogo />
                      ) : (
                        // Render order state normally
                        order.inProgress
                          ? 'In Progress'
                          : order.isReady
                          ? 'Ready'
                          : order.isDelivered
                          ? 'Delivered'
                          : 'Unknown'
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, 'ready')}
                        color="secondary"
                      >
                        Ready
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, 'cancel')}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, 'deliver')}
                      >
                        Deliver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
