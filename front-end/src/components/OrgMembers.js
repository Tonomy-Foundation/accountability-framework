import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}))

function OrgMembers(props) {
  const classes = useStyles();

  return (
    <div>
      &lt;--- Transactions
      <h1>{props.groupName}</h1>
      <ul>
        {props.members.map((data, index) =>
          <li>{data.name}</li>)}
      </ul>
    </div>  
  );
}

export default OrgMembers;