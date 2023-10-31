import React from 'react';
import { Typography } from '@mui/material';

export default function ShowListEntries({ meta }) {
  return (
    <Typography>
      Menampilkan {(meta?.current_page - 1) * meta?.items_limit + 1} sampai{' '}
      {(meta?.current_page - 1) * meta?.items_limit + meta?.items_count} dari {meta?.total_items}{' '}
      entri
    </Typography>
  );
}
