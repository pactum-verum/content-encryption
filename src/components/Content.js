// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { InputGroup, Button, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; 

function Content({provider, address, keys, rootCid}) {
    const validate = () => { 
        return false; 
    }

    if (!validate()) return (<></>);
    else return (<>Content</>);
}

export default Content;