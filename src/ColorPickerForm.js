import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    picker: {
        width: "100% !important",
        marginTop: "2rem"
    },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    colorNameInput: {
        width: "100%",
        height: "70px"
    }
}
function ColorPickerForm({ paletteIsFull, createColor, colors, classes }) {
    const [currentColor, setCurrentColor] = useState("teal")
    const [newColorName, setNewColorName] = useState("")

    function updateCurrentColor(newColor) {
        setCurrentColor(newColor.hex)
    }

    function handleChange(e) {
        setNewColorName(e.target.value)
    }

    function handleSubmit() {
        const newColor = {
            color: currentColor,
            name: newColorName
        };
        createColor(newColor)
        setNewColorName("")
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
            colors.every(
                ({ color }) => color !== currentColor
            )
        );
    })


    return (
        <div>
            <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} className={classes.picker} />
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator 
                    value={newColorName}
                    className={classes.colorNameInput} 
                    placeholder="Color Name"
                    onChange={handleChange}
                    variant="filled"
                    margin="normal"
                    validators={[
                        "required", 
                        "isColorNameUnique", 
                        "isColorUnique"
                    ]}
                    errorMessages={[
                        "Enter a color name",
                        "Color name must be unique", 
                        "Color already used"
                    ]}
                    />
                <Button variant="contained" color="primary" disabled={paletteIsFull} className={classes.addColor} style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }} type="submit">
                {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default withStyles(styles)(ColorPickerForm);