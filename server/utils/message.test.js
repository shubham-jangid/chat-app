const { generateMessage } = require("./message");

describe("generate message", () => {
  test(" should generate correct message", () => {
    var message = generateMessage("hii", "hello");
    expect(message.from).toBe("hii");
    expect(message.text).toBe("hello");
    expect(typeof message.createdAt).toBe("number");
  });
});
