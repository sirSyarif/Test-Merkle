import React from 'react';
import { Modal, Fade, Box, Backdrop } from '@mui/material';

export default function CustomModal({ children, toggle, isShowing, handleClose, width = '60%' }) {
  const style = {
    position: 'absolute',
    maxHeight: '90vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    width: width
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isShowing}
      onClose={handleClose || toggle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isShowing}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}
