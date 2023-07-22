/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/export */
/* eslint-disable max-classes-per-file */
declare module "lamejs" {
  export function Mp3Encoder(
    channels: number,
    samplerate: number,
    kbps: number
  ): void;
  export class Mp3Encoder {
    constructor(channels: number, samplerate: number, kbps: number);
    encodeBuffer: (left: Int16Array, right?: Int16Array) => Int8Array;

    flush: () => Int8Array;
  }
  export function WavHeader(): void;
  export class WavHeader {
    dataOffset: number;

    dataLen: number;

    channels: number;

    sampleRate: number;
  }
  export namespace WavHeader {
    const RIFF: number;
    const WAVE: number;
    const fmt_: number;
    const data: number;
    function readHeader(dataView: any): WavHeader;
  }
}
