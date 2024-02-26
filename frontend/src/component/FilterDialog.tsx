import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CriteriaRow from "./CriteriaRow";
import ConfirmationDialog from "./ConfirmationDialog";
import {Grid, IconButton, Typography} from "@mui/material";
import {CriteriaType, Selection} from "./enums";
import {Criteria} from "./types";
import {postFilter} from "../api/apiService";
import {getConditionByType, getTitleByType, selections} from "./data";
import {cloneDeep} from "lodash";

interface FieldInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterNameField: React.FC<FieldInputProps> = ({ value, onChange }) => {
  return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} >
          <Typography variant="h6" fontWeight="bold">
            Filter name
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
              size="small"
              value={value}
              onChange={onChange}
              fullWidth
              margin="normal"
              variant="outlined"
          />
        </Grid>
      </Grid>
  );
};

const Section: React.FC<FieldInputProps> = ({ value, onChange }) => {
  return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} >
          <Typography variant="h6" fontWeight="bold">
            Selection
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <RadioGroup
              row aria-label="selection"
              name="selection"
              value={value}
              onChange={onChange}
          >
            {selections.map(({gender, label}) =>
              <FormControlLabel value={gender} control={<Radio/>} label={label}/>)}
          </RadioGroup>
        </Grid>
      </Grid>
  );
};

interface ActionProps {
  onClose: () => void;
  handleSaveFilter: () => void;
}

const ActionButtons: React.FC<ActionProps> = ({ onClose, handleSaveFilter }) => {
  return (
      <>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveFilter} color="primary">
          Save
        </Button>
      </>
  );
};

interface CriteriaBlockProps {
  criteriaList: Criteria[];
  openDialog: () => void;
  onRowValueChanged: (rowId: number, fieldName: string, newValue: string) => void;
  removeCriteria: (rowId: number) => void;
}

const CriteriaBlock: React.FC<CriteriaBlockProps> = ({ criteriaList, openDialog, onRowValueChanged, removeCriteria }) => {
  return (
      <Grid container spacing={2} alignItems="top">
        <Grid item xs={3} style={{top: '0'}} >
          <Typography variant="h6" fontWeight="bold">
            Criteria
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            {criteriaList.map((row, index) =>
                <Grid item key={index} xs={12} style={{ paddingTop: '15px'}}>
                  <CriteriaRow criteria={row}
                               onChange={(fieldName, value) => onRowValueChanged(index, fieldName, value)}
                               remove={() => removeCriteria(index)}/>
                </Grid>)}
            <Grid item xs={12} alignItems="center" style={{ paddingTop: '15px'}}>
              <Button variant="contained" onClick={openDialog} color="primary">
                Add row
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
};

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  refresh: (callback: () => void) => void;
}

const initFormSettings = {
  openConfirmation: false,
  invalidForm: false,
  defaultCriteria: {
    title: getTitleByType(CriteriaType.TEXT)[0].value,
    value: null,
    type: CriteriaType.TEXT,
    condition: getConditionByType(CriteriaType.TEXT)[0].value
  } as Criteria,
  defaultFormData: {
    name: '',
    selection: Selection.ONE,
    textCriteria: [],
    numberCriteria: [],
    dateCriteria: [],
  }
}
const FilterDialog: React.FC<FilterDialogProps> = ({open, onClose, refresh}) => {
  const [openConfirmation, setOpenConfirmation] = useState(initFormSettings.openConfirmation);
  const [invalidForm, setInvalidForm] = useState(initFormSettings.invalidForm);
  const [criteriaRows, setCriteriaRows] = useState<Criteria[]>([initFormSettings.defaultCriteria]);
  const [formData, setFormData] = useState<{ [key: string]: any }>(initFormSettings.defaultFormData);

  const resetForm = () => {
    const setting = cloneDeep(initFormSettings);
    setOpenConfirmation(setting.openConfirmation);
    setInvalidForm(setting.invalidForm);
    setCriteriaRows([setting.defaultCriteria]);
    setFormData(setting.defaultFormData);
  }

  const closeAndResetForm = () => {
    onClose();
    resetForm();
  }

  const handleSaveFilter = () => {
    setInvalidForm(false);
    formData["textCriteria"] = criteriaRows.filter(c => c.type === "TEXT")
    formData["dateCriteria"] = criteriaRows.filter(c => c.type === "DATE")
    formData["numberCriteria"] = criteriaRows.filter(c => c.type === "NUMBER").map(c => {
      c.value = Number(c.value)
      return c;
    })
    console.log('formData:', formData);
    postFilter(formData).then((data) => {
      if(data === null) {
        setInvalidForm(true);
        return;
      }
      refresh(closeAndResetForm)
    });
  };

  const handleFieldChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const addCriteriaByType = (type: CriteriaType) => {
    setCriteriaRows([...criteriaRows, {
      title: getTitleByType(type)[0].value,
      value: null,
      type: type.valueOf(),
      condition: getConditionByType(type)[0].value
    } as Criteria]);
  };

  const removeCriteria = (id: number) => {
    setCriteriaRows( criteriaRows.filter((record, index) => index !== id));
  }

  const handleCloseConfirmationDialog = (choice: CriteriaType) => {
    addCriteriaByType(choice);
    setOpenConfirmation(false);
  };

  const rowValueChanged = (rowId: number, fieldName: string, newValue: string) => {
    setCriteriaRows(prevRecords =>
        prevRecords.map((criteria, index) =>
            index === rowId ? { ...criteria, [fieldName]: newValue } : criteria
        )
    );
  };

  return (
      <Dialog open={open} onClose={closeAndResetForm} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Filter
          {invalidForm && <Button variant="outlined" startIcon={<WarningIcon/>} color="warning" style={{marginLeft: '20px'}}>
             Invalid form
          </Button>}
          <IconButton onClick={closeAndResetForm} sx={{cursor: 'pointer', marginLeft: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{overflowY: 'auto'}} dividers>
          <FilterNameField value={formData.name} onChange={(e) => handleFieldChange("name", e)} />
          <Section value={formData.selection} onChange={(e) => handleFieldChange("selection", e)} />
          <CriteriaBlock criteriaList={criteriaRows}
                         openDialog={() => setOpenConfirmation(true)}
                         onRowValueChanged={rowValueChanged}
                         removeCriteria={removeCriteria}/>
          <ConfirmationDialog
              open={openConfirmation}
              onConfirm={handleCloseConfirmationDialog}
              onClose={() => setOpenConfirmation(false)}/>
        </DialogContent>
        <DialogActions>
          <ActionButtons onClose={closeAndResetForm}
                         handleSaveFilter={handleSaveFilter} />
        </DialogActions>
      </Dialog>
  );
};

export default FilterDialog;
