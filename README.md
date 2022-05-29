# Document and message content encryption.

## Introduction

This project solves the problem of encryption of content stored in IPFS. The requirements are the following:

- The content is a folder of files, with sub-folders in it.
- The folder structure should not be encrypted, but each file in it should.
- The keys should be maintained by the ethereum compatible wallet, such as MetaMask, WalletConnect etc. In addition, hardware keys should be allowed to do this, so no keys are stored on the user's computer.
- The content should be encrypted for multiple users. In addition, each of those users should be able to add another user.
- Upon adding new users, computation and re-storage shhall be minimized.

This implementation is intended for web usage, and should be running inside the users' browsers, thus allowing implementation of decentralized Web3 applications.

## Encryption at Rest

All content shall be encrypted using symentric encryption. However, multiple encryption methods should be allowed. To achieve this, a header would contain the following:

    1. a header which names the symetric encryption method, which uses a Common Secret shared by all users involved,
    2. a header containing a collection of users denoted by Ethereum-compatible addresses. For each such user, the encrypted version of the Common Secret is stored, in a form decryptable by that user,
    3. payload in form of IPFS folder in which the files are encrypted using the common symmetric key and the encryption method specified in the first header above.

When a new user is added, a new entry is appended to the list in the header 2 above. In it, the common symmetric key is encrypted for the new user. Since another user is doing this, asymetric encryption is used, so that the existing user can encrypt the common symmetric key for the new user using the new user's public key, and the new user can recover the common symmetric key using his private key. 

## Encryption Protocol

The first user generates the Common Secret, a symmetric encryption key, and we assume that it is in his best interest that this key is hard to guess.

Each user's assymetric key pair should be deterministically generated, so that:
- it is next to impossible for someone else to generate the same key pair,
- the user can switch to another device and re-generate the same key pair and continue to work from there.

To achieve the above the key pair is generated from deterministically generated "entropy". This entropy is created as follows:
1. The user signs a standard message using the private key corresponding to his Ethereum-compatible address for this purpose, which uses Elliptic Curve (EC) Signatures using the well-known EC curve "secp256k1". For this, any Ethereum wallet can be used, including hardware wallets.
2. The signing wallet has to be RFC 6979 compliant in order to repeatedly generate unique signatures from the same message and private key. To test this, we ask the user to sign the same message again and check of the two signatures match.
3. The resulting signature is hard (next to impossible) to guess since otherwise anyone could generate digital signatures.
4. The resulting signature is hashed using the KECCAK256 method. This hash is used as "Deterministic Entropy" (what an oxymoron :) ).
5. A new Elliptic Curve keypair is deterministically generated using the above Deterministic Entropy. We need this because the Ethereum Compatible wallets do not allow generation of Elliptic Curve Diffie-Hellman (ECDH) Shared Secrets, which we need in the next steps. In the future, once the wallets implement ECDH which has been a numerously requested feature, the Ethereum key can be used directy for this purpose.
6. Any contrent stored in IPFS files (not folders) is encrypted using a Common Secret that the first user generates.
7. When some user adds a new user in order to communicate and share content, he needs to exchange the Common Secret to the new user, whose public keys he receives in a request for this process. 
For this, he creates an ECDH Shared Secret (shared with the user in interest) using his private key and the corresponding user's public key.
8. The Common Secret is then encrypted using the above ECDH Shared Secret and stored in the corresponding user's header, along with the public key of the user that generated the ECDH Shared Secret (so the ECDH Shared Secret can be regenerated by the receiving user). It is only decryptable by the targeted user and, irrelevantly, the user that onboarded the current user.
9. Now every involved user has access to the Common Secret, which he can use to encrypt and decrypt files stored in IPFS.

## Implementation

The payload is stored as IPFS folder stucture, wth files in it. The heders are stored as IPFS DAG in which among other, there is a reference of the root folder IPFS CID.