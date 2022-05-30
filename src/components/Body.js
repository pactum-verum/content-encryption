// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { InputGroup, Button, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; 
import Content from './Content';
import { randomBytes } from 'crypto';
import crypto from 'crypto';

function Body({provider, address, ecdh}) {
    const [rootCid, setRootCid] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [accessRequest, setAccessRequest] = React.useState(null);
    const [requestAlias, setRequestAlias] = React.useState("");

    const onRootCidChange = (e) => { setRootCid(e.currentTarget.value); }

    const onCreate = async () => {
        // Create dummy ECDH
        const dummyECDH = crypto.createECDH('secp256k1');
        dummyECDH.generateKeys();
    
        const keyEncryprionKey = ecdh.computeSecret(dummyECDH.getPublicKey());
console.log("keyEncryprionKey: ", keyEncryprionKey.toString('hex').length, keyEncryprionKey.toString('hex'));
        // Generate Common Secret for symmetric encryption of the content
        const commonSecret = crypto.randomBytes(32);
        const cipher = 'aes-256-ctr';
        var crypter = crypto.createCipher(cipher, keyEncryprionKey);
        let encCommonKey = Buffer.concat([crypter.update(commonSecret), crypter.final()]);
console.log("CS: ", commonSecret.toString('hex').length, commonSecret.toString('hex'));
console.log("Enc common key: ", encCommonKey.toString('hex').length, encCommonKey.toString('hex'));
const d = crypto.createDecipher(cipher, keyEncryprionKey);
const dcs = Buffer.concat([d.update(encCommonKey), d.final()]);
console.log("DCS:", dcs.toString('hex').length, dcs.toString('hex'));

console.log("peer:pubkey: ", dummyECDH.getPublicKey().toString('hex').length, dummyECDH.getPublicKey().toString('hex'));
        const emptyTree = { 
            Keys: [ { 
                addr: address,
                alias: "", 
                key: { peer_pubkey: dummyECDH.getPublicKey().toString('hex'), enc_common_key: encCommonKey.toString('hex') }}], 
            Content: "empty"
        }
console.log("emptyTree: ", emptyTree)

        const cid = await window.ipfs.dag.put(emptyTree);

        // No pinning planned, but this is the place to pin the rootCid

        setRootCid(cid);
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