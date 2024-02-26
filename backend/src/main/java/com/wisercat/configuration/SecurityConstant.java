package com.wisercat.configuration;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
abstract class SecurityConstant {

  static final String API_ENDPOINT = "/api/v1/**";

  static final String[] ALLOWED_UNAUTHORIZED_ENDPOINTS = {
      API_ENDPOINT
  };

}
