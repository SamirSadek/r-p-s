const crypto = require("crypto");

class HMACGenerator {
  constructor() {
    this.key = this.generateKey();
  }
  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }
  generateHMAC(message) {
    return crypto.createHmac("sha256", this.key).update(message).digest("hex");
  }

  getKey() {
    return this.key;
  }
}

module.exports = HMACGenerator;
