import React, { useState } from 'react';
import { StyleBox } from '../../common/styleBox';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CreateLeadReq, useCreateLeadMutation } from '../../service/leadApi';
import { useGetProductsQuery } from '../../service/productApi';

function AddLead() {
  const [form, setForm] = useState<CreateLeadReq>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    company: '',
    department: '',
    position: '',

    leadLines: [],
  });

  const [tab, setTab] = useState(0);
  const { data: products } = useGetProductsQuery({
    page: 1,
    limit: 1000,
  });

  const [createLead] = useCreateLeadMutation();
  // LeadLine: { productId: '', quantity: '' }
  const handleLeadLineChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const newLeadLines = prev.leadLines?.map((line: any, i: number) =>
        i === idx ? { ...line, [name]: value } : line,
      );
      return { ...prev, leadLines: newLeadLines };
    });
  };

  const handleAddLeadLine = () => {
    setForm((prev) => ({
      ...prev,
      leadLines: [...(prev.leadLines || []), { id: 0, quantity: 0 }],
    }));
  };

  const handleRemoveLeadLine = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      leadLines: prev.leadLines?.filter((_, i) => i !== idx),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const leadRes = await createLead(form).unwrap();
      console.log(leadRes);
      alert('Lead created successfully');
    } catch (error) {
      console.error('Error creating lead:', error);
      alert('Failed to create lead');
    }
  };

  return (
    <div>
      <StyleBox>
        <Typography variant="h6">Add Lead</Typography>
        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Thông tin" />
          <Tab label="LeadLine" />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {tab === 0 && (
            <Box>
              <Grid container spacing={2}>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    required
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          {tab === 1 && (
            <Box>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddLeadLine}
                sx={{ mb: 2 }}
              >
                Thêm LeadLine
              </Button>
              {form.leadLines?.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Chưa có LeadLine nào.
                </Typography>
              )}
              {form.leadLines?.map((line: any, idx: number) => (
                <Box key={idx} sx={{ display: 'flex', gap: 2 }}>
                  <Select
                    label="Product"
                    color="tertiary"
                    variant="standard"
                    name="id"
                    value={line.id}
                    sx={{ flex: 1 }}
                    onChange={(e: any) => handleLeadLineChange(idx, e)}
                  >
                    {products?.data.map((product: any) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={line.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleLeadLineChange(idx, e)
                    }
                    sx={{ flex: 1 }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveLeadLine(idx)}
                    aria-label="Xóa"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Add Lead
            </Button>
          </Box>
        </Box>
      </StyleBox>
    </div>
  );
}

export default AddLead;
