import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function MemberBrief({ member, onClick }) {
    return (
        <Card onClick={() => { onClick(member) }} sx={{ maxWidth: '400px' }}>
            <CardActionArea>
                <CardMedia
                    sx={{ objectFit: 'contain' }}
                    component="img"
                    height="300"
                    image={`http://localhost:3001/${member.image}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {member.role}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}