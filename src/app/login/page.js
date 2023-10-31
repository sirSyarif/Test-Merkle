"use client";
import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from "next/image";

import { setError, setErrorMsg, setLoading } from "@/redux/feature/modalSlice";
import UserServices from "@/services/UserServices";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await UserServices.login(loginData);
      localStorage.setItem("user-merkle", "sudah");
      router.push(`/user`);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setErrorMsg(error?.response?.data || error?.message));
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh", width: "100vw" }}
      >
        <Grid
          item
          lg={8}
          md={8}
          sm={0}
          display={{ xs: "none", lg: "block" }}
          sx={{ background: "#27B973", height: "100%" }}
        >
          <div style={{ padding: "30vh 5vw" }}>
            <Typography variant="h2" sx={{ color: "white" }}>
              Welcome
            </Typography>
            <Typography variant="h3" sx={{ color: "white" }}>
              Login to Access with your existing account
            </Typography>
          </div>
        </Grid>
        <Grid item lg={4} md={6} sm={10}>
          <Box sx={{ margin: "0 auto 0 auto" }}>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 2rem 0 2rem",
              }}
            >
              <div style={{ margin: "auto" }}>
                <Image
                  priority
                  src="/assets/logo/full-brand.svg"
                  width={200}
                  height={200}
                  alt="logo collapsed"
                />
              </div>
              <Typography variant="h2" alignSelf="flex-start" mb={3}>
                Login
              </Typography>
              <Box>
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6" alignSelf="flex-start">
                    Username
                  </Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    placeholder="Username"
                    name="username"
                    autoFocus
                    required
                    value={loginData.username}
                    onChange={handleChange}
                  />
                  <Typography variant="h6" alignSelf="flex-start">
                    Password
                  </Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={loginData.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            {showPassword ? (
                              <Icon
                                icon="basil:eye-closed-outline"
                                height={18}
                                width={18}
                              />
                            ) : (
                              <Icon
                                icon="mdi:eye-outline"
                                height={18}
                                width={18}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 8, mb: 2, height: "3em", boxShadow: "0" }}
                  >
                    LOGIN
                  </Button>
                </form>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
