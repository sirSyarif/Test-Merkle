"use client";
import { useEffect } from "react";
import { Typography, Grid, Button, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useFormik, Form, FormikProvider } from "formik";

import {
  setLoading,
  setError,
  setErrorMsg,
  setSuccess,
} from "@/redux/feature/modalSlice";
import UserServices from "@/services/UserServices";
import { titleAdjuster } from "@/utils";

export default function DetailUser() {
  const queryParams = useSearchParams();
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const id = queryParams.get("id");

  const { data, isLoading, isFetching } = useQuery(
    ["detail-user", id],
    () => UserServices.getUserById(id),
    { enabled: !!id }
  );

  const detailUser = data?.data;

  useEffect(() => {
    if (isFetching && isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading, isFetching]);

  // using formik for input state management
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      email: detailUser?.email || "",
      username: detailUser?.username || "",
      password: detailUser?.password || "",
      name: {
        firstname: detailUser?.name?.firstname || "",
        lastname: detailUser?.lastname?.lastname || "",
      },
      address: {
        city: detailUser?.address?.city || "",
        street: detailUser?.address?.street || "",
        number: detailUser?.address?.number || "",
        zipcode: detailUser?.address?.zipcode || "",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: detailUser?.phone || "",
    },
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        if (id !== null) {
          await UserServices.editUser({ values, id });
        } else {
          await UserServices.postUser(values);
        }
        dispatch(setSuccess(true));
        dispatch(setLoading(false));
        router.push("/user");
      } catch (error) {
        const errorMsg =
          typeof error?.response?.data?.message === "string"
            ? error?.response?.data?.message
            : error?.response?.data?.message[0];
        dispatch(setErrorMsg(errorMsg));
        dispatch(setError(true));
        dispatch(setLoading(false));
      }
    },
  });

  const { handleSubmit, getFieldProps } = formik;

  return (
    <div className="bg-white">
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ padding: "30px" }}
        >
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
              <Typography variant="h3">
                {titleAdjuster(params.type)} User
              </Typography>
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
              {params.type === "detail" && (
                <Button
                  variant="contained"
                  startIcon={
                    <Icon icon="mdi:pencil-outline" height={16} width={16} />
                  }
                  sx={{ mr: 2 }}
                  onClick={() => router.push(`/user/edit?id=${id}`)}
                >
                  Edit User
                </Button>
              )}
            </Grid>
            {params.type === "detail" ? (
              <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 3, pr: 3 }}>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Nama
                </Typography>
                <Typography variant="h4" fontWeight="normal">
                  {detailUser?.name?.firstname} {detailUser?.name?.lastname}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Username
                </Typography>
                <Typography variant="h4" fontWeight="normal">
                  {detailUser?.username}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Email
                </Typography>
                <Typography variant="h4" fontWeight="normal">
                  {detailUser?.email}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Phone Number
                </Typography>
                <Typography variant="h4" fontWeight="normal">
                  {detailUser?.phone}
                </Typography>
              </Grid>
            ) : (
              <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 3, pr: 3 }}>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Nama Depan
                </Typography>
                <TextField
                  name="name.firstname"
                  fullWidth
                  required
                  {...getFieldProps("name.firstname")}
                />
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Nama Belakang
                </Typography>
                <TextField
                  name="name.lastname"
                  fullWidth
                  required
                  {...getFieldProps("name.lastname")}
                />
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Username
                </Typography>
                <TextField
                  name="username"
                  fullWidth
                  required
                  {...getFieldProps("username")}
                />
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Email
                </Typography>
                <TextField
                  name="email"
                  fullWidth
                  required
                  type="email"
                  {...getFieldProps("email")}
                />
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Phone Number
                </Typography>
                <TextField
                  name="phone"
                  fullWidth
                  required
                  type="number"
                  {...getFieldProps("phone")}
                />
              </Grid>
            )}
            {params.type === "detail" ? (
              <Grid item lg={8} md={6} sm={12} xs={12} sx={{ mt: 3 }}>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Kota
                </Typography>
                <Typography variant="h4" fontWeight="normal">
                  {detailUser?.address?.city}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Alamat
                </Typography>
                <Typography variant="h4" fontWeight="normal">
                  {detailUser?.address?.street} {detailUser?.address?.number}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Kode Pos
                </Typography>
                <Typography variant="h4" fontWeight="normal">
                  {detailUser?.address?.zipcode}
                </Typography>
              </Grid>
            ) : (
              <Grid item lg={8} md={6} sm={12} xs={12} sx={{ mt: 3 }}>
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Kota
                </Typography>
                <TextField
                  name="address.city"
                  fullWidth
                  required
                  {...getFieldProps("address.city")}
                />
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Alamat
                </Typography>
                <TextField
                  name="address.street"
                  fullWidth
                  required
                  {...getFieldProps("address.street")}
                />
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Nomor Rumah
                </Typography>
                <TextField
                  name="address.number"
                  fullWidth
                  required
                  type="number"
                  {...getFieldProps("address.number")}
                />
                <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
                  Kode Pos
                </Typography>
                <TextField
                  name="address.zipcode"
                  fullWidth
                  required
                  {...getFieldProps("address.zipcode")}
                />
              </Grid>
            )}
            {params.type !== "detail" && (
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                container
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Button variant="contained" type="submit" size="large">
                  Submit
                </Button>
              </Grid>
            )}
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}
