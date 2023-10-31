import React from 'react';
import { Typography, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';

import { modalState, setError } from '@/redux/feature/modalSlice';
import CustomModal from '../CustomModal';

export default function ErrorModal() {
  const { isError, errorMsg } = useSelector(modalState);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(setError(false));
  }, 3000);
  return (
    <CustomModal isShowing={isError} toggle={() => dispatch(setError(false))}>
      <Stack
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 5 }}
      >
        <Image
          priority
          src="/assets/logo/logo-error.svg"
          width={244}
          height={244}
          alt="logo sukses"
        />
        <Typography variant="h3">{errorMsg.toUpperCase()}</Typography>
      </Stack>
    </CustomModal>
  );
}
