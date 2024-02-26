package com.wisercat.filter.api.validator;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wisercat.filter.enumerator.DateCondition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DateCriteria {

  @NotBlank
  private String title;

  @NotNull
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate value;

  @NotNull
  private DateCondition condition;

}
