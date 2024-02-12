import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import {
  addToOrder,
  clearOrder,
  listCategories,
  listProducts,
  removeFromOrder,
} from '../actions';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Alert } from '@material-ui/lab';
import { useStyles } from '../styles';
import Logo from '../components/Logo';
export default function OrderScreen(props) {
  const styles = useStyles();
  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  const {
    
  loadingProducts,
    error: errorProducts,
  } = state.productList;

  const  products=[{
    category: 'items',
    name: 'Cofee',
    price: 20,
    
    image: '/images/coffee.jpg',
  },{
    category: 'items',
    name: 'Tea',
    price: 15,
    
    image: '/images/tea.jpg',
  },{
    category: 'items',
    name: 'Lemon Tea',
    price: 20,
    
    image: '/images/lemon.jpg',
  },{
    category: 'items',
    name: 'Veg puff',
    price: 25,
    
    image: '/images/veg-puff.jpg',
  },

  {
    category: 'items',
    name: 'Cutlet',
    price: 20,
    
    image: '/images/cutlet.jpg',
  },
  {
    category: 'items',
    name: 'Paneer puff',
    price: 30,
    
    image: '/images/veg-puff.jpg',
  },{
    category: 'items',
    name: 'Veg Roll',
    price: 20,
    
    image: '/images/vegroll.jpeg',
  },{
    category: 'items',
    name: 'Samosa(5pcs)',
    price: 30,
    
    image: '/images/samo.jpeg',
  },{
    category: 'items',
    name: 'Alu samosa',
    price: 25,
    
    image: '/images/samosa.jpeg',
  },
  
  {
    category: 'items',
    name: 'Goli Soda',
    price: 35,
    
    image: '/images/goli.jpeg',
  },{
    category: 'items',
    name: 'Rose Milk',
    price: 40,
    
    image: '/images/rose.jpeg',
  },





  
  {
    category: 'items',
    name: 'Bhadham Milk',
    price: 40,
    
    image: '/images/bhadham.jpeg',
  },{
    category: 'items',
    name: 'Cold Coffee',
    price: 50,
    
    image: '/images/cold.jpeg',
  },{
    category: 'items',
    name: 'Boost Shake',
    price: 40,
    
    image: '/images/boost.jpeg',
  },{
    category: 'items',
    name: 'Choclate Shake',
    price:45,
    
    image: '/images/choc.jpeg',
  },{
    category: 'items',
    name: 'Brownie',
    price: 45,
    
    image: '/images/brown.jpeg',
  },{
    category: 'items',
    name: 'Bun Butter Jam',
    price: 45,
    
    image: '/images/butter.jpeg',
  },  

  {
    category: 'items',
    name: 'Jam Bun',
    price: 25,
    
    image: '/images/jam.jpeg',
  },  

  {
    category: 'items',
    name: 'Cream Bun',
    price: 25,
    
    image: '/images/cream.jpeg',
  },  

  // {
  //   category: 'items',
  //   name: 'Classic Maggie',
  //   price: 35,
    
  //   image: 'images/first.jpeg',
  // },  

  {
    category: 'items',
    name: 'Veg Maggie',
    price: 40,
    
    image: '/images/second.jpeg',
  },  

  {
    category: 'items',
    name: 'Manchorian Maggie',
    price: 45,
    
    image: '/images/third.jpeg',
  },  
 
  {
    category: 'items',
    name: 'Veg Sandwich',
    price: 45,
    
    image: '/images/sand.jpeg',
  },  
 
  {
    category: 'items',
    name: 'Cheese Sandwich',
    price: 45,
    
    image: '/images/cheese.jpeg',
  },  
 
 


  


  

  ]
  
   console.log(products.name)
  const {
    orderItems,
    itemsCount,
    totalPrice,
    taxPrice,
    orderType,
  } = state.order;

  const [categoryName, setCategoryName] = useState('');

  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const closeHandler = () => {
    setIsOpen(false);
  };
  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };
  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };
  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };
  const previewOrderHandler = () => {
    props.history.push(`/review`);
  };
  useEffect(() => {
    if (!categories) {
      listCategories(dispatch);
    } else {
      listProducts(dispatch, categoryName);
    }
  }, [categories, categoryName]);

  const categoryClickHandler = (name) => {
    setCategoryName(name);
    listProducts(dispatch, categoryName);
  };
// Assuming product is an object
const { name, image, calorie, price } = product;

// Use these properties as needed in your component

  return (
    <Box className={styles.root}>
      <Box className={styles.main}>
        <Dialog
          onClose={closeHandler}
          aria-labelledby="max-width-dialog-title"
          open={isOpen}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle className={styles.center}>
            Add {product.name}
          </DialogTitle>
          <Box className={[styles.row, styles.center]}>
            <Button
              variant="contained"
              color="primary"
              disabled={quantity === 1}
              onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
            >
              <RemoveIcon />
            </Button>
            <TextField
              inputProps={{ className: styles.largeInput }}
              InputProps={{
                bar: true,
                inputProps: {
                  className: styles.largeInput,
                },
              }}
              className={styles.largeNumber}
              type="number"
              variant="filled"
              min={1}
              value={quantity}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setQuantity(quantity + 1)}
            >
              <AddIcon />
            </Button>
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={cancelOrRemoveFromOrder}
              variant="contained"
              color="primary"
              size="large"
              className={styles.largeButton}
            >
              {orderItems.find((x) => x.name === product.name)
                ? 'Remove From Order'
                : 'Cancel'}
            </Button>

            <Button
              onClick={addToOrderHandler}
              variant="contained"
              color="primary"
              size="large"
              className={styles.largeButton}
            >
              Add Order
            </Button>
          </Box>
        </Dialog>

        <Grid container>
          <Grid item md={2}>
            <List>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <ListItem button onClick={() => categoryClickHandler('')}>
                    <Logo></Logo>
                  </ListItem>
                  {categories.map((category) => (
                    <ListItem
                      key={category.name}
                      button
                      onClick={() => categoryClickHandler(category.name)}
                    >
                      <Avatar alt={category.name} src={category.image} />
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
            <Typography
              gutterBottom
              className={styles.menu}
              variant="h2"
              component="h2"
            >
              {categoryName || 'Main Menu'}
             
            </Typography>

            <Grid container spacing={1}>

         




       
        
           
           
            {loadingProducts ? (
  <p>Loading products...</p>
) : errorProducts ? (
  <Alert severity="error">{errorProducts}</Alert>
) : (
  console.log('Inside else block:', products),
 -1<= 0 ? (
    console.log('Inside  block:', products),
    products.map((product) => (
      <Slide key={product.name} direction="up" in={true}>
        <Grid item md={6}>
          <Card
            className={styles.card}
            onClick={() => productClickHandler(product)}
          >
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.name}
              image={product.image}
              className={styles.media}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="body2"
                color="textPrimary"
                component="p"
              >
                {product.name}
              </Typography>
              <Box className={styles.cardFooter}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {product.calorie} 
                </Typography>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  component="p"
                >
                  ₹{product.price}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Slide>
  ))
): (
  <p>No products available.</p>
)
)}

            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box>
          <Box className={[styles.bordered, styles.space]}>
            My Order - {orderType} |Total: ₹{totalPrice} |
            Items: {itemsCount}
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={() => {
                clearOrder(dispatch);
                props.history.push(`/`);
              }}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              Cancel Order
            </Button>

            <Button
              onClick={previewOrderHandler}
              variant="contained"
              color="primary"
              disabled={orderItems.length === 0}
              className={styles.largeButton}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
