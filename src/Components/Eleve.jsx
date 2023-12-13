import React from "react";
import { Badge, IconButton, Chip, Typography, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const PageEleve = ({ nom, prenom, level }) => {
  return (
    <Box sx={{width: '10vw', overflow: 'hidden'}}>
      <Badge
        badgeContent={+4}
        color="primary"
        sx={{
          color: "FFB5A7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          marginRight: "10px"
        }}
      >
        <IconButton
          color="primary"
          fontSize="large"
          sx={{ fontSize: 100, p: 0 }}
        >
          <PersonIcon sx={{ fontSize: 120, color: "#3D6787" }} />
        </IconButton>
        <Typography variant="body1">
          {nom} {prenom}
        </Typography>
        <Chip
          sx={{
            m: 1,
            p: 1,
            fontWeight: "600",
            fontSize: "1rem",
            background: "#A1CDF1",
            color: "white",
            borderRadius: "10px",
          }}
          label={level}
        />
      </Badge>
    </Box>
  );
};

export default PageEleve;
