import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup, FormGroup, Checkbox, FormControlLabel, Switch } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import Button from '@mui/material/Button';
import D3GraphBulle from './compoments/GraphBulle/D3GraphBulle';
import RecurrentErrors from './compoments/StudentCardComponents/RecurrentErrors';
import RecurrentErrorsBulles from './compoments/StudentCardComponents/RecurrentErrorsBulles';
const PageTexte = () => {

  const [selectedTab, setSelectedTab] = useState('tab1');
  const [displayTextInlineTab1, setDisplayTextInlineTab1] = useState(true);
  const [displayTextInlineTab2, setDisplayTextInlineTab2] = useState(true);
  const [displayTextInlineTab3, setDisplayTextInlineTab3] = useState(true);
  const [conjugaisonChecked, setConjugaisonChecked] = useState(true);
  const [ponctuationChecked, setPonctuationChecked] = useState(true);
  const [syntaxeChecked, setSyntaxeChecked] = useState(true);

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

  const handleResetConjugaison = () => {
    setConjugaisonChecked(true);
    setPonctuationChecked(true);
    setSyntaxeChecked(true);
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'Itim',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 500,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ m: 4, p: 4, width: '60%' }}>
          <ToggleButtonGroup
            value={selectedTab}
            exclusive
            onChange={handleTabChange}
            aria-label="text alignment"
            sx={{ borderRadius: '0 0 0 0 !important', border: 0 }}
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
                            background: selectedTab === 'tab1' ? '#F9DCC4 !important' : '#F9DCC4 !important',
                            color: selectedTab === 'tab1' ? '#C29773' : '#C29773',
                            fontSize: '18px',
                            borderRadius: '10px 10px 0 0 !important', border: 0
                        }}>
                    Fautes
                    </ToggleButton>
                    <ToggleButton value="tab3" aria-label="right aligned" sx={{
                            px: 1,
                            ml: 1,
                            background: selectedTab === 'tab1' ? '#FCD5CE !important' : '#FCD5CE !important',
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
                    Lorem ipsum dolor sit amet. <a href='a' className={conjugaisonChecked ? 'err-conjugaison' : 'txt-sans-erreur'}>Ea sunt</a> harum qui distinctio <a className={syntaxeChecked ? 'err-syntaxe' : 'txt-sans-erreur'} href='a'>possimus</a> hic maxime atque quo voluptatem <a className={conjugaisonChecked ? 'err-conjugaison' : 'txt-sans-erreur'} href='a'>voluptatem</a>. Sit aperiam itaque et accusamus illum ut pased aperiam autem et commodi quam qui  <a className={syntaxeChecked ? 'err-syntaxe' : 'txt-sans-erreur'} href='a'>quis eius</a> eum doloribus pariatur est doloremque autem. Aut quasi corporis<a className={ponctuationChecked ? 'err-ponctuation' : 'txt-sans-erreur'} href='a'>? </a> et sint nemo quo vitae quasi eum dolorum galisum eos quae <a className={conjugaisonChecked ? 'err-conjugaison' : 'txt-sans-erreur'} href='a'>reprehenderit</a>  est aperiam senescent id voluptatem earum ?
                    Et accusamus 🤔  <a className={conjugaisonChecked ? 'err-conjugaison' : 'txt-sans-erreur'} href='a'>assumenda</a> in facilis soluta ut eaque facere ex placeat ipsa et galisum facere in consequatur pariatur<a className={ponctuationChecked ? 'err-ponctuation' : 'txt-sans-erreur'} href='a'>,</a> id quia quia. Est omnis odio et sint nobis ex dicta possimus qui enim sint ut facere ipsa <a className={syntaxeChecked ? 'err-syntaxe' : 'txt-sans-erreur'} href='a'>eum ipsum</a> numquam qui ratione consectetur. Non galisum molestias et <a className={conjugaisonChecked ? 'err-conjugaison' : 'txt-sans-erreur'} href='a'>natus</a> nemo qui maiores harum est adipisci dignissimos.
                </p>
            </Box>
          )}

                {selectedTab === 'tab2' && (
                    <Box sx={{background: "#F9DCC4", p: 4, borderRadius: '0 10px 10px 10px ', fontFamily: 'Itim'}}>
                    {/* Contenu de l'onglet 2 */}
                    <p>
                            Lorem ipsum dolor sit amet. Ea sunt harum qui distinctio possimus hic maxime atque quo voluptatem voluptatem. Sit aperiam itaque🤔 et accusamus illum ut pased aperiam autem et commodi quam qui uis eius eum doloribus pariatur est doloremque autem. 🤔Aut quasi corporis et sint nemo quo vitae quasi eum dolorum galisum eos quae reprehenderit  est aperiam senescent id voluptatem earum ?
                            Et accusamus 🤔 assumenda in facilis soluta ut eaque facere ex placeat ipsa et galisum facere in consequatur pariatur, id quia quia. Est omnis odio et sint nobis ex dicta possimus qui enim sint ut facere ipsa eum ipsum numquam qui 🤔ratione consectetur. Non galisum molestias et natus nemo qui maiores harum est adipisci dignissimos.
                        </p>
                    </Box>
                )}

                {selectedTab === 'tab3' && (
                    <Box sx={{background: "#FCD5CE", p: 4, borderRadius: '0 10px 10px 10px ', fontFamily: 'Itim'}}>
                    {/* Contenu de l'onglet 3 */}
                    <p>Contenu de l'onglet 3</p>
                    </Box>
                )}
            </Box>

            <Box sx={{m: 8, p: 2, width: '20%', background: "#CFD6E7", borderRadius: '10px'}}>
                <Button variant="outlined" startIcon={<InsightsIcon />} sx={{color: '#000', background: "#fff", border: 0, my: 1, width: '100%'}}>
                    Statistiques du texte
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleResetConjugaison}
                    startIcon={<InsightsIcon />}
                    sx={{ color: '#000', background: "#fff", border: 0, my: 1, width: '100%' }}
                >
                    Voir toutes les erreurs
                </Button>
                <FormGroup sx={{width: '100%'}}>
                   {/**<FormControlLabel control={<Checkbox defaultChecked />} label="Conjugaison" sx={{m: '8px', background: '#fff', borderRadius: '5px', m: 0, color: '#C62323', textDecoration: 'underline'}} /> */} 
                   <FormControlLabel
                    control={
                        <Checkbox
                            checked={conjugaisonChecked}
                            onChange={() => setConjugaisonChecked((prev) => !prev)}
                        />
                    }
                    label="Conjugaison"
                    sx={{
                        mb: 1, // Ajout de la marge en bas
                        background: '#fff',
                        borderRadius: '5px',
                        m: 0,
                        color: '#C62323',
                        textDecoration: 'underline',
                    }}
                />
                    <FormControlLabel control={
                        <Checkbox
                            checked={ponctuationChecked}
                            onChange={() => setPonctuationChecked((prev) => !prev)}
                            />
                            } label="Ponctuation" sx={{my: 1, background: '#fff', borderRadius: '5px', m: 0, color: '#2364C6', textDecoration: 'underline'}} />
                    
                    <FormControlLabel control={
                        <Checkbox
                            checked={syntaxeChecked}
                            onChange={() => setSyntaxeChecked((prev) => !prev)}
                        />
                    } label="Syntaxe" sx={{my: 1, background: '#fff', borderRadius: '5px', m: 0, color: '#75C623', textDecoration: 'underline'}} />
                </FormGroup>
                
            </Box>
        </Box>

        <Box sx={{ m: 8, p: 4, background: "#CFD6E7", borderRadius: '10px', display: 'flex' }}>
            {/* Left Content */}
            <D3GraphBulle/>

            {/* Legend */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <p>Légende :</p>
                <Box>
                  <Box sx={{display: 'flex'}}>
                    <Box sx={{ width: '30px', height: '30px', backgroundColor: '#ffb5a7', border: '2px solid black', borderRadius: '50%' }}></Box>
                    <p> Syntaxe</p>
                  </Box>

                  <Box sx={{display: 'flex'}}>
                    <Box sx={{ width: '30px', height: '30px', backgroundColor: '#a1cdf1', border: '2px solid black', borderRadius: '50%' }}></Box>
                    <p> Conjugaison</p>
                  </Box>

                  <Box sx={{display: 'flex'}}>
                    <Box sx={{ width: '30px', height: '30px', backgroundColor: '#ffe6e2', border: '2px solid black', borderRadius: '50%' }}></Box>
                    <p> Cohésion</p>
                  </Box>
                </Box>
            </Box>
            {/* Right Content */}
            {/* <RecurrentErrorsBulles /> */}
        </Box>

        {/* <D3GraphBulle2 /> */}
    </ThemeProvider>
    
  );
};

export default PageTexte;
