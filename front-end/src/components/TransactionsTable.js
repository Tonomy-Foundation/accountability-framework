import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MdShoppingCart, MdArrowBack, MdArrowForward } from "react-icons/md";
import { GiHouse } from "react-icons/gi";
import {
  FaCar,
  FaRegMoneyBillAlt,
  FaVoteYea,
  FaChevronRight,
} from "react-icons/fa";
import Sync from "@material-ui/icons/Sync";
import { useHistory } from "react-router-dom";
import settings from "../settings";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#3e3e3e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
  },
  categoriesSearchContainer: {
    display: "flex",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeframeMenu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "35px",
    marginBottom: "35px",
    borderBottom: "1px solid #000",
  },
  menuItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "30px",
    border: "6px solid #90caf8",
    width: "100px",
    height: "100px",
    color: "#fff",
  },
  unselectedTimeframe: {
    color: "#f48fb1",
    fontWeight: "600",
    fontSize: "24px",
  },
  selectedTimeframe: {
    color: "#90caf8",
    fontWeight: "600",
    fontSize: "32px",
  },
  accountTransactionsTitle: {
    fontFamily: "Verdana",
    color: "#5683a6",
    fontWeight: "600",
    fontSize: "24px",
    marginBottom: "10px",
  },
  categoriesLabel: {
    color: "#5683a6",
    height: "50px",
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    marginRight: "30px",
    fontWeight: "600",
  },
  categoriesSearchField: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    color: "#fff",
  },
  categoriesInputField: {
    color: "#fff",
  },
  transaction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
  },
  transactionDetailsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "60px",
    alignItems: "center",
    marginLeft: "30px",
    marginRight: "150px",
  },
  transactionDetailsHeaderLabel: {
    display: "flex",
    justifyContent: "center",
    color: "#90caf8",
    fontWeight: "600",
    fontSize: "16px",
  },
  transactionDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "3px solid #f48fb1",
    height: "60px",
    alignItems: "center",
  },
  transactionSelfDirection: {
    color: "#90caf8",
    marginRight: "10px",
  },
  transactionLeftDirection: {
    color: "#ff9800",
    marginRight: "10px",
  },
  transactionRightDirection: {
    color: "#4aa74e",
    marginRight: "10px",
  },
  transactionDate: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    flex: "1",
  },
  transactionAccount: {
    color: "#247dc1",
    fontWeight: "600",
    fontSize: "16px",
    flex: "1",
    cursor: "pointer",
  },
  transactionData: {
    color: "#fff",
    fontWeight: "500",
    fontSize: "16px",
    flex: "1",
  },
  transactionType: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    flex: "1",
  },
  transactionChevronRightContainer: {
    color: "#247dc1",
    width: "20px",
    cursor: "pointer",
  },
}));

function TransactionsTable(props) {
  const classes = useStyles();

  const history = useHistory();

  const routeToAccount = function(name) {
    history.push("/people/" + name);
  }
  return (
    <Grid className={classes.container} item xs>
      <Container className={classes.container} justify="center">
        <Typography component="h2" className={classes.accountTransactionsTitle}>
          Account Transactions
        </Typography>
        {/* <Container
          component="div"
          className={classes.categoriesSearchContainer}
        >
          <Typography component="p" className={classes.categoriesLabel}>
            Categories
          </Typography>
          <TextField
            color="secondary"
            label="search"
            component="div"
            InputProps={{ className: classes.categoriesInputField }}
            className={classes.categoriesSearchField}
          />
        </Container> */}
        {/* <Container className={classes.menu}>
          <Box className={classes.menuItem}>
            <Typography>Shopping</Typography>
            <MdShoppingCart size={26} style={{ marginTop: "8px" }} />
          </Box>
          <Box className={classes.menuItem}>
            <Typography>Loan</Typography>
            <GiHouse size={26} style={{ marginTop: "8px" }} />
          </Box>
          <Box className={classes.menuItem}>
            <Typography>Car</Typography>
            <FaCar size={26} style={{ marginTop: "8px" }} />
          </Box>
          <Box className={classes.menuItem}>
            <Typography>Salary</Typography>
            <FaRegMoneyBillAlt size={26} style={{ marginTop: "8px" }} />
          </Box>
          <Box className={classes.menuItem}>
            <Typography>Votes</Typography>
            <FaVoteYea size={26} style={{ marginTop: "8px" }} />
          </Box>
        </Container> */}
        {/* <Container className={classes.timeframeMenu}>
          <Typography className={classes.unselectedTimeframe}>April</Typography>
          <Typography className={classes.selectedTimeframe}>
            This month
          </Typography>
          <Typography className={classes.unselectedTimeframe}>All</Typography>
        </Container> */}
        <Container className={classes.transaction}>
          <Container className={classes.transactionDetailsHeader}>
            <Typography className={classes.transactionDetailsHeaderLabel}>
              time
            </Typography>
            <Typography className={classes.transactionDetailsHeaderLabel}>
              account
            </Typography>
            <Typography className={classes.transactionDetailsHeaderLabel}>
              data
            </Typography>
            <Typography className={classes.transactionDetailsHeaderLabel}>
              type
            </Typography>
            {props.org && (
              <Typography className={classes.transactionDetailsHeaderLabel}>
                authorised by
              </Typography>
            )}
          </Container>
        </Container>
        {props.transactions.map((data) => (
          <Container
            key={`${data.tx_id}${data.type}`}
            className={classes.transaction}
          >
            {data.direction === "inbound" && (
              <Typography className={classes.transactionRightDirection}>
                {" "}
                <MdArrowForward size={24} />{" "}
              </Typography>
            )}

            {data.direction === "outbound" && (
              <Typography className={classes.transactionLeftDirection}>
                {" "}
                <MdArrowBack size={24} />{" "}
              </Typography>
            )}

            {data.direction === "self" && (
              <Typography className={classes.transactionSelfDirection}>
                {" "}
                <Sync size={24} />{" "}
              </Typography>
            )}

            <Container className={classes.transactionDetails}>
              <Typography className={classes.transactionDate}>
                {moment(data.timestamp).format("DD-MM-YYYY")}
              </Typography>
              <Typography
                className={classes.transactionAccount}
                onClick={() => { routeToAccount(data.account); }}
              >
                {data.account}
              </Typography>
              <Typography className={classes.transactionData}>
                {data.data}
              </Typography>
              <Typography className={classes.transactionType}>
                {data.type}
              </Typography>
              {props.org && (
                <Typography
                  className={classes.transactionAccount}
                  onClick={() => { routeToAccount(data.auth); }}
                >
                  {data.auth}
                </Typography>
              )}
              <div
                className={classes.transactionChevronRightContainer}
                onClick={() => {
                  window.open(
                    `https://local.bloks.io/transaction/${data.tx_id}?nodeUrl=${settings.eosio.blockExplorerUrl}&systemDomain=eosio`,
                    "_blank"
                  );
                }}
              >
                <FaChevronRight />
              </div>
            </Container>
          </Container>
        ))}
      </Container>
    </Grid>
  );
}

TransactionsTable.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  accountName: PropTypes.string.isRequired,
  org: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      direction: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      account: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      tx_id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TransactionsTable;
