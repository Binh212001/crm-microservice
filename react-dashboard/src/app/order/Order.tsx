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
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from '../../service/orderApi';
import { StyleBox } from '../../common/styleBox';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '../../service/orderApi';

function Order() {
  const [filters, setFilters] = useState({
    orderNumber: '',
    customerName: '',
    customerEmail: '',
    status: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { data, isLoading, isFetching, error } = useGetOrdersQuery(filters);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handlePageChange = (_event: any, value: any) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  // Filter handlers
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handleEditOrder = (id: number) => {
    navigate(`/order/edit/${id}`);
  };

  const handleViewOrder = (id: number) => {
    navigate(`/order/view/${id}`);
  };

  const handleStatusMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    orderId: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleStatusMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleStatusUpdate = async (status: OrderStatus) => {
    if (selectedOrderId) {
      try {
        await updateOrderStatus({ id: selectedOrderId, status }).unwrap();
        handleStatusMenuClose();
      } catch (error) {
        console.error('Failed to update order status:', error);
      }
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'DRAFT':
        return 'default';
      case 'PENDING':
        return 'warning';
      case 'CONFIRMED':
        return 'info';
      case 'PROCESSING':
        return 'primary';
      case 'SHIPPED':
        return 'secondary';
      case 'DELIVERED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      case 'RETURNED':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString();
  };

  // Calculate total pages
  const total = data?.total || 0;
  const limit = filters.limit;
  const pageCount = Math.ceil(total / limit);

  return (
    <StyleBox>
      <Typography variant="h6" mb={2}>
        Orders
      </Typography>

      {/* Filter Section */}
      <Box mb={2} display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <TextField
          label="Order Number"
          name="orderNumber"
          value={filters.orderNumber}
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
          label="Customer Email"
          name="customerEmail"
          value={filters.customerEmail}
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
          <option value="DRAFT">Draft</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="RETURNED">Returned</option>
        </TextField>
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleFilterChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleFilterChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="primary" onClick={() => navigate('/order/add')}>
          Add Order
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        {isLoading ? (
          <Stack alignItems="center" py={4}>
            <CircularProgress />
          </Stack>
        ) : error ? (
          <Alert severity="error">Failed to load orders.</Alert>
        ) : (
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              sx={{
                minWidth: 1400,
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
                  <TableCell>Order #</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Shipped Date</TableCell>
                  <TableCell>Delivered Date</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.data || []).map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleViewOrder(order.id)}
                    >
                      {order.orderNumber}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 160,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {order.customerName}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 180,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {order.customerEmail}
                    </TableCell>
                    <TableCell>{order.customerPhone}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>
                      {order.shippedDate ? formatDate(order.shippedDate) : '-'}
                    </TableCell>
                    <TableCell>
                      {order.deliveredDate
                        ? formatDate(order.deliveredDate)
                        : '-'}
                    </TableCell>
                    <TableCell>{order.orderLines?.length || 0}</TableCell>
                    <TableCell
                      sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEditOrder(order.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => handleStatusMenuClick(e, order.id)}
                        endIcon={<MoreVertIcon />}
                      >
                        Status
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

      {/* Status Update Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleStatusMenuClose}
      >
        <MenuItem onClick={() => handleStatusUpdate(OrderStatus.DRAFT)}>
          Draft
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(OrderStatus.PENDING)}>
          Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(OrderStatus.CONFIRMED)}>
          Confirmed
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(OrderStatus.PROCESSING)}>
          Processing
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(OrderStatus.SHIPPED)}>
          Shipped
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(OrderStatus.DELIVERED)}>
          Delivered
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(OrderStatus.CANCELLED)}>
          Cancelled
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(OrderStatus.RETURNED)}>
          Returned
        </MenuItem>
      </Menu>
    </StyleBox>
  );
}

export default Order;
