const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function fetchSuggestedDoctorsWithGivenSymptoms(
    user, symptoms, setSessionId, setSuggestedDoctors, setIsSuggestedDoctorsLoading
) {
    try {
        // create new session for this user
        let resp = await fetch(`${BASE_URL}/session/new/${user.id}`);
        resp = await resp.json();
        const sessionId = resp["created_session_id"];
        setSessionId(sessionId);
        console.log("Session created", sessionId);

        // POST all symptoms to this session
        console.log("POSTing symptoms on session", sessionId);
        resp = await Promise.all(
            symptoms.map((symptom) =>
                fetch(`${BASE_URL}/session/symptoms/${sessionId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        symptom_name: symptom,
                        duration: 1,
                        added_by: "patient",
                    }),
                })
            )
        );

        // GET suggested doctors for this session with symptoms 
        resp = await fetch(
            `${BASE_URL}/session/suggested_doctors/${sessionId}`,
        );
        resp = await resp.json();
        const doctors = resp["suggested_doctors"];
        console.log(resp["suggested_doctors"]);
        setSuggestedDoctors(doctors);
        setIsSuggestedDoctorsLoading(false);
    } catch (error) {
        console.log(error);
    }
}

export async function fetchPostSessionDoctorAndTime(sessionId, selectedDoctorId, appointmentTime, navigate) {
    let resp = await fetch(
        `${BASE_URL}/session/update_session_doctor/${sessionId}/?input_doctor_id=${selectedDoctorId}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
    );
    resp = await resp.json();
    console.log("POSTed selected doctor id", resp);
    resp = await fetch(`${BASE_URL}/session/update_session_time/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            start_time: appointmentTime,
            end_time: appointmentTime,
        }),
    });
    console.log("POSTed appointment time", resp);
    navigate("/calendar");
}

export async function fetchUserAppointments(user, setAppointments) {
    let resp;
    if (user.userType === "patient") {
        resp = await fetch(`${BASE_URL}/patient/EHR/${user.id}`);
        resp = await resp.json();
        setAppointments(resp.patient_sessions);
    } else if (user.userType === "doctor") {
        resp = await fetch(`${BASE_URL}/doctor/${user.id}`)
        resp = await resp.json();
        let convertedDoctorSessions = resp.doctor.calendar.map(session => ({
            start_time: session.session_starttime,
            end_time: session.session_endtime
        }));
        setAppointments(convertedDoctorSessions);
    }
}

export async function fetchPostUpdateSessionTime(sessionId, startTimeStr) {
    const startDate = new Date(startTimeStr)
    await fetch(`${BASE_URL}/session/update_session_time/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            start_time: getFormattedDateTime(startDate),
            end_time: getFormattedDateTime(startDate)
        }),
    });
}

export function getFormattedDateTime(date) {
    // dhrubo's time format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
}