import {
  Box,
  Button,
  IconButton,
  Paper,
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #D6DDF6",
  fontWeight: 900,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "24px",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "55px",
  fontWeight: 900,
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "18px",
  borderRadius: "4px",
  background: "#9747FF",
  color: "white",
  padding: "0 16px",
  height: 46,
  "&:hover": {
    backgroundColor: "#9747FF",
  },
  "&:disabled": {
    backgroundColor: "#F5F5F5",
  },
}));

export const OutlinedActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "18px",
  borderRadius: "4px",
  border: "1px solid #9747FF",
  color: "#9747FF",
  padding: "0px 16px",
  height: 46,
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "#f3e9ff",
    borderColor: "#7c3ace",
  },
}));


export const DeleteButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "18px",
  borderRadius: "4px",
  background: "#C60000",
  color: "white",
  padding: "0 16px",
  height: 46,
  "&:hover": {
    backgroundColor: "#C60000",
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "18px",
  borderRadius: "4px",
  background: "white",
  color: "#9747FF",
  border: "1px solid #9747FF",
  padding: "0 16px",
  height: 46,
  "&:hover": {
    backgroundColor: "white",
  },
}));

export const Content = styled(Box)(({ theme }) => ({
  paddingTop: "24px",
}));

export const Search = styled(Paper)(({ theme }) => ({
  border: "1px solid #E3E3E3",
  boxShadow: "none",
  padding: "2px 12px",
  display: "flex",
  alignItems: "center",
  width: 288,
  height: 41,
}));

export const Filters = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
  marginTop: 24,
  justifyContent: "space-between",
  alignItems: "flex-end",
}));

export const StatusChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== "estado",
})<{ estado: string }>(({ theme, estado }) => ({
  background: estado === "Vigente" ? "#E0F3DB" : "#FAE1E1",
  borderRadius: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 105,
  height: 28,
  color: estado === "Vigente" ? "#298B10" : "#713B3B",
  fontWeight: 700,
  fontSize: 15,
}));

export const AplicativosTableHeader = styled(TableHead)(({ theme }) => ({
  background: "#F3F1FF",
  height: 46,
}));

export const AplicativosTableHeaderLabel = styled(TableSortLabel)(
  ({ theme }) => ({
    fontSize: 20,
    fontWeight: 700,
    border: "1px solid #D6DDF6",
    padding: "0 10px",
  })
);

export const AplicativosTableRow = styled(TableRow)(({ theme }) => ({
  height: 46,
  "& .actionButton": {
    opacity: 0,
  },
  "&:hover": {
    ".actionButton": {
      opacity: 1,
    },
    backgroundColor: "#F3F1FF",
  },
}));

export const AplicativoEditButton = styled(IconButton)(({ theme }) => ({
  minWidth: 24,
  width: 24,
  height: 24,
  color: "black",
  marginRight: 12,
}));

export const AplicativoDeleteButton = styled(IconButton)(({ theme }) => ({
  minWidth: 24,
  width: 24,
  height: 24,
  color: "#C60000",
}));

export const AplicativosTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #D6DDF6",
  fontSize: 15,
  fontWeight: 400,
  padding: "0 10px",
}));

export const AplicativosActionTableCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const AplicativosModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: "white",
  padding: 24,
  border: "none",
  borderRadius: "4px",
}));

export const AplicativosModalHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
}));

export const AplicativosModalCloseButton = styled(IconButton)(({ theme }) => ({
  minWidth: 24,
  width: 24,
  height: 24,
  color: "black",
}));

export const AplicativosModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 700,
}));

export const AplicativosModalInput = styled(TextField)(({ theme }) => ({
  marginTop: "48px",
}));

export const AplicativosModalFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "48px",
  color: "#C60000",
}));

export const AplicativosUpdateDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "48px",
  background: "#F5F5F5",
  padding: 8,
  fontStyle: "italic",
}));