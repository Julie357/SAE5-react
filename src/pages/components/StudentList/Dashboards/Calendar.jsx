import "@fontsource/itim";
import { Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";
import "./calendar.css";

const DayNames = {
  0: "Lun",
  1: "Mar",
  2: "Mer",
  3: "Jeu",
  4: "Ven",
  5: "Sam",
  6: "Dim",
};

const retirerPointDesMois = (mois) => {
  if (mois.endsWith(".")) {
    return mois.slice(0, -1);
  }
  return mois;
};

const COLOR_MAP = {
  0: "#EBEDF0",
  1: "#84CBE5",
  2: "#316DA9",
  3: "#FCD5CE",
  4: "#FFA08F",
  5: "#CF97C4",
  6: "#9B5998",
};

const LEVEL_MAP = {
  0: 0,
  1: "A1",
  2: "A2",
  3: "B1",
  4: "B2",
  5: "C1",
  6: "C2",
};

const getBackgroundColor = (value) => COLOR_MAP[value] || "#EBEDF0";

const getHoverInfoText = (level, Dday) => {
  return level === 0
    ? `Pas de donnée le ${Dday}`
    : `Niveau ${level} le ${Dday}`;
};

const Cell = ({ date, value }) => {
  const Dday = date.format("DD/MM/yy");
  const level = LEVEL_MAP[value];
  const hoverInfoText = getHoverInfoText(level, Dday);

  const style = {
    backgroundColor: getBackgroundColor(value),
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#2b3643",
    fontFamily: "Itim",
    paddingTop: "2px",
  };

  return (
    <Tooltip title={hoverInfoText} arrow placement="top">
      <div className="cell" style={style}></div>
    </Tooltip>
  );
};

const Week = ({ index }) => {
  return <div className="week">{DayNames[index]}</div>;
};

const Mois = ({ startDate, index }) => {
  const date = moment(startDate).add(index * 7, "day");
  const MoisName = retirerPointDesMois(date.format("MMM"));

  return (
    <div className={MoisName}>
      <div className="mois">{MoisName}</div>
    </div>
  );
};


const Calendar = () => {
  // const dateRange = [startDate, moment()];
  // const levelConversion = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

  // if (!loadingExercises) {
  //   const dataRecup = classeExercises.map((exercise) => ({
  //     title: exercise.title,
  //     value: levelConversion[exercise.exercisesSkillLevel] || 0,
  //   }));

  //   console.log(dataRecup)

  //   const data = Array.from(new Array(dataRecup.length)).map((_, index) => {
  //     const matchingDataRecup = dataRecup.filter(
  //       (data) => data.title === dayDate.format("YYYY-MM-DD")
  //     );

  //     if (matchingDataRecup.length > 0) {
  //       const averageValue = Math.round(
  //         matchingDataRecup.reduce((acc, curr) => acc + curr.value, 0) /
  //           matchingDataRecup.length
  //       );
  //       return { date: dayDate, value: averageValue };
  //     } else {
  //       return { date: dayDate, value: 0 };
  //     }
  //   });

  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "space-between",
  //         height: "100%",
  //       }}
  //     >
  //       <Typography variant="h6">
  //         Evolution du niveau de la classe sur l'année
  //       </Typography>
  //       <Timeline
  //         range={dateRange}
  //         data={data}
  //         classeExercises={classeExercises}
  //       />

  //       <Legend />
  //     </div>
    // );
  // }
};

export default Calendar;
