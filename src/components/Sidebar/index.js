import Image from "next/image";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { usePathname } from "next/navigation";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Link from "next/link";

// component
import sidebarConfig from "./SidebarConfig";
import { sidebarData } from "@/redux/feature/sidebarSlice";

export default function Sidebar({ children }) {
  const { collapsed } = useSelector(sidebarData);
  const pathname = usePathname();

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item>
        <div className={`content ${collapsed && "collapsed"}`}>{children}</div>
        <ProSidebar
          collapsed={collapsed}
          className="sidebar"
          style={{ zIndex: 1031 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80px",
            }}
          >
            {collapsed ? (
              <Image
                priority
                src="/assets/logo/brand.svg"
                width={36}
                height={36}
                alt="logo collapsed"
              />
            ) : (
              <Image
                priority
                src="/assets/logo/full-brand.svg"
                width={154}
                height={80}
                alt="logo full"
              />
            )}
          </div>
          <Menu className="main-menu menu-label" style={{ paddingTop: 0 }}>
            {sidebarConfig.map((item) => (
              <MenuItem
                key={item.path}
                active={pathname.split("/")[1] === item.path}
                icon={item.icon}
              >
                <Link href={`/${item.path}`}>{item.title}</Link>
              </MenuItem>
            ))}
          </Menu>
        </ProSidebar>
      </Grid>
    </Grid>
  );
}
