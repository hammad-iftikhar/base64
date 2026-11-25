# base64

A Base64 encoder/decoder in TypeScript, written by hand from the
[Wikipedia article](https://en.wikipedia.org/wiki/Base64). No AI, no libraries, no `btoa`/`atob`.

I wrote it to check whether I can still write code without AI, or whether my brain has gone rusty.

## Usage

```ts
import { Base64 } from "./base64";

Base64.encode("Hello"); // "SGVsbG8="
Base64.decode("SGVsbG8="); // "Hello"
```

## How it works

- **Encode:** turn each character into 8 bits, cut the bit string into 6-bit groups, and map each group
  to one of the 64 characters `A–Z a–z 0–9 + /`. If the input length isn't a multiple of 3, add zero bits
  to fill the last group and `=` padding.
- **Decode:** do the same in reverse. Map each character back to 6 bits, drop the padding, and read the
  bits back 8 at a time.

## Plan

- [ ] UTF-8 support. Right now it only handles characters in the 0–255 range (ASCII/Latin-1), so emoji
      and most non-Latin text won't round-trip.
- [ ] URL-safe variant, which uses `-` and `_` instead of `+` and `/`.
