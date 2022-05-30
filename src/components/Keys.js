// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { Button } from 'react-bootstrap';
import { ethers } from "ethers";
import seedToKeys from '../utils/seedToECDH';
import { createECDH } from 'crypto';

function Keys({provider, address, keys, setKeys}) {
    React.useEffect(() => {
    }, [provider, address]);

    React.useEffect(() => {
        if (!keys) return;

        // Test the validity of the generated key for Elliptic Curve Diffie-Hellman Key Exchange
        const otherECDH = createECDH('secp256k1');
        otherECDH.generateKeys();
    
        const sec1 = keys.computeSecret(otherECDH.getPublicKey());
        const sec2 = otherECDH.computeSecret(keys.getPublicKey());
        const equals = sec1.equals(sec2);
        console.log("Elliptic Curve Diffie-Hellman Key Exchange passed: ", equals);
        window.alert("Elliptic Curve Diffie-Hellman Key Exchange passed: " + equals);
    }, [keys]);

    const onRegenerate = async () => {
        const signer = provider.getSigner();
        const signature = await signer.signMessage("Sign this to re-generate encryption keys!");

        // Test wallet  RFC 6979 compliance!
        const signatureAgain = await signer.signMessage("Sign this to re-generate encryption keys!");
        if (signature !== signatureAgain) {
            window.alert("Your wallet is not RFC 6979 compliant.\nIt cannot be used with this application!");
            console.log("Non-compliant wallet.");
            return;
        }

        const seed = ethers.utils.keccak256(signature);

        setKeys(seedToKeys(seed));
    }

    if (!address || keys) return (<></>);
    else return(<Button onClick={onRegenerate}>Regenerate Keys</Button>);
}

export default Keys;