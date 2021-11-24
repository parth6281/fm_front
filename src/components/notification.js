import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ errors, severity }) {

    return (
        <Stack spacing={1} sx={{ width: '100%' }}>
            {
                errors.map(error =>
                    <Alert severity={severity ? severity : 'info'} sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                )
            }
        </Stack>
    );
};