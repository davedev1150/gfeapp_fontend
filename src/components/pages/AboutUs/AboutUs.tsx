import * as React from "react";
import { useSelector } from "react-redux";
import * as piezoparamAction from "../../../actions/piezoparam.action";
import { useAppDispatch } from "../../..";
import { RootState } from "../../../store/store";
import Button from "@mui/material/Button";

import * as XLSX from 'xlsx';
type Props = {
  //
};

export default function AboutUs({}: Props) {
  const dispatch = useAppDispatch();
  const paramReducer = useSelector((state: RootState) => state.paramReducer);
  const headers = [
    {
      label: "Id",
      key: "id",
    },
    {
      label: "T0",
      key: "T0",
    },
    {
      label: "S_cer",
      key: "S_cer",
    },
    {
      label: "A_cer",
      key: "A_cer",
    },
    {
      label: "B_cer",
      key: "B_cer",
    },
    {
      label: "C_cer",
      key: "C_cer",
    },
    {
      label: "K_cer",
      key: "K_cer",
    },
    {
      label: "digit0",
      key: "digit0",
    },
    {
      label: "digit1",
      key: "digit1",
    },
    {
      label: "digit2",
      key: "digit2",
    },
    {
      label: "digit3",
      key: "digit3",
    },
    {
      label: "digit4",
      key: "digit4",
    },
    {
      label: "digit5",
      key: "digit5",
    },
    {
      label: "fullscale",
      key: "fullscale",
    },
    {
      label: "cablelength",
      key: "cablelength",
    },
    {
      label: "S_recal",
      key: "S_recal",
    },
    {
      label: "A_recal",
      key: "A_recal",
    },
    {
      label: "B_recal",
      key: "B_recal",
    },
    {
      label: "C_recal",
      key: "C_recal",
    },
    {
      label: "file_cer",
      key: "file_cer",
    },
    {
      label: "created_at",
      key: "created_at",
    },

    {
      label: "updated_at",
      key: "updated_at",
    },

    {
      label: "Product",
      key: "Product",
    },

    {
      label: "file_cer",
      key: "file_cer",
    },

    {
      label: "file_cer",
      key: "file_cer",
    },






  ];

  React.useEffect(() => {
    dispatch(piezoparamAction.loadParam());
  }, []);

  const downloadExcel = (data:any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };
  return (
    <>
      {console.log(paramReducer.result)}

      <Button variant="contained" onClick={()=>{
        downloadExcel(paramReducer.result)
      }}>
        Export XLSX
      </Button>
    </>
  );
}
