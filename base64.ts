export class Base64 {

  private static characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

  private static convertBufferToString(buffer: string) {
    let result: string = "";

    for (let i = 0; i < buffer.length; i += 6) {
      let part = buffer.slice(i, i + 6);

      part.padStart(8, "0");

      const index = parseInt(part, 2);

      result += this.characters[index];
    }

    return result;
  }

  private static convertStringToBinary(input: string) {
    let result: string = "";

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      result += char.charCodeAt(0).toString(2).padStart(8, "0");
    }

    return result;
  }

  static getPadding(input: string): number {
    const charCount = input.split("=").length - 1;

    if (charCount > 2) {
      throw new Error("String is not correctly encoded");
    }

    if (charCount == 2) return 1;
    if (charCount == 1) return 2;

    return 0;
  }

  static encode(input: string): string {
    const len: number = input.length,
      leftover: number = len % 3,
      mainStr: string = input.slice(0, len - leftover),
      leftoverStr: string = input.slice(len - leftover);

    let buffer: string = this.convertStringToBinary(mainStr);

    let result = this.convertBufferToString(buffer);

    if (leftoverStr.length > 0) {
      buffer = this.convertStringToBinary(leftoverStr);

      buffer = buffer.padEnd(leftover == 1 ? 12 : 18, "0");

      result += this.convertBufferToString(buffer);

      result += "=".repeat(leftover == 1 ? 2 : 1);
    }

    return result;
  }

  static decode(input: string): string {

    const len: number = input.length;

    if (len % 4) throw new Error("String is not correctly encoded");

    const padding: number = this.getPadding(input);

    const mainStr: string = padding ? input.slice(0, len - (padding ^ 3)) : input;

    let buffer: string = "";

    for (let i = 0; i < mainStr.length; i++) {
      const char: string = mainStr[i];

      buffer += this.characters.indexOf(char).toString(2).padStart(6, "0");
    }

    let result: string = "";

    for (let i = 0; i < buffer.length; i += 8) {
      result += String.fromCharCode(parseInt(buffer.slice(i, i + 8), 2));
    }

    return result;
  }
}