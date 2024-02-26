import React from 'react';
import {FilterDetail} from "./types";
import {Card, CardContent, Grid, IconButton, Typography} from "@mui/material";

import AspectRatio from "@mui/icons-material/AspectRatio";
import AlarmOn from "@mui/icons-material/AlarmOn";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FilterIcon from "@mui/icons-material/Filter1";

const FilterDetails: React.FC<FilterDetail> = ({ filter }) => {
  return (
      <Grid item xs={3} sx={{
        margin: "20px"
      }}>
        <Card sx={{
          background: 'linear-gradient(45deg, #00509D 30%, #4682B4 90%)',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.2)',
          borderRadius: 8,
          color: 'white',
          height: '100%',
          padding: '10px',
        }}>
          <CardContent>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {filter.name}
              <IconButton sx={{cursor: 'pointer', marginLeft: 'auto' }}>
                <AspectRatio />
              </IconButton>
            </div>
            <Typography variant="body2" component="p" sx={{
              fontSize: '0.9rem',
            }}>
              Selection: {filter.selection}
            </Typography>
            <Typography variant="body2" component="p" sx={{
              fontSize: '0.9rem',
            }} style={{marginTop: '20px'}}>
              {filter.criteria.map((singleCriteria, index) => (
                  <div key={index} style={{padding: '5px'}}>
                    {singleCriteria.type === 'DATE' && <><AlarmOn/> {singleCriteria.title} {singleCriteria.condition} {singleCriteria.value} </>}
                    {singleCriteria.type === 'NUMBER' && <><FilterIcon/> {singleCriteria.title} {singleCriteria.condition} {singleCriteria.value} </>}
                    {singleCriteria.type === 'TEXT' && <><FormatColorTextIcon/> {singleCriteria.title} {singleCriteria.condition} {singleCriteria.value}</>}
                  </div>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

  );
};

export default FilterDetails;
