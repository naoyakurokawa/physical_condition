/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as post_pb from './post_pb';


export class PostServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreateBody = new grpcWeb.AbstractClientBase.MethodInfo(
    post_pb.CreateBodyResponse,
    (request: post_pb.CreateBodyRequest) => {
      return request.serializeBinary();
    },
    post_pb.CreateBodyResponse.deserializeBinary
  );

  createBody(
    request: post_pb.CreateBodyRequest,
    metadata: grpcWeb.Metadata | null): Promise<post_pb.CreateBodyResponse>;

  createBody(
    request: post_pb.CreateBodyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: post_pb.CreateBodyResponse) => void): grpcWeb.ClientReadableStream<post_pb.CreateBodyResponse>;

  createBody(
    request: post_pb.CreateBodyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: post_pb.CreateBodyResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/PostService/CreateBody',
        request,
        metadata || {},
        this.methodInfoCreateBody,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/PostService/CreateBody',
    request,
    metadata || {},
    this.methodInfoCreateBody);
  }

  methodInfoGetBodyList = new grpcWeb.AbstractClientBase.MethodInfo(
    post_pb.GetBodyListResponse,
    (request: post_pb.GetBodyListRequest) => {
      return request.serializeBinary();
    },
    post_pb.GetBodyListResponse.deserializeBinary
  );

  getBodyList(
    request: post_pb.GetBodyListRequest,
    metadata: grpcWeb.Metadata | null): Promise<post_pb.GetBodyListResponse>;

  getBodyList(
    request: post_pb.GetBodyListRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: post_pb.GetBodyListResponse) => void): grpcWeb.ClientReadableStream<post_pb.GetBodyListResponse>;

  getBodyList(
    request: post_pb.GetBodyListRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: post_pb.GetBodyListResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/PostService/GetBodyList',
        request,
        metadata || {},
        this.methodInfoGetBodyList,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/PostService/GetBodyList',
    request,
    metadata || {},
    this.methodInfoGetBodyList);
  }

  methodInfoCreateMeal = new grpcWeb.AbstractClientBase.MethodInfo(
    post_pb.CreateMealResponse,
    (request: post_pb.CreateMealRequest) => {
      return request.serializeBinary();
    },
    post_pb.CreateMealResponse.deserializeBinary
  );

  createMeal(
    request: post_pb.CreateMealRequest,
    metadata: grpcWeb.Metadata | null): Promise<post_pb.CreateMealResponse>;

  createMeal(
    request: post_pb.CreateMealRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: post_pb.CreateMealResponse) => void): grpcWeb.ClientReadableStream<post_pb.CreateMealResponse>;

  createMeal(
    request: post_pb.CreateMealRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: post_pb.CreateMealResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/PostService/CreateMeal',
        request,
        metadata || {},
        this.methodInfoCreateMeal,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/PostService/CreateMeal',
    request,
    metadata || {},
    this.methodInfoCreateMeal);
  }

}

