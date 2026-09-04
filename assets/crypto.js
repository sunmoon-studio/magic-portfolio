/* ============================================================
 * 作品集双站 · 简历加密（浏览器端，零依赖、零服务器）
 * 算法：PBKDF2(SHA-256, 10万次) → AES-256-GCM
 * 关键：明文永不进源码。简历内容预先加密成密文存储，
 *       只有密码能在访客浏览器里当场解密。
 * 注意：浏览器在 file:// 下会禁用 crypto.subtle，
 *       预览/使用时请通过本地服务器或 https 地址打开。
 * ============================================================ */
(function () {
  'use strict';

  function hasSubtle() {
    return !!(window.crypto && window.crypto.subtle);
  }

  function b64encode(buf) {
    var bytes = new Uint8Array(buf);
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function b64decode(s) {
    var bin = atob(s);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function deriveKey(pass, saltBuf) {
    return window.crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return window.crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: saltBuf, iterations: 100000, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
        );
      });
  }

  function encryptText(text, pass) {
    var salt = window.crypto.getRandomValues(new Uint8Array(16));
    var iv = window.crypto.getRandomValues(new Uint8Array(12));
    return deriveKey(pass, salt).then(function (key) {
      return window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, new TextEncoder().encode(text));
    }).then(function (ct) {
      return { salt: b64encode(salt.buffer), iv: b64encode(iv.buffer), data: b64encode(ct) };
    });
  }

  function decryptText(obj, pass) {
    var salt = b64decode(obj.salt);
    var iv = b64decode(obj.iv);
    return deriveKey(pass, salt).then(function (key) {
      return window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, b64decode(obj.data));
    }).then(function (pt) {
      return new TextDecoder().decode(pt);
    });
  }

  window.ResumeCrypto = {
    hasSubtle: hasSubtle,
    encryptText: encryptText,
    decryptText: decryptText
  };
})();
