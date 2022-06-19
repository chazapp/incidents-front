import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Incident } from "../index.d";
import PersistentDrawer from "../components/Navigation";
import IncidentCard from "../components/IncidentCard";
import IncidentTable from "../components/IncidentTable";
import IncidentSearch from "../components/IncidentSearch";
import axios from "axios";

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



function IncidentBrowser(props: {menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [incidents, setIncidents] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { menuOpen, setMenuOpen } = props;
    const [ selectedIncident, setSelectedIncident ] = React.useState<Incident | null>(null);
    useEffect(() => {
        axios.get("/incidents/")
            .then(res => {
                setIncidents(res.data.results);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false);
            }
        );
    }, []);

    
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "1vh",
        }}>
            <PersistentDrawer
                open={menuOpen}
                setOpen={setMenuOpen}
                pageName="Incidents"
            >
                <Box aria-label="Content" sx={{
                    display: "flex",
                    rowGap: "1rem",
                    columnGap: "1rem",
                    flexDirection: "row",
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