package com.wisercat.filter.domain;

import java.util.List;
import lombok.Builder;

@Builder
public record FilterDto (
    String name
    , String selection
    , List<CriteriaDto> criteria) {

}
