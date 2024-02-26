import React, {ReactElement} from 'react';
import {FormControl, Grid, IconButton, MenuItem, Select, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import {CriteriaType} from "./enums";
import {Criteria} from "./types";
import {conditionSettings, titleSettings} from "./data";
import Remove from "@mui/icons-material/Remove";

interface CriteriaRowProps {
  criteria: Criteria;
  onChange: (fieldName: string, newValue: string) => void;
  remove: () => void;
}

interface DropdownTypeProps {
  value: string,
  options: {label: string, value: string}[],
  onDropdownChange: (newValue: string) => void;
}

interface CriteriaTypeProps {
  criteria: Criteria;
  onChange: (fieldName: string, newValue: string) => void;
  remove: () => void;
}

interface CriteriaContainerProps {
  criteria: Criteria;
  optionsName: string;
  onChange: (fieldName: string, newValue: string) => void;
  remove: () => void;
  children: ReactElement;
}

interface BasicProps {
  criteria: Criteria;
  titleOptions: {label: string, value: string}[];
  conditionOptions: {label: string, value: string}[];
  onChange: (fieldName: string, newValue: string) => void;
}

const Dropdown: React.FC<DropdownTypeProps> = ({value, options, onDropdownChange}) => (
    <FormControl fullWidth size="small" variant="outlined">
      <Select
          value={value}
          onChange={(e) => onDropdownChange(e.target.value as string)}
      >
        {options.map(({label, value}) =>
            <MenuItem value={value}>{label}</MenuItem>
        )}
      </Select>
    </FormControl>
);

const BasicFields: React.FC<BasicProps> = ({criteria, titleOptions, conditionOptions, onChange}) => (
    <>
      <Grid item xs={4} style={{paddingRight: '5px'}}>
        <Dropdown value={criteria.title} options={titleOptions} onDropdownChange={(newValue) => onChange('title', newValue)} />
      </Grid>
      <Grid item xs={4} style={{paddingRight: '5px'}}>
        <Dropdown value={criteria.condition} options={conditionOptions} onDropdownChange={(newValue) => onChange('condition', newValue)} />
      </Grid>
    </>
);

const get  = (type: string, settings: any) => {
  switch (type) {
    case "DATE": {
      return settings.dateOptions
    }
    case "TEXT": {
      return settings.textOptions
    }
    case "NUMBER": {
      return settings.numberOptions
    }
  }
}
const CriteriaContainer: React.FC<CriteriaContainerProps>  = ({ criteria, optionsName, onChange, children, remove }) => (
    <Grid container>
      <BasicFields criteria={criteria}
                   titleOptions={get(criteria.type, titleSettings)}
                   conditionOptions={get(criteria.type, conditionSettings)}
                   onChange={onChange}/>
      <Grid item xs={3} style={{paddingRight: '5px'}}>
        {children}
      </Grid>
      <Grid item xs={1}>
        <IconButton size="small" onClick={remove}
                    style={{ backgroundColor: '#F24583', color: 'white', borderRadius: 10, padding: '9px' }}>
          <Remove fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
);
const NumberCriteria: React.FC<CriteriaTypeProps> = ({criteria, onChange, remove}) => (
    <CriteriaContainer criteria={criteria} optionsName={'numberOptions'} onChange={onChange} remove={remove}>
      <TextField
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={criteria.value}
          onChange={(e) => onChange('value', e.target.value)}
      />
    </CriteriaContainer>);
const TextCriteria: React.FC<CriteriaTypeProps> = ({criteria, onChange, remove}) => (
    <CriteriaContainer criteria={criteria} optionsName={'textOptions'} onChange={onChange} remove={remove}>
      <TextField
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          value={criteria.value}
          onChange={(e) => onChange('value', e.target.value)}
      />
    </CriteriaContainer>);

const DateCriteria: React.FC<CriteriaTypeProps> = ({criteria, onChange, remove}) => (
    <CriteriaContainer criteria={criteria} optionsName={'dateOptions'} onChange={onChange} remove={remove}>
      <DatePicker
          slotProps={{ textField: { size: 'small' } }}
          value={criteria?.value}
          onChange={(value) => onChange('value', value)}
      />
    </CriteriaContainer>);

const CriteriaRow: React.FC<CriteriaRowProps> = ({ criteria, onChange, remove }) => {
  return (
      <Grid container>
        { criteria.type === CriteriaType.NUMBER && <NumberCriteria criteria={criteria} onChange={onChange} remove={remove} />}
        { criteria.type === CriteriaType.DATE && <DateCriteria criteria={criteria} onChange={onChange} remove={remove}/>}
        { criteria.type === CriteriaType.TEXT && <TextCriteria criteria={criteria} onChange={onChange} remove={remove}/>}
      </Grid>
  );
};

export default CriteriaRow;
