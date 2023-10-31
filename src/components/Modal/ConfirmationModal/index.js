import React from 'react';
import { Typography, Stack } from '@mui/material';

import CustomModal from '../CustomModal';

export default function ConfirmationModal({
  header,
  title,
  helperText,
  leftButton,
  rightButton,
  isShowing,
  toggle
}) {
  return (
    <CustomModal isShowing={isShowing} toggle={toggle} width="40%">
      <Typography
        variant="h4"
        sx={{ pb: 3, pt: 3, borderBottom: '1px #F5F5F5 solid', textAlign: 'center' }}
      >
        {header}
      </Typography>
      <center style={{ padding: '30px' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1" sx={{ color: '#828282', fontWeight: 400 }}>
          {helperText}
        </Typography>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 4, mb: 0 }} spacing={3}>
          {leftButton}
          {rightButton}
        </Stack>
      </center>
    </CustomModal>
  );
}
