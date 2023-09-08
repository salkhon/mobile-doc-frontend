import React from "react";

import Paper from '@mui/material/Paper';
import { Chip, Box } from "@mui/material";
import Stack from '@mui/material/Stack';

//takes in array and color
const infoPills = ({ items, color }) => {


    return (
        <Box
            sx={{
                display: 'flex',
                // justifyContent: 'center',
                // flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0.5,
            }}
            component="ul"
        >

            <Stack direction="row" spacing={1} style={{
                overflowY: "scroll",
            }}>
                {items.map((item) => {
                    return (
                        <Chip label={item} color={color} />
                    );
                })}

            </Stack>
        </Box>
    );
}

export default infoPills;