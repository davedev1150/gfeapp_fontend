import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik, FormikProps } from "formik";
import { User } from "../../../types/user.type";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants";
import * as registerActions from "./../../../actions/register.action";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../../index";
import { log } from "console";

type RegisterPageProps = {
  //
};

const RegisterPage: React.FC<any> = () => {
  const registerReducer = useSelector(
    (state: RootReducers) => state.registerReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="role"
          label="role"
          onChange={handleChange}
          value={values.role}
        />
        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button
            onClick={() => navigate("/login")}
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={registerReducer.isFetching}
          >
            Create
          </Button>
        </Stack>
      </form>
    );
  };
  const initialValues: User = {
    username: "admin",
    password: "1234",
    role: "Admin",
  };
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
              Register
            </Typography>
            <Formik
              onSubmit={async (values, {}) => {
                dispatch(registerActions.register(values, navigate));
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
export default RegisterPage;
