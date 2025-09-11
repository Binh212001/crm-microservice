import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Typography } from "@mui/material";
import { ChangeEventHandler, MouseEventHandler } from "react";
interface UploadImageProps {
  handleImageChange: ChangeEventHandler<HTMLInputElement>;
  removeImage: Function;
  preview?: string | null;
  name: string;
}

export function UploadImage({
  handleImageChange,
  removeImage,
  name,
  preview,
}: UploadImageProps) {
  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 2,
        p: 2,
        textAlign: "center",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Upload Product Image
      </Typography>

      {preview ? (
        <Box>
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "contain",
              marginBottom: 8,
            }}
          />
          <button onClick={() => removeImage()}>
            <DeleteIcon />
          </button>
        </Box>
      ) : (
        <Button
          component="label"
          variant="contained"
          startIcon={<UploadFileIcon />}
        >
          Choose Image
          <input name={name} hidden type="file" onChange={handleImageChange} />
        </Button>
      )}
    </Box>
  );
}
