import React from "react";
import Card from "@mui/material/Card";
import { Typography, Grid, Box } from "@mui/material";
import { Emoji } from "emoji-picker-react";

type StockCardProp = {
  title: string;
  subtitle: string;
  color: any;
  
  unified: string;
};

const StockCard = (props: StockCardProp) => {
  return (
    <Card>
      <Grid container style={{ minHeight: 70 }}>
        <Grid item sx={{ flexGrow: 1, height: 100, padding: 1 }}>
          <Typography variant="h4" color="textPrimary">
            {props.title}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {props.subtitle}
          </Typography>
        </Grid>

        <Grid
          item
          style={{
            backgroundColor: props.color,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 70,
          }}
        >
          <Emoji unified={props.unified} size={45} />
{/* 
          <props.icon fontSize="large" /> */}
          {/* {React.createElement(props.icon, { fontSize: "large" })} */}
        </Grid>
      </Grid>
    </Card>
  );
};

export default StockCard;
