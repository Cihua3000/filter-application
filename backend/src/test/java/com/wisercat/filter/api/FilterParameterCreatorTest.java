package com.wisercat.filter.api;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.wisercat.filter.api.validator.CriteriaValidator;
import com.wisercat.filter.api.validator.DateCriteria;
import com.wisercat.filter.api.validator.NumberCriteria;
import com.wisercat.filter.api.validator.TextCriteria;
import com.wisercat.filter.domain.Criteria;
import com.wisercat.filter.domain.Filter;
import com.wisercat.filter.enumerator.CriteriaType;
import com.wisercat.filter.enumerator.DateCondition;
import com.wisercat.filter.enumerator.NumberCondition;
import com.wisercat.filter.enumerator.SelectionName;
import com.wisercat.filter.enumerator.TextCondition;
import com.wisercat.util.DateTimeUtil;
import java.time.LocalDate;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class FilterParameterCreatorTest {

  private static final String NAME = "name";
  private static final SelectionName SELECTION_NAME = SelectionName.ONE;
  private static final String DATE_CRITERIA_TITLE = "date criteria title";
  private static final String NUMBER_CRITERIA_TITLE = "number criteria title";
  private static final String TEXT_CRITERIA_TITLE = "text criteria title";
  private static final String DATE = "2022-01-31";
  private static final LocalDate LOCAL_DATE = LocalDate.of(2022, 1, 31);
  private static final String SOME_TEXT = "some-text";
  private static final int NUMERIC_VALUE = 1;
  private static final NumberCondition NUMBER_CONDITION = NumberCondition.EQUALS;
  private static final TextCondition TEXT_CONDITION = TextCondition.EQUALS;
  private static final DateCondition DATE_CONDITION = DateCondition.EQUALS;
  private static final String EQUALS = "EQUALS";

  @Mock
  private CriteriaValidator<NumberCriteria> numericValidator;
  @Mock
  private CriteriaValidator<TextCriteria> textValidator;
  @Mock
  private CriteriaValidator<DateCriteria> dateValidator;
  @Mock
  private DateTimeUtil dateTimeUtil;

  @InjectMocks
  private FilterParameterCreator creator;


  @Test
  void createsParameters() {
    var dateCriteria = dateCriteria();
    var numberCriteria = numberCriteria();
    var textCriteria = textCriteria();
    var request = FilterRequest.builder()
        .name(NAME)
        .selection(SELECTION_NAME)
        .dateCriteria(Set.of(dateCriteria))
        .numberCriteria(Set.of(numberCriteria))
        .textCriteria(Set.of(textCriteria))
        .build();

    when(dateTimeUtil.formatDate(any())).thenReturn(DATE);

    var parameters = creator.of(request);

    assertThat(parameters)
        .returns(NAME, Filter::name)
        .returns(SELECTION_NAME, Filter::selection);

    assertThat(parameters.criteria().get(0))
        .returns(TEXT_CRITERIA_TITLE, Criteria::title)
        .returns(SOME_TEXT, Criteria::value)
        .returns(CriteriaType.TEXT, Criteria::type)
        .returns(EQUALS, Criteria::condition);

    assertThat(parameters.criteria().get(2))
        .returns(DATE_CRITERIA_TITLE, Criteria::title)
        .returns(DATE, Criteria::value)
        .returns(CriteriaType.DATE, Criteria::type)
        .returns(EQUALS, Criteria::condition);

    assertThat(parameters.criteria().get(1))
        .returns(NUMBER_CRITERIA_TITLE, Criteria::title)
        .returns("1", Criteria::value)
        .returns(CriteriaType.NUMBER, Criteria::type)
        .returns(EQUALS, Criteria::condition);

  }

  private DateCriteria dateCriteria() {
    return DateCriteria.builder()
            .title(DATE_CRITERIA_TITLE)
            .value(LOCAL_DATE)
            .condition(DATE_CONDITION)
            .build();
  }

  private TextCriteria textCriteria() {
    return TextCriteria.builder()
            .title(TEXT_CRITERIA_TITLE)
            .value(SOME_TEXT)
            .condition(TEXT_CONDITION)
            .build();
  }

  private NumberCriteria numberCriteria() {
    return NumberCriteria.builder()
            .title(NUMBER_CRITERIA_TITLE)
            .value(NUMERIC_VALUE)
            .condition(NUMBER_CONDITION)
            .build();
  }

}