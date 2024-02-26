package com.wisercat.filter;

import com.wisercat.filter.domain.Filter;
import com.wisercat.filter.domain.FilterDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
class FilterServiceImpl implements FilterService{

  private final FilterRepository repository;

  @Override
  public List<FilterDto> getList() {
    return repository.findAll();
  }

  @Override
  public void save(Filter filter) {
    repository.insert(filter);
  }
}
