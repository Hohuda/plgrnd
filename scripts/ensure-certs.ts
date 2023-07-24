/* eslint-disable no-console */
import * as fs from "fs/promises";

import {
  LOCALHOST_CERTS_PATH,
  LOCALHOST_CERT_PATH,
  LOCALHOST_KEY_PATH,
} from "consts";
import * as mkcert from "mkcert";

(async (): Promise<void> => {
  // create a certificate authority
  const ca = await mkcert.createCA({
    organization: "KhokhudaDev",
    countryCode: "AM",
    state: "Yerevan",
    locality: "Yerevan",
    validityDays: 365,
  });

  // then create a tls certificate
  const cert = await mkcert.createCert({
    domains: ["127.0.0.1", "localhost", "0.0.0.0"],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert,
  });

  try {
    console.log(`Reading dir ${LOCALHOST_CERTS_PATH}.`);
    await fs.readdir(LOCALHOST_CERTS_PATH);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log(`Dir wasn't found. Making dir ${LOCALHOST_CERTS_PATH}.`);
      await fs.mkdir(LOCALHOST_CERTS_PATH, { recursive: true });
    } else {
      throw error;
    }
  }

  console.log("Writing certs...");
  await fs.writeFile(LOCALHOST_CERT_PATH, `${cert.cert}`);
  await fs.writeFile(LOCALHOST_KEY_PATH, cert.key);

  console.log("✅ ensure-certs DONE!");
  // console.log(cert.key, cert.cert); // certificate info
  // console.log(`${cert.cert}\n${ca.cert}`); // create a full chain certificate by merging CA and domain certificates
})().catch((e: unknown) => {
  console.error("❌ ensure-certs FAILED! with error", e);
});
