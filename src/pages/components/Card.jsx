import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ExerciceCard = ({ exercice }) => {
  const dateExercise = new Date(exercice.date).toLocaleDateString('fr');
  return (
    <>
      <Card sx={{ width: "13vw" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dateExercise}
          </Typography>
          <Typography variant="h5" component="div">
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
          >
            Voir l'exercice
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ExerciceCard;
