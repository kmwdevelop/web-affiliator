import moment from "moment";

export const generateHmac = async (method, url, secretKey, accessKey) => {
  const parts = url.split(/\?/);
  const [path, query = ""] = parts;

  // 현재 UTC 시간을 API에서 요구하는 형식으로 생성
  const datetime = moment.utc().format("YYYYMMDDTHHmmss[Z]"); // YYYYMMDDTHHmmssZ 형식으로 수정
  const message = datetime + method + path + query;

  // HMAC 생성
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretKey);
  const messageData = encoder.encode(message);

  // HMAC SHA-256 생성
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, messageData);

  // Buffer를 hex 문자열로 변환
  const signatureArray = new Uint8Array(signatureBuffer);
  const signature = Array.from(signatureArray)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  // 최종 서명 문자열 생성
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
};
