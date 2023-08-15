import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestoreIcon from "@mui/icons-material/Restore";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Map from "../../layouts/LongdoMap/longdomap";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import * as projectActions from "./../../../actions/project.action";
import { Project } from "../../../types/project.type";
import { useAppDispatch } from "../../..";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Fab,
  Grid,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  styled,
} from "@mui/material";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import { AddShoppingCart } from "@mui/icons-material";
import StockCard from "../../layouts/StockCard";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { pink } from "@mui/material/colors";

type ProjectPageProps = {
  //
};
type HeaderProp = {
  open: boolean;
  onDrawerOpen: () => void;
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

export default function ProjectPage({ open, onDrawerOpen }: HeaderProp) {
  const projectReducer = useSelector(
    (state: RootState) => state.projectReducer
  );
  const project = projectReducer.result;
  const projectlength = project.length;
  React.useEffect(() => {
    dispatch(projectActions.loadProject());
  }, []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleDrawerOpen = () => {
    // setOpen(true);
    onDrawerOpen();
  };

  if (projectReducer.isError) {
    return <div>Error: {projectReducer.isError}</div>;
  } else if (projectReducer.isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
         <Map /> 
        
        <Box sx={{ flexGrow: 1 }} paddingTop={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} md={4}>
              <StockCard
                unified="1f4af"
                title="Project Complete"
                subtitle={`Total : ${projectlength} project`}
                color="#27374D"
              />
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <StockCard
                unified="1f525"
                title="test"
                subtitle="test"
                color="#27374D"
              />
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <StockCard
                unified="1f525"
                title="test2"
                subtitle="test"
                color="#27374D"
              />
            </Grid>
          </Grid>
        </Box>
        <Box id="RID6">
          <Accordion sx={{ marginTop: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ marginTop: 2 }}
            >
              <Typography component="div" variant="h6">
                RID 6
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* //RID 6 filter */}
              <Box sx={{ flexGrow: 1 }} paddingTop={0}>
                <Grid container spacing={2} paddingTop={3}>
                  {project
                    .filter((ridnum: Project) => ridnum.ridnum === 6)
                    .map((filterproject: Project) => (
                      <Grid item xs={12} lg={4} md={4}>
                        <Box sx={{ boxShadow: 3 }}>
                          <Card sx={{ display: "flex" }}>
                            <Box sx={{ flexGrow: 1 }}>
                              <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="/static/images/cards/live-from-space.jpg"
                                alt="Live from space album cover"
                              />
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "40%",
                                paddingBottom: 2,
                              }}
                            >
                              <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography component="div" variant="h6">
                                  {filterproject.projectname}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="text.secondary"
                                  component="div"
                                >
                                  {filterproject.Code}
                                </Typography>
                              </CardContent>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  pl: 1,
                                  pb: 1,
                                }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{ marginRight: 2 }}
                                >
                                  Details
                                </Button>
                                <IconButton aria-label="add to favorites">
                                  <FavoriteIcon sx={{ color: pink[500] }} />
                                </IconButton>
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box id="RID7">
          <Accordion sx={{ marginTop: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ marginTop: 2 }}
            >
              <Typography component="div" variant="h6">
                RID 7
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* //RID 7 filter */}
              <Box sx={{ flexGrow: 1 }} paddingTop={0}>
                <Grid container spacing={2} paddingTop={3}>
                  {project
                    .filter((ridnum: Project) => ridnum.ridnum === 7)
                    .map((filterproject: Project) => (
                      <Grid item xs={12} lg={4} md={4}>
                        <Box sx={{ boxShadow: 3 }}>
                          <Card sx={{ display: "flex" }}>
                            <Box sx={{ flexGrow: 1 }}>
                              <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="/static/images/cards/live-from-space.jpg"
                                alt="Live from space album cover"
                              />
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "40%",
                                paddingBottom: 2,
                              }}
                            >
                              <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography component="div" variant="h6">
                                  {filterproject.projectname}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="text.secondary"
                                  component="div"
                                >
                                  {filterproject.Code}
                                </Typography>
                              </CardContent>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  pl: 1,
                                  pb: 1,
                                }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{ marginRight: 2 }}
                                >
                                  Details
                                </Button>
                                <Fab aria-label="like" size="small">
                                  <FavoriteIcon />
                                </Fab>
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box id="RID8">
          <Accordion sx={{ marginTop: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ marginTop: 2 }}
            >
              <Typography component="div" variant="h6">
                RID 8
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* //RID 8 filter */}
              <Box sx={{ flexGrow: 1 }} paddingTop={0}>
                <Grid container spacing={2} paddingTop={3}>
                  {project
                    .filter((ridnum: Project) => ridnum.ridnum === 8)
                    .map((filterproject: Project) => (
                      <Grid item xs={12} lg={4} md={4}>
                        <Box sx={{ boxShadow: 3 }}>
                          <Card sx={{ display: "flex" }}>
                            <Box sx={{ flexGrow: 1 }}>
                              <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="/static/images/cards/live-from-space.jpg"
                                alt="Live from space album cover"
                              />
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "40%",
                                paddingBottom: 2,
                              }}
                            >
                              <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography component="div" variant="h6">
                                  {filterproject.projectname}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="text.secondary"
                                  component="div"
                                >
                                  {filterproject.Code}
                                </Typography>
                              </CardContent>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  pl: 1,
                                  pb: 1,
                                }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{ marginRight: 2 }}
                                >
                                  Details
                                </Button>
                                <Fab aria-label="like" size="small">
                                  <FavoriteIcon />
                                </Fab>
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClick={() => {
              navigate("/stock/create");
            }}
          ></SpeedDial>
        </Box>
        <Box>
          <Box>
            <Paper
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                ...(open && { display: "none" }),
              }}
              elevation={3}
            >
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingInline: 5,
                  }}
                >
                  <Button sx={{ marginInline: 3 }}>Map</Button>

                  <Button sx={{ marginInline: 3 }}>RID 6</Button>
                  <Button sx={{ marginInline: 3 }}>RID 7</Button>
                  <Button sx={{ marginInline: 3 }}>RID 8</Button>
                  <AddIcon sx={{ fontSize: 40 }} />
                </Box>
              </BottomNavigation>
            </Paper>
          </Box>
        </Box>
      </>
    );
  }
}
