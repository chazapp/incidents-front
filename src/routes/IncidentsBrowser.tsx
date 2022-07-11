import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Incident } from "../index.d";
import PersistentDrawer from "../components/Navigation";
import IncidentCard from "../components/IncidentCard";
import IncidentTable from "../components/IncidentTable";
import IncidentSearch from "../components/IncidentSearch";

import axios from "axios";
import { getCsrfToken } from "../utils";

function IncidentBrowser(props: {menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [incidents, setIncidents] = React.useState<Incident[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { menuOpen, setMenuOpen } = props;
    const [ selectedIncident, setSelectedIncident ] = React.useState<Incident | null>(null);
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
    const [ totalRows, setTotalRows ] = React.useState(0);

    const pagination = {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        totalRows,
    }
   
    useEffect(() => {
        axios.get(`/incidents/?limit=${rowsPerPage}&offset=${page * rowsPerPage}`)
            .then(res => {
                setIncidents(res.data.results);
                setTotalRows(res.data.count);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false);
            }
        );
    }, [page, rowsPerPage]);

    const onCreate = (incident: Incident) => {
        getCsrfToken().then(csrf => {
            setIsLoading(true);
            axios.post("/incidents/", incident, {
                headers: {
                    "X-CSRFToken": csrf,
                },
            }).then((response) => {
                if (response.status === 201) {
                    setIncidents([...incidents, response.data]);
                    setSelectedIncident(null);
                }
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false);
            });
        })
    };

    const onUpdate = (incident: Incident) => {
        getCsrfToken().then(csrf => {
            setIsLoading(true);
            axios.put(`/incidents/${incident.id}/`, incident, {
                headers: {
                    "X-CSRFToken": csrf,
                },
            }).then((response) => {
                if (response.status === 200) {
                    setIncidents(incidents.map(i => i.id === incident.id ? incident : i));
                    setSelectedIncident(null);
                }
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false);
            });
        })
    };
    
    const onDelete = (incident: Incident) => {
        getCsrfToken().then(csrf => {
            setIsLoading(true);
            axios.delete(`/incidents/${incident.id}/`, {
                headers: {
                    "X-CSRFToken": csrf,
                },
            }).then((response) => {
                if (response.status === 204) {
                    setIncidents(incidents.filter(i => i.id !== incident.id));
                    setSelectedIncident(null);
                }
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false);
            });
        })
    };

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
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}>
                            <IncidentSearch setIncidents={setIncidents} setIsLoading={setIsLoading}/>
                        </Box>
                        <IncidentTable rows={incidents} onSelect={setSelectedIncident} isLoading={isLoading} pagination={pagination} />  
                    </Box>
                    {selectedIncident && <IncidentCard incident={selectedIncident} onCreate={onCreate} onDelete={onDelete} onUpdate={onUpdate} />}
                </Box>
            </PersistentDrawer>
        </Box>
    );
}

export default IncidentBrowser;