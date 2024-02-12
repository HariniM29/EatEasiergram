import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  // Common
  root: {
    height: '100vh',
    display: 'flex',
    
    flexDirection: 'column',
  
    backgroundColor: '#fff2bd',
  },
 
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  column: { flexDirection: 'column' },
  main: {
    flex: 1,
    overflow: 'auto',
    flexDirection: 'column',
    display: 'flex',
    color: 'brown',
  },
  navy: {
    backgroundColor: '#BD9168',
    
  },
  green: {
    backgroundColor: '#fff2bd',
  },
  footer: {},
  // choose screen
  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#aa5757',
  },
  // order screen
  red: {
    backgroundColor: '#fff2bd',
    color: 'brown',
  },
  bordered: {
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    borderStyle: 'solid',
  },
  row: {
    display: 'flex',
    padding: 10,
  },
  space: {
    padding: 0,
  },
  around: {
    justifyContent: 'space-around',
  },
  between: {
    justifyContent: 'space-between',
  },
  largeButton: {
    width: 250,
    margin: 2,
    
  },
  largeInput: {
    width: '60px!important',
    padding: '0!important',
    fontSize: '35px!important',
    textAlign: 'center!important',
  },

  logo: {
    height: 100,
  },
  largeLogo: {
    height: 100,
  },
  title: {
    marginTop: 18,
    textAlign:'center',
    
    fontWeight: '500',
  },

  menu:{
    marginTop: '-90px',
   
    marginLeft:'120px',
    fontWeight: '500',
  },
  card: { margin: 20 },
  media: { width: 10 },
  ready: {
    backgroundColor: '#003080',
    color: '#ffffff',
    marginTop: 0,
  },
  processing: {
    backgroundColor: '#404040',
    color: '#ffffff',
    marginTop: 0,
  },
  // Signin/Signup
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
