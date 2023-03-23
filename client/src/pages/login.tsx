import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box } from "@pankod/refine-mui";
import { logo } from 'assets'
import { Home } from "pages";
import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{
        // background: '#1C1437',
        backgroundSize: "cover",
      }}
    >
      {/* <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      > */}
          {/* <div>
            <img width={250} src={logo} alt="Logo" />
          </div> */}
          <Box m={2}display="flex" justifyContent="center" alignItems="center" width="100%">
            <GoogleButton />
          </Box>
      <Home />
      {/* </Container> */}
    </Box>
  );
};
