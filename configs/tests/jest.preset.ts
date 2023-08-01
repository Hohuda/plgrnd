/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// !!don't rewrite in ESM style!!
// jest only understands CommonJs syntax in this case
const nxPreset = require("@nx/jest/preset").default;

module.exports = { ...nxPreset };
