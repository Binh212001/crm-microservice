import {
  DashboardOutlined,
  ExpandLess,
  ExpandMore,
  MonetizationOnOutlined,
  Person2Outlined,
  SettingsOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import {
  alpha,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { JSX, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMuiTheme } from '../../hooks/mui/useMuiTheme';
import { textActive } from '../../util/theme.util';
import './sidebar.css';

export interface MenuItem {
  label: string;
  children?: MenuItem[];
  to?: string;
  icon?: JSX.Element;
}

// Sample menu array
const menuItems: MenuItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardOutlined /> },
  {
    icon: <ShoppingCartOutlined />,
    label: 'Product',
    children: [
      { label: 'List Product', to: '/product' },
      {
        label: 'Add Product',
        to: '/add-product',
      },
      { label: 'Category', to: '/category' },
      { label: 'Variant', to: '/variant' },
    ],
  },
  {
    icon: <Person2Outlined />,
    label: 'User',
    children: [
      { label: 'List User', to: '/user' },
      {
        label: 'Add user',
        to: '/add-user',
      },
    ],
  },

  {
    icon: <MonetizationOnOutlined />,
    label: 'Order',
    to: '/order',
  },
  {
    icon: <SettingsOutlined />,
    label: 'Setting',
    to: '/setting',
  },
];

export function Sidebar() {
  // Manage open/close state of menus by path
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { mode, primarColor, isMdDown } = useMuiTheme();
  const location = useLocation();

  // Lấy giá trị breakpoint từ theme (600px là sm breakpoint)

  const handleToggle = (path: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  // Recursive function to render menu
  const renderMenu = (items: MenuItem[], parentPath = ''): JSX.Element[] => {
    return items.map((item, index) => {
      const path = parentPath ? `${parentPath}-${index}` : `${index}`;
      const hasChildren = item.children && item.children.length > 0;

      // Checking if the item is active (current path)
      const isActive = location.pathname === item.to;

      const buttonContent = (
        <ListItemButton
          component={item.to ? NavLink : 'div'}
          to={item.to}
          onClick={() => hasChildren && handleToggle(path)}
          className="menu-item"
          sx={{
            padding: '5px 10px',
            ...(isActive && {
              backgroundColor: primarColor,
              color: textActive(mode),
            }),
            '&:hover': {
              backgroundColor: alpha(primarColor, 0.3),
              borderRadius: '8px',
            },
          }}
        >
          {item.icon ? item.icon : <span> </span>}

          <ListItemText
            sx={{
              pl: 2,
            }}
            primary={item.label}
          />
          {hasChildren ? (
            openMenus[path] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItemButton>
      );

      return (
        <div className="menu-item" key={path}>
          {buttonContent}

          {hasChildren && (
            <Collapse in={openMenus[path]} timeout="auto" unmountOnExit>
              <List className="menu-item" component="div" disablePadding>
                {renderMenu(item.children!, path)}
              </List>
            </Collapse>
          )}
        </div>
      );
    });
  };

  return (
    <Drawer
      open
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          padding: '5px 10px',
          backgroundColor: `${mode === 'light' ? '#fff' : '#2F3349'}`,
        },
      }}
    >
      <List>{renderMenu(menuItems)}</List>
    </Drawer>
  );
}
