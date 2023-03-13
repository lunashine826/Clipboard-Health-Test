const crypto = require("crypto");

const DEFAULT_PARTITION_KEY = "secret";   // Default key when no input
const MAX_PARTITION_KEY_LENGTH = 256;     // Maximum length of key

// Returns hashed string from valid key
const hash = (str) => {
  return crypto.createHash("sha3-512").update(str).digest("hex");
}

exports.deterministicPartitionKey = (input) => {
  if (input == undefined || input == null) {
    // When no input
    return DEFAULT_PARTITION_KEY;
  }

  let keyFromInput = DEFAULT_PARTITION_KEY;
  if (input.partitionKey) {
    // When object includes partitionkey field
    keyFromInput = input.partitionKey;
    if (keyFromInput.length <= MAX_PARTITION_KEY_LENGTH) {
      // if input includes valid key
      return keyFromInput;
    }
  } else {
    // When object is a string or not includes partitionkey field
    keyFromInput = JSON.stringify(input);
  }
  return hash(keyFromInput);
};