import React from "react";
import "./styles.css";
import DM from "./diseaseMed";
import Details from "./details";
import TopBar from "./topBar";
import {
  getAppointmentsByPatientId,
} from "../../../api/session";



const Main = (name) => {

  const [ appointments, setAppointments ] = useState(null);

  useEffect(() => {
    getAppointmentsByPatientId(userId).then((appointments) => setAppointments(appointments));
  }, [userId]);

  console.log(appointments);

  

  return (
    <div>
      <TopBar
        name = {name}
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


    </div>
  );
};

export default Main;
