import React, {useEffect, useState} from "react";
import AvailableFilters from "../component/AvailableFilters";
import FilterDialog from "../component/FilterDialog";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {Filter} from "../component/types";
import {getAvailableFilters} from "../api/apiService";

const HomePage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const refresh = (callback?: () => void) => {
    getAvailableFilters().then(data => {
      setFilters(data);
      if(callback) callback();
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleOpenFilterDialog = () => {
    setOpen(true);
  };

  return (
      <>
        <Grid container style={{padding: '20px'}}>
          <Grid item md={2} >
            <h1>Custom Filters</h1>
          </Grid>
          <Grid item md={3} style={{marginTop: '20px'}}>
            <Button variant="outlined" onClick={handleOpenFilterDialog}>Add Filter</Button>
          </Grid>
        </Grid>
        <AvailableFilters filters={filters}/>
        <FilterDialog open={open} onClose={() => setOpen(false)} refresh={refresh}/>
      </>
  );
};

export default HomePage;
