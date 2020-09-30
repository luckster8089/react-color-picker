import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function PaletteMetaForm({ palettes, handleSubmit }) {
    const [open, setOpen] = useState(true);
    const [newPaletteName, setNewPaletteName] = useState('')

    function handleClickOpen() {
      setOpen(true);
    };
  
    function handleClose() {
      setOpen(false);
    };

    function handlePaletteNameChange(e) {
        setNewPaletteName(e.target.value)
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
        palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        ));
    })
  
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
                Please enter a name for your one of a kind new palette. Make sure it is unique!
            </DialogContentText>
            <TextValidator 
                label="Palette Name" 
                name="newPaletteName" 
                value={newPaletteName} 
                onChange={handlePaletteNameChange}
                fullWidth
                margin="normal"
                validators={["required", "isPaletteNameUnique"]} 
                errorMessages={["Enter Palette Name", "Name already used"]} 
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
                Save Palette
            </Button>
          </DialogActions>
          </ValidatorForm> 
        </Dialog>
    );
  }
