// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from './UserList';
import FileTree from './FileTree';

function Content({provider, address, ecdh, rootCid}) {
    const [activeTab, setActiveTab] = React.useState("list");

    const onSelect = (key) => { setActiveTab(key); }

    const validate = () => { 
        return rootCid; 
    }

    if (!validate()) return (<></>);
    else return (
        <Tabs activeKey={activeTab} transition={false} onSelect={onSelect}>
            <Tab eventKey="users" title="Users">
                <UserList provider={provider} address={address} ecdh={ecdh} rootCid={rootCid}/>
            </Tab>
            <Tab eventKey="tree" title="File tree">
                <FileTree provider={provider} address={address} ecdh={ecdh} rootCid={rootCid}/>
            </Tab>
        </Tabs>
    );
}

export default Content;