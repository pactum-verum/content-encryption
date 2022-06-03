import rootPath from "./rootPath";

export default async function cleanupFolder() {
    try { await window.ipfs.files.rm(rootPath, { recirsive: true }); } catch(_) {};
    await window.ipfs.files.mkdir(rootPath, { parents : true });
    const e = await window.ipfs.files.stat(rootPath, { hash: true });
console.log("Empty root folder: ", e);
console.log("Empty subfolder: ");
for await (const file of window.ipfs.ls(e.cid)) {
    console.log(file)
}
console.log("==");
      return e.cid;
}
