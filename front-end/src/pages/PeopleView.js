import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import Eosio from '../services/Eosio';
import { Redirect } from "react-router-dom";
import settings from '../settings';

function mapStateToProps(state) {
    return {
      eosio: state.eosio
    };
  }
  
function PeopleView(props) {

    return (
        <Container component="main" maxWidth="xs">
        </Container>
    )
}

export default connect(mapStateToProps)(PeopleView);