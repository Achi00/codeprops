import { useEffect, useState } from "react";
import { useGetIdentity, useList } from "@pankod/refine-core";
import { PostCard, CustomButton } from "components";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import "../index.css";
import { motion } from "framer-motion";
import astronaut from "../assets/astronaut.jpg";
import cp from "../assets/cp.png";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { GoogleButton } from "./login";
import SourceIcon from "@mui/icons-material/Source";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { revealVariants, textRevealVariant } from "../assets/motion.js";
import EveScene from "components/3d/Eve";
import CheckIcon from "@mui/icons-material/Check";
import { Loading } from "components";

const Home = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();

  const { data, isLoading, isError } = useList({
    resource: "posts",
    config: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const latestPosts = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Typography>Error</Typography>;

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      paddingRight="200px"
      sx={{
        overflowX: "hidden",
        background: "linear-gradient(130deg, #fff, #adb5bd, #fff)",
      }}
    >
      <motion.div variants={revealVariants} initial="hidden" whileInView="show">
        <Box component="div" sx={{ marginTop: "10px" } as any}>
          {/* section 1 */}
          <Stack
            component={motion.div}
            variants={textRevealVariant(1.4)}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Stack
              direction={{ lg: "row", md: "row", sm: "column" }}
              justifyContent={{
                lg: "space-between",
                md: "space-between",
                sm: "center",
                xs: "center",
              }}
              alignItems="center"
              gap="2vmin"
              p={{ lg: "5rem", md: "4rem", sm: "2rem", xs: "1rem" }}
            >
              <Box
                component={motion.div}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2vmin"
              >
                <Typography
                  color="#000"
                  sx={{ fontSize: { lg: "5vmin", md: "4vmin", sm: "2vmin" } }}
                  fontWeight={700}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  px={5}
                >
                  Learn, Create & Deploy
                </Typography>
                <Typography
                  color="#7c7c7c"
                  fontSize={20}
                  fontWeight={600}
                  display="flex"
                  justifyContent="flex-start"
                  px={5}
                >
                  Find Inspiration & Learn Latest Web Technologies
                </Typography>
                <Typography
                  color="#7c7c7c"
                  fontSize={18}
                  fontWeight={600}
                  display="flex"
                  justifyContent="flex-start"
                  px={5}
                >
                  Modern Design and Responive Layout
                </Typography>
                {user ? (
                  <Box component="div" ml={5}>
                    <CustomButton
                      type="submit"
                      title={"Explore More"}
                      backgroundColor="#0D1318"
                      handleClick={() => navigate("/posts")}
                      color="#fcfcfc"
                      width="180px"
                      height="50px"
                      icon={<ArrowOutwardIcon />}
                    />
                  </Box>
                ) : (
                  <Box component="div" ml={5}>
                    <GoogleButton />
                  </Box>
                )}
              </Box>
              <Box
                component="div"
                mt="50px"
                width={{ lg: "350px", md: "300px", sm: "270px", xs: "220px" }}
                sx={{
                  position: "relative",
                  background: "red",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "35px",
                }}
              >
                <img
                  style={{
                    borderRadius: "35px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  width="100%"
                  height="auto"
                  src={astronaut}
                  alt="astronaut"
                />
                <Box
                  component="div"
                  className="img-circle"
                  width={{ lg: "150px", md: "120px", sm: "100px", xs: "90px" }}
                  sx={{
                    position: "absolute",
                    zIndex: "10",
                    top: "-30px",
                    right: "-50px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img width="70%" height="auto" src={cp} alt="cp" />
                </Box>
              </Box>
            </Stack>
          </Stack>
          {/* middle sector */}
          <Stack
            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          >
            <Typography
              color="#000"
              fontSize={25}
              fontWeight={900}
              display="flex"
              justifyContent="flex-start"
              p={8}
            >
              Code oriented teaching,
              <br />
              Learn with your pace
            </Typography>
            <Box
              component="div"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              gap="2vmin"
              mt="50px"
              ml="50px"
            >
              {/* stack 1 */}
              <Stack
                sx={{ dislpay: "flex", flexDirection: "column", gap: "1vmin" }}
              >
                <SourceIcon
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "15px",
                    padding: "1vmin",
                    fontSize: "5vmin",
                  }}
                />
                <Typography
                  color="#000"
                  fontSize={15}
                  fontWeight={400}
                  width={{ lg: "300px", md: "200px", sm: "180px" }}
                >
                  Access on <strong>Github Repositories</strong> for more
                  detailed explanation
                </Typography>
              </Stack>
              {/* stack 2 */}
              <Stack
                sx={{ dislpay: "flex", flexDirection: "column", gap: "1vmin" }}
              >
                <FormatAlignLeftIcon
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "15px",
                    padding: "1vmin",
                    fontSize: "5vmin",
                  }}
                />
                <Typography
                  color="#000"
                  fontSize={15}
                  fontWeight={400}
                  width={{ lg: "300px", md: "200px", sm: "180px" }}
                >
                  View full code <strong>Inside Repositories</strong> with line
                  by line explanation
                </Typography>
              </Stack>
              {/* stack 3 */}
              <Stack
                sx={{ dislpay: "flex", flexDirection: "column", gap: "1vmin" }}
              >
                <RemoveRedEyeIcon
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "15px",
                    padding: "1vmin",
                    fontSize: "5vmin",
                  }}
                />
                <Typography
                  color="#000"
                  fontSize={15}
                  fontWeight={400}
                  width={{ lg: "300px", md: "200px", sm: "180px" }}
                >
                  See live version <strong>Of Project</strong> and test its
                  design and functionality
                </Typography>
              </Stack>
            </Box>
          </Stack>
          {/* section 2 */}
          <Stack
            width="100%"
            display="flex"
            justifyContent={{
              lg: "space-between",
              md: "space-between",
              sm: "center",
              xs: "center",
            }}
            px={{ lg: "7vmin", md: "5vmin", sm: "2vmin", xs: "1.5vmin" }}
            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          >
            <Box
              component="div"
              sx={{
                height: "400px",
                width: { lg: "700px", md: "400px", sm: "300px", xs: "250px" },
              }}
            >
              <EveScene />
            </Box>
            <Stack direction="column" gap="1vmin" mt="4rem">
              {/* check card 1 */}
              <Stack
                direction="column"
                alignItems={{
                  lg: "flex-start",
                  md: "flex-start",
                  sm: "center",
                  xs: "center",
                }}
                justifyContent="center"
              >
                <Typography
                  color="#000"
                  fontSize={20}
                  fontWeight={600}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap="1rem"
                >
                  <CheckIcon
                    sx={{
                      background: "#000",
                      color: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                  Responsive Layout
                </Typography>
                <Typography
                  color="#7c7c7c"
                  fontSize={20}
                  fontWeight={300}
                  display="flex"
                  justifyContent="flex-start"
                  ml="40px"
                >
                  Adjustable on any device
                </Typography>
              </Stack>
              {/* check card 2 */}
              <Stack
                direction="column"
                alignItems={{
                  lg: "flex-start",
                  md: "flex-start",
                  sm: "center",
                  xs: "center",
                }}
                justifyContent="center"
              >
                <Typography
                  color="#000"
                  fontSize={20}
                  fontWeight={600}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap="1rem"
                >
                  <CheckIcon
                    sx={{
                      background: "#000",
                      color: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                  Creative Projects
                </Typography>
                <Typography
                  color="#7c7c7c"
                  fontSize={20}
                  fontWeight={300}
                  display="flex"
                  justifyContent="flex-start"
                  ml="40px"
                >
                  With easy understanding code
                </Typography>
              </Stack>
              {/* check card 3 */}
              <Stack
                direction="column"
                alignItems={{
                  lg: "flex-start",
                  md: "flex-start",
                  sm: "center",
                  xs: "center",
                }}
                justifyContent="center"
              >
                <Typography
                  color="#000"
                  fontSize={20}
                  fontWeight={600}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap="1rem"
                >
                  <CheckIcon
                    sx={{
                      background: "#000",
                      color: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                  Access on Github
                </Typography>
                <Typography
                  color="#7c7c7c"
                  fontSize={20}
                  fontWeight={300}
                  display="flex"
                  justifyContent="flex-start"
                  ml="40px"
                >
                  See In-depth explanation on Github
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* cards */}
          {/* <Box
            component={motion.div}
            initial={{ x: 2500 }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 150,
              delay: 1.8,
            }}
            overflow="hidden"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            flexWrap="wrap"
            margin="25px"
            gap="50px"
            sx={{ overflow: "hidden" }}
          >
            <Card
              sx={{
                maxWidth: "400px",
                height: "350px",
                borderRadius: "25px",
                background: "linear-gradient(to right, #0669FF, #0193FF)",
                padding: "10px",
                boxShadow: "0 5px 10px #888888",
                "&:hover": {
                  boxShadow: "5px 22px 50px 4px rgba(176, 176, 176, 0.8)",
                },
                cursor: "default",
              }}
              elevation={0}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "10px",
                  padding: "5px",
                  textTransform: "capitalize",
                }}
              >
                <Stack direction="column">
                  <Typography
                    color="#f2f2f2"
                    fontSize={25}
                    fontWeight={900}
                    display="flex"
                    justifyContent="center"
                  >
                    Design & Layour
                  </Typography>
                  <Typography
                    color="#fcfcfc"
                    fontSize={15}
                    fontWeight={500}
                    display="flex"
                    justifyContent="flex-start"
                  >
                    Create Futuristic
                    <br />
                    and Creative Websites
                  </Typography>
                  <CardMedia
                    component="img"
                    width="150px"
                    image="/card-1.png"
                    alt="card Image"
                  />
                </Stack>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: { lg: "600px", md: "400px", sm: "200px" },
                height: "350px",
                borderRadius: "25px",
                background: "linear-gradient(to right, #adb5bd, #e9ecef)",
                padding: "10px",
                "&:hover": {
                  boxShadow: "5px 22px 50px 4px rgba(176, 176, 176, 0.8)",
                },
                cursor: "default",
              }}
              elevation={0}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "10px",
                  textTransform: "capitalize",
                }}
              >
                <Stack direction="column" textAlign="left">
                  <Typography color="#000" fontSize={25} fontWeight={900}>
                    Learn, Create And Deploy
                  </Typography>
                  <Typography color="#495057" fontSize={18} fontWeight={500}>
                    Newest Technologies, ease explanations and access to Starter
                    pack & Final project
                  </Typography>
                  <Typography
                    sx={{ border: "1px solid #066BFF" }}
                    color="#000"
                    textAlign="center"
                    fontSize={30}
                    fontWeight={900}
                  >
                    Learn, Create And Test
                  </Typography>
                  <CardMedia
                    sx={{
                      borderRadius: "30px",
                      width: "100%",
                      mt: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    component="img"
                    image="/card-2.jpg"
                    alt="card Image"
                  />
                </Stack>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: { lg: "600px", md: "350px", xs: "200px" },
                height: "350px",
                borderRadius: "25px",
                background: "linear-gradient(to right, #CB00FF, #7101FE)",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  boxShadow: "5px 22px 50px 4px rgba(176, 176, 176, 0.8)",
                },
                cursor: "default",
                overflow: "hidden",
              }}
              elevation={0}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  zIndex: "2",
                  position: "relative",
                  gap: "10px",
                  textTransform: "capitalize",
                }}
              >
                <Box component="div">
                  <Three />
                </Box>

                <Stack
                  position="absolute"
                  width="100%"
                  direction="column"
                  textAlign="left"
                >
                  <div className="bg">
                    <Typography color="#f2f2f2" fontSize={25} fontWeight={900}>
                      Animations
                    </Typography>
                  </div>
                  <Typography
                    color="#DEE2E6"
                    p="10px"
                    fontSize={15}
                    fontWeight={500}
                  >
                    Use Three.js
                    <br />
                    with React and Next
                  </Typography>

                  <Typography
                    className="gradient"
                    sx={{
                      border: "2px solid #CCD2D7",
                      borderRadius: "15px",
                    }}
                    textAlign="center"
                    fontSize={30}
                    fontWeight={900}
                  >
                    3D Effects
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box> */}
        </Box>

        <Box
          component="div"
          flex={1}
          borderRadius="20px"
          padding="20px"
          display="flex"
          flexDirection="column"
          minWidth="95%"
          justifyContent="center"
          alignItems="center"
          mt="25px"
          ml="25px"
        >
          <Stack
            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            justifyContent="space-between"
            px="2vmin"
            margin="10px"
            width="100%"
            alignItems="center"
          >
            <Typography fontSize="18px" fontWeight={600} color="#11142d">
              Latest Posts
            </Typography>
            {user ? (
              <CustomButton
                type="submit"
                title={"Explore More"}
                backgroundColor="#0D1318"
                handleClick={() => navigate("/posts")}
                color="#fcfcfc"
                width="180px"
                height="50px"
                icon={<ArrowOutwardIcon />}
              />
            ) : (
              <Typography
                fontSize="18px"
                bgcolor="#11142d"
                padding="1vmin"
                borderRadius="25px"
                fontWeight={600}
                color="#f2f2f2"
              >
                Sign in to get access on every project
              </Typography>
            )}
          </Stack>

          <Box
            component="div"
            mt={2.5}
            width={{ lg: "95%", md: "95%", sm: "90%", xs: "85%" }}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0D1318",
              margin: "2vmin",
              position: "relative",
              right: "10px",
              borderRadius: "25px",
            }}
          >
            {latestPosts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                description={post.description}
                postType={post.postType}
                tech={post.tech}
                title={post.title}
                photo={post.photo}
                photo2={post.photo2}
                photo3={post.photo3}
                photo4={post.photo4}
                header={post.header}
                header2={post.header2}
              />
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Home;
