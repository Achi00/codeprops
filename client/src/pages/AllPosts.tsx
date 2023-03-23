import { Add } from "@mui/icons-material"
import { useTable } from "@pankod/refine-core"
import { Box, Stack, Typography, TextField, Select, MenuItem } from "@pankod/refine-mui"
import { useNavigate } from "@pankod/refine-react-router-v6"
import { useGetIdentity } from "@pankod/refine-core";
import { useMemo } from 'react'
import { PostCard, CustomButton } from "components"

const AllPosts = () => {
    const navigate = useNavigate()
    const { tableQueryResult: { data, isError, isLoading }, 
    current, 
    setCurrent, setPageSize, 
    pageCount, 
    sorter, setSorter, 
    filters,setFilters 
  } = useTable()
    
    const allPosts = data?.data ?? []

    const { data: user } = useGetIdentity()
    

    const currentFilterValues = useMemo(() => {
      const logicalFilters = filters.flatMap(item => (
        'field' in item ? item: []
      ))
      return {
        title: logicalFilters.find(item => item.field === 'title')?.value || '',
        postType: logicalFilters.find(item => item.field === 'postType')?.value || '',
      }
    }, [filters])

    if (isLoading) return <Typography fontSize={25} fontWeight={700} color="#11142d">Loading...</Typography>
    if (isError) return <Typography fontSize={25} fontWeight={700} color="#11142d">Error</Typography>
    
  return (
    <Box>
      <Box mt="20px" sx={{ displey: 'flex', flexWrap: 'wrap', gap: 3}}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allPosts.length ? 'There are no posts to show' : 'All Posts'}
          </Typography>
          <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
            <Box  display="flex" gap={2} flexWrap="wrap" mb={{ xs: '20px', sm: 0}}>
              <TextField 
              sx={{ paddingLeft: '40px' }}
                variant="outlined"
                color="info"
                placeholder="Search By Title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([{
                    field: 'title',
                    operator: 'contains',
                    value: e.currentTarget.value ? e.currentTarget.value : undefined
                  }])
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'arie-label' : 'Without label' }}
                defaultValue=""
                value={currentFilterValues.postType}
                onChange={(e) => {
                  setFilters([{
                    field: 'postType',
                    operator: 'eq',
                    value: e.target.value
                  }])
                }}
              >
                <MenuItem value="">All</MenuItem>
                {['Template', 'Tutorial', 'Blog'].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Stack padding="24px">
        {user?.email === process.env.REACT_APP_ADMIN_USER && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <CustomButton 
              type="submit"
              title={'Add Post'}
              backgroundColor="#475be8"
              handleClick={() => navigate('/posts/create')}
              color="#fcfcfc"
              width="180px"
              height="50px"
              icon={<Add />}
            />
        </Stack>)
        }
        <Box mt="20px" padding="24px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3}}>
          {allPosts.map(post => (
            <PostCard 
              key={post._id}
              id={post._id}
              title={post.title}
              tech={post.text}
              header={post.header}
              header2={post.header2}
              description={post.description}
              photo={post.photo}
              photo2={post.photo2}
              photo3={post.photo3}
              photo4={post.photo4}
              postType={post.postType}
            />
          ))}
        </Box>
        </Stack>
        {allPosts.length > 0 && (
          <Box display="flex" ml="30px" gap={2} mt={3} flexWrap="wrap">
            <CustomButton 
              handleClick={() => setCurrent(prev => prev - 1)}
              title="Previous"
              backgroundColor="#475be8"
              color="#fcfcfc"
              height="50px"
              width="200px"
              disabled={!(current > 1)}
            />
            <Box mt="20px" display={{ xs: 'none', sm: 'flex'}} alignItems="center" gap="5px">
                Page{` `} <strong>of {pageCount}</strong>
            </Box>
            <CustomButton 
              handleClick={() => setCurrent(prev => prev + 1)}
              title="Next"
              backgroundColor="#475be8"
              color="#fcfcfc"
              height="50px"
              width="200px"
              disabled={current === pageCount}
            />
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ 'arie-label' : 'Without label' }}
              defaultValue={10}
              onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}    
            >
              {[10, 20, 30, 40, 50].map(size => (
                <MenuItem key={size} value={size}>Show {size}</MenuItem>
              ))}
            </Select>
          </Box>
        )}
    </Box>
  )
}

export default AllPosts