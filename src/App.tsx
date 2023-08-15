import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material/styles";
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
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import StockPage from "./components/pages/StockPage/StockPage";
import StockCreatePage from "./components/pages/StockCreatePage/StockCreatePage";
import StockEditPage from "./components/pages/StockEditPage/StockEditPage";
import ReportPage from "./components/pages/ReportPage/ReportPage";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import { blue, blueGrey } from "@mui/material/colors";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import loginReducer from "./reducers/login.reducer";
import { RootReducers } from "./reducers";
import * as loginAction from "./actions/login.action";
import { useAppDispatch } from "./store/store";
import PublicRoutes from "./router/public.routes";
import ProtectedRoutes from "./router/protected.routes";
import { thTH } from "@mui/material/locale";
import ProjectPage from "./components/pages/ProjectPage";
import MaintenancePage from "./components/pages/MaintenancePage";
import InstallationPage from "./components/pages/InstallationPage";

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

const theme = createTheme(
  {
    // components: {
    //   MuiDrawer: {
    //     styleOverrides: {
    //       paper: {
    //         backgroundImage:
    //           "url(" +
    //           `${process.env.PUBLIC_URL}/images/background_menu.jpg` +
    //           ")",
    //         width: drawerWidth,
    //       },
    //     },
    //   },
    // },
    typography: {
      fontFamily: ["-apple-system", "BlinkMacSystemFont"].join(","),
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
    spacing: 8,
    palette: {
      primary: process.env.REACT_APP_IS_PRODUCTION == "0" ? blue : blueGrey,
      background: {
        default: "#B4BEC5",
      },
    },
  },
  thTH
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = React.useState(true);
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(loginAction.restoreLogin());
  }, []);


  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {loginReducer.result && (
            <Header open={open} onDrawerOpen={handleDrawerOpen} />
          )}
          {loginReducer.result && (
            <Menu open={open} onDrawerClose={handleDrawerClose} />
          )}

          <Main open={open}>
            <DrawerHeader />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicRoutes />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/stock" element={<StockPage />} />
                <Route path="/stock/create" element={<StockCreatePage />} />
                <Route path="/stock/edit/:id" element={<StockEditPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/project" element={<ProjectPage open={open} onDrawerOpen={handleDrawerOpen}/>} />
                <Route path="/Maintenance" element={<MaintenancePage />} />
                <Route path="/Installation" element={<InstallationPage />} />
              </Route>
            </Routes>
          </Main>
        </Box>
      </ThemeProvider>
    </>
  );
}

const NotFound = () => (
  <div>
    <h1>404 - Notfound</h1>
    <Link to="/">Home</Link>
  </div>
);
