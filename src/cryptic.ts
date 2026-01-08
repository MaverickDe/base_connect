const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;
const IV_LENGTH = 16;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;
import { scrypt } from "scrypt-js";
import * as cp from 'crypto'


//@ts-ignore
async function deriveKey(passphrase: string, salt: Uint8Array) {
  const passphraseBytes:any = new TextEncoder().encode(passphrase);

  // same params as Node's crypto.scryptSync(passphrase, salt, 32)
  const keyBytes:any = await scrypt(passphraseBytes, salt, 16384, 8, 1, 32);
const keyBuffer = Uint8Array.from(keyBytes).buffer;
  return crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function deriveKeyString(passphrase: string, salt: string) {
  const passphraseBytes = new TextEncoder().encode(passphrase);
  const saltBytes = new TextEncoder().encode(salt);

  // Derive 32-byte key
  const keyBytes: any = await scrypt(passphraseBytes, saltBytes, 16384, 8, 1, 32);

  // Convert Uint8Array to hex string
  let hex = "";
  for (const b of keyBytes) {
    hex += b.toString(16).padStart(2, "0");
  }

  return hex;
  // const passphraseBytes = new TextEncoder().encode(passphrase);
  // const saltBytes = new TextEncoder().encode(salt); // same as Buffer.from(salt, "utf8")

  // // Same params as Node's crypto.scryptSync(passphrase, salt, 32)
  // const keyBytes: any = await scrypt(passphraseBytes, saltBytes, 16384, 8, 1, 32);

  // const keyBuffer = Uint8Array.from(keyBytes).buffer;

  // return crypto.subtle.importKey(
  //   "raw",
  //   keyBuffer,
  //   { name: "AES-GCM" },
  //   false,
  //   ["encrypt", "decrypt"]
  // );
}
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}
// function hexToBytes(hex: string): Uint8Array {
//   if (hex.length % 2 !== 0) {
//     throw new Error("Invalid hex string");
//   }
//   const bytes = new Uint8Array(hex.length / 2);
//   for (let i = 0; i < hex.length; i += 2) {
//     bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
//   }
//   return bytes;
// }
// function hexToBytes(hex: string): Uint8Array {
//   if (!hex) return new Uint8Array();  // guard clause
//   const bytes = new Uint8Array(hex.length / 2);
//   for (let i = 0; i < bytes.length; i++) {
//     bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
//   }
//   return bytes;
// }


// function handleDecryptEnv({encrypted,passphrase}:{encrypted: any,passphrase:String})
export async function handleDecryptEnv(
{encrypted,passphrase}:{  encrypted: Record<string, string>,
  passphrase: string}
): Promise<Record<string, string>> {


    let {
    title,
    value,
    salt,
    ivTitle,
    ivValue,
    authTagTitle,
    authTagValue,
  }   = encrypted



  const saltBuf = hexToBytes(salt);
  const key = await deriveKey(passphrase, saltBuf);

  // Ciphertext + authTag combined
 
 
 
//  console.log(hexToBytes(ivValue).length)
 
 
  const titleCiphertext = new Uint8Array([
    ...hexToBytes(title),
    ...hexToBytes(authTagTitle),
  ]);

  const valueCiphertext = new Uint8Array([
    ...hexToBytes(value),
    ...hexToBytes(authTagValue),
  ]);
 



  // Decrypt title
  
  const titlePlain = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv: hexToBytes(ivTitle) as any},
    key,
    titleCiphertext
  );


  const decryptedTitle = new TextDecoder().decode(titlePlain);

  // Decrypt value
  const valuePlain = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv: hexToBytes(ivValue) as any },
    key,
    valueCiphertext
  );
  const decryptedValue = new TextDecoder().decode(valuePlain);


  return { title: decryptedTitle, value: decryptedValue };

}

function randomBytes(len: number): Uint8Array {
  const buf = new Uint8Array(len);
  crypto.getRandomValues(buf);
  return buf;
}

// helper: bytes <-> hex
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function handleEncryptEnv({data:obj,passphrase:secretPhrase}:
{  data: Record<string, string>,
  passphrase: string}
): Promise<Record<string, string>> {
  // Generate a random salt
  const salt = randomBytes(16);

  // Derive a key
  const key = await deriveKey(secretPhrase, salt);

  const title = obj.title;
  const value = obj.value;

  // Random IVs (must be 12 bytes for AES-GCM)
  const iv1 = randomBytes(12);
  const iv2 = randomBytes(12);

  // --- Encrypt title ---
  const titleEnc = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv1 as any },
    key,
    new TextEncoder().encode(title)
  );
  const titleBytes = new Uint8Array(titleEnc);

  // split ciphertext + authTag
  const authTagLen = 16; // AES-GCM tag length = 128 bits
  const encryptedTitle = titleBytes.slice(0, -authTagLen);
  const authTag1 = titleBytes.slice(-authTagLen);

  // --- Encrypt value ---
  const valueEnc = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv2 as any },
    key,
    new TextEncoder().encode(value)
  );
  const valueBytes = new Uint8Array(valueEnc);

  const encryptedValue = valueBytes.slice(0, -authTagLen);
  const authTag2 = valueBytes.slice(-authTagLen);

let hash = await deriveKeyString(secretPhrase,title+value) 
let headhash = await deriveKeyString(secretPhrase,title)
  return {
    title: bytesToHex(encryptedTitle),
    value: bytesToHex(encryptedValue),
    salt: bytesToHex(salt),
    ivTitle: bytesToHex(iv1),
    ivValue: bytesToHex(iv2),
    authTagTitle: bytesToHex(authTag1),
    authTagValue: bytesToHex(authTag2),
    hash: hash,
    headhash: headhash,
  };
}




export async function handleEncrypt(

    {data:text,passphrase:secretPhrase,stringify}:{data:string,passphrase:string,stringify?:boolean}
//   text: string,
//   secretPhrase: string
): Promise<Record<string, string>|string> {
  const salt = randomBytes(16);
  const key = await deriveKey(secretPhrase, salt);

  // IV must be 12 bytes
  const iv = randomBytes(12);

  const encoded = new TextEncoder().encode(text);
  const encryptedBuf = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv:iv as any },
    key,
    encoded
  );

  const encryptedBytes = new Uint8Array(encryptedBuf);

  // Separate ciphertext and authTag (last 16 bytes)
  const authTagLen = 16;
  const ciphertext = encryptedBytes.slice(0, -authTagLen);
  const authTag = encryptedBytes.slice(-authTagLen);

  let payload = {
    ciphertext: bytesToHex(ciphertext),
    iv: bytesToHex(iv),
    salt: bytesToHex(salt),
    authTag: bytesToHex(authTag),
  };

  if(stringify){
    
        const base64String = Buffer.from(JSON.stringify(payload)).toString("base64");
      return base64String;

  }

  return payload
}



export async function handleDecrypt(

    {encrypted:encryptedData,passphrase}:{encrypted: any,passphrase:string}
//   encryptedData: Record<string, string>,
//   passphrase: string
): Promise<string> {
  if(typeof encryptedData == "string"){
    const jsonStr = Buffer.from(encryptedData, "base64").toString("utf8");
    encryptedData = JSON.parse(jsonStr)
  }
  
  let { salt: saltHex, iv: ivHex, authTag: tagHex, encrypted, ciphertext } = encryptedData;
  const cipherHex = encrypted||encryptedData?.key||ciphertext; // fallback

  const salt = hexToBytes(saltHex);
  const iv = hexToBytes(ivHex);
  const tag = hexToBytes(tagHex);
  const ciphertextBytes = hexToBytes(cipherHex);

  // Combine ciphertext + tag (the format subtle.decrypt expects)
  const fullCipher = new Uint8Array([...ciphertextBytes, ...tag]);

  const key = await deriveKey(passphrase, salt);

  const decryptedBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv:iv as any },
    key,
    fullCipher
  );

  return new TextDecoder().decode(decryptedBuf);
}




export async function generateKeyPair() {
  // Generate RSA key pair
  // console.log(crypto)
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP", // you can also use RSA-PSS depending on use
      modulusLength: 2048, // same as Node
      publicExponent: new Uint8Array([1, 0, 1]), // 65537
      hash: "SHA-256", // recommended
    },
    true, // keys can be exported
    ["encrypt", "decrypt"] // usage
  );
// console.log(keyPair,"kepair")
  // Export public key (SPKI PEM)
  const spki = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const publicKeyPEM = spkiToPEM(spki);

  // Export private key (PKCS8 PEM)
  const pkcs8 = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  const privateKeyPEM = pkcs8ToPEM(pkcs8);

  return { publicKey: publicKeyPEM, privateKey: privateKeyPEM };
}
// generateKeyPair()
// Convert ArrayBuffer → PEM
function pemToHeaderSafe(pem: string) {
  return pem
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s+/g, '')          // remove all whitespace/newlines
    .replace(/\+/g, '-')           // Base64URL
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function spkiToPEM(spki: ArrayBuffer): string {
  const b64 = arrayBufferToBase64(spki);
  return `-----BEGIN PUBLIC KEY-----\n${b64}\n-----END PUBLIC KEY-----`;
}

function pkcs8ToPEM(pkcs8: ArrayBuffer): string {
  const b64 = arrayBufferToBase64(pkcs8);
  return `-----BEGIN PRIVATE KEY-----\n${b64}\n-----END PRIVATE KEY-----`;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).match(/.{1,64}/g)?.join("\n") || "";
}

// ---- PEM → CryptoKey helpers ----
async function importPublicKey(pem: string): Promise<CryptoKey> {
  const b64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, "")
    .replace(/-----END PUBLIC KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "spki",
    binary.buffer,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["encrypt"]
  );
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    binary.buffer,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["decrypt"]
  );
}

// ---- Encrypt with Public Key ----
export async function 
handleEncryptKeyPairData({message,publicKey:publicKeyPem}:{message: any,publicKey:string}): Promise<any> {
  const publicKey = await importPublicKey(publicKeyPem);
  const encoded = new TextEncoder().encode(message);

const encrypted = await crypto.subtle.encrypt(
  { name: "RSA-OAEP" },
  publicKey,
  encoded
);


  // Return Base64 string
  return{encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted)))};
}

// ---- Decrypt with Private Key ----
export async function handleDecryptKeyPairData({encrypted:encryptedBase64,secretKey:privateKeyPem}:{encrypted: any,secretKey:string})
// privateDecrypt(privateKeyPem: string, encryptedBase64: string)
: Promise<any> {
  const privateKey = await importPrivateKey(privateKeyPem);

  const encryptedBytes = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    encryptedBytes.buffer
  );

  return{decrypted: new TextDecoder().decode(decrypted)}
}



// let v = async ()=>{

//   let v =await generateKeyPair()
//   console.log(v)
// };

// v()

export async function handleEncryptKeyPairLongData({
  message,
  publicKey: publicKeyPem,
}: {
  message: any;
  publicKey: string;
}): Promise<string> {
  // --- Import RSA public key ---
  const publicKey = await importPublicKey(publicKeyPem);

  // --- Generate AES key ---
  const aesKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // --- Encrypt message with AES ---
  const jsonString = typeof message === "string" ? message : JSON.stringify(message);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(jsonString);
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encoded);

  // --- Encrypt AES key with RSA ---
  const rawAesKey = await crypto.subtle.exportKey("raw", aesKey);
  const encryptedAesKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawAesKey
  );

  // --- Combine all parts into one ArrayBuffer ---
  const combined = new Uint8Array(
    encryptedAesKey.byteLength + iv.byteLength + ciphertext.byteLength
  );
  combined.set(new Uint8Array(encryptedAesKey), 0);
  combined.set(iv, encryptedAesKey.byteLength);
  combined.set(new Uint8Array(ciphertext), encryptedAesKey.byteLength + iv.byteLength);

  // --- Return one Base64 string ---
  return btoa(String.fromCharCode(...combined));
}

            
export async function handleDecryptKeyPairLongData({
  encryptedString,
  privateKey: privateKeyPem,
}: {
  encryptedString: string;
  privateKey: string;
}): Promise<any> {
  const privateKey = await importPrivateKey(privateKeyPem);
  const encryptedBytes = Uint8Array.from(atob(encryptedString), (c) => c.charCodeAt(0));

  // You need to know how many bytes your RSA-encrypted AES key takes
  // For 2048-bit keys → 256 bytes
  const rsaKeySize = 256;
  const encryptedAesKey = encryptedBytes.slice(0, rsaKeySize);
  const iv = encryptedBytes.slice(rsaKeySize, rsaKeySize + 12);
  const ciphertext = encryptedBytes.slice(rsaKeySize + 12);

  // Decrypt AES key
  const rawAesKey = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    encryptedAesKey
  );

  const aesKey = await crypto.subtle.importKey(
    "raw",
    rawAesKey,
    { name: "AES-GCM" },
    true,
    ["decrypt"]
  );

  // Decrypt data
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    ciphertext
  );

  const decoded = new TextDecoder().decode(decrypted);
  try {
    return JSON.parse(decoded);
  } catch {
    return decoded;
  }
}
export function encryptPairLedegersData (data,publicKey){
    let isArray = Array.isArray(data)
  if(!isArray){
    data = [data]
  }
 let dat_ =  data.map( e => {

    let accNumber =e.accountNumber
    console.log(accNumber)
    let encryptedAccNumber =  handleEncryptKeyPairLongData({message:accNumber,publicKey:publicKey})
    console.log(encryptedAccNumber)
    e.accountNumber =encryptedAccNumber

    return e
  });
 isArray ?  null : dat_ = dat_[0]
  return dat_
}
export function decryptPairLedegersData (data, privateKey){
  console.log(data)
  let isArray = Array.isArray(data)
  if(!isArray){
    data = [data]
  }
 let dat_ =  data.map(e => {

    let accNumber =e.accountNumber
    console.log(e,"eeeeee")
    let encryptedAccNumber = handleDecryptKeyPairLongData({encryptedString:accNumber,privateKey:privateKey})
    e.accountNumber =encryptedAccNumber
    return e
  });
  isArray ?  null : dat_ = dat_[0]
  return dat_

}


// Helper


// function decodeBase64PEM(pem: string): ArrayBuffer {
//   const base64 = pem
//     .replace(/-----BEGIN [^-]+-----/, "")
//     .replace(/-----END [^-]+-----/, "")
//     .replace(/\s+/g, "");
//   const raw = atob(base64);
//   const buffer = new ArrayBuffer(raw.length);
//   const bytes = new Uint8Array(buffer);
//   for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
//   return buffer;
// }


import fs from "fs";
import path from "path";
export function generateUtilsKey(length: number = 32): string {
  const key = cp.randomBytes(length);
  return key.toString("base64"); // you can also return hex if you prefer
}

// import { generateKey as generateUtilsKey } from "./utils";

const DEVICE_ID_FILE = path.join(process.cwd(), ".device-id"); // hidden file in project root

export function getDeviceId(): string {
  // --- Browser ---
  if (typeof window !== "undefined" && window.localStorage) {
    let deviceId = localStorage.getItem("x-device-id");
    if (!deviceId) {
      deviceId = generateUtilsKey(); // generate UUID
      localStorage.setItem("x-device-id", deviceId);
    }
    return deviceId;
  }

  // --- Node.js ---
 

  throw new Error("Cannot generate device ID in this environment");
}
