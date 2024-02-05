import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ExerciceCard = ({ exercice }) => {
  const dateExercise = new Date(exercice.date).toLocaleDateString("fr");
  const titleStyle = {
    fontSize: "1.2rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
  return (
    <>
      <Card sx={{ width: "13vw" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dateExercise}
          </Typography>
          <Typography variant="h5" component="div" style={titleStyle} title={exercice.title}>
            {exercice.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Niveau :</b> {exercice.exercisesSkillLevel}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "itim",
              mb: "1vh",
            }}
            href={`/texte/${exercice.idExercises}`}
          >
            Voir l'exercice
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ExerciceCard;
