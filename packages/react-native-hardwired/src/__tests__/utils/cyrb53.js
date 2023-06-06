import hashFunction from "../../utils/cyrb53.js";

describe("Hash Function", () => {
  it("should generate different hashes for different strings", () => {
    const strings = ["hello", "world", "test", "example"];
    const hashes = new Set();

    strings.forEach((str) => {
      const hash = hashFunction(str);
      hashes.add(hash);
    });

    expect(hashes.size).toBe(strings.length);
  });

  it("should have a low chance of hash overlap", () => {
    const numStrings = 1000;
    const stringLength = 10;
    const strings = Array.from({ length: numStrings }, () =>
      Math.random()
        .toString(36)
        .substring(2, stringLength + 2)
    );

    const hashes = new Set();

    strings.forEach((str) => {
      const hash = hashFunction(str);
      hashes.add(hash);
    });

    const expectedUniqueHashes = Math.min(strings.length, 2 ** 32);
    const uniqueHashes = hashes.size;
    const overlapChance = 1 - uniqueHashes / expectedUniqueHashes;
    const maxOverlapChance = 0.01;

    expect(overlapChance).toBeLessThan(maxOverlapChance);
  });
});
