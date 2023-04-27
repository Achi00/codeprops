import React, { useContext } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Avatar,
} from "@pankod/refine-mui";

import { ColorModeContext } from "contexts";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";

export const Header = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  const navigate = useNavigate()
  const { data: user } = useGetIdentity();
  if (user === undefined) {
    <Loading />
  } else if (!user) {
    // user doesn't exist, so redirect to the home page
    navigate('/')
  }
  const shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.

  return shouldRenderHeader ? (
    <AppBar color="default" position="sticky" elevation={0}
      sx={{ backgroundColor: '#fcfcfc'}}
    >
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          marginLeft="4vmin"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            {user?.name ? (
              <Typography variant="subtitle2">{user?.name}</Typography>
            ) : null}
            {user?.avatar ? (
              <Avatar  sx={{ width: 24, height: 24 }} src={user?.avatar} alt={user?.name} />
            ) : null}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null;
};
