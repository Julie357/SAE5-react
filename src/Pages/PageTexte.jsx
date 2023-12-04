import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const PageTexte = () => {
  const [selectedTab, setSelectedTab] = useState('tab1'); // État pour suivre l'onglet sélectionné

  const handleTabChange = (event, newTab) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
    }
  };
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{m: 4, p: 4}}>
      <ToggleButtonGroup
        value={selectedTab}
        exclusive
        onChange={handleTabChange}
        aria-label="text alignment"
        sx={{borderRadius: '0 0 0 0 !important'}}
      >
        <ToggleButton value="tab1" aria-label="left aligned" sx={{background: "#CFD6E7", color: "#414755"}}>
          Lorem
        </ToggleButton>
        <ToggleButton value="tab2" aria-label="centered" sx={{background: "#DFE7CF", color: "#59683C"}}>
          Lorem / vitesse
        </ToggleButton>
        <ToggleButton value="tab3" aria-label="right aligned" sx={{background: "#E7D8CF", color: "#8D6750"}}>
          Lorem
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Contenu spécifique à chaque onglet */}
      {selectedTab === 'tab1' && (
        <Box sx={{background: "#CFD6E7", p: 4, borderRadius: '0 10px 10px 10px '}}>
            {/* Contenu de l'onglet 1 */}
            <p>
                Lorem ipsum dolor sit amet. Ea sunt harum qui distinctio possimus hic maxime atque quo voluptatem voluptatem. Sit aperiam itaque et accusamus illum ut pased aperiam autem et commodi quam qui quis eius eum doloribus pariatur est doloremque autem. Aut quasi corporis, et sint nemo quo vitae quasi eum dolorum galisum eos quae reprehenderit est aperiam senescent id voluptatem earum ?
                Et accusamus assumenda in facilis soluta ut eaque facere ex placeat ipsa et galisum facere in consequatur pariatur id quia quia. Est omnis odio et sint nobis ex dicta possimus qui enim sint ut facere ipsa eum ipsum numquam qui ratione consectetur. Non galisum molestias et natus nemo qui maiores harum est adipisci dignissimos.
            </p>
        </Box>
      )}

      {selectedTab === 'tab2' && (
        <Box sx={{background: "#DFE7CF", p: 4}}>
          {/* Contenu de l'onglet 2 */}
          <p>Contenu de l'onglet 2</p>
        </Box>
      )}

      {selectedTab === 'tab3' && (
        <Box sx={{background: "#E7D8CF"}}>
          {/* Contenu de l'onglet 3 */}
          <p>Contenu de l'onglet 3</p>
        </Box>
      )}
    </Box>
    </ThemeProvider>
    
  );
};

export default PageTexte;
