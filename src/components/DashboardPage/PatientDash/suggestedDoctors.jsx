import React from "react";
import DoctorBar from "./doctorBar";


const suggestedDoctors = (doctorList) => {
    
    const [doctors, setDoctors] = React.useState(doctorList.doctorList);


    return (
        <div>
            {doctors.map((doctor) => (
                <DoctorBar doctorFirstName={doctor[0]} doctorLastName={doctor[1]} doctorSpeciality={doctor[2]} doctorLocation={doctor[3]} doctorTime={doctor[4]}/>
            ))}
        </div>
    );
};

export default suggestedDoctors;
