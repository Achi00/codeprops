import { Typography, Box, Stack, Link } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import { Button } from "@pankod/refine-mui";
import { Delete, Edit } from "@mui/icons-material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import GitHubIcon from "@mui/icons-material/GitHub";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CustomButton, Loading } from "components";
import { motion } from "framer-motion";
import { revealVariants } from "assets/motion";
// import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';

const PostDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;

  const postDetails = data?.data ?? {};
  const {
    title,
    tech,
    description,
    header,
    header2,
    header3,
    photo,
    photo2,
    photo3,
    photo4,
    postType,
    github,
    preview,
  } = postDetails;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === postDetails.creator.email;

  const handleDeletePost = () => {
    const response = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (response) {
      mutate(
        {
          resource: "posts",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/posts");
          },
        }
      );
    }
  };

  interface CodeProps {
    text: string;
  }

  const StyledText: React.FC<CodeProps> = ({ text }) => {
    const codeRegex = /<text>([\s\S]*?)<\/text>/g;
    const imageRegex = /<img.*?src="(.*?)".*?>/g;
    const modifiedText = text
      .replace(
        /<img src="([^"]+)"\s*(\/?)>/g,
        '<img src="$1" alt="Image" class="link-img" />'
      )
      .replace(
        /(https?:\/\/(?!res\.cloudinary\.com)[^\s'"]+(?<![:\/]))/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      .replace(codeRegex, '<span class="code">$1</span>')
      .replace(
        /\b(function|let|var|import|if|else|return|from)\b(?=\s)/g,
        '<span class="keyword">$1</span>'
      )
      .replace(
        /(')(?:(?<!\\)[^\\\n]|\\[\s\S])*?\1/g,
        '<span class="string">$&</span>'
      )
      .replace(
        /\b(useEffect|useState)\b(?=[\s,(])/g,
        '<span class="js">$1</span>'
      )
      .replace(/<>/g, '<div class="highlightedTextWrapper">')
      .replace(/<\/>/g, "</div>")
      .replace(/(\b(?:const)\b)/g, '<span class="keyword">$1</span>')
      .replace(/([\{\}\[\]\(\)])/g, '<span class="special">$&</span>')
      .replace(/\/\*([\s\S]*?)\*\//g, '<span class="comment">$&</span>') // Highlight /* */ comments
      .replace(/<\/div><div class="highlightedTextWrapper"/g, "");

    return (
      <div className="styledTextContainer">
        <Typography
          component="div"
          sx={{ fontWeight: "700" }}
          dangerouslySetInnerHTML={{ __html: modifiedText }}
        />
      </div>
    );
  };

  return (
    <Box
      component={motion.div}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      // sx={{ textTransform: "capitalize" }}
      my={{ lg: 10, md: 8, xs: 2 }}
      mx={{ lg: 10, md: 8, xs: 2 }}
    >
      <Stack
        direction={{ lg: "row", md: "row", xs: "column" }}
        display="flex"
        justifyContent={{
          lg: "space-between",
          md: "center",
          sm: "center",
          xs: "center",
        }}
        gap="4rem"
      >
        <Typography
          fontSize={{ lg: 40, md: 25, xs: 20 }}
          width={{ lg: 400, md: 360, xs: 280 }}
          fontWeight={900}
          color="#000000"
        >
          {title}
        </Typography>
        <Typography
          width={{ lg: 400, md: 360, xs: 280 }}
          fontSize={{ lg: 18, md: 15, xs: 12 }}
          fontWeight={600}
          color="#000000"
        >
          {description}
        </Typography>
      </Stack>
      <Typography fontSize={25} fontWeight={700} color="#9D9D9D">
        {postType}
      </Typography>
      <Box component="div">
        <Stack mt="25px" direction="column" gap={2}>
          {isCurrentUser ? (
            <CustomButton
              title={!isCurrentUser ? "Save Post" : "Edit"}
              width="100px"
              height="30px"
              backgroundColor="#0D1318"
              color="#FCFCFC"
              fullWidth
              disabled={isCurrentUser ? false : true}
              icon={!isCurrentUser ? <SaveAltIcon /> : <Edit />}
              handleClick={() => {
                if (isCurrentUser) {
                  navigate(`/posts/edit/${postDetails._id}`);
                }
              }}
            />
          ) : null}
          {isCurrentUser ? (
            <CustomButton
              title={"Delete"}
              backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
              color="#FCFCFC"
              width="100px"
              height="30px"
              fullWidth
              disabled={isCurrentUser ? false : true}
              icon={!isCurrentUser ? null : <Delete />}
              handleClick={() => {
                if (isCurrentUser) handleDeletePost();
              }}
            />
          ) : null}
        </Stack>
      </Box>
      <Stack
        padding="5vmin"
        direction={{ lg: "row", md: "row", xs: "column" }}
        gap="20px"
        display="flex"
        justifyContent="space-between"
      >
        <Button
          href={preview}
          target="_blank"
          sx={{
            backgroundColor: "#0D1318",
            width: "150px",
            height: "50px",
            color: "#fff",
            fontWeight: "700",
            fontSize: "20px",
            textTransform: "capitalize",
            transition: "0.2s ease-in-out",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#0D1318",
              boxShadow: "5px 10px 25px 8px rgba(176, 176, 176, 0.8)",
            },
          }}
        >
          Preview <RemoveRedEyeIcon sx={{ ml: "5px" }} />
        </Button>
        <Button
          href={github}
          target="_blank"
          sx={{
            backgroundColor: "#0D1318",
            width: "150px",
            height: "50px",
            color: "#fff",
            fontWeight: "700",
            fontSize: "20px",
            textTransform: "capitalize",
            alignItems: "center",
            transition: "0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#0D1318",
              boxShadow: "5px 10px 25px 8px rgba(176, 176, 176, 0.8)",
            },
          }}
        >
          GitHub
          <GitHubIcon sx={{ ml: "5px" }} />
        </Button>
      </Stack>
      <Stack width="100%" direction="column" display="flex">
        <Box
          component="div"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={photo}
            style={{ borderRadius: "20px", maxWidth: "70%", height: "auto" }}
            alt="Image"
          />
        </Box>
        <Stack
          py={2}
          direction="column"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Typography
            fontSize={25}
            fontWeight={200}
            width={{ lg: "500px", md: "350px", xs: "200px" }}
            color="#000000"
          >
            <strong>Used Libraries</strong>
            <br />
            {tech}
          </Typography>
        </Stack>
        <Box
          component="div"
          // width={{ lg: "750px", md: "750px", xs: "300px" }}
          maxWidth="100%"
        >
          <Typography
            p={5}
            fontSize={{ lg: "2vmin", md: "3vmin", xs: "2.5vmin" }}
            fontWeight={500}
            color="#000000"
          >
            <pre>
              <StyledText text={header} />
            </pre>
          </Typography>
        </Box>
        <img
          src={photo2}
          style={{ borderRadius: "20px", maxWidth: "70%", height: "auto" }}
          alt="Image"
        />
        <Box component="div">
          <Typography p={5} fontSize="2vmin" fontWeight={500} color="#000000">
            {/* <pre>{createLink({ header: header2 })}</pre> */}
            <pre>
              <StyledText text={header2} />
            </pre>
          </Typography>
        </Box>
        <img
          src={photo3}
          style={{ borderRadius: "20px", maxWidth: "70%", height: "auto" }}
          alt="Image"
        />
        <Box component="div" p={5}>
          <Typography p={5} fontSize={20} fontWeight={700} color="#000000">
            <StyledText text={header3} />
            {/* <pre>{createLink({ header: header3 })}</pre> */}
          </Typography>
        </Box>
        <img
          src={photo4}
          style={{ borderRadius: "20px", maxWidth: "70%", height: "auto" }}
          alt="Image"
        />
      </Stack>
    </Box>
  );
};

export default PostDetails;
