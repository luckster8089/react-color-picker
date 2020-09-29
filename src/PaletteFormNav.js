import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navButtons: {

  }
});

function PaletteFormNav({ classes, open, handleDrawerOpen, palettes, handleSubmit }) {
    const [newPaletteName, setNewPaletteName] = useState('')

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
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navButtons}>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <TextValidator label="Palette Name" name="newPaletteName" value={newPaletteName} onChange={handlePaletteNameChange} validators={["required", "isPaletteNameUnique"]} errorMessages={["Enter Palette Name", "Name already used"]} />
            <Button variant="contained" color="primary" type="submit">
                Save Palette
            </Button>
            </ValidatorForm>
            <Link to="/">
            <Button variant="contained" color="secondary">Go Back</Button>
            </Link>
            </div>
        </AppBar>
        </div>
    )
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)
