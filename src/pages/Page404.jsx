import { Button } from '@mui/material';
import React from 'react';
import svg from "../assets/404-page-not-found.svg";
import svg2 from "../assets/apple-logo.svg";
import { NavLink } from 'react-router-dom';
import "../css/page404.css";

const Page404 = () => {
    return (
        <div>
            <div className="logodelapage">
            <img className="logo" src={svg2} alt="logo A4ll" />
            </div>
            
            <div className="cont-404">
                <img src={svg} alt="Page 404" />
                <h1>On dirait bien que vous êtes perdu !</h1>
                <NavLink exact to="/">

                    <Button sx={{
                        p: "12px 15px", backgroundColor: "rgb(255, 20, 235)", boder: "none",
                        boderRadius: "12px", cursor: "pointer", color: "#FFF", transition: "0.3s", fontSize: "medium", fontWeight: "bold",

                        '&:hover': {
                            backgroundColor: 'darkblue',
                        },
                    }}>revenir à l'accueil</Button>

                </NavLink>
            </div>
        </div>
    );
};

export default Page404;