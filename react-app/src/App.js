import './App.css';
import { useEffect, useState } from 'react';
import SelectColor from './components/SelectColor'
import Resistor from './components/Resistor';
import { getColorData, calculateResistance } from './services/colorCodeService';

const ResistanceCalculator = () => {
  const [colorData, setColorData] = useState([]);
  const [bandAColorId, setBandAColorId] = useState("");
  const [bandBColorId, setBandBColorId] = useState("");
  const [bandCColorId, setBandCColorId] = useState("");
  const [bandDColorId, setBandDColorId] = useState("");
  const [resistance, setResistance] = useState({resistance: '', tolerance: ''});
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });

  useEffect(() => {
    getColorData()
      .then(data => setColorData(data))
      .catch(err => console.error(err));
  }, []);

  const handleCalculateResistance = () => {
    if (bandAColorId && bandBColorId && bandCColorId && bandDColorId) {
      calculateResistance(bandAColorId, bandBColorId, bandCColorId, bandDColorId)
        .then(data => setResistance(data))
        .catch(err => console.error(err));
    } else {
      setResistance({resistance: 'Please select all values', tolerance: ''});
    }
  };

  return (
    <div className='main-container'>
      <h1>
        Resistor color code calculator
      </h1>
      <div className= 'selector-container'>
        <SelectColor 
          title="1st band"
          options={colorData.filter(item => item.firstDigit !== null)}
          onChange={(e) => setBandAColorId(e.target.value)}
        />
        
        <SelectColor 
          title="2nd band"
          options={colorData.filter(item => item.secondDigit !== null)}
          onChange={(e) => setBandBColorId(e.target.value)}
        />
        
        <SelectColor 
          title="Multiplier"
          options={colorData.filter(item => item.multiplier !== null)}
          onChange={(e) => setBandCColorId(e.target.value)}
        />
        
        <SelectColor 
          title="Tolerance"
          options={colorData.filter(item => item.tolerance !== null)}
          onChange={(e) => setBandDColorId(e.target.value)}
        />
      </div>
      <Resistor 
        bandAColor={colorData.find(item => item.id === parseInt(bandAColorId))?.color || 'transparent'}
        bandBColor={colorData.find(item => item.id === parseInt(bandBColorId))?.color || 'transparent'}
        bandCColor={colorData.find(item => item.id === parseInt(bandCColorId))?.color || 'transparent'}
        bandDColor={colorData.find(item => item.id === parseInt(bandDColorId))?.color || 'transparent'}
      />

      <button onClick={handleCalculateResistance}>Calculate</button>

      {resistance.resistance && <h3>Resistance: {(resistance.tolerance && resistance.resistance)? formatter.format(resistance.resistance) + ' Ohm' : resistance.resistance}</h3>}
      {resistance.tolerance && <h3>Tolerance: ±${resistance.tolerance}%</h3>} 
    </div>
  );
};

export default ResistanceCalculator;