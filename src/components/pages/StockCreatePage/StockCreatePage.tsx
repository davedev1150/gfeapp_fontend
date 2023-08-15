import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { FormikProps, Form, Field, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../..";
import { Product } from "../../../types/product.type";
import * as stockActions from "./../../../actions/stock.action";
import * as projectActions from "./../../../actions/project.action";
import projectReducer from "../../../reducers/project.reducer";
import { RootState } from "../../../store/store";
import { Project } from "../../../types/project.type";

type StockCreatePageProps = {
  //
};

const StockCreatePage: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [project, setProject] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState<any | null>(null);

  const projectReducer = useSelector(
    (state: RootState) => state.projectReducer
  );
  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 150 }} />;
    }
  };

  React.useEffect(() => {
    dispatch(projectActions.loadProject());
  }, []);

  const showForm = ({
    values,
    setFieldValue,
    isSubmitting,
  }: FormikProps<Product>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h5">
              New Item
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="sn"
              type="text"
              label="Serial number"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="description"
              type="text"
              label="Description"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="instype_id"
              type="text"
              label="Instrument Type"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="procategory_id"
              type="text"
              label="Category"
            />

            <FormControl sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                By Project
              </Typography>
              <Field name="project_id" component={Select}>
                {projectReducer.result.map((item: Project) => {
                  return (
                    <MenuItem value={item.id}>{item.projectname}</MenuItem>
                  );
                })}
                <Button>project page</Button>
              </Field>
            </FormControl>
            {/* <Field
              as="select"
              name="project_id"
              style={{ marginTop: 16 }}
              fullWidth
              component={Select}
            >
              {projectReducer.result.map((item: Project) => {
                return <option value={item.id}>{item.projectname}</option>;
              })}
            </Field> */}
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="stock"
              type="number"
              label="Stock"
            />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                Add Picture
              </span>

              <input
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Create
            </Button>
            <Button component={Link} to="/stock" variant="outlined" fullWidth>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const initialValues: Product = { name: "", stock: 1, project_id: 1 };

  return (
    <Box>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "Enter name";
          if (values.stock < 10)
            errors.stock = "Min stock is not lower than 10";
          // if (values.price < 100)
          //   errors.price = "Min price is not lower than 100";
          // return errors;
        }}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values));
          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("sn", String(values.sn));
          formData.append("description", String(values.description));
          formData.append("instype", String(values.instype_id));
          formData.append("procategory_id", String(values.procategory_id));
          formData.append("project_id", String(values.project_id));
          formData.append("stock", String(values.stock));
          formData.append("image", values.file);
          alert(JSON.stringify(values));

          dispatch(stockActions.addProduct(formData));
          setSubmitting(false);
        }}
      >
        {(props: any) => showForm(props)}
      </Formik>
    </Box>
  );
};

export default StockCreatePage;
