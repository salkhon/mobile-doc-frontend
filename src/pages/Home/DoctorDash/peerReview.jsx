import React from "react";
import HorizontalBar from "./hBar";
import { Button, Card } from "@mui/material";
import InfoChips from "./infoChips";
import InfoChipsX2 from "./infoChipsX2";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const PeerReview = ({ peerReviewX }) => {
    /*
      Object
  
      list of symptoms
      list of [test:test_results]
      diagnosis
      list of prescribed_medications
      notes: list of strings
  
    */
    // create dummy peerReivew data

    const peerReview = {
        symptoms: ["cough", "fever", "fatigue", "flash sweats"],
        tests: [["PCR", "negative"], ["antigen", "negative"], ["NS1", "positive"]],
        diagnosis: "Dengue",
        prescribed_medications: ["paracetamol", "panadol", "ibuprofen"],
        notes: ["Hospitalization advised"],
    };

    //list of test names that are positive
    const positiveTests = peerReview.tests.filter((test) => {
        return test[1] === "positive";
    }).map((test) => {
        return test[0];
    });
    const negativeTest = peerReview.tests.filter((test) => {
        return test[1] === "negative";
    }).map((test) => {
        return test[0];
    });



    return (

        <Card style={{
            padding: "1%",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            // backgroundColor: "black",
            margin: "2%",
            paddingTop: "0.5%",
            // borderRadius: "10px",
            backgroundColor: "rgba(30, 30, 30, 0.5)",

            backdropFilter: "blur(10px)",

        }}>
            <Box display="flex" alignItems="center">
                <Box flexGrow={1} >{peerReview.diagnosis}</Box>
                <Box>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
            <InfoChips items={peerReview.symptoms} color="warning" />
            <InfoChipsX2 items={peerReview.tests} color1="error" />
            <InfoChips items={peerReview.prescribed_medications} color="success" />


            {/* <Stack direction="row" spacing={1} marginTop={2}>
                <Button variant="contained" color="success">
                    View Peer Review
                </Button>

                <Button variant="contained" color="error">
                    Skip
                </Button>
            </Stack> */}

        </Card>
    );
};

export default PeerReview;
