import * as jspb from 'google-protobuf'



export class Body extends jspb.Message {
  getId(): number;
  setId(value: number): Body;

  getDate(): string;
  setDate(value: string): Body;

  getUserId(): number;
  setUserId(value: number): Body;

  getWeight(): number;
  setWeight(value: number): Body;

  getFat(): number;
  setFat(value: number): Body;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Body.AsObject;
  static toObject(includeInstance: boolean, msg: Body): Body.AsObject;
  static serializeBinaryToWriter(message: Body, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Body;
  static deserializeBinaryFromReader(message: Body, reader: jspb.BinaryReader): Body;
}

export namespace Body {
  export type AsObject = {
    id: number,
    date: string,
    userId: number,
    weight: number,
    fat: number,
  }
}

export class CreateBodyRequest extends jspb.Message {
  getId(): number;
  setId(value: number): CreateBodyRequest;

  getDate(): string;
  setDate(value: string): CreateBodyRequest;

  getUserId(): number;
  setUserId(value: number): CreateBodyRequest;

  getWeight(): number;
  setWeight(value: number): CreateBodyRequest;

  getFat(): number;
  setFat(value: number): CreateBodyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateBodyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateBodyRequest): CreateBodyRequest.AsObject;
  static serializeBinaryToWriter(message: CreateBodyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateBodyRequest;
  static deserializeBinaryFromReader(message: CreateBodyRequest, reader: jspb.BinaryReader): CreateBodyRequest;
}

export namespace CreateBodyRequest {
  export type AsObject = {
    id: number,
    date: string,
    userId: number,
    weight: number,
    fat: number,
  }
}

export class CreateBodyResponse extends jspb.Message {
  getTxt(): string;
  setTxt(value: string): CreateBodyResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateBodyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateBodyResponse): CreateBodyResponse.AsObject;
  static serializeBinaryToWriter(message: CreateBodyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateBodyResponse;
  static deserializeBinaryFromReader(message: CreateBodyResponse, reader: jspb.BinaryReader): CreateBodyResponse;
}

export namespace CreateBodyResponse {
  export type AsObject = {
    txt: string,
  }
}

