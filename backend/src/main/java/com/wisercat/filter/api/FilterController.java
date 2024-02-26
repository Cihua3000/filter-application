package com.wisercat.filter.api;

import com.wisercat.filter.FilterService;
import com.wisercat.filter.domain.FilterDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/filter")
class FilterController {

  private final FilterParameterCreator parameterCreator;
  private final FilterService filterService;

  @GetMapping()
  List<FilterDto> getList() {
    return filterService.getList();
  }

  @PostMapping()
  void save(@RequestBody FilterRequest request) {
    var filter = parameterCreator.of(request);
    filterService.save(filter);
  }

}

