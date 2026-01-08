import moment from "moment";
import _ from "lodash"

export const getreadabledate =(date:string)=>{
   return  moment(date).fromNow()
}
 export function getYesterdayHalf(): Date {
  const now = new Date();

  // Go back to yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  yesterday.setHours(12, 0, 0, 0); // yesterday 12:00 PM

  return yesterday;
}

export function calculateUptimePercent(createdAt: Date | string, uptime: number): number {
  // Ensure createdAt is a Date object
  const createdDate = new Date(createdAt);

  // Calculate total days since creation
  const totalDays = Math.max(
    1, // prevent divide by zero
    Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
  );




  // Calculate uptime percentage
  return (uptime / totalDays) * 100;
}
export function isActive(data: { lastUptime: Date | string }) {
  const yesterdayHalf = getYesterdayHalf();

  return  new Date(data.lastUptime) > yesterdayHalf;
}
export function parseEnvToList(envContent: string): { title: string; value: string }[] {
  return  _.uniqBy(envContent
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => {
      const [key, ...rest] = line.split("=");
      let value = rest.join("=").trim();

      // Remove wrapping quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      return { title: key.trim(), value };
    }),"title");
}
export function wait(ms:number) {
  return new Promise(res => setTimeout(res, ms));
}
export function formatChartLabel(
  date: string | Date,
  groupBy: "weekly" | "daily" | "hourly" | "minute" | "request"
): string {
  const d = new Date(date);

  switch (groupBy) {
    case "weekly":
      // Show week + year
      const weekNumber = getWeekNumber(d);
      return `Week ${weekNumber}, ${d.getFullYear()}`;

    case "daily":
      // Show full date
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

    case "hourly":
      // Show only hour
      return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: false
      });

    case "minute":
      // Show hh:mm
      return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });

    case "request":
      // Show full timestamp
      return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });

    default:
      return d.toISOString();
  }
}

// Helper to calculate ISO week number
function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}


export function cleanEnvString(envContent: string): string {
  return envContent
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => {
      const [key, ...rest] = line.split("=");
      let value = rest.join("=").trim();

      // Strip surrounding quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      return `${key.trim()}=${value}`;
    })
    .join("\n");
}


export function listToEnvString(list: any[]): string {
  const raw = list.map(item => `${item.title}=${item.value}`).join("\n");
  return cleanEnvString(raw);
}


export function downloadEnvFile(input: any[] | string, filename = ".env") {
  let envContent: string;

  if (typeof input === "string") {
    envContent = cleanEnvString(input);
  } else {
    envContent = listToEnvString(input);
  }

  const blob = new Blob([envContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


import crypto from "crypto";
import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";

// ---- derive private key from password ----
export function derivePrivateKey(password: string, salt: string) {
  // PBKDF2 → 32 bytes
  return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
}

// ---- generate keypair ----
export function generateKeyPairFromPassword(password: string, salt: string) {
  const privateKey = derivePrivateKey(password, salt);
  const keyPair = nacl.box.keyPair.fromSecretKey(privateKey);
  return {
    publicKey: naclUtil.encodeBase64(keyPair.publicKey),
    privateKey: naclUtil.encodeBase64(keyPair.secretKey), // stay on client only!
  };
}

// ---- encrypt data with user public key ----
export function encrypt(publicKeyBase64: string, message: string) {
  const publicKey = naclUtil.decodeBase64(publicKeyBase64);
  const ephemeral = nacl.box.keyPair();
  const nonce = nacl.randomBytes(24);

  const ciphertext = nacl.box(
    naclUtil.decodeUTF8(message),
    nonce,
    publicKey,
    ephemeral.secretKey
  );

  return {
    ciphertext: naclUtil.encodeBase64(ciphertext),
    nonce: naclUtil.encodeBase64(nonce),
    ephemeralPubKey: naclUtil.encodeBase64(ephemeral.publicKey),
  };
}

// Derive an AES key from secret phrase




// ---- decrypt with password-derived private key ----
export function decrypt(password: string, salt: string, encrypted: any) {
  const privateKey = derivePrivateKey(password, salt);
  const keyPair = nacl.box.keyPair.fromSecretKey(privateKey);

  const nonce = naclUtil.decodeBase64(encrypted.nonce);
  const ciphertext = naclUtil.decodeBase64(encrypted.ciphertext);
  const ephemeralPubKey = naclUtil.decodeBase64(encrypted.ephemeralPubKey);

  const plaintext = nacl.box.open(
    ciphertext,
    nonce,
    ephemeralPubKey,
    keyPair.secretKey
  );

  if (!plaintext) throw new Error("Decryption failed");

  return naclUtil.encodeUTF8(plaintext);
}

export function generateKey(length: number = 32): string {
  const key = crypto.randomBytes(length);
  return key.toString("base64"); // you can also return hex if you prefer
}

// ------------------- DEMO -------------------
// export const password = "superSecret123!";
export const salt = "unique-user-salt"; // must be stable per user

// Generate keypair (client-side)
// const { publicKey } = generateKeyPairFromPassword(password, salt);
// console.log("Public key:", publicKey);

// // Encrypt (server-side)
// const encrypted = encrypt(publicKey, "Hello secure world!");
// console.log("Encrypted:", encrypted);

// // Decrypt (client-side)
// const decrypted = decrypt(password, salt, encrypted);
// console.log("Decrypted:", decrypted);


export async function handleEncrypt({data,passphrase}:{data:string,passphrase:string}) {
  const res = await fetch("/clientserver/encryptKey", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, passphrase}),
  });

  const encrypted = await res.json();
  console.log("Encrypted:", encrypted);
  return encrypted
}
export async function handleEncryptEnv({data,passphrase}:{data:Record<string,string>,passphrase:string}) {
  const res = await fetch("/clientserver/encryptEnv", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, passphrase}),
  });

  const encrypted = await res.json();
  console.log("Encryptedenv:", encrypted);
  return encrypted
}

export async function handleDecrypt({encrypted,passphrase}:{encrypted: any,passphrase:String}) {
  console.log("mmmmm",encrypted,passphrase)
  const res = await fetch("/clientserver/decryptKey", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({encrypted, passphrase }),
  });

  const decrypted = await res.json();
  console.log("Decrypted:", decrypted);
  // throw("")
  return decrypted?.result
}
export async function generateKeyPair() {

  const res = await fetch("/clientserver/generateKeypair", {
    method: "POST",
    headers: { "Content-Type": "application/json" },

  });

  const decrypted = await res.json();
  console.log("Decrypted:", decrypted);
  // throw("")
  return decrypted
}
export async function handleDecryptEnv({encrypted,passphrase}:{encrypted: any,passphrase:String}) {
  console.log(encrypted,passphrase)
  const res = await fetch("/clientserver/decryptEnv", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({encrypted, passphrase }),
  });

  const decrypted = await res.json();
  console.log("Decrypted:", decrypted);
  // throw("")
  return decrypted?.result
}
export async function handleDecryptKeyPairData({encrypted,secretKey}:{encrypted: any,secretKey:String}) {
  console.log(encrypted,secretKey)
  const res = await fetch("/clientserver/decryptKeyPair", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({encrypted, privateKey:secretKey }),
  });

  const encryptedData = await res.json();
  console.log("encrypted:", encryptedData);
  // throw("")
  return encryptedData
}
export async function handleEncryptKeyPairData({message,publicKey}:{message: any,publicKey:String}) {
  console.log(message,publicKey)
  const res = await fetch("/clientserver/encryptKeyPair", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({message, publicKey }),
  });

  const decrypted = await res.json();
  console.log("Decrypted:", decrypted);
  // throw("")
  return decrypted
}

export function deriveKey(passphrase: string, salt: Buffer) {
  return crypto.scryptSync(passphrase, salt, 32);
}


export const updateQueryParam = (key: string, value: string | number) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value.toString());
  window.history.pushState({}, "", url.toString());
};

export const updateQueryUrl = (url) => {
  // const url = new URL(window.location.href);
  // url.searchParams.set(key, value.toString());
  window.history.pushState({}, "", url.toString());
};