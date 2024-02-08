import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
              {classe.classLevel}{classe.classNumber}
            </Typography>
          </CardContent>
        </Card>
      </RouterLink>
    </>
  );
};

export default ClassCard;