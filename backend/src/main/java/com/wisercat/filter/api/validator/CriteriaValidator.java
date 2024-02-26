package com.wisercat.filter.api.validator;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class CriteriaValidator<T> {

  private final Validator validator;

  CriteriaValidator() {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    validator = factory.getValidator();
  }

  public void validate(T criteria) {
    Set<ConstraintViolation<T>> violations = validator.validate(criteria);
    violations.stream().findFirst()
        .ifPresent(violation -> {
          log.error("Validation error of field \"{}\": {} ", violation.getPropertyPath(), violation.getMessage());
          throw new RuntimeException("Validation error: %s %s"
              .formatted(violation.getPropertyPath().toString(), violation.getMessage()));
        });
  }
}
