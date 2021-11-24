import { Paper, SpeedDial } from "@mui/material"
import { Typography } from "@mui/material"
import './memberDetails.css';
import CloseIcon from '@mui/icons-material/Close';

export function MemberDetails({ member, onClick }) {
    return (
        <Paper sx={{ pl: 5, pr: 3 }} elevation={8}>
            <SpeedDial
                sx={{ alignItems: 'flex-end' }}
                className="close-button"
                ariaLabel="SpeedDial basic example"
                icon={<CloseIcon />}
                onClick={() => { onClick() }}
            >
            </SpeedDial>
            <div className="profile-info">
                <img src={`http://localhost:3001/${member.image}`}></img>
                <div className="details">
                    <Typography variant="h3">
                        {member.name}
                    </Typography>
                    <Typography variant="h4">
                        {member.role}
                    </Typography>
                    <br></br>
                    <Typography paragraph>
                        {member.about}
                    </Typography>
                </div>
            </div>
        </Paper>
    )
}