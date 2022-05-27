# Document and message content encryption.

## Introduction

This project solves the problem of encryption of content stored in IPFS. The requirements are the following:

- The content is a folder of files, with sub-folders in it.
- The folder structure should not be encrypted, but each file in it should.
- The keys should be maintained by the ethereum compatible wallet, such as MetaMask, WalletConnect etc. In addition, hardware keys should be allowed to do this, so no keys are stored on the user's computer.
- The content should be encrypted for multiple users. In addition, each of those users should be able to add another user.
- Upon adding new users, computation and re-storage shhall be minimized.

This implementation is intended for web usage, and should be running inside the users' browsers, thus allowing implementation of decentralized Web3 applications.

## Encryption

All content shall be encrypted using symentric encryption. However, multiple encryption methods should be allowed. To achieve this, a header would contain the following:

    1. a header which describes the symetric encryption method,
    2. a header containing a collection of users denoted by Ethereum-compatible addresses. For each such user, the encrypted version (using the corresponding user's key) of the common symmetric key is stored,
    3. payload in form of IPFS folder in which the files are encrypted using the common symmetric key and the encryption method specified in the first header above.

When a new user is added, a new entry is appended to the list in the header 2 above. In it, the common symmetric key is encrypted for the new user. Since another user is doing this, asymetric encryption is used, so that the existing user can encrypt the common symmetric key for the new user using the new user's public key, and the new user can recover the common symmetric key using his private key. 

## Key generation

The first user generates the common symmetric key, and we assume that it is in his best interest that this key is hard to guess.

Each user's assymetric key pair should be deterministically generated, so that:
- it is next to impossible for someone else to generate the same key pair,
- the user can switch to another device and re-generate the same key pair and continue to work from there.

To achieve the above the key pair is generated from deterministically generated "entropy". This entropy is created as follows:
1. The user enters his password for this purpose
2. The user signs a message containging his password using the private key corresponding to his Ethereum-compatible address for this purpose. For this, any Ethereum wallet can be used, including hardware wallets.
3. The resulting signature is hard (next to impossible) to guess since otherwise anyone could generate digital signatures.
4. The resulting signature is hashed using SHA-256. This hash is used as "deterministic entropy".
5. The keypair is generated using the above Deterministic Entropy (what an oxymoron :) ). 

The public key generated above is recorded in the header along the user's address, so the other users can generate private messages for that user in the future.
## Implementation

The payload is stored as IPFS folder stucture, wth files in it. The heders are stored as IPFS DAG in which among other, there is a reference of the root folder IPFS CID.