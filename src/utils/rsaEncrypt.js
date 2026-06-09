import JSEncrypt from 'jsencrypt';

// Java 后端公钥 (512-bit)
const JAVA_PUBLIC_KEY = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==';

// Go 后端公钥 (2048-bit, 从 private key 提取)
const GO_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7IXOfXcXLvtJdCFa4FbMj630pm8ALVAEtcbcOB66yQyqhiQdytCPmP7JMwYTTOVo0+pcQ0qHqS5U3FFzAj67hvtmg1FwO8CBiyTSdAW4OuCNi4M3Ab0T5OBdu/1QXbqS2C0DfATlVkDZrVuEW8yymO5i97BOvUBe2jYlfhXn91OkQXOZaKWvfGZHpPRbAeiM3M1SuBCc4UuNoKZE7Cde3N2WaJU7MgjjT6kasyF/fpRlH7QGfxIMKWXP3wct44HUkwwl0C/1NGYFiVzP11OSnFi0zQK1gg7fPaZbswziqB3IFZAMZFFHrPtEprYGPl0Z5DYsViINDb8awKGHTdmqawIDAQAB';

const encryptors = {};

function getEncryptor(key) {
  if (!encryptors[key]) {
    encryptors[key] = new JSEncrypt();
    encryptors[key].setPublicKey(key);
  }
  return encryptors[key];
}

/**
 * 使用指定公钥加密文本
 * @param {string} text - 明文
 * @param {string} key - 公钥（Base64）
 * @returns {string|false} - 密文（Base64）或失败时返回 false
 */
export function encryptWithKey(text, key) {
  return getEncryptor(key).encrypt(text);
}

/** 使用 Java 后端公钥加密（512-bit，保持向后兼容） */
export function encrypt(text) {
  return encryptWithKey(text, JAVA_PUBLIC_KEY);
}

/** 使用 Go 后端公钥加密（2048-bit） */
export function encryptForGo(text) {
  return encryptWithKey(text, GO_PUBLIC_KEY);
}
