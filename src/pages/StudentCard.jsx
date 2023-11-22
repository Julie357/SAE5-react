import React from "react";
import "./styles/StudentCard.css";

const StudentCard = () => {
  return (
    <>
      <main>
        <div className="profile-info profile-container profile-content">
          <div className="header-profile-info">
            <img className="header-profile-info-img"></img>
            <div className="header-profile-info-txt">
              <span className="student-name">Buisson</span>
              <span className="student-surname">Claire</span>
              <span className="student-classe">3°6</span>
            </div>
          </div>
          <div className="profile-stats">
            <span className="student-level">Niveau: B2</span>
            <span className="student-nb-exercises">
              Exercices effectués: 46
            </span>
          </div>
          <div className="student-regular-mistakes"></div>
        </div>
        <div className="profile-perf profile-container">
          <div className="profile-dashboard profile-content"></div>
          <div className="profile-exercises profile-content"></div>
        </div>
      </main>
    </>
  );
};

export default StudentCard;
