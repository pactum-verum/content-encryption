// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { InputGroup, FormControl, Button, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import User from './User';

function UserList({provider, address, ecdh, rootCid, setRootCid, root}) {
    const [myAlias, setMyAlias] = React.useState("");
    const [inputAccessRequest, setInputAccessRequest] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [accessRequest, setAccessRequest] = React.useState(null);
    const [requestAlias, setRequestAlias] = React.useState("");

    const refreshRequest = () => {
        if (!ecdh) return;
        const request = 
            "{\n  Root: \"" + rootCid + 
            "\",\n  Addr: \"" + address + 
            "\",\n  PubKey: \"" + ecdh.getPublicKey().toString('hex') + 
            "\",\n  Alias: \"" + requestAlias + 
            "\"\n}";
        setAccessRequest(request);
    }

    React.useEffect(() => {
        refreshRequest();
    }, [requestAlias]);

    const onRequestAccess = () => {
        setRequestAlias("");
        refreshRequest();
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);

    const onCopy = async () => await navigator.clipboard.writeText(accessRequest);

    const onAliasChange = e => setRequestAlias(e.currentTarget.value);

    const modal = (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Access Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl placeholder="My alias" onChange={onAliasChange} />
                <pre>{accessRequest}</pre>
                <Button onClick={onCopy}>Copy to Clipboard</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

console.log("Root: ", root);
if (root) console.log(Object.entries(root.users));
    return (<>
        {modal}
        <br/>
        { rootCid && ecdh && 
        <Button onClick={onRequestAccess}>Request Access</Button> }
        <br/><br/>
        { rootCid && ecdh && 
        <InputGroup className="mb-3">
            <InputGroup.Text>Request</InputGroup.Text>
            <FormControl placeholder="paste request here" value={inputAccessRequest} onChange={e => setInputAccessRequest(e.currentTarget.value)} />
            <Button>Add user</Button>
        </InputGroup> }
        <br/><br/>
        { rootCid && ecdh && 
        <InputGroup className="mb-3">
            <InputGroup.Text>My alias</InputGroup.Text>
            <FormControl placeholder="type alias here" value={myAlias} onChange={e => setMyAlias(e.currentTarget.value)} />
            <Button>Update</Button>
        </InputGroup> }

        <Table striped bordered hover>
            <tbody>
            {Object.entries(root.users).map(userEntry => <User key={userEntry[0]} userAddress={userEntry[0]} user={userEntry[1]}/>)}
            </tbody>
        </Table>
        
    </>);
}

export default UserList;