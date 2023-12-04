import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#FCD5CE",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const ExerciceListHeader = ({onQueryChange}) => {
  return (
    <>
      <Grid item xs={5}>
        <Box
          sx={{
            backgroundColor: "#D8ECFC",
            height: "9vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{ width: "10%", height: "100%", margin: "0 0.7vw" }}
          ></Box>
          <Typography
            fontSize={26}
            textTransform={"uppercase"}
            sx={{ marginRight: "0.4vw" }}
          >
            Buisson
          </Typography>
          <Typography fontSize={26}> Claire</Typography>
          <Typography fontSize={26} sx={{ marginLeft: "0.8vw" }}>
            3°6
          </Typography>
          <Typography fontSize={24} sx={{ marginLeft: "10vw" }}>
            Niveau: B2
          </Typography>
        </Box>
      </Grid>
      <Grid container xs={4} sx={{ marginLeft: "25vw" }}>
        <Grid item xs={2.2}>
          <Button variant="contained" startIcon={<FilterListIcon />}>
            Tri
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" startIcon={<TuneIcon />}>
            Filtres
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search an exercise…"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => onQueryChange(event.target.value)}
            />
          </Search>
        </Grid>
      </Grid>
    </>
  );
};

export default ExerciceListHeader;
