import React from "react";
import { Box, Paper, Divider, FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, Select, MenuItem } from "@mui/material";
import { Incident } from "../interfaces";
import EditIcon from '@mui/icons-material/Edit';


function IncidentCard(props: { incident: Incident }) {
    const { incident } = props;
    const [ title, setTitle ] = React.useState("");
    const [ severity, setSeverity ] = React.useState("");
    const [ status, setStatus ] = React.useState("");
    const [ description, setDescription ] = React.useState("");

    React.useEffect(() => {
        setTitle(incident.title);
        setSeverity(incident.severity);
        setStatus(incident.status);
        setDescription(incident.description);
    }, [incident]);

    const [ editTitle, setEditTitle ] = React.useState(false);
    return (
        <Paper sx={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "column",
        }} elevation={3}>
            <Box aria-label="incident-header" sx={{
                display: "flex",
                padding: "1rem",
                flexDirection: "column",
                gap: "1rem",
            }}>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Title</InputLabel>
                    <OutlinedInput
                        disabled={!editTitle}
                        id="component-outlined"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        data-cy="incident-title-input"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                setEditTitle(false);
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end" onClick={() => setEditTitle(!editTitle)}>
                                <IconButton>
                                    <EditIcon data-cy="incident-edit-title"/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Box aria-label="incident-infos" sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                }}>
                    <FormControl sx={{minWidth: 120 }}>
                        <InputLabel id="incident-severity">Severity</InputLabel>
                        <Select
                            labelId="incident-severity"
                            label="Severity"
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            data-cy="incident-severity-select"
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl  sx={{minWidth: 120 }}>
                        <InputLabel id="incident-status">Status</InputLabel>
                        <Select
                            labelId="incident-status"
                            label="Severity"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            data-cy="incident-status-select"
                        >
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Divider />
            <Box aria-label="incident-description" sx={{
                display: "flex",
                flexGrow: "1",
                flexDirection: "column",
                padding: "1rem",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
            }}>
                {description}
            </Box>
        </Paper>
    );
}

export default IncidentCard;