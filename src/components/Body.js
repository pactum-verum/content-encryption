// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { InputGroup, Button, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; 
import Content from './Content';
import createEmptyTree from '../utils/createEmptyTree';
function Body({provider, address, ecdh}) {
    const [rootCid, setRootCid] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [accessRequest, setAccessRequest] = React.useState(null);
    const [requestAlias, setRequestAlias] = React.useState("");

    const onRootCidChange = (e) => { setRootCid(e.currentTarget.value); }

    const onCreate = async () => {
        setRootCid(createEmptyTree(address, ecdh));
    }

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
        refreshRequest();
        setShowModal(true);
    }

    const handleCloseModal = () => { setShowModal(false); }

    const onCopy = async () => {
        return await navigator.clipboard.writeText(accessRequest);
    }

    const onAliasChange = (e) => { setRequestAlias(e.currentTarget.value); }

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

    <Content provider={provider} address={address} ecdh={ecdh} rootCid={rootCid}/>
    </>);
}

export default Body;