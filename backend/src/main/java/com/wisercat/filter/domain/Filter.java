package com.wisercat.filter.domain;

import com.wisercat.filter.enumerator.SelectionName;
import java.util.List;
import lombok.Builder;

@Builder
public record Filter (String name
    , SelectionName selection
    , List<Criteria> criteria) {

}
