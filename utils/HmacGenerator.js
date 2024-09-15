const crypto = require("crypto");
class HMACGenerator {
  constructor() {
    this.key = crypto.randomBytes(32).toString("hex");
  }
  generateHMAC(message) {
    return crypto.createHmac("sha256", this.key).update(message).digest("hex");
  }
  getKey() {
    return this.key;
  }
}
module.exports = HMACGenerator;
