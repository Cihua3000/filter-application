package com.wisercat.filter;

import com.wisercat.filter.domain.Filter;
import com.wisercat.filter.domain.FilterDto;
import java.util.List;

public interface FilterService {

  List<FilterDto> getList();

  void save(Filter filter);

}
