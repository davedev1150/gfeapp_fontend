import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { User } from "../../../types/user.type";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as loginAction from "../../../actions/login.action";
import { useAppDispatch } from "../../../index";

type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
    myTextStyle: {
      textDecoration: "none",
      "&:hover": {
        color: "white",
      },
    },
  };

  const showFormV1 = ({
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  }: FormikProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <label>username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={values.username}
        />
        <br />
        <label>password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={values.password}
        />

        <br />
        {loginReducer.isError && <Alert severity="error">Login failed</Alert>}

        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </form>
    );
  };
  const showFormV2 = ({
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  }: FormikProps<User>) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
        />

        <Box display="flex" justifyContent="flex-end">
          <Button>
            <Typography
              onClick={() => {
                alert("Forget Password");
              }}
            >
              *Forget password
            </Typography>
          </Button>
        </Box>

        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button
            onClick={() => navigate("/register")}
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
          >
            Register
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loginReducer.isFetching}
          >
            Login
          </Button>
        </Stack>
      </form>
    );
  };
  const initialValues: User = { username: "", password: "", role: "" };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              textAlign="center"
            >
              Login
            </Typography>
            <Formik
              onSubmit={(values, {}) => {
                dispatch(loginAction.login(values, navigate));
              }}
              initialValues={initialValues}
            >
              {(props) => showFormV2(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default LoginPage;
