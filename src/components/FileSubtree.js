// SPDX-License-Identifier: Apache-2.0 and MIT
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddFiles from './AddFiles';
import File from './File';

function FileSubtree({provider, address, ecdh, subroot, subpath, commonKey}) {
    const [files, setFiles] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            let l = [];
            for await (const file of window.ipfs.ls(subroot)) {
                l.push(file);
            }
            setFiles(l);
        }) ();
    }, [subroot]);

    return (<>
        {files.map(file => (file.type === "dir" ? 
            <FileSubtree key={file.path} provider={provider} address={address} ecdh={ecdh} subroot={file.path} subpath={subpath + file.name + "/"} commonKey={commonKey}/>
            :
            <File key={file.path} provider={provider} address={address} ecdh={ecdh} filepath={subpath + file.name} commonKey={commonKey}/>
        ))}
    </>);
}

export default FileSubtree;
