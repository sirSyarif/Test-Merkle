'use client';
import React from 'react';
import { Pagination, PaginationItem, Button } from '@mui/material';

export default function CustomPagination({ count, page, handleChangePage }) {
  return (
    <Pagination
      name="page"
      count={count || 1}
      page={page || 1}
      onChange={handleChangePage}
      shape="rounded"
      color="primary"
      size="large"
      sx={{ margin: '0 !important', ['ul']: { justifyContent: 'flex-end !important' } }}
      renderItem={(item) => (
        <PaginationItem
          sx={{ margin: 0, border: '1px solid #E0E0E0', borderRadius: 0.2 }}
          components={{
            next: (props) => (
              <Button
                sx={{
                  color: 'black !important',
                  opacity: '1 !important',
                  fontSize: '15px !important',
                  fontWeight: 'bolder',
                  textTransform: 'none !important'
                }}
                {...props}
              >
                <p>Berikutnya</p>
              </Button>
            ),
            previous: (props) => (
              <Button
                sx={{
                  color: 'black',
                  fontSize: '15px !important',
                  fontWeight: 'bolder',
                  textTransform: 'none !important'
                }}
                {...props}
              >
                Sebelumnya
              </Button>
            )
          }}
          {...item}
        />
      )}
    />
  );
}
