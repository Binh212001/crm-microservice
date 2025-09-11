import {
  Autocomplete,
  Chip,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export interface Variant {
  [key: string]: string[];
}

export function DynamicAttributeForm({
  variant,
  setVariant,
}: {
  variant: Variant;
  setVariant: Function;
}) {
  const [select, setSelect] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  return (
    <Grid container columns={12} gap={2} mb={3}>
      <Grid size={{ sm: 5 }}>
        <Typography>Attribute</Typography>
        <Select
          color="tertiary"
          value={select}
          onChange={(e: SelectChangeEvent<string>) => {
            setSelect(e.target.value);
            setData(variant[e.target.value]);
          }}
          fullWidth
        >
          {Object.keys(variant).map((key, index) => {
            return (
              <MenuItem key={index} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      <Grid size={{ sm: 5 }}>
        <Typography>Value</Typography>
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          color="tertiary"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setVariant((p: { [key: string]: string[] }) => {
              return {
                ...p,
                [select]: newValue,
              };
            });
          }}
          options={data}
          getOptionLabel={(option) => option}
          renderValue={(values, getItemProps) =>
            values.map((option, index) => {
              const { key, ...itemProps } = getItemProps({ index });
              return <Chip key={key} label={option} {...itemProps} />;
            })
          }
          renderInput={(params) => (
            <TextField color="tertiary" {...params} placeholder="Favorites" />
          )}
        />
      </Grid>
    </Grid>
  );
}
