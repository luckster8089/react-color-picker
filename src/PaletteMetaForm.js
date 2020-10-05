import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

export default function PaletteMetaForm({ palettes, handleSubmit, hideForm }) {
    const [open, setOpen] = useState(true);
    const [stage ,setStage] = useState('form')
    const [newPaletteName, setNewPaletteName] = useState('')

    function handlePaletteNameChange(e) {
        setNewPaletteName(e.target.value)
    }

    function showEmojiPicker() {
      setStage('emoji')
    }

    function savePalette(emoji) {
      const newPalette = {
        paletteName: newPaletteName,
        emoji: emoji.native
      }
      handleSubmit(newPalette)
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
        palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        ));
    })
  
    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
          <DialogTitle>
            Pick a Palette Emoji
          </DialogTitle>
          <Picker onSelect={savePalette} />
        </Dialog>
        <Dialog open={stage === "form"} onClose={hideForm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={showEmojiPicker}>
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
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
                Save Palette
            </Button>
          </DialogActions>
          </ValidatorForm> 
        </Dialog>
        </div>
    );
  }
