package com.wisercat.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Component;

@Component
public class DateTimeUtil {

  private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(
      "yyyy-MM-dd");

  public LocalDate parseLocalDate(String dateTime) {
    return LocalDate.parse(dateTime, DATE_TIME_FORMATTER);
  }

  public String formatDate(LocalDate dateTime) {
    return dateTime.format(DATE_TIME_FORMATTER);
  }
}
