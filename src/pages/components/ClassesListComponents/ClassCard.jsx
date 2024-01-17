import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ClassCard = ({ classe }) => {
  return (
    <>
      <Card sx={{ width: "21vh", height: "21vh", borderRadius:"0.9vw", justifyContent:"center", alignItems:"center", display:"flex"}}>
        <CardContent>
          <Typography variant="h4" component="div">
            {classe.classname}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "itim",
              mb: "1vh",
            }}
            href='/texte'
          >
            Voir l'exercice
          </Button>
        </CardActions> */}
      </Card>
    </>
  );
};

export default ClassCard;
