import React from "react";
import { Incident } from "../index.d";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const IncidentAdd = (props: {setSelectedIncident: React.Dispatch<React.SetStateAction<Incident | null>>}) => {
    const { setSelectedIncident } = props;
    const newIncident: Incident = {
        id: -1,
        title: "",
        description: "",
        severity: "",
        status: "",
        created_at: new Date(),
        updated_at: new Date(),
    };
    return(
        <Box sx={{
        }}>
            <IconButton
                aria-label="add"
                onClick={() => {
                    setSelectedIncident(newIncident);
                }}
                
            >
                <AddCircleIcon fontSize="large"/>
            </IconButton>
        </Box>
    )
};

export default IncidentAdd;