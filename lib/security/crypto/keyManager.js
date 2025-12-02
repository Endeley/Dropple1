import crypto from "crypto";

export function generateKey() {
  return crypto.randomBytes(32);
}

export function wrapKey(key, wrappingKey) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", wrappingKey, iv);
  const enc = Buffer.concat([cipher.update(key), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv: iv.toString("base64"), tag: tag.toString("base64"), key: enc.toString("base64") };
}
