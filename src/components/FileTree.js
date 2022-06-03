// SPDX-License-Identifier: Apache-2.0 and MIT
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddFiles from './AddFiles';
import FileSubtree from './FileSubtree';

function FileTree({provider, address, ecdh, rootCid, setRootCid, root, commonKey}) {

    return (<>
        Content root: {root.content.toString()}
        <br/> <br/>
        <AddFiles provider={provider} address={address} ecdh={ecdh} rootCid={rootCid} setRootCid={setRootCid} root={root} commonKey={commonKey}/>
        <br/> <br/>
        <FileSubtree provider={provider} address={address} ecdh={ecdh} subroot={root.content} subpath={"/"} commonKey={commonKey}/>
    </>);
}

export default FileTree;