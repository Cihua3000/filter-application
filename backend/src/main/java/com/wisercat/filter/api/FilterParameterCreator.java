package com.wisercat.filter.api;

import com.wisercat.filter.api.validator.NumberCriteria;
import com.wisercat.filter.api.validator.TextCriteria;
import com.wisercat.filter.api.validator.CriteriaValidator;
import com.wisercat.filter.api.validator.DateCriteria;
import com.wisercat.filter.enumerator.CriteriaType;
import com.wisercat.filter.domain.Criteria;
import com.wisercat.filter.domain.Filter;
import com.wisercat.util.DateTimeUtil;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
class FilterParameterCreator {

  private final CriteriaValidator<NumberCriteria> numericValidator;
  private final CriteriaValidator<TextCriteria> textValidator;
  private final CriteriaValidator<DateCriteria> dateValidator;
  private final DateTimeUtil dateTimeUtil;

  Filter of(FilterRequest request) {
    return Filter.builder()
        .name(request.getName())
        .selection(request.getSelection())
        .criteria(toCriteriaSet(request))
        .build();
  }

  private List<Criteria> toCriteriaSet(FilterRequest request) {
    var textCriteria = request.getTextCriteria().stream()
        .map(this::toTextCriteria);
    var numericCriteria = request.getNumberCriteria().stream()
        .map(this::toNumberCriteria);
    var dateCriteria = request.getDateCriteria().stream()
        .map(this::toDateCriteria);
    var joinedCriteria = Stream.concat(
        Stream.concat(textCriteria, numericCriteria)
        , dateCriteria);
    return Optional.of(joinedCriteria)
        .map(criteria -> joinedCriteria.toList())
        .orElseThrow(throwMandatoryCriteriaException());
  }

  private Supplier<RuntimeException> throwMandatoryCriteriaException() {
    return () -> new RuntimeException("Criteria is mandatory field");
  }


  private Criteria toNumberCriteria(NumberCriteria criteria) {
    numericValidator.validate(criteria);
    return Criteria.builder()
        .title(criteria.getTitle())
        .value(String.valueOf(criteria.getValue()))
        .type(CriteriaType.NUMBER)
        .condition(criteria.getCondition().name())
        .build();
  }

  private Criteria toTextCriteria(TextCriteria criteria) {
    textValidator.validate(criteria);
    return Criteria.builder()
        .title(criteria.getTitle())
        .value(criteria.getValue())
        .type(CriteriaType.TEXT)
        .condition(criteria.getCondition().name())
        .build();
  }

  private Criteria toDateCriteria(DateCriteria criteria) {
    dateValidator.validate(criteria);
    return Criteria.builder()
        .title(criteria.getTitle())
        .value(dateTimeUtil.formatDate(criteria.getValue()))
        .type(CriteriaType.DATE)
        .condition(criteria.getCondition().name())
        .build();
  }

}
