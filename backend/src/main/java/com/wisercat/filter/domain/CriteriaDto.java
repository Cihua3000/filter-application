package com.wisercat.filter.domain;

import lombok.Builder;

@Builder
public record CriteriaDto(
    String title
    , String type
    , String value
    , String condition) {

}
