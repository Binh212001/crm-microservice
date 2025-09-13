import { StyleBox } from '../../common/styleBox';
import {
  Box,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  CircularProgress,
  Alert,
  FormControlLabel,
} from '@mui/material';
import {
  UpdateUserReq,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../service/userApi';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Role options based on the existing pattern
const ROLE_OPTIONS = [
  'ADMIN',
  'SALES',
  'MARKETING',
  'ACCOUNTING',
  'HR',
  'IT',
  'OTHERS',
];

function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  const { data: userData, isLoading, error } = useGetUserByIdQuery(Number(id));

  const [user, setUser] = useState<UpdateUserReq>({
    fullName: '',
    email: '',
    role: [],
    phone: '',
    address: '',
    avatar: '',
    gender: false,
    birthDate: '',
    city: '',
    country: '',
    postalCode: '',
    company: '',
    department: '',
    position: '',
  });

  // Update form when user data is loaded
  useEffect(() => {
    if (userData) {
      setUser({
        fullName: userData.fullName || '',
        email: userData.email || '',
        role: userData.role || [],
        phone: userData.phone || '',
        address: userData.address || '',
        avatar: userData.avatar || '',
        gender: userData.gender || false,
        birthDate: userData.birthDate || '',
        city: userData.city || '',
        country: userData.country || '',
        postalCode: userData.postalCode || '',
        company: userData.company || '',
        department: userData.department || '',
        position: userData.position || '',
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setUser({
      ...user,
      role: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await updateUser({ id: Number(id), data: user }).unwrap();
      alert('User updated successfully');
      navigate('/user');
    } catch (error) {
      console.error('Error updating user:', error);
      // @ts-ignore
      alert(error.data?.message || 'Failed to update user');
    }
  };

  const handleCancel = () => {
    navigate('/user');
  };

  if (isLoading) {
    return (
      <StyleBox>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      </StyleBox>
    );
  }

  if (error) {
    return (
      <StyleBox>
        <Alert severity="error">Failed to load user data.</Alert>
      </StyleBox>
    );
  }

  return (
    <div>
      <StyleBox>
        <Typography variant="h6" mb={2}>
          Edit User
        </Typography>
        <Box component="form" mt={3} onSubmit={handleSubmit}>
          <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ sm: 6, xs: 12, md: 6, lg: 6 }}>
              <TextField
                label="Full Name"
                name="fullName"
                color="tertiary"
                value={user.fullName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                name="email"
                color="tertiary"
                value={user.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                name="phone"
                color="tertiary"
                value={user.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Address"
                name="address"
                color="tertiary"
                value={user.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="City"
                name="city"
                color="tertiary"
                value={user.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Postal Code"
                name="postalCode"
                color="tertiary"
                value={user.postalCode}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid size={{ sm: 6, xs: 12, md: 6, lg: 6 }}>
              <TextField
                label="Company"
                name="company"
                color="tertiary"
                value={user.company}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Department"
                name="department"
                color="tertiary"
                value={user.department}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Position"
                name="position"
                color="tertiary"
                value={user.position}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Country"
                name="country"
                color="tertiary"
                value={user.country}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  multiple
                  value={user.role || []}
                  onChange={handleRoleChange}
                  input={<OutlinedInput label="Role" />}
                  renderValue={(selected) =>
                    (selected as string[])?.join(', ') || ''
                  }
                >
                  {ROLE_OPTIONS.map((role) => (
                    <MenuItem key={role} value={role}>
                      <Checkbox
                        checked={(user.role || []).indexOf(role) > -1}
                      />
                      <ListItemText primary={role} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Birth Date"
                name="birthDate"
                color="tertiary"
                type="date"
                value={user.birthDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              {/* gender */}
            </Grid>
            <Grid size={12}>
              <FormControl component="fieldset" margin="normal">
                <InputLabel shrink>Gender</InputLabel>
                <Select
                  value={user.gender === true ? 'male' : 'female'}
                  onChange={(event) => {
                    setUser({ ...user, gender: event.target.value === 'male' });
                  }}
                  displayEmpty
                  input={<OutlinedInput notched label="Gender" />}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </StyleBox>
    </div>
  );
}

export default EditUser;
