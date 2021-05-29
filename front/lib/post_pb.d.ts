import * as jspb from 'google-protobuf'



export class Body extends jspb.Message {
  getId(): number;
  setId(value: number): Body;

  getDate(): string;
  setDate(value: string): Body;

  getUserid(): number;
  setUserid(value: number): Body;

  getWeight(): number;
  setWeight(value: number): Body;

  getFat(): number;
  setFat(value: number): Body;

  getCreated(): string;
  setCreated(value: string): Body;

  getUpdated(): string;
  setUpdated(value: string): Body;

  getUpdatedCase(): Body.UpdatedCase;

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
    userid: number,
    weight: number,
    fat: number,
    created: string,
    updated: string,
  }

  export enum UpdatedCase { 
    _UPDATED_NOT_SET = 0,
    UPDATED = 7,
  }
}

export class Meal extends jspb.Message {
  getId(): number;
  setId(value: number): Meal;

  getUserid(): number;
  setUserid(value: number): Meal;

  getDate(): string;
  setDate(value: string): Meal;

  getCreated(): string;
  setCreated(value: string): Meal;

  getUpdated(): string;
  setUpdated(value: string): Meal;

  getUpdatedCase(): Meal.UpdatedCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Meal.AsObject;
  static toObject(includeInstance: boolean, msg: Meal): Meal.AsObject;
  static serializeBinaryToWriter(message: Meal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Meal;
  static deserializeBinaryFromReader(message: Meal, reader: jspb.BinaryReader): Meal;
}

export namespace Meal {
  export type AsObject = {
    id: number,
    userid: number,
    date: string,
    created: string,
    updated: string,
  }

  export enum UpdatedCase { 
    _UPDATED_NOT_SET = 0,
    UPDATED = 5,
  }
}

export class Mealdetail extends jspb.Message {
  getId(): number;
  setId(value: number): Mealdetail;

  getMealid(): number;
  setMealid(value: number): Mealdetail;

  getTime(): string;
  setTime(value: string): Mealdetail;

  getName(): string;
  setName(value: string): Mealdetail;

  getCalorie(): number;
  setCalorie(value: number): Mealdetail;

  getProtein(): number;
  setProtein(value: number): Mealdetail;

  getCarbohydrate(): number;
  setCarbohydrate(value: number): Mealdetail;

  getLipid(): number;
  setLipid(value: number): Mealdetail;

  getCreated(): string;
  setCreated(value: string): Mealdetail;

  getUpdated(): string;
  setUpdated(value: string): Mealdetail;

  getUpdatedCase(): Mealdetail.UpdatedCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Mealdetail.AsObject;
  static toObject(includeInstance: boolean, msg: Mealdetail): Mealdetail.AsObject;
  static serializeBinaryToWriter(message: Mealdetail, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Mealdetail;
  static deserializeBinaryFromReader(message: Mealdetail, reader: jspb.BinaryReader): Mealdetail;
}

export namespace Mealdetail {
  export type AsObject = {
    id: number,
    mealid: number,
    time: string,
    name: string,
    calorie: number,
    protein: number,
    carbohydrate: number,
    lipid: number,
    created: string,
    updated: string,
  }

  export enum UpdatedCase { 
    _UPDATED_NOT_SET = 0,
    UPDATED = 10,
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

export class GetBodyListRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): GetBodyListRequest;

  getMonth(): string;
  setMonth(value: string): GetBodyListRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBodyListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBodyListRequest): GetBodyListRequest.AsObject;
  static serializeBinaryToWriter(message: GetBodyListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBodyListRequest;
  static deserializeBinaryFromReader(message: GetBodyListRequest, reader: jspb.BinaryReader): GetBodyListRequest;
}

export namespace GetBodyListRequest {
  export type AsObject = {
    userId: number,
    month: string,
  }
}

export class GetBodyListResponse extends jspb.Message {
  getBodylistList(): Array<Body>;
  setBodylistList(value: Array<Body>): GetBodyListResponse;
  clearBodylistList(): GetBodyListResponse;
  addBodylist(value?: Body, index?: number): Body;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBodyListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBodyListResponse): GetBodyListResponse.AsObject;
  static serializeBinaryToWriter(message: GetBodyListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBodyListResponse;
  static deserializeBinaryFromReader(message: GetBodyListResponse, reader: jspb.BinaryReader): GetBodyListResponse;
}

export namespace GetBodyListResponse {
  export type AsObject = {
    bodylistList: Array<Body.AsObject>,
  }
}

export class CreateMealRequest extends jspb.Message {
  getId(): number;
  setId(value: number): CreateMealRequest;

  getUserid(): number;
  setUserid(value: number): CreateMealRequest;

  getDate(): string;
  setDate(value: string): CreateMealRequest;

  getMealdetailList(): Array<Mealdetail>;
  setMealdetailList(value: Array<Mealdetail>): CreateMealRequest;
  clearMealdetailList(): CreateMealRequest;
  addMealdetail(value?: Mealdetail, index?: number): Mealdetail;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMealRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMealRequest): CreateMealRequest.AsObject;
  static serializeBinaryToWriter(message: CreateMealRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMealRequest;
  static deserializeBinaryFromReader(message: CreateMealRequest, reader: jspb.BinaryReader): CreateMealRequest;
}

export namespace CreateMealRequest {
  export type AsObject = {
    id: number,
    userid: number,
    date: string,
    mealdetailList: Array<Mealdetail.AsObject>,
  }
}

export class CreateMealResponse extends jspb.Message {
  getTxt(): string;
  setTxt(value: string): CreateMealResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMealResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMealResponse): CreateMealResponse.AsObject;
  static serializeBinaryToWriter(message: CreateMealResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMealResponse;
  static deserializeBinaryFromReader(message: CreateMealResponse, reader: jspb.BinaryReader): CreateMealResponse;
}

export namespace CreateMealResponse {
  export type AsObject = {
    txt: string,
  }
}

