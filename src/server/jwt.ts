import * as crypto from "crypto";

/**
 * Obviously not cryptographically secure!
 * @param {number} length
 * @returns {String} moin master
 */
function randomString(length: number): String {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++)
    result += characters[Math.random() * characters.length];
  return result;
}
const toBase64 = (str: string): string => Buffer.from(str).toString("base64");
const fromBase64 = (str: string): string =>
  Buffer.from(str, "base64").toString("ascii");
const hash = (str: string): string =>
  crypto.createHash("md5").update(str).digest("hex");
const isJson = (str: string): boolean => {
  try {
    return !!JSON.parse(str);
  } catch (e) {
    return false;
  }
};
const newJwt = (payload: object, secret: string): string => {
  if (!secret)
    throw new Error(
      "newJwt() was called with invalid secret, an instance of newJwtMint() was probably called before the secret finished generating"
    );
  const encodedPayload = toBase64(JSON.stringify(payload));
  return encodedPayload + "." + hash(encodedPayload + "." + toBase64(secret));
};
const jwtAuth = (jwtToken: string, secret: string): object | false => {
  if (typeof jwtToken !== "string" || !jwtToken.includes(".")) return false;
  if (!secret)
    throw new Error(
      "isJwtValid() was called with invalid secret, an instance of newJwtMint() was probably called before the secret finished generating"
    );
  const possiblyJson = fromBase64(jwtToken.split(".")[0]);

  if (!isJson(possiblyJson)) return false;

  const payload = JSON.parse(fromBase64(jwtToken.split(".")[0]));
  if (Date.now() > payload.expiryDate) return false;
  return newJwt(payload, secret) === jwtToken ? payload : false;
};
const newSecret = async (): Promise<string> =>
  new Promise((resolve, _) => {
    crypto.randomBytes(64, (err, buffer) => {
      if (err) throw err;
      resolve(buffer.toString("hex"));
    });
  });
async function newJwtMint() {
  let secret = await newSecret();
  return {
    new: (payload: object) => newJwt(payload, secret),
    auth: (token: string) => jwtAuth(token, secret),
    newSecret: () => newSecret().then(res => (secret = res)),
  };
}
export { newJwtMint, hash, isJson, randomString };
