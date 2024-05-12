async function encryptData(plainText, key, ivHex) {
  // Key와 IV를 ArrayBuffer로 변환합니다.
  const keyBuffer = Buffer.from(key, 'base64');
  const iv = new Uint8Array(Buffer.from(ivHex, 'hex'));

  // CryptoKey 객체를 가져오거나 생성합니다.
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw', // 키 형식
    keyBuffer, // 키 데이터
    { name: 'AES-GCM', length: 256 }, // { 알고리즘 이름과 키 길이 }
    false, // 키를 추출할 수 있는지 여부
    ['encrypt'] // 키 사용 용도
  );

  // 텍스트를 ArrayBuffer로 변환합니다.
  const encodedText = new TextEncoder().encode(plainText);

  // 데이터를 암호화합니다.
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    cryptoKey,
    encodedText
  );

  // 암호화된 데이터를 base64 문자열로 변환하여 반환합니다.
  return Buffer.from(encryptedData).toString('base64');
}
