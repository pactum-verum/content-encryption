import crypto from 'crypto';

export default async function createEmptyTree(address, ecdh) {
    // Create dummy ECDH
    const dummyECDH = crypto.createECDH('secp256k1');
    dummyECDH.generateKeys();

    const keyEncryprionKey = ecdh.computeSecret(dummyECDH.getPublicKey());
console.log("keyEncryprionKey: ", keyEncryprionKey.toString('hex').length, keyEncryprionKey.toString('hex'));
    // Generate Common Secret for symmetric encryption of the content
    const commonSecret = crypto.randomBytes(32);
    const cipher = 'aes-256-ctr';
    var crypter = crypto.createCipher(cipher, keyEncryprionKey);
    let encCommonKey = Buffer.concat([crypter.update(commonSecret), crypter.final()]);
console.log("CS: ", commonSecret.toString('hex').length, commonSecret.toString('hex'));
console.log("Enc common key: ", encCommonKey.toString('hex').length, encCommonKey.toString('hex'));
const d = crypto.createDecipher(cipher, keyEncryprionKey);
const dcs = Buffer.concat([d.update(encCommonKey), d.final()]);
console.log("DCS:", dcs.toString('hex').length, dcs.toString('hex'));

console.log("peer:pubkey: ", dummyECDH.getPublicKey().toString('hex').length, dummyECDH.getPublicKey().toString('hex'));
    let keys = {};
    keys[address] = { 
        alias: "", 
        key: { peer_pubkey: dummyECDH.getPublicKey().toString('hex'), enc_common_key: encCommonKey.toString('hex') }
    }

    const emptyTree = { 
        Keys: keys, 
        Content: "empty"
    }
console.log("emptyTree: ", emptyTree)

    const cid = await window.ipfs.dag.put(emptyTree);

    // No pinning planned, but this is the place to pin the rootCid

    return cid.toString();
}