import { Typography, Box, Stack, Link } from "@pankod/refine-mui";
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

  // if (!user) {
  //   navigate('/')
  // }

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
    <Box component="div" sx={{textTransform: 'capitalize'}} my={{lg: 10, md: 8, xs: 0}} mx={{lg: 10, md: 8, xs: 2}}>
      <Stack direction={{lg: "row", md: "row", xs: 'column'}} display="flex" justifyContent="space-between">
      <Typography fontSize={{lg: 60, md: 45, xs: 25}} fontWeight={900} color="#000000">{title}</Typography>
      <Typography fontSize={{lg: 25, md: 20, xs: 15}} fontWeight={200} width={{lg: "500px", md: "350px", xs: "200px"}} color="#000000">
        {description}
      </Typography>
      </Stack>
      <Typography fontSize={25} fontWeight={700} color="#9D9D9D">
        {postType}
      </Typography>
      <Box component="div">
      <Stack mt="25px" direction="column"  gap={2}>
         <CustomButton
             title={!isCurrentUser ? "Save Post" : "Edit"}
             width="100px"
             height="30px"
             backgroundColor="#0D1318"
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
      <Stack padding={5} direction={{lg: "row", md: "row", xs: 'column'}} gap="20px" display="flex" justifyContent="space-between">
        <Button
        href={preview}
        target="_blank"
          sx={{
            backgroundColor: '#0D1318',
            width: '150px',
            height: '50px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '20px',
            textTransform: 'capitalize',
            transition: '0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#0D1318',
              boxShadow: '5px 10px 25px 8px rgba(176, 176, 176, 0.8)',
            }
          }}
        >Preview</Button>
        <Button
          href={github}
          target="_blank"
          sx={{
            backgroundColor: '#0D1318',
            width: '150px',
            height: '50px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '20px',
            textTransform: 'capitalize',
            transition: '0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#0D1318',
              boxShadow: '5px 10px 25px 8px rgba(176, 176, 176, 0.8)',
            }
          }}
        >GitHub<GitHubIcon sx={{ml: '5px'}}/></Button>
      </Stack>
        <Stack width="100%" direction="column" display="flex">
          <Box component="div" display="flex" alignItems="center" justifyContent="center">
          <img width={500} src={photo} style={{ borderRadius: '20px'}} alt="Image" />
          </Box>
          <Stack py={2} direction="column" width="100%" display="flex" justifyContent="center" alignItems="flex-end" >
            <Typography fontSize={25} fontWeight={200} width={{lg: "500px", md: "350px", xs: '200px'}} color="#000000">
              <strong>Used Technologies</strong><br />
              {tech}
            </Typography>
          </Stack>
          <Box component="div">
            <Typography width={{lg: "750px", md: "550px", xs: '300px'}} p={5} fontSize={20} fontWeight={400} color="#000000">{header}</Typography>
          </Box>
          <img width={550} src={photo2} style={{ borderRadius: '20px'}} alt="Image" />
          <Box component="div" p={5}>
            <Typography p={5} width={{lg: "750px", md: "550px", xs: '300px'}} fontSize={20} fontWeight={400} color="#000000">{header2}</Typography>
          </Box>
          <img width={550} src={photo3} style={{ borderRadius: '20px'}} alt="Image" />
          <Box component="div" p={5}>
            <Typography p={5} width={{lg: "750px", md: "550px", xs: '300px'}} fontSize={20} fontWeight={400} color="#000000">{header2}</Typography>
          </Box>
          <img width={550} src={photo4} style={{ borderRadius: '20px'}} alt="Image" />
        </Stack>
      </Box>
  )
}

export default PostDetails