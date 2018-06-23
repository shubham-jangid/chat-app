const { generateMessage, generateLocationMessage } = require("./message");

describe("generate message", () => {
  test(" should generate correct message", () => {
    var message = generateMessage("hii", "hello");
    expect(message.from).toBe("hii");
    expect(message.text).toBe("hello");
    expect(typeof message.createdAt).toBe("number");
  });
});

describe("generate location message", () => {
  test("should generate correct location", () => {
    var from = "ram";
    var latitude = 13;
    var longitude = 15;
    var url = "https://www.google.com/maps?q=13,15";

    var message = generateLocationMessage(from, latitude, longitude);
    expect(message.url).toBe(url);
  });
});
