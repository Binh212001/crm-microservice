import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  TableContainer,
  Pagination,
  Stack,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGetLeadsQuery } from '../../service/leadApi';
import { StyleBox } from '../../common/styleBox';
import { useNavigate } from 'react-router-dom';

function LeadPage() {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    company: '',
    status: '',
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();
  const { data, isLoading, isFetching, error } = useGetLeadsQuery(filters);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  // Filter handlers
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handleEditLead = (id: number) => {
    navigate(`/lead/edit/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'default';
      case 'CONTACTED':
        return 'primary';
      case 'CONVERTED':
        return 'success';
      default:
        return 'default';
    }
  };

  // Calculate total pages
  const total = data?.total || 0;
  const limit = filters.limit;
  const pageCount = Math.ceil(total / limit);

  return (
    <StyleBox>
      <Typography variant="h6" mb={2}>
        Leads
      </Typography>

      {/* Filter Section */}
      <Box mb={2} display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <TextField
          label="Name"
          name="name"
          value={filters.name}
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
          label="Company"
          name="company"
          value={filters.company}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Status"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          size="small"
          select
          SelectProps={{ native: true }}
        >
          <option value="">All Status</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CONVERTED">Converted</option>
        </TextField>
        <Button variant="primary" onClick={() => navigate('/lead/add')}>
          Add Lead
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        {isLoading ? (
          <Stack alignItems="center" py={4}>
            <CircularProgress />
          </Stack>
        ) : error ? (
          <Alert severity="error">Failed to load leads.</Alert>
        ) : (
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              sx={{
                minWidth: 1000,
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
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ backgroundColor: theme.palette.background.paper }}
              >
                {(data?.data || []).map((lead) => (
                  <TableRow key={lead.id} hover>
                    <TableCell>{lead.id}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 160,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {lead.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 180,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {lead.email}
                    </TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 120,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {lead.company}
                    </TableCell>
                    <TableCell>{lead.position || '-'}</TableCell>
                    <TableCell>{lead.city}</TableCell>
                    <TableCell>{lead.country}</TableCell>
                    <TableCell>
                      <Chip
                        label={lead.status}
                        color={getStatusColor(lead.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{lead.products?.length || 0}</TableCell>
                    <TableCell>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEditLead(lead.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          navigate(`/opportunity/add?leadId=${lead.id}`)
                        }
                      >
                        Convert
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

export default LeadPage;
