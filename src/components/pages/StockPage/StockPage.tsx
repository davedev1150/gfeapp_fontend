import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as stockAction from "../../../actions/stock.action";
import * as projectActions from "../../../actions/project.action";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDebounce, useDebounceCallback } from "@react-hook/debounce";
import { Product } from "../../../types/product.type";
import StockCard from "../../layouts/StockCard";
import { useAppDispatch } from "../../..";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  GridRenderCellParams,
  GridFilterItem,
  GridEnrichedColDef,
} from "@mui/x-data-grid";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  ChipProps,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Add, Clear, Search } from "@mui/icons-material";
import { imageUrl } from "../../../Constants";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { blue, blueGrey, deepOrange, green, grey, red } from "@mui/material/colors";
import { RootState } from "../../../store/store";
import * as locales from "@mui/material/locale";
import { Field } from "formik";
import { Project } from "../../../types/project.type";
import { Console, log } from "console";
import { current } from "@reduxjs/toolkit";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RestoreIcon from '@mui/icons-material/Restore';
import FactCheckIcon from '@mui/icons-material/FactCheck';

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}
export function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />

      <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to="/stock/create"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
}

export default function StockPage() {
  const dispatch = useAppDispatch();
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const stockReducer = useSelector((state: RootState) => state.storeReducer);
  const projectReducer = useSelector(
    (state: RootState) => state.projectReducer
  );
  const projectName = projectReducer.result.projectname;
  const projectObj = projectReducer.result;
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([]);
  const [canOpen, setCanOpen] = React.useState(false);
  const [filterproject, setFilterproject] = React.useState<string[] | any>([]);
  const [filterTest, setFilterTest] = React.useState<string[] | any>([]);
  const [filterprojectId, setFilterprojectId] = React.useState<string[] | any>(
    []
  );

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleClearClick = () => {
    setFilterproject([]);
    setFilterprojectId([]);
  };

  interface ChipData {
    key: number;
    label: string;
  }

  const [filtertype, setFiltertype] = React.useState();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | any>(
    null
  );
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(stockAction.loadStockByKeyword(keywordSearch));
  }, [keywordSearch]);
  React.useEffect(() => {
    dispatch(stockAction.filterStock(filterproject as any, filtertype as any));
  }, [filterproject, filtertype]);
  React.useEffect(() => {
    dispatch(stockAction.loadStock());
  }, []);
  React.useEffect(() => {
    dispatch(projectActions.loadProject());
  }, []);

  const handleDeleteConfirm = () => {
    dispatch(stockAction.deleteProduct(String(selectedProduct!.id!)));
    setOpenDialog(false);
  };
  const selectHandleOnOpen = (event: any) => {
    setCanOpen(!canOpen);
  };
  const handleFilterProject = (event: SelectChangeEvent<any>, key: any) => {
    const { value } = event.target as any;
    setFilterproject(value);
    console.log(filterproject);
  };
  function getChipProps(params: GridRenderCellParams): ChipProps | undefined {
    try {
      if (params.value === "Available") {
        return {
          icon: <FactCheckIcon style={{ fill: blue[500] }} />,
          label: params.value,
          sx: {
            borderColor: blue[500],
          },
        };
      } else if (params.value === "Installed") {
        return {
          icon: <CheckCircleIcon style={{ fill: green[500] }} />,
          label: params.value,
          sx: {
            borderColor: green[500],
          },
        };
      } else if (params.value === "Complete") {
        return {
          icon: <CheckCircleIcon style={{ fill: green[500] }} />,
          label: params.value,
          sx: {
            borderColor: green[500],
          },
        };
      } else if (params.value === "Rejected") {
        return {
          icon: <WarningIcon style={{ fill: red[500] }} />,
          label: params.value,
          sx: {
            borderColor: red[500],
          },
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  const showDialog = () => {
    if (selectedProduct === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img
            src={`${imageUrl}/image/${
              selectedProduct.image
            }?dummy=${Math.random()}`}
            style={{ width: 100, borderRadius: "50%" }}
          />
          <br />
          Confirm to delete the product? : {selectedProduct.name}
          {console.log(selectedProduct.id)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const stockColumns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <img
          src={`${imageUrl}/image/${value}?dummy=${Math.random()}`}
          style={{ width: 50, height: "auto", borderRadius: "5%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 100 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "instype",
      headerName: "Type",
      width: 150,
      valueGetter: (params: any) => {
        const data = params?.row.INStype?.name;

        // console.log({ data });
        return data;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      valueGetter: (params: any) => {
        const data = params?.row.Productcategory?.category;

        // console.log({ data });
        return data;
      },
    },

    {
      field: "project_id",
      headerName: "Order By",
      width: 150,
      valueGetter: (params: any) => {
        const data = params?.row.Project?.projectname;

        // console.log({ data });
        return data;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            <Chip variant="outlined" {...getChipProps(params)} />
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,

      renderCell: ({ row }: GridRenderCellParams<string>) => {
        return (
          <>
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => {
                setSelectedProduct(row);
                setOpenDialog(true);
              }}
            >
              <DeleteIcon style={{ color: grey[700] }} />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => {
                navigate("/stock/edit/" + row.id);
              }}
            >
              <EditIcon style={{ color: blueGrey[800] }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 800, width: "100%", padding: 2 }}>
      <Box sx={{ flexGlow: 1 }}>
        <Stack direction="row" spacing={1} sx={{ paddingBlock: 2 }}>
          <TextField
            sx={{ bgcolor: "white" }}
            id="search"
            type="search"
            label="Search by Name"
            value={keywordSearchNoDelay}
            onChange={(e: React.ChangeEvent<any>) => {
              setKeywordSearch(e.target.value);
              setKeywordSearchNoDelay(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{ mb: 2, height: 50 }}
            onClick={() => {
              navigate("/stock/create");
            }}
          >
            Add Item
          </Button>
        </Stack>
      </Box>

      <Stack
        spacing={{ xs: 1, sm: 2, md: 4 }}
        direction={{ xs: "column", sm: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="flex-start"
        alignItems={{ sm: "center", xs: "start" }}
        paddingTop={2}
        paddingBottom={2}
      >
        <Box>
          <Typography>FILTERS</Typography>
        </Box>

        <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
          <InputLabel id="demo-select-small-label">Select Project</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="grouped-native-select"
            multiple
            value={filterproject || []}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            onChange={handleFilterProject}
            sx={{
              "& .MuiSelect-iconOutlined": {
                display: filterproject ? "none" : "",
              },
              "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
              bgcolor: "white",
            }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: any) => {
                    return (
                      <Chip
                        key={value}
                        clickable={false}
                        label={
                          projectObj?.find((e: Project) => e.id === value)
                            .projectname
                        }
                        variant="outlined"
                      />
                    );
                    // console.log(projectObj);
                    // console.log(value);
                  })}
                </Box>
              );
            }}
            // renderValue={(selected) => (
            //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            //     {selected.map((value: any) => (
            //       <Chip key={value} label={value} />
            //     ))}
            //   </Box>
            // )
            // renderValue={
            //   (filterproject) =>
            //     filterproject ? (
            //       projectReducer.result
            //         .filter((id: any) => id.id === filterproject)
            //         .map((item: Project) => (
            //           <Typography variant="subtitle1">{item.id}</Typography>
            //         ))
            //     ) : (
            //       <em></em>
            //     )
            // }
            endAdornment={
              <IconButton
                sx={{ visibility: filterproject ? "visible" : "hidden" }}
                onClick={handleClearClick}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            <ListSubheader>Category 1</ListSubheader>
            {projectObj.map((item: any) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox checked={filterproject.includes(item.id)} />
                  <ListItemText primary={item.projectname} />
                </MenuItem>
              );
            })}
            <Button>project page</Button>
          </Select>
        </FormControl>
      </Stack>

      <DataGrid
        sx={{
          bgcolor: "white",
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          padding: 2,
        }}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {},
        }}
        // filterModel={{
        //   items: [
        //     // {
        //     //   columnField: "project_id",
        //     //   operatorValue: "equals",
        //     //   value: projectName,
        //     // },
        //   ],
        // }}
        rows={stockReducer.result}
        columns={stockColumns}
        pageSize={12}
      />
      {showDialog()}
    </Box>
  );
}
