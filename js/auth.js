(function () {
  var SESSION_KEY = "site-session";
  var ACCOUNTS_KEY = "site-accounts";
  var INVALID_CREDENTIALS = "Неверная почта или пароль.";
  var UNSUPPORTED = "Браузер не поддерживает хранение пароля. Откройте сайт по HTTPS или через localhost.";

  function read(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function toHex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }

  function hashPassword(salt, password) {
    if (!window.crypto || !window.crypto.subtle) return Promise.reject(new Error(UNSUPPORTED));
    var bytes = new TextEncoder().encode(salt + ":" + password);
    return window.crypto.subtle.digest("SHA-256", bytes).then(toHex);
  }

  function randomSalt() {
    var bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    return toHex(bytes);
  }

  function getSession() {
    var session = read(SESSION_KEY, null);
    return session && typeof session.email === "string" ? session : null;
  }

  function signOut() {
    window.localStorage.removeItem(SESSION_KEY);
  }

  function register(name, email, password) {
    var key = email.toLowerCase();
    var accounts = read(ACCOUNTS_KEY, {});
    if (accounts[key]) return Promise.reject(new Error("Аккаунт с такой почтой уже существует."));
    var salt = randomSalt();
    return hashPassword(salt, password).then(function (hash) {
      accounts[key] = { name: name, email: key, salt: salt, hash: hash };
      write(ACCOUNTS_KEY, accounts);
      write(SESSION_KEY, { email: key, name: name });
    });
  }

  function login(email, password) {
    var key = email.toLowerCase();
    var account = read(ACCOUNTS_KEY, {})[key];
    if (!account) return Promise.reject(new Error(INVALID_CREDENTIALS));
    return hashPassword(account.salt, password).then(function (hash) {
      if (hash !== account.hash) throw new Error(INVALID_CREDENTIALS);
      write(SESSION_KEY, { email: account.email, name: account.name });
    });
  }

  window.SiteAuth = {
    getSession: getSession,
    signOut: signOut,
    register: register,
    login: login,
    SESSION_KEY: SESSION_KEY
  };
})();
