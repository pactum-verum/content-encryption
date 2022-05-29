// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { InputGroup, Button, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; 
import { ethers } from 'ethers';

function Body({provider, address, keys}) {
    const [rootCid, setRootCid] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [accessRequest, setAccessRequest] = React.useState(null);

    const onRootCidChange = (e) => {
        const cid = e.currentTarget.value;
        setRootCid(cid);
        
        // Validate

        // Load
    }

    const onCreate = () => {
        
    }

    const onRequestAccess = () => {
        const request = "{\n  Root: \"" + rootCid + "\",\n  Addr: \"" + address + "\",\n  PubKey: \"" + keys.publicKey.buffer.toString('hex') + "\"\n}";
        setAccessRequest(request);
        setShowModal(true);
    }

    const handleCloseModal = () => { setShowModal(false); }

    const onCopy = async () => {
        return await navigator.clipboard.writeText(accessRequest);
    }

    const modal = (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Access Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <pre>{accessRequest}</pre>
                <Button onClick={onCopy}>Copy to Clipboard</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

    return (<>
    {modal}
    <InputGroup className="mb-3">
        <InputGroup.Text>Root CID</InputGroup.Text>
        <FormControl placeholder="CID" onChange={onRootCidChange} />
        { rootCid && <Button onClick={onRequestAccess}>
            Request Access
        </Button> }
        <Button onClick={onCreate}>
            Create New
        </Button>
    </InputGroup>
    </>);
}

export default Body;