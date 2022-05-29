import { BigInteger, PrivateKey } from 'ecdh';

export default function seedToKeys(curve, seed) {
    var n1 = curve.getN().subtract(BigInteger.ONE),
    priv = (new BigInteger(seed.substring(2), 16)).mod(n1).add(BigInteger.ONE);

    const privateKey = new PrivateKey(curve, priv);

    return {
        publicKey: privateKey.derivePublicKey(),
        privateKey: privateKey
    };
}