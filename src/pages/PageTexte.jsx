import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup, FormGroup, Checkbox, FormControlLabel, Switch  } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import Button from '@mui/material/Button';
import './stylePage.css';

const PageTexte = () => {
    

    const [selectedTab, setSelectedTab] = useState('tab1');
    const [displayTextInlineTab1, setDisplayTextInlineTab1] = useState(true);
    const [displayTextInlineTab2, setDisplayTextInlineTab2] = useState(true);
    const [displayTextInlineTab3, setDisplayTextInlineTab3] = useState(true);

    const handleTabChange = (event, newTab) => {
        if (newTab !== null) {
            setSelectedTab(newTab);
        }
    };

    const handleDisplayTextInlineChangeTab1 = () => {
        setDisplayTextInlineTab1((prev) => !prev);
    };
    const handleDisplayTextInlineChangeTab2 = () => {
        setDisplayTextInlineTab2((prev) => !prev);
    };
    const handleDisplayTextInlineChangeTab3 = () => {
        setDisplayTextInlineTab3((prev) => !prev);
    };
      

  const theme = createTheme({
    typography: {
      fontFamily: 'Itim', // Ajoutez la police souhaitée ici
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 500,
    },
  });

  return (
    <ThemeProvider theme={theme} >
        <Box sx={{display: 'flex'}}>
            <Box sx={{m: 4, p: 4, width: '60%'}}>
                <ToggleButtonGroup
                    value={selectedTab}
                    exclusive
                    onChange={handleTabChange}
                    aria-label="text alignment"
                    sx={{borderRadius: '0 0 0 0 !important', border: 0}}
                >
                    <ToggleButton
                        value="tab1"
                        aria-label="left aligned"
                        sx={{
                            px: 1,
                            mr: 1,
                            background: selectedTab === 'tab1' ? '#CFD6E7 !important' : '#CFD6E7 !important',
                            color: selectedTab === 'tab1' ? '#414755' : '#414755',
                            fontSize: '18px',
                            borderRadius: '10px 10px 0 0 !important', border: 0
                        }}
                        >
                        Cohésion/Niveau
                    </ToggleButton>
                    <ToggleButton value="tab2" aria-label="centered" sx={{
                            px: 1,
                            mx: 1,
                            background: selectedTab === 'tab1' ? '#DFE7CF !important' : '#DFE7CF !important',
                            color: selectedTab === 'tab1' ? '#59683C' : '#59683C',
                            fontSize: '18px',
                            borderRadius: '10px 10px 0 0 !important', border: 0
                        }}>
                    Fautes
                    </ToggleButton>
                    <ToggleButton value="tab3" aria-label="right aligned" sx={{
                            px: 1,
                            ml: 1,
                            background: selectedTab === 'tab1' ? '#E7D8CF !important' : '#E7D8CF !important',
                            color: selectedTab === 'tab1' ? '#8D6750' : '#8D6750',
                            fontSize: '18px',
                            borderRadius: '10px 10px 0 0 !important', border: 0
                        }}>
                    Vitesse
                    </ToggleButton>
                </ToggleButtonGroup>

                {/* Contenu spécifique à chaque onglet */}
                {selectedTab === 'tab1' && (
            <Box sx={{ background: "#CFD6E7", p: 4, borderRadius: '0 10px 10px 10px ', fontFamily: 'Itim' }}>
                <FormControlLabel
                control={<Switch checked={displayTextInlineTab1} onChange={handleDisplayTextInlineChangeTab1} />}
                label="Afficher en ligne"
              />
              {/* Contenu de l'onglet 1 */}
                <p>
                        
                            Lorem ipsum dolor sit amet. <a href='a' className='err-conjugaison'>Ea sunt</a> harum qui distinctio <a className='err-syntaxe' href='a'>possimus</a> hic maxime atque quo voluptatem <a className='err-conjugaison' href='a'>voluptatem</a>. Sit aperiam itaque et accusamus illum ut pased aperiam autem et commodi quam qui  <a className='err-syntaxe' href='a'>quis eius</a> eum doloribus pariatur est doloremque autem. Aut quasi corporis<a className='err-ponctuation' href='a'>? </a> et sint nemo quo vitae quasi eum dolorum galisum eos quae <a className='err-conjugaison' href='a'>reprehenderit</a>  est aperiam senescent id voluptatem earum ?
                            Et accusamus 🤔  <a className='err-conjugaison' href='a'>assumenda</a> in facilis soluta ut eaque facere ex placeat ipsa et galisum facere in consequatur pariatur<a className='err-ponctuation' href='a'>,</a> id quia quia. Est omnis odio et sint nobis ex dicta possimus qui enim sint ut facere ipsa <a className='err-syntaxe ' href='a'>eum ipsum</a> numquam qui ratione consectetur. Non galisum molestias et <a className='err-conjugaison' href='a'>natus</a> nemo qui maiores harum est adipisci dignissimos.
                        </p>
                    </Box>
                )}

                {selectedTab === 'tab2' && (
                    <Box sx={{background: "#DFE7CF", p: 4, borderRadius: '0 10px 10px 10px ', fontFamily: 'Itim'}}>
                    {/* Contenu de l'onglet 2 */}
                    <p>
                            Lorem ipsum dolor sit amet. Ea sunt harum qui distinctio possimus hic maxime atque quo voluptatem voluptatem. Sit aperiam itaque🤔 et accusamus illum ut pased aperiam autem et commodi quam qui uis eius eum doloribus pariatur est doloremque autem. 🤔Aut quasi corporis et sint nemo quo vitae quasi eum dolorum galisum eos quae reprehenderit  est aperiam senescent id voluptatem earum ?
                            Et accusamus 🤔 assumenda in facilis soluta ut eaque facere ex placeat ipsa et galisum facere in consequatur pariatur, id quia quia. Est omnis odio et sint nobis ex dicta possimus qui enim sint ut facere ipsa eum ipsum numquam qui 🤔ratione consectetur. Non galisum molestias et natus nemo qui maiores harum est adipisci dignissimos.
                        </p>
                    </Box>
                )}

                {selectedTab === 'tab3' && (
                    <Box sx={{background: "#E7D8CF", p: 4, borderRadius: '0 10px 10px 10px ', fontFamily: 'Itim'}}>
                    {/* Contenu de l'onglet 3 */}
                    <p>Contenu de l'onglet 3</p>
                    </Box>
                )}
            </Box>

            <Box sx={{m: 8, p: 2, width: '20%', background: "#CFD6E7", borderRadius: '10px'}}>
                <Button variant="outlined" startIcon={<InsightsIcon />} sx={{color: '#000', background: "#fff", border: 0, my: 1, width: '100%'}}>
                    Statistiques du texte
                </Button>
                <Button variant="outlined" sx={{color: '#000', background: '#fff', border: 0, my: 1, width: '100%'}}>
                    Voir toutes les erreurs 
                </Button>
                <FormGroup sx={{width: '100%'}}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Conjugaison" sx={{m: '8px', background: '#fff', borderRadius: '5px', m: 0, color: '#C62323', textDecoration: 'underline'}} />
                    
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Ponctuation" sx={{my: 1, background: '#fff', borderRadius: '5px', m: 0, color: '#2364C6', textDecoration: 'underline'}} />
                    
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Syntaxe" sx={{my: 1, background: '#fff', borderRadius: '5px', m: 0, color: '#75C623', textDecoration: 'underline'}} />
                </FormGroup>
                
            </Box>
        </Box>

        <Box sx={{m:8, p: 4, background: "#CFD6E7", borderRadius: '10px'}}>
        Graphics... 
        </Box>
    </ThemeProvider>
    
  );
};

export default PageTexte;
