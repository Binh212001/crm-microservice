import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Stack,
  LinearProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const mockData = {
  leads: 120,
  opportunities: 45,
  orders: 32,
  revenue: 15000000,
  growth: 12.5,
  conversionRate: 26.7,
  avgOrderValue: 468750,
  topLeads: [
    {
      name: 'Nguyen Van A',
      company: 'ABC Corp',
      value: 5000000,
      email: 'a.nguyen@abc.com',
      phone: '0901234567',
      status: 'New',
      city: 'Hanoi',
      country: 'Vietnam',
    },
    {
      name: 'Tran Thi B',
      company: 'XYZ Ltd',
      value: 3000000,
      email: 'b.tran@xyz.com',
      phone: '0912345678',
      status: 'Contacted',
      city: 'HCM',
      country: 'Vietnam',
    },
    {
      name: 'Le Van C',
      company: 'DEF Inc',
      value: 2000000,
      email: 'c.le@def.com',
      phone: '0987654321',
      status: 'Qualified',
      city: 'Da Nang',
      country: 'Vietnam',
    },
  ],
  recentOpportunities: [
    {
      id: 101,
      name: 'Deal with ABC Corp',
      value: 4000000,
      stage: 'Negotiation',
      owner: 'Nguyen Van A',
      createdAt: '2024-06-01',
      status: 'Open',
    },
    {
      id: 102,
      name: 'Proposal for XYZ Ltd',
      value: 2500000,
      stage: 'Proposal Sent',
      owner: 'Tran Thi B',
      createdAt: '2024-05-28',
      status: 'Open',
    },
    {
      id: 103,
      name: 'DEF Inc Opportunity',
      value: 1800000,
      stage: 'Closed Won',
      owner: 'Le Van C',
      createdAt: '2024-05-25',
      status: 'Closed',
    },
  ],
  recentOrders: [
    {
      id: 201,
      customer: 'ABC Corp',
      value: 3500000,
      date: '2024-06-02',
      status: 'Completed',
    },
    {
      id: 202,
      customer: 'XYZ Ltd',
      value: 2200000,
      date: '2024-05-30',
      status: 'Processing',
    },
    {
      id: 203,
      customer: 'DEF Inc',
      value: 1800000,
      date: '2024-05-27',
      status: 'Completed',
    },
  ],
};

function getStatusColor(status: string) {
  switch (status) {
    case 'New':
      return 'info';
    case 'Contacted':
      return 'primary';
    case 'Qualified':
      return 'success';
    case 'Negotiation':
      return 'warning';
    case 'Closed':
      return 'default';
    case 'Open':
      return 'info';
    case 'Completed':
      return 'success';
    case 'Processing':
      return 'warning';
    default:
      return 'default';
  }
}

function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Leads
                  </Typography>
                  <Typography variant="h5">{mockData.leads}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tổng số lead hiện tại
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Opportunities
                  </Typography>
                  <Typography variant="h5">{mockData.opportunities}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Cơ hội đang mở
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <ShoppingCartIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Orders
                  </Typography>
                  <Typography variant="h5">{mockData.orders}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Đơn hàng đã tạo
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <MonetizationOnIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Revenue
                  </Typography>
                  <Typography variant="h5">
                    {mockData.revenue.toLocaleString('vi-VN')}₫
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Doanh thu tháng này
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Growth Rate
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TrendingUpIcon color="success" />
                <Typography variant="h4" color="success.main">
                  +{mockData.growth}%
                </Typography>
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={mockData.growth * 2}
                    sx={{ height: 10, borderRadius: 5 }}
                    color="success"
                  />
                </Box>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Conversion Rate
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    {mockData.conversionRate}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Avg. Order Value
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    {mockData.avgOrderValue.toLocaleString('vi-VN')}₫
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Leads
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 260 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Họ tên</TableCell>
                      <TableCell>Công ty</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Điện thoại</TableCell>
                      <TableCell>Thành phố</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Giá trị</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockData.topLeads.map((lead, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: 'primary.light',
                              }}
                            >
                              {lead.name.split(' ').slice(-1)[0][0]}
                            </Avatar>
                            <span>{lead.name}</span>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <BusinessIcon fontSize="small" color="disabled" />
                            {lead.company}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <EmailIcon fontSize="small" color="disabled" />
                            {lead.email}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <PhoneIcon fontSize="small" color="disabled" />
                            {lead.phone}
                          </Stack>
                        </TableCell>
                        <TableCell>{lead.city}</TableCell>
                        <TableCell>
                          <Chip
                            label={lead.status}
                            color={getStatusColor(lead.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography color="primary.main" fontWeight={600}>
                            {lead.value.toLocaleString('vi-VN')}₫
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Opportunities
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 220 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Tên</TableCell>
                      <TableCell>Giá trị</TableCell>
                      <TableCell>Giai đoạn</TableCell>
                      <TableCell>Chủ sở hữu</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockData.recentOpportunities.map((opp) => (
                      <TableRow key={opp.id}>
                        <TableCell>{opp.id}</TableCell>
                        <TableCell>{opp.name}</TableCell>
                        <TableCell>
                          {opp.value.toLocaleString('vi-VN')}₫
                        </TableCell>
                        <TableCell>{opp.stage}</TableCell>
                        <TableCell>{opp.owner}</TableCell>
                        <TableCell>
                          {new Date(opp.createdAt).toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={opp.status}
                            color={getStatusColor(opp.status)}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 220 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Khách hàng</TableCell>
                      <TableCell>Giá trị</TableCell>
                      <TableCell>Ngày</TableCell>
                      <TableCell>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockData.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          {order.value.toLocaleString('vi-VN')}₫
                        </TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
