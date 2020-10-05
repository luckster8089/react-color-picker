import React, { useState } from 'react'
import { useHistory } from 'react-router-dom' 
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'
import { arrayMove } from 'react-sortable-hoc';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
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
    display: "flex",
    alignItems: "center",
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
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
    width: "50%"
  }
});

function NewPaletteForm({ classes, savePalette, palettes, maxColors }) {
    const [open, setOpen] = useState(false)
    const [colors, setColors] = useState(palettes[0].colors)
    const paletteIsFull = colors.length >= maxColors

    const history = useHistory()

    function handleDrawerOpen() {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    function createColor(newColor) {
      setColors([...colors, newColor])
    }

    function clearColors() {
      setColors([])
    }

    function addRandomColor() {
      // Flat: Combines everything into one array
      const allColors = palettes.map(p => p.colors).flat();
      const rand = Math.floor(Math.random() * allColors.length);
      const randomColor = allColors[rand]
      setColors([...colors, randomColor])
    }

    function handleSubmit(newPalette) {
      newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
      newPalette.colors = colors;
      savePalette(newPalette);
      history.push("/");
    }


    function removeColor(colorName) {
        setColors(colors.filter(color => color.name !== colorName))
    }

    function onSortEnd({ oldIndex, newIndex }) {
      setColors(arrayMove(colors, oldIndex, newIndex))
    }

    return (
      <div className={classes.root}>
        <PaletteFormNav open={open} palettes={palettes} handleSubmit={handleSubmit} handleDrawerOpen={handleDrawerOpen} />
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
          <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={clearColors}
            className={classes.button}
          >
            Clear Palette
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={addRandomColor}
            disabled={paletteIsFull}
            className={classes.button}
          >
            Random Color
          </Button>
          </div>
          <ColorPickerForm paletteIsFull={paletteIsFull} createColor={createColor} colors={colors} />
          </div>
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

NewPaletteForm.defaultProps = {
  maxColors: 20
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm)