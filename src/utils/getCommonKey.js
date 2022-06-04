// SPDX-License-Identifier: Apache-2.0 and MIT
import crypto from 'crypto';

export default function getCommonKey(pubkey, encCommonKey, ecdh) {
    try {
        // Recover ECDH shared secret
console.log("GCG: pubkey", pubkey.length, pubkey);
console.log("GCG: pubkey", pubkey);
console.log("GCG: pubkey", Buffer.from(pubkey, 'hex'));
console.log("GCG: encCommonKey", encCommonKey);
console.log("GCG: encCommonKey", encCommonKey.length, encCommonKey);
console.log("GCG: encCommonKey", Buffer.from(encCommonKey, 'hex'));
        const keyEncryprionKey = ecdh.computeSecret(Buffer.from(pubkey, 'hex')); // convert from hex first
console.log("keyEncryprionKey: ", keyEncryprionKey.toString('hex').length, keyEncryprionKey.toString('hex'));

        // Decrypt the common Common Secret for symmetric encryption of the content
        const cipher = 'aes-256-ctr';
        const d = crypto.createDecipher(cipher, keyEncryprionKey);
        const dcs = Buffer.concat([d.update(Buffer.from(encCommonKey, 'hex')), d.final()]);
console.log("Recovered decryption Common Secret:", dcs.toString('hex').length, dcs.toString('hex'));
        return dcs.toString('hex');
    } catch(_) { return null; }   
}