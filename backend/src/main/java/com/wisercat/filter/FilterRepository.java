package com.wisercat.filter;

import com.wisercat.filter.domain.Criteria;
import com.wisercat.filter.domain.Filter;
import com.wisercat.filter.domain.FilterDto;
import com.wisercat.filter.domain.mapper.CriteriaMapper;
import jakarta.transaction.Transactional;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
class FilterRepository {

  private final JdbcTemplate jdbcTemplate;
  private final CriteriaMapper criteriaMapper;

  List<FilterDto> findAll() {
    return jdbcTemplate.query(
        """
            SELECT
                f.name,
                f.selection,
                json_agg(
                        json_build_object(
                                'title', c.title,
                                'type', c.type,
                                'value', c.value,
                                'condition', c.condition
                        )
                ) AS criteria
            FROM
                filter f
                    JOIN
                criteria c ON f.id = c.filter_id and c.is_active = true
            WHERE f.is_active = true
            GROUP BY
                f.id;
            """
        , getFilterRowMapper()
    );
  }

  @Transactional
  void insert(Filter filter) {
    var createdFilterId = insertFilterRecord(filter);
    insertCriteria(createdFilterId, filter.criteria());
  }

  private Long insertFilterRecord(Filter filter) {
    KeyHolder keyHolder = new GeneratedKeyHolder();
    jdbcTemplate.update(con -> {
          var preparedStatement = con.prepareStatement(
          """
          insert into filter(name, selection)
          values (?, ?) 
          """, Statement.RETURN_GENERATED_KEYS);
          preparedStatement.setString(1, filter.name());
          preparedStatement.setString(2, filter.selection().name());
          return preparedStatement;
        }, keyHolder
    );
    return ((Number) Objects.requireNonNull(keyHolder.getKeys()).get("id")).longValue();
  }

  private int insertCriteria(Long createdFilterId, List<Criteria> criteria) {
    var criteriaValuesSql = criteria.stream().map(c-> "(%s, '%s', '%s', '%s', '%s')".formatted(
            createdFilterId
            , c.title()
            , c.type().name()
            , c.value()
            , c.condition()))
        .collect(Collectors.joining(", "));
    var sql = String.format(
        """
        INSERT INTO criteria(filter_id, title, type, value, condition) VALUES %s
        """, criteriaValuesSql);
    log.debug("Insert criteria sql: {}", sql);
    return jdbcTemplate.update(sql);
  }

  private RowMapper<FilterDto> getFilterRowMapper() {
    return (rs, rowNum) -> FilterDto.builder()
        .name(rs.getString("name"))
        .selection(rs.getString("selection"))
        .criteria(criteriaMapper.mapCriteriaArray(rs.getString("criteria")))
        .build();
  }
}
