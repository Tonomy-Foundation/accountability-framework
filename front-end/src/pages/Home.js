import React from 'react';
import { Redirect } from "react-router-dom";

function Home() {
    return <Redirect to="/login" />
}

export default Home;