// SPDX-License-Identifier: Apache-2.0 and MIT
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import emptyFolder from '../utils/emptyFolder';
import cleanupFolder from '../utils/cleanupFolder';
import AddFile from './AddFile';

function FileTree({provider, address, ecdh, rootCid, setRootCid, root, commonKey}) {

    return (<>
        <AddFile provider={provider} address={address} ecdh={ecdh} rootCid={rootCid} setRootCid={setRootCid} root={root} commonKey={commonKey}/>
    </>);
}

export default FileTree;