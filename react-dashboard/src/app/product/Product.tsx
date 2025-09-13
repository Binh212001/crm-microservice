import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Avatar,
  TableContainer,
  Pagination,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';
import { useGetProductsQuery } from '../../service/productApi';
import { StyleBox } from '../../common/styleBox';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export default function Product() {
  const [filters, setFilters] = useState({
    name: '',
    sku: '',
    barcode: '',
    categoryId: '',
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();
  const { data, refetch, isFetching } = useGetProductsQuery(filters as any);

  const handleEditProduct = (id: number) => {
    navigate(`/edit-product/${id}`);
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

  // Filter handlers
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  // Calculate total pages
  const total = data?.total || 0;
  const limit = filters.limit;
  const pageCount = Math.ceil(total / limit);

  return (
    <StyleBox>
      <Typography variant="h6" mb={2}>
        Products
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
          label="SKU"
          name="sku"
          value={filters.sku}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Barcode"
          name="barcode"
          value={filters.barcode}
          onChange={handleFilterChange}
          size="small"
        />
        {/* You can add a category filter here if you have category data */}
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
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
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Barcode</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity On Hand</TableCell>
                <TableCell>Sold Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data?.data || []).map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>
                    <Avatar
                      variant="square"
                      sx={{ width: 48, height: 48 }}
                      src={p?.image?.path || ''}
                    ></Avatar>
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 160,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 120,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.sku}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 120,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.barcode}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 120,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.category?.name || '-'}
                  </TableCell>
                  <TableCell>{p.productType}</TableCell>
                  <TableCell>{p.salesPrice}</TableCell>
                  <TableCell>{p.quantityOnHand ?? '-'}</TableCell>
                  <TableCell>{p.soldQuantity ?? '-'}</TableCell>
                  <TableCell sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditProduct(p.id)}
                    >
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
