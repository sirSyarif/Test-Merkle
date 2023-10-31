"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Grid, Typography, Button, Select, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import CustomTable from "@/components/Table";
import {
  setLoading,
  setError,
  setErrorMsg,
  setSuccess,
} from "@/redux/feature/modalSlice";
import { ConfirmationModal } from "@/components/Modal";
import { headerUser } from "@/data/headerList";

import useModal from "@/hooks/useModal";
import UserServices from "@/services/UserServices";

export default function TableUser() {
  const dispatch = useDispatch();

  const [selectedData, setSelectedData] = useState({});
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    sort: "asc",
  });

  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();

  const { data, isLoading, isFetching } = useQuery(
    ["daftar-user", filter.sort],
    () => UserServices.getUser({ sort: filter.sort })
  );

  useEffect(() => {
    if (isFetching && isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading, isFetching]);

  const datasTable = data?.data;

  const handleChange = (e, newVal, name) => {
    if (newVal) {
      setFilter({
        ...filter,
        [name]: newVal,
      });
    } else {
      setFilter({
        ...filter,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleOpenInput = (data) => {
    toggleInput();
    if (data) {
      setSelectedData(data);
    }
  };

  const handleCloseInput = () => {
    toggleInput();
    setSelectedData({});
  };

  const handleOpenDelete = (data) => {
    toggleDelete();
    if (data) {
      setSelectedData(data);
    }
  };

  const handleCloseDelete = () => {
    toggleDelete();
    setSelectedData({});
  };

  const handleDelete = async () => {
    dispatch(setLoading(true));
    try {
      await UserServices.deleteUser(selectedData?.id);
      dispatch(setSuccess(true));
      dispatch(setLoading(false));
      handleCloseDelete();
    } catch (error) {
      const errorMsg =
        typeof error?.response?.data?.message === "string"
          ? error?.response?.data?.message
          : error?.response?.data?.message?.[0];
      dispatch(setErrorMsg(errorMsg));
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-white">
      <Grid
        className="app-content bg-white"
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid
          item
          container
          lg={6}
          md={6}
          sm={6}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Icon icon="tdesign:user-checked-1" height={32} width={32} />
          <Typography variant="h3">List User</Typography>
        </Grid>
        <Grid
          item
          container
          lg={6}
          md={6}
          sm={6}
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 3 }}
        >
          <Select
            value={filter.sort}
            name="sort"
            onChange={(e) => handleChange(e)}
            size="small"
            sx={{ mr: 2 }}
          >
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
          </Select>
          <Button
            variant="contained"
            startIcon={<Icon icon="ic:baseline-plus" height={16} width={16} />}
            onClick={() => handleOpenInput()}
          >
            Tambah User
          </Button>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <CustomTable
            header={headerUser}
            data={datasTable}
            numbering
            checkbox="hidden"
            isAction
            page={filter.page}
            handleChangePage={(e, val, name) => handleChange(e, val, name)}
            actions={(row) => (
              <div>
                <Button
                  variant="contained"
                  startIcon={
                    <Icon icon="mdi:pencil-outline" height={16} width={16} />
                  }
                  sx={{ mr: 2 }}
                  onClick={() => handleOpenInput(row)}
                >
                  Detail
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Icon icon="ph:trash" height={16} width={16} />}
                  onClick={() => handleOpenDelete(row)}
                  sx={{ mr: 2 }}
                >
                  Delete
                </Button>
              </div>
            )}
          />
        </Grid>
        <ConfirmationModal
          isShowing={isShowingDelete}
          toggle={handleCloseDelete}
          header="Hapus Data"
          title={`Are you sure you want to delete the user ${
            selectedData?.full_name || ""
          }?`}
          helperText="You cannot restore data that has been deleted."
          leftButton={
            <Button variant="outlined" onClick={handleCloseDelete} fullWidth>
              Cancel
            </Button>
          }
          rightButton={
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              fullWidth
            >
              Delete
            </Button>
          }
        />
      </Grid>
    </div>
  );
}
