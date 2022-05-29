// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import Account from './Account';
import Keys from './Keys';

function NavigationBar({provider, setProvider, address, setAddress, keys, setKeys}) {
    return (
        <Navbar className="bg-light justify-content-between">
            <Navbar.Brand>Content Encryption Sample</Navbar.Brand>
            <Navbar.Text> <Account provider={provider} setProvider={setProvider} address={address} setAddress={setAddress}/> <Keys provider={provider} address={address} keys={keys} setKeys={setKeys}/> </Navbar.Text>
        </Navbar>
    );
}

export default NavigationBar;