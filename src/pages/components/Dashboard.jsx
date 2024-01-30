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
  4: "#2F6CA8",
  5: "#CF97C4",
  6: "#9B5998",
};

const LEVEL_MAP = {
  0: 0,
  1: "A1",
  2: "A2",
  3: "A3",
  4: "B2",
  5: "C1",
  6: "C2",
};

const getBackgroundColor = (value) => COLOR_MAP[value] || "#EBEDF0";

const getHoverInfoText = (level, Dday) => {
  return level === 0 ? `Pas de donnée le ${Dday}` : `Niveau ${level} le ${Dday}`;
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

const Timeline = ({ range, data }) => {
  const days = Math.abs(range[0].diff(range[1], "days"));
  const cells = Array.from(new Array(days));
  const weeks = Array.from(new Array(7));
  const mois = Array.from(new Array(Math.floor(days / 7)));
  const startDate = range[0];
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
            const date = moment(startDate).add(index, "day");
            const dataPoint = data.find(
              (d) => moment(date).format(DayFormat) === moment(d.date).format(DayFormat)
            );
            const numValue = dataPoint ? dataPoint.value : 0;
            return <Cell key={index} date={date} value={numValue} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ studentExercises }) => {
  const startDate = moment().add(-365, "days");
  const dateRange = [startDate, moment()];
  const levelConversion = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

  const dataRecup = studentExercises.map((exercise) => ({
    date: exercise.date,
    value: levelConversion[exercise.exercisesSkillLevel] || 0,
  }));

  const data = Array.from(new Array(365)).map((_, index) => {
    const dayDate = moment(startDate).add(index, "day");
    const matchingDataRecup = dataRecup.filter((data) => data.date === dayDate.format("YYYY-MM-DD"));

    if (matchingDataRecup.length > 0) {
      const averageValue = Math.round(matchingDataRecup.reduce((acc, curr) => acc + curr.value, 0) / matchingDataRecup.length);
      return { date: dayDate, value: averageValue };
    } else {
      return { date: dayDate, value: 0 };
    }
  });

  return <Timeline range={dateRange} data={data} studentExercises={studentExercises} />;
};

export default Dashboard;