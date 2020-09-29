import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom' 
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

function NewPaletteForm({ classes, savePalette, palettes }) {
    const [open, setOpen] = useState(false)
    const [currentColor, setCurrentColor] = useState('teal')
    const [colors, setColors] = useState([{color: "blue", name: "blue"}])
    const [newName, setNewName] = useState('')
    const [newPaletteName, setNewPaletteName] = useState('')

    const history = useHistory()
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    function updateCurrentColor(newColor) {
        setCurrentColor(newColor.hex)
    }

    function createColor() {
        const newColor = {
            color: currentColor, 
            name: newName}
        setColors([...colors, newColor])
        setNewName("")
    }

    function handleChange(e) {
        setNewName(e.target.value)
    }

    function handlePaletteNameChange(e) {
        setNewPaletteName(e.target.value)
    }

    function removeColor(colorName) {
        setColors(colors.filter(color => color.name !== colorName))
    }

    function handleSubmit() {
        let newName = newPaletteName
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors: colors
        }
        savePalette(newPalette)
        history.push("/")
    }

    function onSortEnd({ oldIndex, newIndex }) {
      setColors(arrayMove(colors, oldIndex, newIndex))
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
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    );
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
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator label="Palette Name" name="newPaletteName" value={newPaletteName} onChange={handlePaletteNameChange} validators={["required", "isPaletteNameUnique"]} errorMessages={["Enter Palette Name", "Name already used"]} />
            <Button variant="contained" color="primary" type="submit">
                Save Palette
            </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">
            Design Your Palette
          </Typography>
          <div>
          <Button variant="contained" color="secondary">Clear Palette</Button>
          <Button variant="contained" color="primary">Random Color</Button>
          </div>
          <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor}/>
            <ValidatorForm onSubmit={createColor}>
                <TextValidator 
                    value={newName} 
                    onChange={handleChange}
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
                <Button variant="contained" color="primary" style={{ backgroundColor: currentColor }} type="submit">
                Add Color
                </Button>
            </ValidatorForm>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        <div className={classes.drawerHeader} />
        <DraggableColorList 
          colors={colors} 
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
        </main>
      </div>
    )
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm)