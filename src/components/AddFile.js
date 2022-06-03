// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Dropzone from 'react-dropzone'

function AddFile({provider, address, ecdh, rootCid, setRootCid, root, commonKey}) {
    return (
    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
        <section>
            <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </section>
    )}
    </Dropzone>
    );
}

export default AddFile;