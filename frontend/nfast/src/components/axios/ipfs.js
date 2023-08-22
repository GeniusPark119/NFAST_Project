// ipfs.js
// using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
// const ipfsClient = require('ipfs-http-client');
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// const ipfsClient = require("ipfs-http-client");
import { Buffer } from "buffer";

// require("dotenv").config();

const ipfsClient = require("ipfs-http-client");

// const ipfs = create(new URL("https://j8a307.p.ssafy.io/api/v0"));

// const auth = `Basic ${Buffer.from(
//   `hyueongkyun:17d0a575c0f5483780a2505dd61ce588`
// ).toString("base64")}`;
// const ipfs = ipfsClient.create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization: auth,
//   },
// });
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const INFURA_SECRET_KEY = process.env.REACT_APP_INFURA_SECRET_KEY;
// const INFURA_ID = "2NdihV0LDPPtVRkbHiUjAgQUQZN";
// const INFURA_SECRET_KEY = "cd8eb31a7e3f8ca8e38bac8e48b359d4";

const auth = `Basic ${Buffer.from(`${INFURA_ID}:${INFURA_SECRET_KEY}`).toString(
  "base64"
)}`;
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
// const ipfs = ipfsClient.create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization: `Basic ${Buffer.from(
//       "2NRlz9rNsZgRLfSdWqrwt7z1TZP:772c0b2f653e8fc42a839654f2730c2f"
//     ).toString("base64")}`,
//     "content-type": "multipart/form-data",
//   },
// headers: {
//   "Access-Control-Allow-Origin": "*",
// },
// host: "j8a307.p.ssafy.io",
// // port: "3000",
// protocol: "https",
// headers: {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "*",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// },
// apiPath: "/ipfs",
// });
// run with local daemon
// const ipfsApi = require('ipfs-api');
// const ipfs = new ipfsApi('localhost', '5001', {protocol: 'http'});

export default ipfs;
