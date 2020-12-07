import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import React, { useState } from 'react';

const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore(true)
const { Input, Field, Control } = Form;

function App() {
  let [wallet, setWallet] = useState("Select a password first.")
  let [password, setPassword] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <h1>React ⚛️ Scrypta dApp Starter!</h1><br />
        <Field>
          <Control>
            <Input onChange={(evt) => {
              setPassword(evt.target.value);
            }} value={password} expanded="true" placeholder="Write a password here" />
          </Control>
        </Field>
        <pre style={{ fontSize: "9px" }}>{wallet}</pre><br />
        <Button onClick={
          async () => {
            if (password.length > 0) {
              let wallet = await scrypta.createAddress(password);
              let decrypted = await scrypta.readKey(password, wallet.walletstore);
              if(decrypted !== false){
                setWallet(JSON.stringify(wallet));
              }
            }
          }} color="primary">Give me a new wallet!</Button>
      </header>
    </div>
  );
}

export default App;
