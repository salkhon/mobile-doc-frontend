import React from "react";

import Paper from '@mui/material/Paper';
import { Chip, Box } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Stack from '@mui/material/Stack';

//takes in array and color
const infoPills = ({ items, color1, color2 }) => {

    //list of test names that are positive
    const positiveTests = items.filter((test) => {
        return test[1] === "positive";
    }).map((test) => {
        return test[0];
    });
    const negativeTest = items.filter((test) => {
        return test[1] === "negative";
    }).map((test) => {
        return test[0];
    });



    return (
        <Box
            sx={{
                display: 'flex',
                listStyle: 'none',
                p: 0.5,
                m: 0.5,
            }}
            component="ul"
        >

            <Stack direction="row" spacing={1} style={{
                overflowY: "scroll",
            }}>
                {positiveTests.map((item) => {
                    return (
                        <Chip label={item} color={color1} icon={<DoneIcon />} />
                    );
                })}

                {negativeTest.map((item) => {
                    return (
                        // {chip with color 2 and cross icon}
                        <Chip label={item} color={color2} icon={<ClearIcon />} margin={2} />
                    );
                })}

            </Stack>
        </Box>
    );
}

export default infoPills;