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
import { useGetOpportunitiesQuery } from '../../service/leadApi';
import { StyleBox } from '../../common/styleBox';
import { useNavigate } from 'react-router-dom';

function OportunityPage() {
  const theme = useTheme();

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    company: '',
    status: '',
    leadId: '',
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();
  const { data, isLoading, isFetching, error } =
    useGetOpportunitiesQuery(filters);

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

  const handleEditOpportunity = (id: number) => {
    navigate(`/opportunity/edit/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'QUALIFIED':
        return 'default';
      case 'QUATATION_SENT':
        return 'primary';
      case 'NEGOTIATED':
        return 'warning';
      case 'CLOSED_WON':
        return 'success';
      case 'CLOSED_LOST':
        return 'error';
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
        Opportunities
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
          <option value="QUALIFIED">Qualified</option>
          <option value="QUATATION_SENT">Quotation Sent</option>
          <option value="NEGOTIATED">Negotiated</option>
          <option value="CLOSED_WON">Closed Won</option>
          <option value="CLOSED_LOST">Closed Lost</option>
        </TextField>
        <Button variant="primary" onClick={() => navigate('/opportunity/add')}>
          Add Opportunity
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        {isLoading ? (
          <Stack alignItems="center" py={4}>
            <CircularProgress />
          </Stack>
        ) : error ? (
          <Alert severity="error">Failed to load opportunities.</Alert>
        ) : (
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              sx={{
                minWidth: 1200,
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
                  <TableCell>Manager</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ backgroundColor: theme.palette.background.paper }}
              >
                {(data?.data || []).map((opportunity) => (
                  <TableRow key={opportunity.id} hover>
                    <TableCell>{opportunity.id}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 160,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {opportunity.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 180,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {opportunity.email}
                    </TableCell>
                    <TableCell>{opportunity.phone}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 120,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {opportunity.company}
                    </TableCell>
                    <TableCell>{opportunity.position || '-'}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 120,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {opportunity.manager || '-'}
                    </TableCell>
                    <TableCell>{opportunity.city}</TableCell>
                    <TableCell>{opportunity.country}</TableCell>
                    <TableCell>
                      <Chip
                        label={opportunity.status}
                        color={getStatusColor(opportunity.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(opportunity.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEditOpportunity(opportunity.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          navigate(`/order/add?opportunityId=${opportunity.id}`)
                        }
                      >
                        Create Order
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

export default OportunityPage;
