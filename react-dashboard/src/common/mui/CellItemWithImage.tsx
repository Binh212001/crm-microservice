import { Avatar, Box, Stack, Typography, TableCell } from "@mui/material";
interface CellItemWithImageProps {
  image?: string | null;
  label: string;
  description?: string | null;
}
export function CellItemWithImage({
  image,
  label,
  description,
}: CellItemWithImageProps) {
  return (
    <TableCell>
      <Stack direction="row" gap={2} alignItems="center">
        {/* Avatar hiển thị ảnh (nếu có) */}
        {image && <Avatar variant="rounded" src={image} alt={label} />}

        <Box>
          {/* Hiển thị label */}
          <Typography variant="body1">{label}</Typography>

          {/* Hiển thị mô tả */}
          {description && (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
        </Box>
      </Stack>
    </TableCell>
  );
}
