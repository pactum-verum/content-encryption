// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; 
import Content from './Content';
import createEmptyTree from '../utils/createEmptyTree';
function Body({provider, address, ecdh}) {
    const [rootCid, setRootCid] = React.useState("");

    const onRootCidChange = (e) => { setRootCid(e.currentTarget.value); }

    const onCreate = async () => {
        if (!window.confirm("Are you sure?")) return;
        setRootCid(await createEmptyTree(address, ecdh));
    }


    return (<>
        <InputGroup className="mb-3">
            <InputGroup.Text>Root CID</InputGroup.Text>
            <FormControl placeholder="CID" value={rootCid} onChange={onRootCidChange} />
            { ecdh && <Button variant="danger" onClick={onCreate}>
                Create New
            </Button> }
        </InputGroup>

        <Content provider={provider} address={address} ecdh={ecdh} rootCid={rootCid}/>
    </>);
}

export default Body;