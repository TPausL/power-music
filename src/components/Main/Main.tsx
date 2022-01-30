import {
  Button,
  Grid,
  Typography,
  Avatar,
  Container,
  Divider,
  Paper,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import React from "react";
import useSpotify from "../SpotifyProvider/useSpotify";
import Workspace from "../Workspace";
import useYoutube from "../YoutubeProvider/useYoutube";

const Div = styled("div")(({ theme }) => ({
  width: "50%",
  minHeight: 65,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
export interface MainProps {}
export default function Main(props: MainProps) {
  const theme = useTheme();
  const youtube = useYoutube();
  const spotify = useSpotify();
  return (
    <>
      <div style={{ margin: theme.spacing(2), display: "flex" }}>
        <Div>
          {youtube.user ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ fontWeight: "bold" }}>
                Logged in as:
              </Typography>
              <Avatar
                style={{ marginLeft: theme.spacing(1) }}
                src={youtube.user.picture}
              />
              <Typography style={{ marginLeft: theme.spacing(1) }}>
                {youtube.user.name}
              </Typography>
            </div>
          ) : (
            <Button
              style={{
                backgroundColor: "#ff0000",
                color: "white",
                fontWeight: "bold",
              }}
              variant="contained"
              onClick={() => youtube.login()}
            >
              Login to YouTube
            </Button>
          )}

          <Divider style={{ marginTop: 5 }} />
        </Div>
        <Div>
          {spotify.user ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ fontWeight: "bold" }}>
                Logged in as:
              </Typography>
              <Avatar
                style={{ marginLeft: theme.spacing(1) }}
                src={spotify.user.picture}
              />
              <Typography style={{ marginLeft: theme.spacing(1) }}>
                {spotify.user.name}
              </Typography>
            </div>
          ) : (
            <Button variant="contained" onClick={() => spotify.login()}>
              Login to Spotify
            </Button>
          )}
          <Divider style={{ marginTop: 5 }} />
        </Div>
      </div>
      <Workspace />
    </>
  );
}
