import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Box, Stack } from "@pankod/refine-mui";
import { logo } from 'assets'
import { Home } from "pages";
import { CredentialResponse } from "../interfaces/google";
import { useNavigate } from "@pankod/refine-react-router-v6"

export const GoogleButton = (): JSX.Element => {
  const { mutate: login } = useLogin<CredentialResponse>();
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.google || !divRef.current) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        ux_mode: 'popup',
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: async (res: CredentialResponse) => {
          if (res.credential) {
            login(res);
          }
          navigate('/posts');
        },
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: 'filled_black',
        size: 'medium',
        type: 'standard',
      });
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div ref={divRef} />
  );
};

export const Login: React.FC = () => {
  return (
    <Box 
    component="div"
    p="2rem">
      <Stack 
      direction="row" 
      bgcolor="#fff" 
      height="50px" 
      display="flex" 
      justifyContent="center" 
      gap={{lg: "80%", md: "50%", sm:'15%', xs: '10%' }}
      alignItems="center" 
      width="100%" 
      py="1rem"
      overflow="hidden">
        <img src={logo} width="125px" alt="logo"  />
        <GoogleButton />
      </Stack>
      <Home />
    </Box>
  );
};
