package com.wisercat.configuration;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
class MvcConfig implements WebMvcConfigurer {

  @Value("${cors.allowed-origins}")
  private List<String> allowedOrigins;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    log.debug("Allowed origins: {}", allowedOrigins);
    registry
        .addMapping("/api/**")
        .allowedHeaders("*")
        .allowCredentials(true)
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedOrigins(getAllowedOrigins());
  }

  private String[] getAllowedOrigins() {
    var size = allowedOrigins.size();
    var array = new String[size];
    return allowedOrigins.toArray(array);
  }

}
