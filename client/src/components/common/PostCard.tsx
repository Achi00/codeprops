import { Link } from '@pankod/refine-react-router-v6'
import { Typography, Box, Card, CardMedia, CardContent, Stack } from '@pankod/refine-mui'
import { Button } from "@pankod/refine-mui"
import { PostCardProps } from 'interfaces/property'
import { useGetIdentity } from "@pankod/refine-core";
import { useState } from 'react';
import { GoogleButton } from 'pages/login';

const PostCard = ({ id, title, tech, description, photo, photo2, photo3, photo4, postType }:PostCardProps) => {
  const [hover, setHover] = useState(false)
  const { data: user } = useGetIdentity()
  return (
    <Card
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      component={Link}
      to={`/posts/show/${id}`}
      sx={{
        maxWidth: {lg: '400px', md: '300px', xs: '240px'},
        height: '350px',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        padding: "2rem",  
        cursor: 'default',
        color: '#000',
      }}
      elevation={0}
    >
      <CardMedia 
        component="img"
        width="250px"
        height="170px"
        image={photo}
        alt="card Image"
        sx={{ 
          borderRadius: '25px',
          cursor: 'pointer',
          '&:hover': {
            opacity: 1,
            backgroundColor: 'black',
            filter: 'brightness(50%)',
            transition: 'all 0.2s ease',
            objectFit: 'cover',
          },
        }}
      />
      { 
        hover === true ? (
          <Box 
          component="div"
          sx={{
            position: 'relative',
            bottom: '25%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
          }}>
          {user? (
          <Button
            sx={{ 
              zIndex: '10',
              position: 'absolute',
              bottom: '30%',
              left: '50%',
              transform: 'translate(-50%, 50%)',
              backgroundColor: '#0099FF', 
              color: 'white', 
              fontSize: '18px', 
              fontWeight: '900',
              padding: '0.5rem',
              pointerEvents: 'none',
              '&:hover': {
                backgroundColor: 'rgba(71, 91, 232, 0.7)'
              },
            }}
        >
          Explore More
        </Button>
        ) : (
          <Box 
          component="div"
          sx={{
            width: '48%',
            position: 'absolute',
            // bottom: '25%',
            // left: '50%',
            transform: 'translate(50%, -50%)',
            }}>
          <GoogleButton />
          </Box>
        )}
        </Box>
        ) : (
          null
        )
        
      }
      <Box 
      component="div"
      sx={{position: 'relative'}}>
      <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', padding: '5px', textTransform: 'capitalize'}}>
        <Stack direction="column">
          <Typography fontSize={22} fontWeight={700}>{title}</Typography>
          <Typography fontSize={20} fontWeight={500} color="#999999">{postType}</Typography>
          <Typography fontSize={18} fontWeight={500} color="#999999">{tech}</Typography>
        </Stack>
      </CardContent>
      </Box>
    </Card>
  )
}

export default PostCard