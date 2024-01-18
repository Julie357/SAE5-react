import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { style } from "d3";
import { Link as RouterLink } from "react-router-dom";

const ClassCard = ({ classe }) => {
  return (
    <>
      <RouterLink
        to={`/studentsList/${classe.idClass}`}
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            width: "21vh",
            height: "21vh",
            borderRadius: "0.9vw",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <CardContent>
            <Typography variant="h4" component="div">
              {classe.classname}
            </Typography>
          </CardContent>
        </Card>
      </RouterLink>
    </>
  );
};

export default ClassCard;
