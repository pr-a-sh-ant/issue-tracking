// Original file: src/proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AdminRegisterResponse as _user_AdminRegisterResponse, AdminRegisterResponse__Output as _user_AdminRegisterResponse__Output } from '../user/AdminRegisterResponse';
import type { LoginRequest as _user_LoginRequest, LoginRequest__Output as _user_LoginRequest__Output } from '../user/LoginRequest';
import type { LoginResponse as _user_LoginResponse, LoginResponse__Output as _user_LoginResponse__Output } from '../user/LoginResponse';
import type { RegisterRequest as _user_RegisterRequest, RegisterRequest__Output as _user_RegisterRequest__Output } from '../user/RegisterRequest';
import type { RegisterResponse as _user_RegisterResponse, RegisterResponse__Output as _user_RegisterResponse__Output } from '../user/RegisterResponse';

export interface UserServiceClient extends grpc.Client {
  CreateAdminUser(argument: _user_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_AdminRegisterResponse__Output>): grpc.ClientUnaryCall;
  CreateAdminUser(argument: _user_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_AdminRegisterResponse__Output>): grpc.ClientUnaryCall;
  CreateAdminUser(argument: _user_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_AdminRegisterResponse__Output>): grpc.ClientUnaryCall;
  CreateAdminUser(argument: _user_RegisterRequest, callback: grpc.requestCallback<_user_AdminRegisterResponse__Output>): grpc.ClientUnaryCall;
  createAdminUser(argument: _user_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_AdminRegisterResponse__Output>): grpc.ClientUnaryCall;
  createAdminUser(argument: _user_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_AdminRegisterResponse__Output>): grpc.ClientUnaryCall;
  createAdminUser(argument: _user_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_AdminRegisterResponse__Output>): grpc.ClientUnaryCall;
  createAdminUser(argument: _user_RegisterRequest, callback: grpc.requestCallback<_user_AdminRegisterResponse__Output>): grpc.ClientUnaryCall;
  
  LoginUser(argument: _user_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _user_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _user_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _user_LoginRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _user_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _user_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _user_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _user_LoginRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  
  RegisterUser(argument: _user_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_RegisterResponse__Output>): grpc.ClientUnaryCall;
  RegisterUser(argument: _user_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_RegisterResponse__Output>): grpc.ClientUnaryCall;
  RegisterUser(argument: _user_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_RegisterResponse__Output>): grpc.ClientUnaryCall;
  RegisterUser(argument: _user_RegisterRequest, callback: grpc.requestCallback<_user_RegisterResponse__Output>): grpc.ClientUnaryCall;
  registerUser(argument: _user_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_RegisterResponse__Output>): grpc.ClientUnaryCall;
  registerUser(argument: _user_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_RegisterResponse__Output>): grpc.ClientUnaryCall;
  registerUser(argument: _user_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_RegisterResponse__Output>): grpc.ClientUnaryCall;
  registerUser(argument: _user_RegisterRequest, callback: grpc.requestCallback<_user_RegisterResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateAdminUser: grpc.handleUnaryCall<_user_RegisterRequest__Output, _user_AdminRegisterResponse>;
  
  LoginUser: grpc.handleUnaryCall<_user_LoginRequest__Output, _user_LoginResponse>;
  
  RegisterUser: grpc.handleUnaryCall<_user_RegisterRequest__Output, _user_RegisterResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateAdminUser: MethodDefinition<_user_RegisterRequest, _user_AdminRegisterResponse, _user_RegisterRequest__Output, _user_AdminRegisterResponse__Output>
  LoginUser: MethodDefinition<_user_LoginRequest, _user_LoginResponse, _user_LoginRequest__Output, _user_LoginResponse__Output>
  RegisterUser: MethodDefinition<_user_RegisterRequest, _user_RegisterResponse, _user_RegisterRequest__Output, _user_RegisterResponse__Output>
}
