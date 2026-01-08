// utils/ecc.ts
import { webcrypto as nodeCrypto } from 'crypto';

const cryptoLib: SubtleCrypto =
  (typeof window !== 'undefined' && window.crypto?.subtle
    ? window.crypto.subtle
    : nodeCrypto.subtle) as unknown as SubtleCrypto;


/** Convert ArrayBuffer → Base64 */
function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/** Convert Base64 → ArrayBuffer */
function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Generate ECC P-256 key pair
 * @returns {publicKey: string (Base64), privateKey: CryptoKey}
 */
export async function generateECCKeyPair() {
  // Generate P-256 key pair
  const keyPair = await cryptoLib.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-256',
    },
    true, // extractable (needed to export public key)
    ['deriveKey', 'deriveBits']
  );

  // Export raw public key (ArrayBuffer)
  const rawPublicKey = await cryptoLib.exportKey('raw', keyPair.publicKey);

  // Convert to Base64 for sending in headers / GET
  const publicKeyBase64 = arrayBufferToBase64(rawPublicKey);

  return {
    publicKey: publicKeyBase64,
    privateKey: keyPair.privateKey,
  };
}


export async function encryptWithECC(recipientPublicKeyBase64: string, message: string) {
  // Import recipient public key
  const publicKey = await cryptoLib.importKey(
    'raw',
    base64ToArrayBuffer(recipientPublicKeyBase64),
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    []
  );

  // Generate ephemeral key for this message
  const ephemeralKey = await cryptoLib.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    ['deriveKey']
  );

  // Derive shared secret
  const sharedKey = await cryptoLib.deriveKey(
    { name: 'ECDH', public: publicKey },
    ephemeralKey.privateKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt']
  );

  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await cryptoLib.encrypt({ name: 'AES-GCM', iv }, sharedKey, data);

  return {
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv),
    ephemeralPublicKey: arrayBufferToBase64(await cryptoLib.exportKey('raw', ephemeralKey.publicKey)),
  };
}
