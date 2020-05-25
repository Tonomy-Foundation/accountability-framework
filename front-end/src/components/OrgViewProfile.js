import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainGrid: {
    height: "100%",
    flex: "1",
  },
  accountName: {
    fontFamily: "Verdana",
    color: "#5683a6",
    fontWeight: "600",
    fontSize: "24px",
    marginBottom: "40px",
  },
  accountDescriptionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  accountDescription: {
    marginTop: "3px",
    marginBottom: "40px",
    fontSize: "18px",
    fontWeight: "400",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "calc(100vh - 64px)",
  },
  organizationsLabelContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    marginBottom: "50px",
    color: "#f6b1c8",
  },
  organizationsLabel: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "600",
  },
  inputField: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  menuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "#90caf8",
    width: "120px",
    height: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  gridMenuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  menuAddItem: {
    border: "8px solid #90caf8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    width: "120px",
    height: "120px",
  },
}));

function OrgViewProfile(props) {
  const classes = useStyles();

  return (
    <Grid item xs>
      <Container component="div" className={classes.container}>
        <h1 component="p">{props.name}</h1>
        <h2 component="p" className={classes.accountName}>
          @{props.accountName}
        </h2>
        <div>
          <span className={classes.accountDescriptionTitle}>Description:</span>
          <p className={classes.accountDescription}>{props.description}</p>
        </div>
        <Container
          component="div"
          className={classes.organizationsLabelContainer}
        >
          <h2 component="p" className={classes.organizationsLabel}>
            Member groups
          </h2>
        </Container>
        <Grid container spacing={5}>
          {props.memberGroups &&
            props.memberGroups.map((data, index) => {
              return (
                <Grid item sm={12} md={6} lg={3} key={index}>
                  <Box
                    className={classes.menuItem}
                    onClick={() => {
                      props.selectMemberGroup(data.name);
                    }}
                  >
                    {data.name} (level {data.level})
                  </Box>
                </Grid>
              );
            })}
          {props.isMyAccount && (
            <Grid item xs={3}>
              <Box
                className={classes.menuAddItem}
                onClick={() => {
                  props.history.push("/create-organization");
                }}
              >
                +
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Grid>
  );
}

OrgViewProfile.propTypes = {
  accountName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  memberGroups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectMemberGroup: PropTypes.func.isRequired,
};

export default OrgViewProfile;
