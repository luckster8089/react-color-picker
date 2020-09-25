import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

function App() {
  const [palettes, setPalettes] = useState(seedColors)

  function findPalette(id) {
    return palettes.find(function(palette) {
      return palette.id === id;
    })
  }

  function savePalette(newPalette) {
    setPalettes([...palettes, newPalette])
  }

  return (
    <Switch>
      <Route 
        exact 
        path="/palette/new"
        render={() => 
        <NewPaletteForm savePalette={savePalette} />}
      />
      <Route 
        exact 
        path="/" 
        render={() => 
          <PaletteList palettes={palettes} />} 
      />
      <Route 
        exact 
        path="/palette/:id" 
        render={routeProps => (
          <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette 
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
          />)}
      />
    </Switch>
  );
}

export default App;
