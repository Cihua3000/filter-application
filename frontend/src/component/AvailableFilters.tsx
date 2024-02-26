import React from 'react';
import FilterDetails from './FilterDetails';
import {Filter} from "./types";
import {Grid} from "@mui/material";


interface AvailableFiltersProps {
  filters: Filter[];
}
const AvailableFilters: React.FC<AvailableFiltersProps> = ({filters}) => {
  return (
      <div>
        <Grid container>
          {filters?.map((filter, id) => (
              <FilterDetails key={id} filter={filter}/>
          ))}
        </Grid>
      </div>
  );
};

export default AvailableFilters;
