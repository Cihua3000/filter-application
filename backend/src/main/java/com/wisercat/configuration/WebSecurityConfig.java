package com.wisercat.configuration;

import static com.wisercat.configuration.SecurityConstant.ALLOWED_UNAUTHORIZED_ENDPOINTS;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    var tokenRepository = new CookieCsrfTokenRepository();
    var delegate = createAttributeHandler();
    http
        .exceptionHandling(this::configureException)
        .csrf(configureCsrf(tokenRepository, delegate))
        .authorizeHttpRequests(this::configureAuthorization)
        .httpBasic(Customizer.withDefaults())
        .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
            SessionCreationPolicy.STATELESS));

    return http.build();
  }

  private void configureAuthorization(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry authorize) {
    authorize
        .requestMatchers(SecurityConstant.API_ENDPOINT).permitAll()
        .anyRequest().authenticated();
  }

  private void configureException(ExceptionHandlingConfigurer<HttpSecurity> exception) {
    exception.authenticationEntryPoint(this::unauthorizedRequestStatus);
  }

  private void unauthorizedRequestStatus(HttpServletRequest request
      , HttpServletResponse response
      , AuthenticationException exception) {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
  }


  private CsrfTokenRequestAttributeHandler createAttributeHandler() {
    var delegate = new CsrfTokenRequestAttributeHandler();
    delegate.setCsrfRequestAttributeName(null);
    return delegate;
  }

  private Customizer<CsrfConfigurer<HttpSecurity>> configureCsrf(
      CookieCsrfTokenRepository tokenRepository
      , CsrfTokenRequestAttributeHandler delegate) {
    return csrf -> {
      try {
        csrf
            .csrfTokenRepository(tokenRepository)
            .csrfTokenRequestHandler(delegate)
            .ignoringRequestMatchers(ALLOWED_UNAUTHORIZED_ENDPOINTS);
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    };
  }

}
