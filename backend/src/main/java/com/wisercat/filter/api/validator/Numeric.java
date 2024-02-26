package com.wisercat.filter.api.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = NumericValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Numeric {
  String message() default "Value must be an Integer, Float, or Double";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}

