package com.wisercat.filter.api.validator;

import com.wisercat.filter.enumerator.NumberCondition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NumberCriteria {

  @NotBlank
  private String title;

  @Numeric
  private Object value;

  @NotNull
  private NumberCondition condition;

}
