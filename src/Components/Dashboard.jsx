import React, { useState } from "react";
import "../Styles/dashboard.css";
import "@fontsource/itim";
import moment from "moment";
// import { useSelector } from "react-redux";
// import { selectExercices } from "../features/exercices/exerciceSelector";

const DayNames = {
  0: "Lun",
  1: "Mar",
  2: "Mer",
  3: "Jeu",
  4: "Ven",
  5: "Sam",
  6: "Dim",
};

const Cell = ({ date, alpha }) => {
  const [hoveredInfo, setHoveredInfo] = useState(null);
  let style = {
    backgroundColor: `rgba(255, 160, 143, ${alpha})`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "5px",
    color: "#2b3643",
    fontFamily: "Itim",
    paddingTop: "2px",
    
  };
  return (
    <div
      className="cell"
      style={style}
      onMouseEnter={() =>
        setHoveredInfo({ date: date.format("MMMM D, YYYY"), value: alpha })
      }
      onMouseLeave={() => setHoveredInfo(null)}
    >
      {hoveredInfo && (
        <div className="hover-info">
          <p>{hoveredInfo.date}</p>
          <p>{hoveredInfo.value}</p>
        </div>
      )}
    </div>
  );
};

const Week = ({ index }) => {
  return <div className="week">{DayNames[index]}</div>;
};

const Mois = ({ startDate, index }) => {
  let date = moment(startDate).add(index * 7, "day");
  let MoisName = date.format("MMM");
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

  let min = Math.min(0, ...data.map((d) => d.value));
  let max = Math.max(...data.map((d) => d.value));

  let colorPerPoint = 1 / (max - min);
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
            let dataPoint = data.find((d) => {
              return (
                moment(date).format(DayFormat) ===
                moment(d.date).format(DayFormat)
              );
            });
            if (!dataPoint) {
              return null;
            }
            let alpha = colorPerPoint * dataPoint.value;
            return <Cell key={index} index={index} date={date} alpha={alpha} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ exercices }) => {
  let startDate = moment().add(-365, "days");
  let dateRange = [startDate, moment()];
  const levelToValue = {
    A1: 0.16,
    A2: 0.32,
    B1: 0.48,
    B2: 0.64,
    C1: 0.8,
    C2: 1,
  };
  const infosExercices = exercices.flatMap((exercice) => {
    const mappedData = Array.from(new Array(365)).map((_, index) => ({
      value: levelToValue[exercice.niveau],
      date: moment(exercice.date).add(index, "days"),
    }));
  
    return mappedData;
  });

  console.log("ex:" + infosExercices);
  if (infosExercices.length > 0) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Timeline range={dateRange} data={infosExercices} />
      </div>
    );
  } else {
    return <p>No exercise information available.</p>;
  }
};

export default Dashboard;
