// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; 

function User({userAddress, user}) {
console.log("User address: ", userAddress);
    return (
        <tr>
            <td>{user.alias === "" ? "<no alias>": user.alias}</td>
            <td>{userAddress}</td>
        </tr>
    );
}

export default User;