import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { palette } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import { MdShoppingCart, MdArrowBack, MdArrowForward, MdArrowDownward } from "react-icons/md";
import { GiHouse } from "react-icons/gi";
import { FaCar, FaRegMoneyBillAlt, FaVoteYea, FaChevronRight } from "react-icons/fa";

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
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timeframeMenu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '35px',
        marginBottom: '35px',
        borderBottom: '1px solid #000',
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px',
        border: '6px solid #90caf8',
        width: '100px',
        height: '100px',
        color: '#fff'
    },
    unselectedTimeframe: {
        color: '#f48fb1',
        fontWeight: '600',
        fontSize: '24px',
    },
        selectedTimeframe: {
        color: '#90caf8',
        fontWeight: '600',
        fontSize: '32px',
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
    },
    transaction: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20px'
    },
    transactionDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: '3px solid #f48fb1',
        height: '60px',
        alignItems: 'center'
    },
    transactionSelfDirection: {
        color: '#90caf8',
        marginRight: '10px'
    },
    transactionLeftDirection: {
        color: '#ff9800',
        marginRight: '10px'
    },
    transactionRightDirection: {
        color: '#4aa74e',
        marginRight: '10px'
    },
    transactionDate: {
        color: '#fff',
        fontWeight: '600',
        fontSize: '16px',
        flex: '1',
    },
    transactionAccount: {
        color: '#247dc1',
        fontWeight: '600',
        fontSize: '16px',
        flex: '1'
    },
    transactionData: {
        color: '#fff',
        fontWeight: '500',
        fontSize: '16px',
        flex: '1',
    },
    transactionType: {
        color: '#fff',
        fontWeight: '600',
        fontSize: '16px',
        flex: '1'
    },
    transactionChevronRightContainer: {
        color: '#247dc1',
        width: '20px'
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
                <Container className={classes.menu}>
                    <Box className={classes.menuItem}>
                        <Typography>
                            Shopping
                        </Typography>
                        <MdShoppingCart size={26} style={{ marginTop: '8px' }} />
                    </Box>
                    <Box className={classes.menuItem}>
                        <Typography>
                            Loan
                        </Typography>
                        <GiHouse size={26} style={{ marginTop: '8px' }} />
                    </Box>
                    <Box className={classes.menuItem}>
                        <Typography>
                            Car
                        </Typography>
                        <FaCar size={26} style={{ marginTop: '8px' }} />
                    </Box>
                    <Box className={classes.menuItem}>
                        <Typography>
                            Salary
                        </Typography>
                        <FaRegMoneyBillAlt size={26} style={{ marginTop: '8px' }} />
                    </Box>
                    <Box className={classes.menuItem}>
                        <Typography>
                            Votes
                        </Typography>
                        <FaVoteYea size={26} style={{ marginTop: '8px' }} />
                    </Box>
                </Container>
                <Container className={classes.timeframeMenu} >
                    <Typography className={classes.unselectedTimeframe}>
                        April
                    </Typography>
                    <Typography className={classes.selectedTimeframe}>
                        This month
                    </Typography>
                    <Typography className={classes.unselectedTimeframe}>
                        All
                    </Typography>
                </Container>
                <Container className={classes.transaction}>
                    <Typography className={classes.transactionLeftDirection}> <MdArrowBack size={24} /> </Typography>
                    <Container className={classes.transactionDetails}>
                        <Typography className={classes.transactionDate}>
                            26/03/2020
                        </Typography>
                        <Typography className={classes.transactionAccount}>
                            @Adidas store
                        </Typography>
                        <Typography className={classes.transactionData}>
                            80$
                        </Typography>
                        <Typography className={classes.transactionType}>
                            payment
                        </Typography>
                        <div className={classes.transactionChevronRightContainer}>
                            <FaChevronRight  />
                        </div>
                    </Container>
                </Container>
                <Container className={classes.transaction}>
                    <Typography className={classes.transactionRightDirection}> <MdArrowForward size={24} /> </Typography>
                    <Container className={classes.transactionDetails}>
                        <Typography className={classes.transactionDate}>
                            26/03/2020
                        </Typography>
                        <Typography className={classes.transactionAccount}>
                            @Adidas store
                        </Typography>
                        <Typography className={classes.transactionData}>
                            80$
                        </Typography>
                        <Typography className={classes.transactionType}>
                            payment
                        </Typography>
                        <div className={classes.transactionChevronRightContainer}>
                            <FaChevronRight  />
                        </div>
                    </Container>
                </Container>
                <Container className={classes.transaction}>
                    <Typography className={classes.transactionSelfDirection}> <MdArrowDownward size={24} /> </Typography>
                    <Container className={classes.transactionDetails}>
                        <Typography className={classes.transactionDate}>
                            26/03/2020
                        </Typography>
                        <Typography className={classes.transactionAccount}>
                            @Adidas store
                        </Typography>
                        <Typography className={classes.transactionData}>
                            80$
                        </Typography>
                        <Typography className={classes.transactionType}>
                            payment
                        </Typography>
                        <div className={classes.transactionChevronRightContainer}>
                            <FaChevronRight  />
                        </div>
                    </Container>
                </Container>
            </Container>
        </Grid>
    )
}

export default PeopleViewTransactions;