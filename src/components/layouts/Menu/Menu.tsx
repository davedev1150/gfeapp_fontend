import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LayersIcon from "@mui/icons-material/Layers";
import BarChartIcon from "@mui/icons-material/BarChart";
import Person from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HandymanIcon from "@mui/icons-material/Handyman";
import StoreMallDirectorySharpIcon from "@mui/icons-material/StoreMallDirectorySharp";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProp = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function Menu({ open, onDrawerClose }: MenuProp) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    // setOpen(false);
    onDrawerClose();
  };

  const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) =>
        `${props.className} ${isActive ? props.activeClassName : ""}`
      }
      color={"primary"}
    >
      {props.children}
    </NavLink>
  ));

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Stack direction="row" alignItems="center">
            <img
              src={`${process.env.PUBLIC_URL}/images/GFE_logo.png`}
              style={{ height: 40 }}
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </Stack>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            buttom
            component={MyNavLink}
            to="/project"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ color: "#808080" }} component={"div"}>
                  <Box sx={{ fontWeight: 600, m: 1 }}>Project List</Box>
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            buttom
            component={MyNavLink}
            to="/stock"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ color: "#808080" }} component={"div"}>
                  <Box sx={{ fontWeight: 600, m: 1 }}>INS Stock</Box>
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            buttom
            component={MyNavLink}
            to="/Maintenance"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <HandymanIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ color: "#808080" }} component={"div"}>
                  <Box sx={{ fontWeight: 600, m: 1 }}>Maintenance</Box>
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            buttom
            component={MyNavLink}
            to="/Installation"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ color: "#808080" }} component={"div"}>
                  <Box sx={{ fontWeight: 600, m: 1 }}>Installation</Box>
                </Typography>
              }
            />
          </ListItem>

          <ListItem
            buttom
            component={MyNavLink}
            to="/report"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ color: "#808080" }} component={"div"}>
                  <Box sx={{ fontWeight: 600, m: 1 }}>Report</Box>
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            buttom
            component={MyNavLink}
            to="/aboutus"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ color: "#808080" }} component={"div"}>
                  <Box sx={{ fontWeight: 600, m: 1 }}>AboutUs</Box>
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Divider />
        {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      </Drawer>
    </>
  );
}
