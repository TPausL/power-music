import { AppBar as MuiBar, styled, Toolbar, Typography } from "@mui/material";
import React from "react";
export interface AppBarProps {}

const Bar = styled(MuiBar)(({ theme }) => ({
  background: theme.gradients.primary,
}));
export default function AppBar(props: AppBarProps) {
  return (
    <Bar position="static">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography fontWeight="bold" variant="h4" component="h2">
          Power Music
        </Typography>
      </Toolbar>
    </Bar>
  );
}
