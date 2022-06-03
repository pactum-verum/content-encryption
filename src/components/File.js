// SPDX-License-Identifier: Apache-2.0 and MIT
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FormControl, Button, Modal } from 'react-bootstrap';
import { concat } from 'uint8arrays/concat';
import { toString } from 'uint8arrays/to-string';
import rootPath from '../utils/rootPath';

function File({provider, address, ecdh, path, file, commonKey}) {
    const [showModal, setShowModal] = React.useState(false);
    const [cleartext, setCleartext] = React.useState("tra la la la la\n la la la");

    React.useEffect(() => {
        (async () => {
            const chunks = [];
console.log("Chunks");
            for await (const chunk of window.ipfs.files.read(rootPath + path + file.name)) {
                chunks.push(chunk);
console.log("Chunk: ", chunk);
            }          
            setCleartext(toString(concat(chunks)));
        }) ();
    }, [file]);

    const modal = (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>File: {path + file.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl as="textarea" rows="10" readOnly="true" value={cleartext}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

    return (<>
        <br/>
        <href onClick={() => setShowModal(true)} >{path + file.name}</href>
        {modal}
    </>);
}

export default File;
