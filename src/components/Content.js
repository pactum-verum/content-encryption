// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from './UserList';
import FileTree from './FileTree';
import { CID } from 'multiformats/cid';
import getCommonKey from '../utils/getCommonKey';

function Content({provider, address, ecdh, rootCid, setRootCid}) {
    const [activeTab, setActiveTab] = React.useState("tree");
    const [root, setRoot] = React.useState(null);
    const [commonKey, setCommonKey] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            try {
                const { value: r } = await window.ipfs.dag.get(CID.parse(rootCid));
console.log("********** Read root: ", r);
                setRoot(r);
console.log("r.users[address]: ", r.users[address]);
                const k = getCommonKey(r.users[address].key.peer_pubkey, r.users[address].key.enc_common_key, ecdh);
console.log("Got common key: ", k);
                setCommonKey(k);
            } catch(e) { 
                setCommonKey(null);
                setRoot(null); 
            }
        }) ();
    }, [rootCid]);

    React.useEffect(() => {
        (async () => {
            try {
                const k = getCommonKey(root.users[address].key.peer_pubkey, root.users[address].key.enc_common_key, ecdh);
console.log("Got common key: ", k);
                setCommonKey(k);
            } catch(e) { setCommonKey(null); }
        }) ();
    }, [ecdh]);

    if (!root) return (<></>);
    else return (<>
        Common key: {commonKey}

        <Tabs activeKey={activeTab} transition={false} onSelect={key => setActiveTab(key)}>
            <Tab eventKey="users" title="Users">
                <UserList provider={provider} address={address} ecdh={ecdh} rootCid={rootCid} setRootCid={setRootCid} root={root} commonKey={commonKey}/>
            </Tab>
            <Tab eventKey="tree" title="File tree">
                <FileTree provider={provider} address={address} ecdh={ecdh} rootCid={rootCid} setRootCid={setRootCid} root={root} commonKey={commonKey}/>
            </Tab>
        </Tabs>
    </>);
}

export default Content;