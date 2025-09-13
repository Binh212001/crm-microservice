import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  useGetSettingByKeyQuery,
  useUpdateSettingByKeyMutation,
} from '../../service/settingApi';
import { SettingKeyEnum, EmailSettings } from '../../service/settingApi';
import axiosInstance from '../api/axios-instance';

function EmailSetting() {
  const [updateSetting, { isLoading: isSaving }] =
    useUpdateSettingByKeyMutation();

  const [form, setForm] = useState<EmailSettings>({
    port: 0,
    email: '',
    replyTo: '',
    password: '',
    username: '',
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = axiosInstance
      .get(`/setting-service/settings/${SettingKeyEnum.EMAIL}`)
      .then((res) => {
        console.log('🚀 ~ EmailSetting ~ res:', res);
        setForm(res.data.data);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev,
    );
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]: Number(value),
          }
        : prev,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    try {
      await updateSetting({
        key: SettingKeyEnum.EMAIL,
        data: { value: form },
      }).unwrap();
      setSuccess('Cập nhật thành công!');
    } catch (err: any) {
      setError('Có lỗi xảy ra khi cập nhật!');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700, margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        Cấu hình Email
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid>
            <TextField
              label="SMTP Port"
              name="port"
              type="number"
              value={form.port || ''}
              onChange={handleNumberChange}
              fullWidth
              required
            />
          </Grid>
          <Grid>
            <TextField
              label="SMTP Email"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid>
            <TextField
              label="SMTP Username"
              name="username"
              value={form.username || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid>
            <TextField
              label="SMTP Password"
              name="password"
              type="password"
              value={form.password || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid>
            <TextField
              label="Reply To Email"
              name="replyTo"
              value={form.replyTo || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        {success && (
          <Box mt={2}>
            <Alert severity="success">{success}</Alert>
          </Box>
        )}
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSaving}
          >
            {isSaving ? <CircularProgress size={24} /> : 'Lưu thay đổi'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default EmailSetting;
