"use client";
import { Grid, IconButton, Button, Avatar, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { sidebarData, setToggleSidebar } from "@/redux/feature/sidebarSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { collapsed } = useSelector(sidebarData);

  const handleLogout = () => {
    localStorage.removeItem("user-merkle");
    router.push("/login");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={`navbar ${collapsed && "collapsed"}`}
    >
      <Grid
        item
        container
        lg={6}
        md={6}
        sm={6}
        xs={6}
        justifyContent="flex-start"
        alignItems="center"
        direction="row"
        sx={{ pl: 3 }}
      >
        <Grid item>
          <IconButton onClick={() => dispatch(setToggleSidebar())}>
            <Icon icon="heroicons:bars-3" height={24} width={24} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        item
        container
        lg={5}
        md={5}
        sm={6}
        xs={6}
        justifyContent="flex-end"
        alignItems="center"
        direction="row"
        sx={{ pr: 3 }}
      >
        <Grid
          item
          container
          lg={5}
          md={6}
          sm={6}
          xs={6}
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Grid item lg={3} md={4} sm={5}>
            <Avatar sx={{ bgcolor: "#27B973" }} />
          </Grid>
          <Grid item lg={9} md={8} sm={7}>
            <Typography
              variant="h6"
              sx={{ fontSize: "14px !important", fontWeight: "600" }}
            >
              -
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "12px !important", fontWeight: "400" }}
            >
              -
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{ height: "25px", borderLeft: "2px gray solid" }}
          lg={1}
          md={1}
          sm={1}
          xs={1}
        />
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <Button
            variant="text"
            startIcon={
              <Icon
                icon="heroicons:arrow-right-on-rectangle"
                height={24}
                width={24}
              />
            }
            sx={{ color: "gray", fontWeight: "light" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
