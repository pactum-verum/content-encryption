// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { Button } from 'react-bootstrap';
import { ethers } from "ethers";
import ECDH from 'ecdh';
import seedToKeys from '../utils/seedToKeys';

function Keys({provider, address, keys, setKeys}) {
    React.useEffect(() => {
    }, [provider, address]);

    React.useEffect(() => {
        if (!keys) return;

        // Test the validity of the generated key for Elliptic Curve Diffie-Hellman Key Exchange
        const curve = ECDH.getCurve('secp256k1');
        const otherKeys = ECDH.generateKeys(curve); // throw away after the test

        const mySharedSecret = keys.privateKey.deriveSharedSecret(otherKeys.publicKey);
        const otherSharedSecret = otherKeys.privateKey.deriveSharedSecret(keys.publicKey);
        const equals = (mySharedSecret.toString('hex') === otherSharedSecret.toString('hex'));
        console.log("Elliptic Curve Diffie-Hellman Key Exchange passed: ", equals);
        window.alert("Elliptic Curve Diffie-Hellman Key Exchange passed: " + equals);
    }, [keys]);

    const onLogin = async () => {
        const signer = provider.getSigner();
        const signature = await signer.signMessage("Sign this to re-generate encryption keys!");
        const seed = ethers.utils.keccak256(signature);

        const curve = ECDH.getCurve('secp256k1');
        setKeys(seedToKeys(curve, seed));
    }

    if (!address || keys) return (<></>);
    else return(<Button onClick={onLogin}>Regenerate Keys</Button>);
}

export default Keys;