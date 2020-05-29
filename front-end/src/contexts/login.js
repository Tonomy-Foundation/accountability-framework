import React, { useState, useContext, createContext } from 'react';
import Eosio from '../services/Eosio';
import settings from '../settings';

const loginContext = createContext();

// Provider hook that creates login object and handles state
function useProvideLogin() {
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
    
        // await props.login(eosio);
        await setLoggedin(true);


  const logout = async () => {
    await setLoggedin(true);
  };

  async function onChangeAccount(event) {
    setAccountName(event.target.value);
  }

  async function onChangePkey(event) {
    setPkey(event.target.value);
  }
// Exposing methods from the contexts. 
  return {
    onChangeAccount,
    onChangePkey,
    logout,
    loggedin,
    setLoggedin,
    logout
  };
}}

// Provider component

// shares information across the application to set the login status.
// Looks like redux but is different. Works similar to a get and setter. 
export function ProvideLogin({ children }) {
  const login = useProvideLogin();
  return (
    <loginContext.Provider value={login}>{children}</loginContext.Provider>
  );
}

// Hook for child components
export const ConsumeLogin = () => {
  return useContext(loginContext);
};
