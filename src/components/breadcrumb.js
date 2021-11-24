import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        cursor: 'pointer',
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});


export default function CustomizedBreadcrumbs(props) {


    function navigate(path) {
    }

    const { path } = props;

    if (path[0] == '' && path.length == 1) {
        path[0] = 'Dashboard';
    }

    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                    onClick={() => navigate('/')}
                    label="Home"
                    icon={<HomeIcon fontSize="small" />}
                >
                </StyledBreadcrumb>

                {path.map((p => {
                    return <StyledBreadcrumb label={p} key={p} component='div' onClick={() => navigate(p == 'Dashboard' ? '/' : p)}>
                    </StyledBreadcrumb>
                }))}
            </Breadcrumbs>
        </div>
    );
}
