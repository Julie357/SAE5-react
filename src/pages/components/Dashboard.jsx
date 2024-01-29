import React, { useState } from "react";
import "../../Styles/dashboard.css";
import "@fontsource/itim";
import moment from "moment";
import { fr } from "moment/locale/fr";
import { Tooltip } from "@mui/material";

const DayNames = {
  0: "Lun",
  1: "Mar",
  2: "Mer",
  3: "Jeu",
  4: "Ven",
  5: "Sam",
  6: "Dim",
};

const Cell = ({ date, value }) => {
  const levelConversion = {
    0: 0,
    1: "A1",
    2: "A2",
    3: "A3",
    4: "B2",
    5: "C1",
    6: "C2",
  };

  let Dday = date.format("DD/MM/yy");

  const level = levelConversion[value];
  let hoverInfoText;

  if (level === 1 ) {
    hoverInfoText = "Pas de donnée le " + Dday;
  } else {
    hoverInfoText = "Niveau " +level+ " le " + Dday;
  }

  let backgroundColor;
  if (value === 0) {
    backgroundColor = "#EBEDF0";
  } else if (value === 1) {
    backgroundColor = "red";
  } else if (value === 2) {
    backgroundColor = "blue";
  }

  let style = {
    backgroundColor: backgroundColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#2b3643",
    fontFamily: "Itim",
    paddingTop: "2px",
  };
  return (
    <>
      <Tooltip title={hoverInfoText} arrow placement="top">
        <div className="cell" style={style}></div>
      </Tooltip>
    </>
  );
};

const Week = ({ index }) => {
  return <div className="week">{DayNames[index]}</div>;
};

const Mois = ({ startDate, index }) => {
  let date = moment(startDate).add(index * 7, "day");
  let MoisName = date.format("MMM");

  const retirerPointDesMois = (mois) => {
    if (mois.endsWith(".")) {
      return mois.slice(0, -1);
    }
    return mois;
  };

  MoisName = retirerPointDesMois(MoisName);
  return (
    <div className={MoisName}>
      <div className="mois">{MoisName}</div>
    </div>
  );
};

const Timeline = ({ range, data }) => {
  let days = Math.abs(range[0].diff(range[1], "days"));
  let cells = Array.from(new Array(days));
  let weeks = Array.from(new Array(7));
  let mois = Array.from(new Array(Math.floor(days / 7)));
  let startDate = range[0];

  const DayFormat = "DDMMYYYY";

  return (
    <div className="timeline">
      <div className="timeline-mois">
        {mois.map((_, index) => (
          <Mois key={index} index={index} startDate={startDate} />
        ))}
      </div>
      <div className="timeline-body">
        <div className="timeline-weeks">
          {weeks.map((_, index) => (
            <Week key={index} index={index} startDate={startDate} />
          ))}
        </div>

        <div className="timeline-cells">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, "day");
            let dataPoint = data.find(
              (d) =>
                moment(date).format(DayFormat) ===
                moment(d.date).format(DayFormat)
            );
            let numValue = dataPoint.value;
            return (
              <Cell key={index} index={index} date={date} value={numValue} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ studentExercises }) => {
  let startDate = moment().add(-365, "days");
  let dateRange = [startDate, moment()];

  const levelConversion = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

  let dataRecup = studentExercises.map((exercise) => {
    const numLevel = levelConversion[exercise.exercisesSkillLevel];
    return { date: exercise.date, value: numLevel };
  });

  let data = Array.from(new Array(365)).map((_, index) => {
    const dayDate = moment(startDate).add(index, "day");
    const matchingDataRecup = dataRecup.find((data) => data.date === dayDate);

    if (matchingDataRecup) {
      console.log(matchingDataRecup);
      return { date: dayDate, value: matchingDataRecup.value };
    } else {
      return { date: dayDate, value: 0 };
    }
  });

  return (
    <Timeline
      range={dateRange}
      data={data}
      studentExercises={studentExercises}
    />
  );
};

export default Dashboard;
