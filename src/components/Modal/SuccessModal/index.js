import React from "react";
import { Typography, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import { modalState, setSuccess } from "@/redux/feature/modalSlice";
import CustomModal from "../CustomModal";

export default function SuccessModal() {
  const { isSuccess } = useSelector(modalState);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(setSuccess(false));
  }, 3000);

  return (
    <CustomModal
      isShowing={isSuccess}
      toggle={() => dispatch(setSuccess(false))}
    >
      <Stack
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 5 }}
      >
        <Image
          priority
          src="/assets/logo/logo-sukses.svg"
          width={244}
          height={244}
          alt="logo sukses"
        />
        <Typography variant="h3">BERHASIL</Typography>
      </Stack>
    </CustomModal>
  );
}
