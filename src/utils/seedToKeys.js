import { BigInteger, PrivateKey } from 'ecdh';

export default function seedToKeys(curve, seed) {
console.log("seed bigint: ", (new BigInteger(seed.substring(2), 16)).toString(16));
    var n1 = curve.getN().subtract(BigInteger.ONE),
    priv = (new BigInteger(seed.substring(2), 16)).mod(n1).add(BigInteger.ONE);
console.log("priv: ", priv, priv.toString(), priv.toString(16));

    const privateKey = new PrivateKey(curve, priv);

    return {
        publicKey: privateKey.derivePublicKey(),
        privateKey: privateKey
    };
}