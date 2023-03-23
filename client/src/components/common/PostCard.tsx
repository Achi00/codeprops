import { Link } from '@pankod/refine-react-router-v6'
import { Typography, Box, Card, CardMedia, CardContent, Stack } from '@pankod/refine-mui'
import { Button } from "@pankod/refine-mui"
import { PostCardProps } from 'interfaces/property'
import { useGetIdentity } from "@pankod/refine-core";
import { useState } from 'react';

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
        maxWidth: '400px',
        height: '350px',
        borderRadius: '25px',
        backgroundColor: '#F0F0F0',
        padding: '10px',
        '&:hover': {
          boxShadow: '5px 22px 50px 4px rgba(176, 176, 176, 0.8)',
          // backgroundColor: 'rgba(71, 91, 232, 0.7)'
        },
        cursor: 'default',
        color: '#000',
      }}
      elevation={0}
    >
      <CardMedia 
        component="img"
        width="250px"
        // height={310}
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
          <Box sx={{
            position: 'relative',
              bottom: '25%',
              left: '50%',
              transform: 'translate(-50%, 50%)',
          }}>
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
          {
            user ? 'Explore More' : 'Login To Explore'
          }
        </Button>
        </Box>
        ) : (
          null
        )
        
      }
      <Box sx={{position: 'relative'}}>
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