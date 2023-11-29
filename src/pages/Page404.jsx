import { Button } from '@mui/material';
import React from 'react';
import svg2 from "../assets/logo-A4ll.svg";
import { NavLink } from 'react-router-dom';
import "../css/page404.css";
import Illu404 from '../composants/Illu404';
import '@fontsource/itim';

const Page404 = () => {
    return (
        <div>
            <div className="logodelapage">
                <img className="logo" src={svg2} alt="logo A4ll" />
            </div>

            <div className="cont-404">
                <div className="img">
                <Illu404/>
                </div>
                <h1>On dirait bien que vous êtes perdu !</h1>
                <NavLink exact to="/">

                    <Button sx={{
                        p: "12px 15px", backgroundColor: "#3D6787", boder: "none",
                        boderRadius: "14px", cursor: "pointer", color: "#EDF6F9", transition: "0.3s", fontSize: "medium", fontWeight: "bold", fontFamily: "Itim",

                        '&:hover': {
                            backgroundColor: "#2B3643",
                        },
                    }}>revenir à l'accueil</Button>

                </NavLink>
            </div>
        </div>
    );
};

export default Page404;