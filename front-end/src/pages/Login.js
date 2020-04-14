import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import Eosio from '../services/Eosio';
import { Redirect } from "react-router-dom";
import settings from '../settings';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const mapDispatchToProps = {
  login,
};

function Login(props) {
  const classes = useStyles();

  const [accountName, setAccountName] = useState("jack"); 
  const [pkey, setPkey] = useState(settings.eosio.accounts.jack.pkey);
  const [loggedin, setLoggedin] = useState(false);

  async function onLogin() {
    const account = {
      name: accountName,
      pkey: pkey,
      permission: "active"
    }

    const eosio = new Eosio();
    await eosio.login(account)

    await props.login(eosio);
    await setLoggedin(true);
  }

  async function onChangeAccount(event) {
    setAccountName(event.target.value);
  }

  async function onChangePkey(event) {
    setPkey(event.target.value);
  }

  if (loggedin) {
    return <Redirect to="/" />
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Account name"
              value={accountName}
              onChange={onChangeAccount}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Private key"
              value={pkey}
              onChange={onChangePkey}
              type="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onLogin}
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}


export default connect(null, mapDispatchToProps)(Login);