import React, { useEffect, useState } from 'react'
import { useList } from '@pankod/refine-core'
import { Profile, PostCard, CustomButton } from 'components'
import { Typography, Box, Stack, Card, CardMedia, CardContent } from '@pankod/refine-mui'
import axios from 'axios'
import '../index.css'
import CodeIcon from '@mui/icons-material/Code';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useNavigate } from "@pankod/refine-react-router-v6"
import Three from 'components/3d/Three' 
import { motion } from "framer-motion";


const Home = () => {
  const [ imgs, setImgs ] = useState<any[]>([])
  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/Achi00/fake-api/photos')
      .then(res => {
        setImgs(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const navigate = useNavigate()

  const { data, isLoading, isError } = useList({
    resource: 'posts',
    config: {
      pagination: {
        pageSize: 5
      }
    }
  })

  const latestPosts = data?.data ?? []

  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Error</Typography>
  
  return (
    <Box sx={{overflowX: 'hidden', height: '290vh'}}>
      {/* <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Typography textAlign="center" fontSize={70} fontWeight={900} display="flex" justifyContent="center" color="#000">
      Design and ship your<br/> dream site. Zero code,<br/> maximum speed.
        </Typography>
      </Box> */}
      <motion.div
        
      >
      <Box sx={{marginTop: '10px'}}>
        <Typography
        component={motion.p}
        initial={{ y: 1500 }}
        animate={{ y: 0}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 150,
          delay: 1.2
        }}
         fontSize={20} fontWeight={100} display="flex" justifyContent="center">
            Design and Web Resources
        </Typography>
        <Typography
        component={motion.p}
        initial={{ y: 1500 }}
        animate={{ y: 0}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 150,
          delay: 0.7
        }}
         fontSize={25} fontWeight={400} display="flex" justifyContent="center">
            Find Inspiration & Learn Latest Web Technologies
        </Typography>
        <Typography
        component={motion.p}
        initial={{ y: 1500 }}
        animate={{ y: 0}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 150,
          delay: 0.5
        }}
        fontSize={30} fontWeight={500} display="flex" justifyContent="center">
            Web <span style={{fontWeight: '700', marginLeft: '5px'}}>{` `}Design</span>
        </Typography>
        <Stack
        component={motion.div}
        initial={{ x: 1900 }}
        animate={{ x: 0}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 150,
          delay: 1.2
        }}
         direction="row" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          {
            imgs.map((img, id) => (
              <img 
              className='home-image'
              width="20%" 
              style={{borderRadius: '35px',margin: '10px', border: '2px solid black'}} 
              src={img.photo} key={id} alt="Design" />
            ))
          }
          <CustomButton 
              type="submit"
              title={'Explore More'}
              backgroundColor="#475be8"
              color="#fcfcfc"
              width="20%"
              height="190px"
              handleClick={() => navigate('/posts')}
            />
        </Stack>
        <Stack 
        component={motion.div}
        initial={{ y: -1900 }}
        animate={{ y: 0}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 150,
          delay: 1.2
        }}
        direction="column">
          <Typography color="#000" fontSize={40} fontWeight={900} display="flex"  justifyContent="flex-start" p={5}>
            Explore, Learn & Practice. 
          </Typography>
          <Typography color="#777777" fontSize={25} fontWeight={400} display="flex"   justifyContent="flex-start" p={8}>
          Codeprops teaches you to learn and create user friendly,<br />
          and beautiful websites giving you all the information,<br />
          source code and detail explanation in code itself with comments
          </Typography>
        </Stack>
        <Box 
        component={motion.div}
        initial={{ y: 1500 }}
        animate={{ y: 0}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 150,
          delay: 1.8
        }}
        overflow="hidden" display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap" margin="25px" gap="50px" sx={{overflow: 'hidden'}}>
          <Card
            sx={{
              maxWidth: '400px',
              height: '350px',
              borderRadius: '25px',
              background: 'linear-gradient(to right, #0669FF, #0193FF)',
              padding: '10px',
              boxShadow: '0 5px 10px #888888',
              '&:hover': {
                boxShadow: '5px 22px 50px 4px rgba(176, 176, 176, 0.8)',
              },
              cursor: 'default',
            }}
            elevation={0}
           >
            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',   gap: '10px', padding: '5px', textTransform: 'capitalize'}}>
              <Stack direction="column">
                <Typography color="#f2f2f2" fontSize={25} fontWeight={900} display="flex"   justifyContent="center">
                  Design & Layour
                </Typography>
                <Typography color="#fcfcfc" fontSize={15} fontWeight={500} display="flex"   justifyContent="flex-start">
                Create Futuristic<br/>and Creative Websites
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
          {/* card2 */}
          <Card
            sx={{
              maxWidth: {lg: '600px', md: '400px', sm: '200px'},
              height: '350px',
              borderRadius: '25px',
              background: 'linear-gradient(to right, #adb5bd, #e9ecef)',
              padding: '10px',
              '&:hover': {
                boxShadow: '5px 22px 50px 4px rgba(176, 176, 176, 0.8)',
              },
              cursor: 'default',
            }}
            elevation={0}
           >
            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',   gap: '10px', textTransform: 'capitalize'}}>
              <Stack direction="column" textAlign="left">
                <Typography color="#000" fontSize={25} fontWeight={900}>
                  Learn, Create And Deploy
                </Typography>
                <Typography color="#495057" fontSize={18} fontWeight={500}>
                  Newest Technologies, ease explanations and access to Starter pack & Final project
                </Typography>
                <Typography sx={{ border: '1px solid #066BFF' }}
                color="#000" textAlign="center" fontSize={30} fontWeight={900}>
                  Learn, Create And Test
                </Typography>
                <CardMedia 
                sx={{ borderRadius: '30px', width: '100%', mt: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  component="img"
                  image="/card-2.jpg"
                  alt="card Image"
                />
              </Stack>
            </CardContent>
          </Card>
          {/*  */}
          <Card
            sx={{
              width: {lg: '600px', md: '350px', xs: '200px'},
              height: '350px',
              borderRadius: '25px',
              background: 'linear-gradient(to right, #CB00FF, #7101FE)',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': {
                boxShadow: '5px 22px 50px 4px rgba(176, 176, 176, 0.8)',
              },
              cursor: 'default',
              overflow: 'hidden'
            }}
            elevation={0}
           >
            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', zIndex: '2',position: 'relative', gap: '10px', textTransform: 'capitalize'}}>
              <Box>
                <Three />
              </Box>
              
              <Stack position="absolute" width="100%" direction="column" textAlign="left">
                <div className="bg">
                  <Typography color="#f2f2f2" fontSize={25} fontWeight={900}>
                    Animations
                  </Typography>
                </div>
                <Typography color="#DEE2E6" p="10px" fontSize={15} fontWeight={500}>
                Use Three.js<br />with React and Next
                </Typography>
                
                <Typography
                  className="gradient"
                sx={{ 
                  border: '2px solid #CCD2D7',
                  borderRadius: '15px',
                }}
                 textAlign="center" fontSize={30} fontWeight={900}>
                  3D Effects    
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
        
        <Box sx={{mt: '80px'}} textAlign="center">
          <Stack direction="row" sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: '40px'}}>
            <CodeIcon className='float' sx={{padding: '0.5rem', fontSize: '75px',color: '#23C4BA', background: 'linear-gradient(to right, #CB00FF, #7101FE)', borderRadius: '50%'}} />
            <SubtitlesIcon  className='float2' sx={{padding: '0.5rem', fontSize: '75px', color: '#23C4BA', background: 'linear-gradient(to right, #CB00FF, #7101FE)', borderRadius: '50%'}} />
            <DataObjectIcon className='float1' sx={{padding: '0.5rem', fontSize: '75px',color: '#23C4BA', background: 'linear-gradient(to right, #CB00FF, #7101FE)', borderRadius: '50%'}} />
          </Stack>
        </Box>
        <Box 
        flex={1} borderRadius="20px" padding="20px" display="flex" flexDirection="column" minWidth="100%" mt="25px" ml="25px"
        >
          <Typography fontSize="18px" fontWeight={600} color="#11142d">Latest Posts</Typography>
          <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4}}>
        {latestPosts.map(post => (
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
  )
}

export default Home