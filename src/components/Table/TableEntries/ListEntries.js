import React from "react";
import { Select, Typography, Grid, MenuItem } from "@mui/material";

//data
import { listEntries } from "@/data/headerList";

export default function ListEntries({ value, onChange }) {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      gap={2}
    >
      <Grid item>
        <Typography>Show</Typography>
      </Grid>
      <Grid item>
        <Select
          name="limit"
          value={value}
          onChange={onChange}
          size="small"
          sx={{
            background: "white !important",
            borderRadius: "4px !important",
          }}
          fullWidth
        >
          {listEntries.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Typography>Entries</Typography>
      </Grid>
    </Grid>
  );
}
