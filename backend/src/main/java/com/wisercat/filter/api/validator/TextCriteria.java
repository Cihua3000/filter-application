package com.wisercat.filter.api.validator;

import com.wisercat.filter.enumerator.TextCondition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TextCriteria {

  @NotBlank
  private String title;

  @NotBlank
  private String value;

  @NotNull
  private TextCondition condition;

}
