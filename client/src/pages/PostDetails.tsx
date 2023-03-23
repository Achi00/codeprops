import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import { Button } from "@pankod/refine-mui"
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
    Star,
} from "@mui/icons-material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CustomButton } from "components";

const PostDetails = () => {
  const navigate = useNavigate()
  const { data: user } = useGetIdentity()
  const { id } = useParams()
  const { mutate } = useDelete()
  const { queryResult } = useShow()

  const { data, isLoading, isError } = queryResult

  const postDetails = data?.data ?? {}
  const { title, tech, description, header, header2, photo, photo2, photo3, photo4, postType, github, preview } = postDetails


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
      return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === postDetails.creator.email;

    const handleDeletePost = () => {
        const response = window.confirm(
            "Are you sure you want to delete this post?",
        );
        if (response) {
            mutate({
                    resource: "posts",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/posts");
                    },
                },
            );
        }
    };
  
  return (
    <Box sx={{textTransform: 'capitalize'}} my={10} mx={10}>
      <Stack direction="row" display="flex" justifyContent="space-between">
      <Typography fontSize={60} fontWeight={900} color="#000000">{title}</Typography>
      <Typography fontSize={25} fontWeight={200} width="500px" color="#000000">
        {description}
      </Typography>
      </Stack>
      <Typography fontSize={25} fontWeight={700} width="500px" color="#9D9D9D">
        {postType}
      </Typography>
      <Box width="100%" >
      <Stack mt="25px" direction="column"  gap={2}>
         <CustomButton
             title={!isCurrentUser ? "Save Post" : "Edit"}
             width="100px"
             height="30px"
             backgroundColor="#475BE8"
             color="#FCFCFC"
             fullWidth
             disabled={isCurrentUser ? false : true}
             icon={
                 !isCurrentUser ? <SaveAltIcon /> : <Edit />
             }
             handleClick={() => {
                 if (isCurrentUser) {
                     navigate(
                         `/posts/edit/${postDetails._id}`,
                     );
                 }
             }}
         />
         <CustomButton
             title={"Delete"}
             backgroundColor={
                 !isCurrentUser ? "#2ED480" : "#d42e2e"
             }
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
      </Stack>
      </Box>
      <Stack padding={5} direction="row" display="flex" justifyContent="space-between">
        <Button
          sx={{
            background: 'linear-gradient(to right top, #0E7BFF, #8511FF)',
            width: '150px',
            height: '50px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '20px',
            textTransform: 'capitalize',
            '&:hover': {
              background: 'linear-gradient(to right top, #8511FF, #0E7BFF)',
              boxShadow: '5px 10px 25px 8px rgba(176, 176, 176, 0.8)',
            }
          }}
        >Preview</Button>
        <Button
          sx={{
            background: 'linear-gradient(to right top, #0E7BFF, #8511FF)',
            width: '150px',
            height: '50px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '20px',
            textTransform: 'capitalize',
            transition: '0.2s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(to right top, #8511FF, #0E7BFF)',
              boxShadow: '5px 10px 25px 8px rgba(176, 176, 176, 0.8)',
            }
          }}
        >GitHub<GitHubIcon sx={{ml: '5px'}}/></Button>
      </Stack>
        <Stack width="100%" direction="column" display="flex">
          <Box display="flex" alignItems="center" justifyContent="center">
          <img width="70%" src={photo} style={{ borderRadius: '20px'}} alt="Image" />
          </Box>
          <Stack py={5} direction="column" width="100%" display="flex" justifyContent="center" alignItems="flex-end" >
            <Typography fontSize={25} fontWeight={200} width="500px" color="#000000">
              <strong>Used Technologies</strong><br />
              {tech}
            </Typography>
          </Stack>
          <Box>
            <Typography width="750px" p={5} fontSize={20} fontWeight={400} color="#000000">{header}</Typography>
          </Box>
          <img width={750} src={photo2} style={{ borderRadius: '20px'}} alt="Image" />
          <Box p={5}>
            <Typography p={5} width="750px" fontSize={20} fontWeight={400} color="#000000">{header2}</Typography>
          </Box>
          <img width={750} src={photo3} style={{ borderRadius: '20px'}} alt="Image" />
          <Box p={5}>
            <Typography p={5} width="750px" fontSize={20} fontWeight={400} color="#000000">{header2}</Typography>
          </Box>
          <img width={750} src={photo4} style={{ borderRadius: '20px'}} alt="Image" />
        </Stack>
      </Box>
  )
}

export default PostDetails