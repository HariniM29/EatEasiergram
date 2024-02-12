import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button } from '@material-ui/core';

const LoginPage = () => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === 'eateasier') {
      history.push('/admin');
    } else {
      // Handle invalid login
      alert('Invalid password. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Admin Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Secret Code"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    fontWeight: 'bold',
  },
}));

export default LoginPage;
