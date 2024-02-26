import React, {useState} from 'react';
import {Chip, Dialog, DialogContent, DialogTitle, IconButton} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import {CriteriaType} from "./enums";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (choice: CriteriaType) => void;
}

const labels = [
    {value:CriteriaType.NUMBER, label:'Numeric'},
  {value:CriteriaType.TEXT, label:'Text'},
  {value:CriteriaType.DATE, label:'Date'}]

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipClick = (value:CriteriaType, label:string) => {
    setSelectedChips((prevChips) =>
        prevChips.includes(label)
            ? prevChips.filter((chip) => chip !== label)
            : [...prevChips, label]
    );

    setTimeout(() => {
      onConfirm(value);
      setSelectedChips([])
    }, 100);
  };
  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          Choose criteria type
          <IconButton onClick={onClose} sx={{cursor: 'pointer', marginLeft: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{paddingTop: '15px' }} dividers>
          {labels.map(({value, label}) => <Chip style={{'width': '100px', 'marginRight': '5px'}}
                                  label={label}
                                  onClick={() => handleChipClick(value, label)}
                                  color={selectedChips.includes(label) ? 'primary' : 'default'}
          />)}
        </DialogContent>
      </Dialog>
  );
};

export default ConfirmationDialog;
