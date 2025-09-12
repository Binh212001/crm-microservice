import { AddOutlined, SaveOutlined, DeleteOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import TabPanel from '../../common/mui/tabpanel';
import { StyleBox } from '../../common/styleBox';
import { UploadImage } from '../../common/uploadFile';
import { useGetCategoriesQuery } from '../../service/categoryApi';
import {
  CreateProductReq,
  useCreateProductMutation,
  ValueRes,
} from '../../service/productApi';
import { useGetVariantsQuery } from '../../service/variantApi';
import { useUploadSingleMutation } from '../../service/uploadApi';

function AddProduct() {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const { data: categories } = useGetCategoriesQuery({
    page: 1,
    limit: 1000,
  });
  const { data: variants } = useGetVariantsQuery({
    page: 1,
    limit: 1000,
  });
  const [createProduct] = useCreateProductMutation();
  const [uploadSingle] = useUploadSingleMutation();
  const [valueIds, setValueIds] = useState<ValueRes[]>([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState<number | ''>(
    '',
  );
  const [selectedValueId, setSelectedValueId] = useState<number | ''>('');
  const [addedVariants, setAddedVariants] = useState<
    Array<{
      attributeId: number;
      attributeName: string;
      valueId: number;
      valueName: string;
    }>
  >([]);

  const [productInfo, setProductInfo] = useState<CreateProductReq>({
    name: '',
    description: '',
    sku: '',
    barcode: '',
    isSales: false,
    isPurchase: false,
    isExpenses: false,
    isPointOfSale: false,
    isSubscriptions: false,
    isRental: false,
    productType: '',
    quantityOnHand: 0,
    salesPrice: 0,
    soldQuantity: 0,
    categoryId: 0,
    images: {
      type: '',
      size: 0,
      name: '',
      extension: '',
      path: '',
    },
    variants: [],
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };
  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSave = async () => {
    try {
      let imageRes = null;

      // Only upload image if one is selected
      if (image) {
        imageRes = await uploadSingle(image as File).unwrap();
      }

      const productRes = await createProduct({
        ...productInfo,
        ...(imageRes && { images: imageRes }),
        variants: addedVariants,
      }).unwrap();

      console.log(productRes);
      alert('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };
  const handleSetValue = (value: number) => {
    setSelectedAttributeId(value);
    const variant = variants?.data.find((variant: any) => variant.id === value);
    setValueIds(variant?.values || []);
    setSelectedValueId(''); // Reset selected value when attribute changes
  };

  const handleAddVariant = () => {
    if (selectedAttributeId && selectedValueId) {
      const selectedAttribute = variants?.data.find(
        (variant: any) => variant.id === selectedAttributeId,
      );
      const selectedValue = valueIds.find(
        (value: any) => value.id === selectedValueId,
      );

      if (selectedAttribute && selectedValue) {
        // Check if this combination already exists
        const exists = addedVariants.some(
          (variant) =>
            variant.attributeId === selectedAttributeId &&
            variant.valueId === selectedValueId,
        );

        if (!exists) {
          const newVariant = {
            attributeId: selectedAttributeId,
            attributeName: selectedAttribute.name,
            valueId: selectedValueId,
            valueName: selectedValue.name,
          };

          setAddedVariants([...addedVariants, newVariant]);

          // Reset form
          setSelectedAttributeId('');
          setSelectedValueId('');
          setValueIds([]);
        }
      }
    }
  };

  const handleRemoveVariant = (index: number) => {
    setAddedVariants(addedVariants.filter((_, i) => i !== index));
  };

  return (
    <StyleBox>
      <Typography>Add Product</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveOutlined />}
        onClick={handleSave}
      >
        Save
      </Button>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Product Info" />
          <Tab label=" Variants" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        {/* form */}
        <Grid container spacing={2}>
          <Grid size={{ sm: 6 }}>
            <TextField
              label="Name"
              name="name"
              color="tertiary"
              variant="standard"
              fullWidth
              margin="normal"
              value={productInfo.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
            />
            {/* image  upload*/}
          </Grid>
          <Grid size={{ sm: 6 }}>
            <TextField
              label="SKU"
              name="sku"
              color="tertiary"
              variant="standard"
              fullWidth
              margin="normal"
              value={productInfo.sku}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductInfo({ ...productInfo, sku: e.target.value })
              }
            />
          </Grid>
          <Grid size={{ sm: 6 }}>
            <TextField
              label="Barcode"
              name="barcode"
              color="tertiary"
              variant="standard"
              fullWidth
              margin="normal"
              value={productInfo.barcode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductInfo({ ...productInfo, barcode: e.target.value })
              }
            />
          </Grid>
          <Grid size={{ sm: 6 }}>
            <TextField
              label="Sales Price"
              name="salesPrice"
              color="tertiary"
              variant="standard"
              value={productInfo.salesPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductInfo({
                  ...productInfo,
                  salesPrice: Number(e.target.value),
                })
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid size={{ sm: 6 }}>
            <TextField
              label="Quantity on Hand"
              name="quantityOnHand"
              color="tertiary"
              variant="standard"
              value={productInfo.quantityOnHand}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductInfo({
                  ...productInfo,
                  quantityOnHand: Number(e.target.value),
                })
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid size={{ sm: 6 }}>
            <TextField
              label="Sold Quantity"
              name="soldQuantity"
              color="tertiary"
              variant="standard"
              fullWidth
              margin="normal"
              value={productInfo.soldQuantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductInfo({
                  ...productInfo,
                  soldQuantity: Number(e.target.value),
                })
              }
            />
          </Grid>

          <Grid size={{ sm: 6 }}>
            <label>Category</label>
            <Select
              label="Category"
              name="categoryId"
              color="tertiary"
              variant="standard"
              fullWidth
              value={productInfo.categoryId}
              onChange={(event: any) =>
                setProductInfo({
                  ...productInfo,
                  categoryId: event.target.value,
                })
              }
            >
              {categories?.data.map((category: any) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {/* product type */}
          <Grid size={{ sm: 6 }}>
            <label>Product Type</label>
            <Select
              name="productType"
              color="tertiary"
              variant="standard"
              label="Product Type"
              fullWidth
              value={productInfo.productType}
              onChange={(event: any) =>
                setProductInfo({
                  ...productInfo,
                  productType: event.target.value,
                })
              }
            >
              <MenuItem value="GOODS">Goods</MenuItem>
              <MenuItem value="SERVICE">Service</MenuItem>
              <MenuItem value="COMBO">Combo</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ sm: 12 }}>
            {/* checkbox group */}
            <FormControlLabel
              control={<Checkbox checked={productInfo.isSales} />}
              label="Sales"
              onChange={(event: any) =>
                setProductInfo({
                  ...productInfo,
                  isSales: event.target.checked,
                })
              }
            />
            <FormControlLabel
              control={<Checkbox checked={productInfo.isPurchase} />}
              label="Purchase"
              onChange={(event: any) =>
                setProductInfo({
                  ...productInfo,
                  isPurchase: event.target.checked,
                })
              }
            />
            <FormControlLabel
              control={<Checkbox checked={productInfo.isExpenses} />}
              label="Expenses"
              onChange={(event: any) =>
                setProductInfo({
                  ...productInfo,
                  isExpenses: event.target.checked,
                })
              }
            />
            <FormControlLabel
              control={<Checkbox checked={productInfo.isPointOfSale} />}
              label="Point of Sale"
              onChange={(event: any) =>
                setProductInfo({
                  ...productInfo,
                  isPointOfSale: event.target.checked,
                })
              }
            />
            <FormControlLabel
              control={<Checkbox checked={productInfo.isSubscriptions} />}
              label="Subscriptions"
              onChange={(event: any) =>
                setProductInfo({
                  ...productInfo,
                  isSubscriptions: event.target.checked,
                })
              }
            />
            <FormControlLabel
              control={<Checkbox checked={productInfo.isRental} />}
              label="Rental"
              onChange={(event: any) =>
                setProductInfo({
                  ...productInfo,
                  isRental: event.target.checked,
                })
              }
            />
          </Grid>
          <Grid size={{ sm: 12 }}>
            <TextField
              label="Description"
              name="description"
              color="tertiary"
              variant="standard"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={productInfo.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductInfo({ ...productInfo, description: e.target.value })
              }
            />
          </Grid>
          {/* upload image */}
          <Grid size={{ sm: 12 }}>
            <UploadImage
              handleImageChange={handleImageChange}
              removeImage={removeImage}
              name="image"
              preview={imagePreview}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {/* form */}
        <Grid container spacing={2}>
          <Grid size={{ sm: 12 }}>
            <Typography>Variants</Typography>
          </Grid>
          <Grid size={{ sm: 12 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <Box sx={{ flex: 1 }}>
                <label>Attribute</label>
                <Select
                  label="Attribute"
                  name="attributeId"
                  color="tertiary"
                  variant="standard"
                  fullWidth
                  value={selectedAttributeId}
                  onChange={(event: any) =>
                    handleSetValue(event.target.value as number)
                  }
                >
                  {variants?.data.map((variant: any) => (
                    <MenuItem key={variant.id} value={variant.id}>
                      {variant.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ flex: 1 }}>
                <label>Value</label>
                <Select
                  label="Value"
                  name="valueId"
                  color="tertiary"
                  variant="standard"
                  fullWidth
                  value={selectedValueId}
                  onChange={(event: any) =>
                    setSelectedValueId(event.target.value as number)
                  }
                >
                  {valueIds.map((value: any) => (
                    <MenuItem key={value.id} value={value.id}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddOutlined />}
                  onClick={handleAddVariant}
                  disabled={!selectedAttributeId || !selectedValueId}
                >
                  Add Variant
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ sm: 12 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addedVariants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No variants added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  addedVariants.map((variant, index) => (
                    <TableRow key={`${variant.attributeId}-${variant.valueId}`}>
                      <TableCell>{variant.attributeName}</TableCell>
                      <TableCell>{variant.valueName}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteOutlined />}
                          onClick={() => handleRemoveVariant(index)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        {/* table */}
      </TabPanel>
    </StyleBox>
  );
}

export default AddProduct;
