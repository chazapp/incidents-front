import React from "react";
import { Box } from "@mui/material";
import { Incident } from "../interfaces";
import PersistentDrawer from "../components/Navigation";
import IncidentCard from "../components/IncidentCard";
import IncidentTable from "../components/IncidentTable";
import IncidentSearch from "../components/IncidentSearch";

function makeIncidents(text: string): Incident[] {
    // This function returns a list of incidents
    //
    const incidents: Incident[] = [{
            id: 1,
            title: "Incident 1",
            description: text,
            status: "Open",
            severity: "Low",
            created_at: "2020-01-01",
            updated_at: "2020-01-01",
        }, {
            id: 2,
            title: "Incident 2",
            description: "This is incident 2",
            status: "Open",
            severity: "Medium",
            created_at: "2020-01-01",
            updated_at: "2020-01-01",
        }, {
            id: 3,
            title: "Incident 3",
            description: "This is incident 3",
            status: "Open",
            severity: "High",
            created_at: "2020-01-01",
            updated_at: "2020-01-01",
        }, {
            id: 4,
            title: "Incident 4",
            description: "This is incident 4",
            status: "Open",
            severity: "Low",
            created_at: "2020-01-01",
            updated_at: "2020-01-01",
        },
    ];
    return incidents;
}



function IncidentBrowser() {
    const [text, setText] = React.useState("");

    fetch("/Jewel.txt").then((response) => response.text()).then((text) => {
        setText(text);
    });
   const incidents = makeIncidents(text);
   const [ selectedIncident, setSelectedIncident ] = React.useState<Incident | null>(null);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "1vh",
        }}>
            <PersistentDrawer>
                <Box aria-label="Content" sx={{
                    display: "flex",
                    rowGap: "1rem",
                    columnGap: "1rem",
                }}>
                    <Box aria-label="incident-list" sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                        <IncidentSearch />
                        <IncidentTable rows={incidents} onSelect={setSelectedIncident} />  
                    </Box>
                    {selectedIncident && <IncidentCard incident={selectedIncident} />}
                </Box>
            </PersistentDrawer>
        </Box>
    );
}

export default IncidentBrowser;