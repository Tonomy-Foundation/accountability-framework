import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { palette } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: '#3e3e3e',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      flexDirection: 'column'
    },
    categoriesSearchContainer: {
      display: 'flex',
      alignSelf: 'flex-start',
      alignItems: 'center'
    },
    menuItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '15px',
      backgroundColor: '#90caf8',
      width: '120px',
      height: '120px'
    },
    accountTransactionsTitle: {
      fontFamily: 'Verdana',
      color: '#5683a6',
      fontWeight: '600',
      fontSize: '24px',
      marginBottom: '10px'
    },
    categoriesLabel: {
      color: '#5683a6',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '20px',
      marginRight: '30px',
      fontWeight: '600'
    },
    categoriesSearchField: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      color: '#fff'
    },
    categoriesInputField: {
      color: '#fff'
    }
}));

function PeopleViewTransactions(props) {
    const classes = useStyles();

    return (
        <Grid className={classes.container} item xs>
            <Container className={classes.container} justify="center">
                <Typography component="p" className={classes.accountTransactionsTitle}>
                    Account Transactions
                </Typography>
                <Container component="p" className={classes.categoriesSearchContainer}>
                    <Typography component="p" className={classes.categoriesLabel}>
                        Categories 
                    </Typography>
                    <TextField color="secondary" label="search" component="div" InputProps={{ className: classes.categoriesInputField }} className={classes.categoriesSearchField} />
                </Container>
            </Container>
        </Grid>
    )
}

export default PeopleViewTransactions;