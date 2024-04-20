import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const GlassButton = styled(Button)(
  ({ theme }) => `
  font-family: "Benzin", sans-serif;
  font-weight: normal;
  font-size: 0.875rem;
  backdrop-filter: blur(100px);
  background-color: rgba(255, 255, 255, 0.08);
  padding: 8px 16px;
  border-radius: 9px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.5);
  `,
);

export default GlassButton;
