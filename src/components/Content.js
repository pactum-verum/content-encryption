// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from './UserList';
import FileTree from './FileTree';
import { CID } from 'multiformats/cid';

function Content({provider, address, ecdh, rootCid, setRootCid}) {
    const [activeTab, setActiveTab] = React.useState("tree");
    const [root, setRoot] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            try {
                const { value: r } = await window.ipfs.dag.get(CID.parse(rootCid));
                setRoot(r);
            } catch(e) { setRoot(null); }
        }) ();
    }, [rootCid]);

    if (!root) return (<></>);
    else return (
        <Tabs activeKey={activeTab} transition={false} onSelect={key => setActiveTab(key)}>
            <Tab eventKey="users" title="Users">
                <UserList provider={provider} address={address} ecdh={ecdh} rootCid={rootCid} setRootCid={setRootCid} root={root}/>
            </Tab>
            <Tab eventKey="tree" title="File tree">
                <FileTree provider={provider} address={address} ecdh={ecdh} rootCid={rootCid} setRootCid={setRootCid} root={root}/>
            </Tab>
        </Tabs>
    );
}

export default Content;