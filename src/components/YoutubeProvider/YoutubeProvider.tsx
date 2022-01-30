import { map, zipWith } from "lodash";
import { resolve } from "path/posix";
import React, { useState } from "react";
const data = require("../../youtube.json");
export interface User {
  name: string;
  picture: string | undefined;
}
export interface Playlist {
  name: string;
  picture: string | undefined;
  id: string;
  origin: "youtube" | "spotify";
}
export interface YoutubeProviderProps {
  children: React.ReactNode;
}
export interface YoutubeContextType {
  login: () => void;
  user: undefined | User;
  playlists: undefined | Playlist[];
}
export const YoutubeContext = React.createContext<YoutubeContextType>({
  login: () => undefined,
  user: undefined,
  playlists: [],
});
export default function YoutubeProvider(props: YoutubeProviderProps) {
  const { children } = props;
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [playlists, setPlaylists] = React.useState<Playlist[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    const token = localStorage.getItem("yt_token");
    load("auth").then(() =>
      load("client").then(() => {
        if (token) {
          gapi.client.setToken(JSON.parse(token));
          getAuthUser().then(setUser);
          getPlaylists().then(setPlaylists);
        }
      })
    );
  }, []);
  const login = async () => {
    await gapi.client.init({
      clientId: data.web.client_id,
      scope: "*",
    });
    const token = await authorize({
      client_id: data.web.client_id,
      scope: [
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
    });
    localStorage.setItem("yt_token", JSON.stringify(token));
    gapi.client.setToken(token);
    setUser(await getAuthUser());
    setPlaylists(await getPlaylists());
  };

  const getAuthUser = async () => {
    try {
      const user = await gapi.client.request({
        path: "https://www.googleapis.com/oauth2/v1/userinfo",
      });
      return { name: user.result.given_name, picture: user.result.picture };
    } catch {
      return undefined;
    }
  };

  const getPlaylists = async (): Promise<Playlist[] | undefined> => {
    try {
      const response = await gapi.client.request({
        path: "https://www.googleapis.com/youtube/v3/playlists",
        params: {
          part: "snippet,id",
          mine: true,
        },
      });
      const ids = map(response.result.items, "id");
      const names = map(response.result.items, "snippet.localized.title");
      const pictures = map(
        response.result.items,
        "snippet.thumbnails.default.url"
      );
      const lists: Playlist[] = zipWith(ids, names, pictures, (i, n, p) => {
        return {
          id: i,
          name: n,
          picture: p,
          origin: "youtube",
        };
      });
      return lists;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  const load = (what: string) =>
    new Promise<void>((resolve) => gapi.load(what, resolve));
  const authorize = (params: {
    client_id?: string | undefined;
    immediate?: boolean | undefined;
    response_type?: string | undefined;
    scope?: any;
    authuser?: number | undefined;
  }) =>
    new Promise<GoogleApiOAuth2TokenObject>((resolve) =>
      gapi.auth.authorize(params, resolve)
    );

  return (
    <YoutubeContext.Provider value={{ login, user, playlists }}>
      {children}
    </YoutubeContext.Provider>
  );
}
