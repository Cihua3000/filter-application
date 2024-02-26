package com.wisercat.filter.api;

import com.wisercat.filter.api.validator.DateCriteria;
import com.wisercat.filter.api.validator.NumberCriteria;
import com.wisercat.filter.api.validator.TextCriteria;
import com.wisercat.filter.enumerator.SelectionName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
class FilterRequest {

  @NotBlank
  private String name;

  @NotNull
  private SelectionName selection;

  private Set<DateCriteria> dateCriteria;

  private Set<TextCriteria> textCriteria;

  private Set<NumberCriteria> numberCriteria;
}
