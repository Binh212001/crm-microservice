import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleBox } from '../../common/styleBox';
import { useGetUsersQuery } from '../../service/userApi';

function UserPage() {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    fullName: '',
    email: '',
    phone: '',
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();
  const { data, isLoading, isFetching, error } = useGetUsersQuery(
    filters as any,
  );

  // Filter handlers
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };
  const handleEditUser = (id: number) => {
    navigate(`/user/edit/${id}`);
  };

  // Calculate total pages
  const total = data?.total || 0;
  const limit = filters.limit;
  const pageCount = Math.ceil(total / limit);

  return (
    <StyleBox>
      <Typography variant="h6" mb={2}>
        Users
      </Typography>

      {/* Filter Section */}
      <Box mb={2} display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <TextField
          label="Full Name"
          name="fullName"
          value={filters.fullName}
          onChange={handleFilterChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Phone"
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
          size="small"
        />
        <Button variant="primary" onClick={() => navigate('/user/add')}>
          Add User
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        {isLoading ? (
          <Stack alignItems="center" py={4}>
            <CircularProgress />
          </Stack>
        ) : error ? (
          <Alert severity="error">Failed to load users.</Alert>
        ) : (
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              sx={{
                minWidth: 900,
                borderCollapse: 'separate',
                borderSpacing: 0,
                '& th, & td': {
                  borderRight: '1px solid #e0e0e0',
                  borderBottom: '1px solid #e0e0e0',
                },
                '& th:last-child, & td:last-child': {
                  borderRight: 0,
                },
                backgroundColor: '#fff',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ backgroundColor: theme.palette.background.paper }}
              >
                {(data?.data || []).map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>
                      <Avatar
                        sx={{ width: 40, height: 40 }}
                        src={u.avatar || ''}
                        alt={u.fullName}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 160,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {u.fullName}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 180,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {u.email}
                    </TableCell>
                    <TableCell>{(u.role || []).join(', ')}</TableCell>
                    <TableCell>{u.status}</TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEditUser(u.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          mt={2}
        >
          <Pagination
            count={pageCount}
            page={filters.page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            disabled={isFetching}
          />
        </Stack>
      </Box>
    </StyleBox>
  );
}

export default UserPage;
