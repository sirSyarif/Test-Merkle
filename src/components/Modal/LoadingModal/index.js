import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, CircularProgress, Stack } from '@mui/material';

import { modalState } from '@/redux/feature/modalSlice';
import CustomModal from '../CustomModal';

export default function LoadingModal() {
  const { isLoading } = useSelector(modalState);
  return (
    <CustomModal isShowing={isLoading}>
      <Stack
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 5 }}
      >
        <CircularProgress color="primary" thickness={10} size={150} />
        <Typography variant="h3">SEDANG DIPROSES...</Typography>
      </Stack>
    </CustomModal>
  );
}
