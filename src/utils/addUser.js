// SPDX-License-Identifier: Apache-2.0 and MIT
import crypto from 'crypto';

export default async function addUser(request, root, commonSecret, ecdh) {
    try {
        // Derive Shared Key-encryption Secret from request Public Key and my ECDH Private Key
        const keyEncryprionKey = ecdh.computeSecret(Buffer.from(request.pubkey, 'hex'));
console.log("keyEncryprionKey: ", keyEncryprionKey.toString('hex').length, keyEncryprionKey.toString('hex'));

console.log("CS: ", commonSecret);
console.log("CS: ", commonSecret.length, commonSecret);
console.log("CS: ", Buffer.from(commonSecret, 'hex').toString('hex').length, Buffer.from(commonSecret, 'hex').toString('hex'));
        const cipher = 'aes-256-ctr';
        const crypter = crypto.createCipher(cipher, keyEncryprionKey);
        let encCommonKey = Buffer.concat([crypter.update(Buffer.from(commonSecret, 'hex')), crypter.final()]);
console.log("Enc common key: ", encCommonKey.toString('hex').length, encCommonKey.toString('hex'));
const d = crypto.createDecipher(cipher, keyEncryprionKey);
const dcs = Buffer.concat([d.update(encCommonKey), d.final()]);
console.log("DCS:", dcs.toString('hex').length, dcs.toString('hex'));

        let r = root;
        r.users[request.address] = { 
            alias: request.alias, 
            key: { peer_pubkey: ecdh.getPublicKey().toString('hex'), enc_common_key: encCommonKey.toString('hex') }
        }
console.log("User added root:", r);

        const cid = await window.ipfs.dag.put(r);

        // No pinning planned, but this is the place to pin the rootCid

        return cid.toString();
    } catch (_) { return null; }
}
