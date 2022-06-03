// SPDX-License-Identifier: Apache-2.0 and MIT
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddFiles from './AddFiles';

function File({provider, address, ecdh, filepath, commonKey}) {
    return (<>
        <br/>
        File: {filepath}
    </>);
}

export default File;
