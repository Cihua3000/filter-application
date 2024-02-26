package com.wisercat.filter.domain;

import com.wisercat.filter.enumerator.CriteriaType;
import lombok.Builder;

@Builder
public record Criteria(
    String title
    , String condition
    , String value
    , CriteriaType type) {

}
