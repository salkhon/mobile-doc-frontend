import React from "react";
import "./styles.css";
import DM from "./diseaseMed";
import Details from "./details";
import { Chart } from "chart.js";
import TopBar from "./topBar";
import SearchBarWithTags from "./searchBarWithTags";
import DoctorBar from "./doctorBar";
import Popup from "reactjs-popup";

const Main = () => {

  const doctorDictionary = {
    "Fever": ["Felix", "Kjellberg", "FCPS", "Timori", "8AM-11PM"],
    "Cough": ["Pew", "Die", "Pie", "MD", "Birmingham", "1PM-11PM"],
    "Shortness of breath": ["Sam", "Altman", "MRCS", "Pasedina", "11AM-11PM"],
    "Fatigue": ["Elon", "Musk", "MBBS", "New York", "8AM-11PM"],
    "Headache": ["Jeff", "Bezos", "FCPS", "London", "8AM-11PM"],
  };

  const [doctors, setDoctors] = React.useState([]);

  function setDoctorsWrapper(symptoms) {
    //empty the doctors array
    // setDoctors([]);

    console.log(symptoms);

    const doctorsTemp = [];

    symptoms.forEach((symptom) => {
      if (symptom in doctorDictionary) {
        doctorsTemp.push(doctorDictionary[symptom]);
      }
    });
    setDoctors(doctorsTemp);
  };

  return (
    <div>
      <TopBar
        firstName="Sameen"
        lastName="Shahgir"
      />


        <div className="horizontal-container">
          <div className="left-div shadowPadMargin2">
            <h3>Ongoing Treatment</h3>
            <DM
              diseaseName="Fever"
              medNames={["Paracetamol", "Paracetamol", "Paracetamol"]}
              medDosage={["1/0/1", "1/0/1", "1/0/1"]}
              medDaysRemaining={["2/7", "2/7", "2/7"]}
            />
            <DM
              diseaseName="Fever"
              medNames={["Paracetamol", "Paracetamol", "Paracetamol"]}
              medDosage={["1/0/1", "1/0/1", "1/0/1"]}
              medDaysRemaining={["2/7", "2/7", "2/7"]}
            />
          </div>

          <div className="right-div shadowPadMargin2">
            <Details />
          </div>
        </div>
      )


    </div>
  );
};

export default Main;
