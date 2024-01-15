import { Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';
import svg2 from "../assets/logo-A4ll.svg";
import { NavLink } from 'react-router-dom';
import "../Styles/stylePage.css";
import { Box, Stack, Chip, Accordion, styled , AccordionSummary, AccordionDetails, BorderLinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
const DashClasse = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
      }));

    return (
        <Box sx={{height: '90vh', background: '#D8ECFC', p: 4}}>
            <Typography sx={{mb: 2, fontSize: '20px'}}>
                Informations sur la classe de 3°6
            </Typography>

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', background: '#fff', p: 2, justifyContent: 'space-between', borderRadius: '10px'}}>
                <Chip
                label="33 élvèves"
                component="a"
                sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
                />

                <Chip
                    label="Niveau moyen : B1"
                    component="a"
                    sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
                    />

                <Chip
                    label="Nombre d'exercices: 5"
                    component="a"
                    sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
                    />
                <Chip
                    label="Corrections restantes: 22"
                    component="a"
                    sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
                    />
                <Chip
                    label="Réussite globale: 62%"
                    component="a"
                    sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
                    />
            </Stack>

            <FormControl fullWidth sx={{ background: '#3D6787', borderRadius: '4px', width: '20%', p: 0, m:2 }}>
                <InputLabel sx={{ color: 'white', fontWeight: '500', border: 'none', p: 0 }}>Ensemble des exercices</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    >
                    <MenuItem value={6}>Croissant</MenuItem>
                    <MenuItem value={5}>Decroissant</MenuItem>
                    <MenuItem value={4}>Classe avec exercice</MenuItem>
                    <MenuItem value={3}>Classe sans exercice</MenuItem>
                </Select>
            </FormControl>

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 4, alignItems: 'flex-start'}}>
                <Box sx={{background: '#fff', width: '45%', borderRadius: '10px', padding: '20px 20px 30% 20px'}}>
                    <p>Dashboard</p>
                </Box>

                <Box sx={{background: '#fff', height: '100%', width: '45%',  borderRadius: '10px', p: 2}}>
                    <Typography sx={{fontSize: '20px'}}>Erreurs récurrentes</Typography>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Conjugaison
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ flexGrow: 1 }}>
                                <BorderLinearProgress variant="determinate" value={35} />
                            </Box>
                            <Box sx={{ flexGrow: 1, my: 2}}>
                                <BorderLinearProgress variant="determinate" value={60} />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Syntaxe
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ flexGrow: 1 }}>
                                <BorderLinearProgress variant="determinate" value={35} />
                            </Box>
                            <Box sx={{ flexGrow: 1, my: 2}}>
                                <BorderLinearProgress variant="determinate" value={60} />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Collocation
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ flexGrow: 1 }}>
                                <BorderLinearProgress variant="determinate" value={35} />
                            </Box>
                            <Box sx={{ flexGrow: 1, my: 2}}>
                                <BorderLinearProgress variant="determinate" value={60} />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                </Box>
            </Stack>

        </Box>
    );
};

export default DashClasse;