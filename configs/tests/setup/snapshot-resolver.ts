// !!don't rewrite in ESM style!!
// jest only understands CommonJs syntax in this case

// current configuration places snapshot right next to spec file
module.exports = {
  resolveSnapshotPath: (testPath: string, snapshotExtension: string): string =>
    testPath + snapshotExtension,
  resolveTestPath: (
    snapshotFilePath: string,
    snapshotExtension: string
  ): string => snapshotFilePath.slice(0, -snapshotExtension.length),
  testPathForConsistencyCheck: "some/__tests__/example.test.js",
};
