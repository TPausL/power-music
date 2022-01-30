import React, { useState } from "react";
import { Playlist, User } from "../YoutubeProvider/YoutubeProvider";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import { filter, map, zipWith } from "lodash";

const data = require("../../spotify.json");

export interface SpotifyProviderProps {
  children: React.ReactNode;
}
export interface SpotifyContextType {
  login: () => void;
  onCode: (code: string) => void;
  user: User | undefined;
  playlists: Playlist[] | undefined;
}
export const SpotifyContext = React.createContext<SpotifyContextType>({
  login: () => undefined,
  user: undefined,
  playlists: undefined,
  onCode: (token: string) => undefined,
});

export default function SpotifyProvider(props: SpotifyProviderProps) {
  const { children } = props;
  const [token, setToken] = React.useState<string>();
  const [id, setId] = React.useState<string>("");
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [playlists, setPlaylists] = React.useState<Playlist[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    const loadedToken = localStorage.getItem("spotify_token");
    if (loadedToken) {
      setToken(JSON.parse(loadedToken).access_token);
    }
  }, []);

  const spotifyApi = React.useRef(new SpotifyWebApi());

  React.useEffect(() => {
    if (token) {
      spotifyApi.current.setAccessToken(token);
      getAuthUser().then(setUser);
    }
  }, [token]);

  React.useEffect(() => {
    if (id) {
      getPlaylists().then(setPlaylists);
    }
  }, [id]);
  const login = async () => {
    const d = {
      clientId: data.client_id,
      accessTokenUri: "https://accounts.spotify.com/api/token",
      authorizationUri: "https://accounts.spotify.com/authorize",
      redirectUri: "http://localhost:3000/auth/spotify",
      scope:
        "playlist-modify-private,playlist-read-collaborative,playlist-read-private,playlist-modify-public",
    };
    const url =
      d.authorizationUri +
      `?client_id=${d.clientId}&response_type=code&redirect_uri=${d.redirectUri}&scope=${d.scope}`;
    window.location.href = url;
  };
  const getPlaylists = async () => {
    const res = await spotifyApi.current.getUserPlaylists();
    const use = filter(res.items, (l) => {
      if (l.collaborative) {
        return true;
      }
      if (l.owner.id === id) {
        return true;
      }
      return false;
    });
    const ids = map(use, "id");
    const names = map(use, "name");
    const pictures = map(use, "images[0].url");
    const lists: Playlist[] = zipWith(ids, names, pictures, (i, n, p) => {
      return {
        id: i,
        name: n,
        picture: p,
        origin: "spotify",
      };
    });
    console.log(lists);
    return lists;
  };
  const getAuthUser = async () => {
    const res = await spotifyApi.current.getMe();
    setId(res.id);
    return {
      name: res.display_name ?? res.id,
      picture: res.images ? res.images[0].url : undefined,
    };
  };
  const onCode = async (code: string) => {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/auth/spotify");
    const res = await axios.post(
      `https://accounts.spotify.com/api/token`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            window.btoa(
              unescape(
                encodeURIComponent(data.client_id + ":" + data.client_secret)
              )
            ),
        },
      }
    );
    setToken(res.data.access_token);
    localStorage.setItem("spotify_token", JSON.stringify(res.data));
  };

  return (
    <SpotifyContext.Provider value={{ login, playlists, user, onCode }}>
      {children}
    </SpotifyContext.Provider>
  );
}
