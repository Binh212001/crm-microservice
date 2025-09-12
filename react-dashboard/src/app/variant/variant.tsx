import {
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
  Badge,
} from '@mui/material';
import { useState } from 'react';
import {
  useCreateVariantMutation,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
  useGetVariantsQuery,
  CreateVariantReq,
  UpdateVariantReq,
  ValueRes,
  VariantData,
} from '../../service/variantApi';
import { StyleBox } from '../../common/styleBox';

function VariantPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('createdAt');
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null,
  );
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [addVariant, setAddVariant] = useState<CreateVariantReq>({
    name: '',
    values: [],
  });
  const [editVariant, setEditVariant] = useState<UpdateVariantReq>({
    name: '',
    values: [],
  });
  const [tempValue, setTempValue] = useState('');
  const [tempColor, setTempColor] = useState('');
  const [editTempValue, setEditTempValue] = useState('');
  const [editTempColor, setEditTempColor] = useState('');

  const [createVariant] = useCreateVariantMutation();
  const [updateVariant] = useUpdateVariantMutation();
  const { data, isLoading, error, refetch } = useGetVariantsQuery({
    page: page,
    limit: limit,
    order: order,
    name: search,
  });
  const [deleteVariant] = useDeleteVariantMutation();

  const handleDeleteVariant = async () => {
    if (selectedVariantId) {
      try {
        await deleteVariant(selectedVariantId).unwrap();
        refetch();
        setOpenConfirmDelete(false);
        setSelectedVariantId(null);
      } catch (error) {
        console.error('Failed to delete variant:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (id: number) => {
    const variant = data?.data.find((item) => item.id === id);
    if (variant) {
      setSelectedVariantId(id);
      setEditVariant({
        name: variant.name,
        values: variant.values.map((value) => ({
          name: value.name,
          color: value.color,
        })),
      });
      setOpenEditDialog(true);
    }
  };

  const handleDelete = (id: number) => {
    setSelectedVariantId(id);
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
    setSelectedVariantId(null);
  };

  const handleAddVariant = async () => {
    if (!addVariant.name.trim() || addVariant.values.length === 0) {
      return;
    }

    try {
      await createVariant(addVariant).unwrap();
      refetch();
      setOpenAddDialog(false);
      setAddVariant({ name: '', values: [] });
      setTempValue('');
      setTempColor('');
    } catch (error) {
      console.error('Failed to create variant:', error);
    }
  };

  const handleUpdateVariant = async () => {
    if (
      !editVariant.name.trim() ||
      editVariant.values.length === 0 ||
      !selectedVariantId
    ) {
      return;
    }

    try {
      await updateVariant({
        id: selectedVariantId,
        data: editVariant,
      }).unwrap();
      refetch();
      setOpenEditDialog(false);
      setEditVariant({ name: '', values: [] });
      setEditTempValue('');
      setEditTempColor('');
      setSelectedVariantId(null);
    } catch (error) {
      console.error('Failed to update variant:', error);
    }
  };

  const handleAddValue = () => {
    const value = tempValue.trim();
    const color = tempColor.trim();

    if (!value) {
      return;
    }

    setAddVariant({
      ...addVariant,
      values: [
        ...addVariant.values,
        {
          name: value,
          color: color || '',
        },
      ],
    });

    setTempValue('');
    setTempColor('');
  };

  const handleAddEditValue = () => {
    const value = editTempValue.trim();
    const color = editTempColor.trim();

    if (!value) {
      return;
    }

    setEditVariant({
      ...editVariant,
      values: [
        ...editVariant.values,
        {
          name: value,
          color: color || '',
        },
      ],
    });

    setEditTempValue('');
    setEditTempColor('');
  };

  const handleRemoveValue = (index: number) => {
    setAddVariant({
      ...addVariant,
      values: addVariant.values.filter((_, i) => i !== index),
    });
  };

  const handleRemoveEditValue = (index: number) => {
    setEditVariant({
      ...editVariant,
      values: editVariant.values.filter((_, i) => i !== index),
    });
  };

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
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddDialog(true)}
          >
            Add Variant
          </Button>
        </Stack>
      </StyleBox>

      {/* //table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data && data?.data?.length > 0 ? (
              data?.data?.map((item: VariantData) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {/* Co mau  su dung badge*/}
                    {item.values.map((value: ValueRes) => (
                      <Badge key={value.id} color="primary" sx={{ mr: 1 }}>
                        {value.name},
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(item.id)}
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
      </TableContainer>

      {/* pop up delete variant */}
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Delete Variant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this variant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteVariant}
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
        </DialogActions>
      </Dialog>

      {/* pop up add variant */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Variant</DialogTitle>
        <DialogContent>
          <TextField
            label="Attribute"
            variant="outlined"
            color="tertiary"
            name="name"
            value={addVariant.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddVariant({ ...addVariant, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          {/* input de luu lai value va  color va value lai cho nhieu lan */}
          <Stack direction="row" spacing={2} mt={2}>
            <TextField
              label="Value"
              variant="outlined"
              color="tertiary"
              fullWidth
              name="value"
              value={tempValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTempValue(e.target.value)
              }
            />
            <TextField
              label="Color"
              variant="outlined"
              color="tertiary"
              name="color"
              value={tempColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTempColor(e.target.value)
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddValue}
            >
              Add
            </Button>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Value</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addVariant.values.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveValue(index)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddVariant}
            disabled={!addVariant.name.trim() || addVariant.values.length === 0}
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
        </DialogActions>
      </Dialog>

      {/* pop up edit variant */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Variant</DialogTitle>
        <DialogContent>
          <TextField
            label="Attribute"
            variant="outlined"
            color="tertiary"
            name="name"
            value={editVariant.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditVariant({ ...editVariant, name: e.target.value })
            }
          />
          <Stack direction="row" spacing={2} mt={2}>
            <TextField
              label="Value"
              variant="outlined"
              color="tertiary"
              name="value"
              value={editTempValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditTempValue(e.target.value)
              }
            />
            <TextField
              label="Color"
              variant="outlined"
              color="tertiary"
              name="color"
              value={editTempColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditTempColor(e.target.value)
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddEditValue}
            >
              Add
            </Button>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Value</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editVariant.values.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveEditValue(index)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateVariant}
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

export default VariantPage;
