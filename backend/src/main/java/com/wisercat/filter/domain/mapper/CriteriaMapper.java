package com.wisercat.filter.domain.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisercat.filter.domain.CriteriaDto;
import java.util.Arrays;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CriteriaMapper {

    public List<CriteriaDto> mapCriteriaArray(String jsonCriteria) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            CriteriaDto[] criteriaArray = objectMapper.readValue(jsonCriteria, CriteriaDto[].class);
            return Arrays.asList(criteriaArray);
        } catch (Exception e) {
            log.debug("Cannot parse criteria: %s".formatted(e.getMessage()));
            return null;
        }
    }
}
