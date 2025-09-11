import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const categories = ["Điện thoại", "Laptop", "Phụ kiện", "Đồng hồ"];
function MainLayout() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo bên trái */}
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              MyShop
            </Typography>
          </Box>

          {/* Menu Category */}
          <Box display="flex" gap={2}>
            {categories.map((cat) => (
              <Link to={`/product/category/${cat}`} key={cat} color="inherit">
                {cat}
              </Link>
            ))}
          </Box>

          {/* User Avatar bên phải */}
          <Stack direction="row" alignItems="center">
            <TextField placeholder="Search product" />
            <IconButton onClick={handleAvatarClick}>
              <Avatar alt="User Name" src="https://i.pravatar.cc/300" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
              <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
              <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}

export default MainLayout;
