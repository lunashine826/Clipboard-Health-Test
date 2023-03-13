const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns default partition key when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("secret");
  });
  it("Returns hashed string when given string 'hello'", () => {
    const trivialKey = deterministicPartitionKey("hello");
    expect(trivialKey).toBe("ea80224d30664a6d5d6ed2460016177b429fdce58b820ecf490d470718e28886291085ef696f338781821c81cdeff08577a0acec0ff1906e05505d17a1d129a0");
  });
  it("Returns hashed string when given object '{ foo: \"bar\" }'", () => {
    const trivialKey = deterministicPartitionKey({ foo: "bar" });
    expect(trivialKey).toBe("a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8");
  });
  it("Returns string 'foo' when given object '{ partitionKey: \"foo\" }'", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "foo" });
    expect(trivialKey).toBe("foo");
  });
  it("Returns another hashed string when given object '{ partitionKey: 257+ length string }'", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "1a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8" });
    expect(trivialKey).toBe("0a9b6f6b203d473e890150e9b6bd89122b3c7f4df5a5307176cea4d940aeb72892ce2a1ba465092da49472d4ba29d15c6944860f586af9971b07c81bc9eaa7fe");
  });
});
