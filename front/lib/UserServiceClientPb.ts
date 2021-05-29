/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb';


export class UserServiceClient {
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

  methodInfoGetUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.GetUsersResponse,
    (request: user_pb.GetUsersRequest) => {
      return request.serializeBinary();
    },
    user_pb.GetUsersResponse.deserializeBinary
  );

  getUsers(
    request: user_pb.GetUsersRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.GetUsersResponse>;

  getUsers(
    request: user_pb.GetUsersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.GetUsersResponse) => void): grpcWeb.ClientReadableStream<user_pb.GetUsersResponse>;

  getUsers(
    request: user_pb.GetUsersRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.GetUsersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/UserService/GetUsers',
        request,
        metadata || {},
        this.methodInfoGetUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/UserService/GetUsers',
    request,
    metadata || {},
    this.methodInfoGetUsers);
  }

  methodInfoCreateUser = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.CreateUserResponse,
    (request: user_pb.CreateUserRequest) => {
      return request.serializeBinary();
    },
    user_pb.CreateUserResponse.deserializeBinary
  );

  createUser(
    request: user_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.CreateUserResponse>;

  createUser(
    request: user_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.CreateUserResponse) => void): grpcWeb.ClientReadableStream<user_pb.CreateUserResponse>;

  createUser(
    request: user_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.CreateUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/UserService/CreateUser',
        request,
        metadata || {},
        this.methodInfoCreateUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/UserService/CreateUser',
    request,
    metadata || {},
    this.methodInfoCreateUser);
  }

  methodInfoGetUserById = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.GetUserByIdResponse,
    (request: user_pb.GetUserByIdRequest) => {
      return request.serializeBinary();
    },
    user_pb.GetUserByIdResponse.deserializeBinary
  );

  getUserById(
    request: user_pb.GetUserByIdRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.GetUserByIdResponse>;

  getUserById(
    request: user_pb.GetUserByIdRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.GetUserByIdResponse) => void): grpcWeb.ClientReadableStream<user_pb.GetUserByIdResponse>;

  getUserById(
    request: user_pb.GetUserByIdRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.GetUserByIdResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/UserService/GetUserById',
        request,
        metadata || {},
        this.methodInfoGetUserById,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/UserService/GetUserById',
    request,
    metadata || {},
    this.methodInfoGetUserById);
  }

  methodInfoDeleteUser = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.DeleteUserResponse,
    (request: user_pb.DeleteUserRequest) => {
      return request.serializeBinary();
    },
    user_pb.DeleteUserResponse.deserializeBinary
  );

  deleteUser(
    request: user_pb.DeleteUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.DeleteUserResponse>;

  deleteUser(
    request: user_pb.DeleteUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.DeleteUserResponse) => void): grpcWeb.ClientReadableStream<user_pb.DeleteUserResponse>;

  deleteUser(
    request: user_pb.DeleteUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.DeleteUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/UserService/DeleteUser',
        request,
        metadata || {},
        this.methodInfoDeleteUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/UserService/DeleteUser',
    request,
    metadata || {},
    this.methodInfoDeleteUser);
  }

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.LoginResponse,
    (request: user_pb.LoginRequest) => {
      return request.serializeBinary();
    },
    user_pb.LoginResponse.deserializeBinary
  );

  login(
    request: user_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.LoginResponse>;

  login(
    request: user_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<user_pb.LoginResponse>;

  login(
    request: user_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.LoginResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/UserService/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/UserService/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoGetUserBySession = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.GetUserBySessionResponse,
    (request: user_pb.GetUserBySessionRequest) => {
      return request.serializeBinary();
    },
    user_pb.GetUserBySessionResponse.deserializeBinary
  );

  getUserBySession(
    request: user_pb.GetUserBySessionRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.GetUserBySessionResponse>;

  getUserBySession(
    request: user_pb.GetUserBySessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.GetUserBySessionResponse) => void): grpcWeb.ClientReadableStream<user_pb.GetUserBySessionResponse>;

  getUserBySession(
    request: user_pb.GetUserBySessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.GetUserBySessionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/UserService/GetUserBySession',
        request,
        metadata || {},
        this.methodInfoGetUserBySession,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/UserService/GetUserBySession',
    request,
    metadata || {},
    this.methodInfoGetUserBySession);
  }

}

