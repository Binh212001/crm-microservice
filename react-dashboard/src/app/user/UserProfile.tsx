import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { StyleBox } from '../../common/styleBox';
import { SaveAsOutlined } from '@mui/icons-material';

export default function UserProfile() {
  const [tab, setTab] = useState<number>(0);
  return (
    <Grid spacing={2} container columns={12}>
      <Grid
        size={{
          sm: 12,
          lg: 4,
        }}
      >
        <Card sx={{ p: 3, maxWidth: 400 }}>
          {/* Avatar & Name */}
          <Stack spacing={2} alignItems="center">
            <Avatar
              alt="Violet Mendoza"
              src="https://i.pravatar.cc/150?img=3"
              sx={{ width: 80, height: 80 }}
            />
            <Box textAlign="center">
              <Typography variant="h6">Violet Mendoza</Typography>
              <Typography variant="caption" color="text.secondary">
                Author
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Task / Project Stats */}
          <Stack direction="row" justifyContent="space-around" mb={2}>
            <Box textAlign="center">
              <Typography variant="h6" color="primary">
                1.23k
              </Typography>
              <Typography variant="caption">Task Done</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" color="primary">
                568
              </Typography>
              <Typography variant="caption">Project Done</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Details */}
          <Stack spacing={1} mb={2}>
            <DetailItem label="Username" value="@violet.dev" />
            <DetailItem label="Email" value="vafqat@vtutlukik.org" />
            <DetailItem label="Status" value="Active" />
            <DetailItem label="Role" value="Author" />
            <DetailItem label="Tax ID" value="Tax-8965" />
            <DetailItem label="Contact" value="(123) 456-7890" />
            <DetailItem label="Languages" value="French" />
            <DetailItem label="Country" value="England" />
          </Stack>

          {/* Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="primary">
              Edit
            </Button>
            <Button variant="outlined" color="error">
              Suspend
            </Button>
          </Stack>
        </Card>
      </Grid>
      <Grid
        size={{
          sm: 12,
          lg: 8,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant={tab === 0 ? 'primary' : 'text'}
            onClick={() => setTab(0)}
          >
            Account
          </Button>
          <Button
            onClick={() => setTab(1)}
            variant={tab === 1 ? 'primary' : 'text'}
          >
            Security
          </Button>
        </Stack>
        {/* Acount tab */}
        {tab === 0 && (
          <StyleBox>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Order List</Typography>
              <TextField placeholder="Search Order" />
            </Stack>
          </StyleBox>
        )}
        {/* Security tab  */}

        {tab === 1 && (
          <Box>
            <StyleBox>
              <Typography variant="h6" mb={2}>
                Change Password
              </Typography>
              <Alert variant="outlined" color="warning">
                <Typography>Ensure that these requirements are met</Typography>
                <Typography variant="body2">
                  Minimum 8 characters long, uppercase & symbol
                </Typography>
              </Alert>
              <Box component="form" mt={3}>
                <Grid container columns={12} spacing={2} mb={3}>
                  <Grid
                    size={{
                      sm: 12,
                      md: 6,
                    }}
                  >
                    <Typography>New Password</Typography>
                    <TextField
                      fullWidth
                      type="password"
                      color="tertiary"
                      placeholder="New Password"
                    />
                  </Grid>
                  <Grid
                    size={{
                      sm: 12,
                      md: 6,
                    }}
                  >
                    <Typography>Confirm New Password</Typography>
                    <TextField
                      fullWidth
                      type="password"
                      color="tertiary"
                      placeholder="Confirm New Password"
                    />
                  </Grid>
                </Grid>

                <Button variant="primary">Change password</Button>
              </Box>
            </StyleBox>

            <StyleBox>
              <Typography variant="h6">Two-steps verification</Typography>
              <Typography variant="body2" mb={2}>
                Keep your account secure with authentication step.
              </Typography>
              <Typography>SMS</Typography>
              <Stack direction="row" alignItems="center" spacing={3}>
                <TextField fullWidth placeholder="+84 023 211 123" />
                <Button variant="primary">
                  <SaveAsOutlined />
                </Button>
              </Stack>
              <Typography>
                Two-factor authentication adds an additional layer of security
                to your account by requiring more than just a password to log
                in. Learn more.
              </Typography>
            </StyleBox>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}
