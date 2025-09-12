import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { StyleBox } from '../../common/styleBox';
import {
  CategoryReq,
  CategoryRes,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../service/categoryApi';

function CategoryPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('createdAt');

  const { data, isLoading, error, refetch } = useGetCategoriesQuery({
    page: page,
    limit: limit,
    order: order,
    name: search,
  });

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addCategory, setAddCategory] = useState<CategoryReq>({
    name: '',
    description: '',
  });

  const [createCategory] = useCreateCategoryMutation();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryRes>({
    id: 0,
    name: '',
    description: '',
  });

  const [updateCategory] = useUpdateCategoryMutation();
  const handleEditCategory = () => {
    updateCategory({ id: editCategory.id, data: editCategory });
    refetch();
    setOpenEditDialog(false);
  };
  const handleAddCategory = () => {
    createCategory(addCategory);
    refetch();
    setOpenAddDialog(false);
  };
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleConfirmDelete = (id: number) => {
    setSelectedCategoryId(id);
    setOpenConfirmDelete(true);
  };
  const handleDeleteCategory = () => {
    deleteCategory(selectedCategoryId);
    refetch();
    setOpenConfirmDelete(false);
  };
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* search and add category */}
      <StyleBox>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <TextField
            label="Search"
            variant="outlined"
            color="tertiary"
            name="search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e)
            }
          />
          <Button variant="primary" onClick={() => setOpenAddDialog(true)}>
            Add Category
          </Button>
        </Stack>
      </StyleBox>
      {/* //table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data && data?.data?.length > 0 ? (
              data?.data?.map((item: CategoryRes) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setOpenEditDialog(true);
                        setEditCategory(item);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleConfirmDelete(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data found</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Pagination
                  count={Math.ceil((data?.total ?? 0) / limit)}
                  page={page}
                  onChange={(e: React.ChangeEvent<unknown>, value: number) =>
                    setPage(value)
                  }
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Dialog
          open={openConfirmDelete}
          onClose={() => setOpenConfirmDelete(false)}
        >
          <DialogTitle>Delete Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this category?
            </DialogContentText>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteCategory}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseConfirmDelete}
              >
                Cancel
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </TableContainer>
      {/* Add Dialog for add category  */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddCategory({ ...addCategory, name: e.target.value })
              }
              variant="outlined"
              color="tertiary"
              name="name"
            />
            <TextField
              label="Description"
              onChange={(e) =>
                setAddCategory({ ...addCategory, description: e.target.value })
              }
              variant="outlined"
              color="tertiary"
              name="description"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenAddDialog(false)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {/* Edit Dialog for edit category */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              color="tertiary"
              name="name"
              value={editCategory.name}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
            />
            <TextField
              label="Description"
              variant="outlined"
              color="tertiary"
              name="description"
              value={editCategory.description}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  description: e.target.value,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditCategory}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenEditDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CategoryPage;
