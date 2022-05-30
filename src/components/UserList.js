// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; 

function UserList({provider, address, ecdh, rootCid}) {
    const [myAlias, setMyAlias] = React.useState("");
    const [inputAccessRequest, setInputAccessRequest] = React.useState(null);


    return (<>
        <br/>
        <Button>Request Access</Button>
        <br/><br/>
        <InputGroup className="mb-3">
            <InputGroup.Text>Request</InputGroup.Text>
            <FormControl placeholder="paste request here" value={inputAccessRequest} onChange={e => setInputAccessRequest(e.currentTarget.value)} />
            <Button>Add user</Button>
        </InputGroup>
        <br/><br/>
        <InputGroup className="mb-3">
            <InputGroup.Text>My alias</InputGroup.Text>
            <FormControl placeholder="type alias here" value={myAlias} onChange={e => setMyAlias(e.currentTarget.value)} />
            <Button>Update</Button>
        </InputGroup>

        UserList
    </>);
}

export default UserList;