import * as React from "react";
import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  return (
    <Box
      sx={{
        marginTop: "100px",
        maxWidth: "800px",
        marginX: "auto",
        padding: 2,
      }}
    >
      <img
        src="/pizzaImages/faq-relax.jpg"
        alt=""
        style={{
          display: "block",
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.4s ease, filter 0.4s ease",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.filter = "brightness(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "brightness(1)";
        }}
      />
      {[1, 2].map((item) => (
        <Accordion
          key={item}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            "&:before": { display: "none" },
            backgroundColor: "#fefefe",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#1976d2" }} />}
            aria-controls={`panel${item}-content`}
            id={`panel${item}-header`}
            sx={{
              fontWeight: 600,
              color: "#333",
              "& .MuiTypography-root": {
                fontSize: "1.1rem",
                fontWeight: "500",
              },
            }}
          >
            <Typography>Accordion {item}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ color: "#555", fontSize: "0.95rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Accordion with actions */}
      <Accordion
        defaultExpanded
        sx={{
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          "&:before": { display: "none" },
          backgroundColor: "#fefefe",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#1976d2" }} />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            fontWeight: 600,
            color: "#333",
            "& .MuiTypography-root": {
              fontSize: "1.1rem",
              fontWeight: "500",
            },
          }}
        >
          <Typography>Accordion Actions</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#555", fontSize: "0.95rem" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button color="error">Cancel</Button>
          <Button variant="contained" color="primary">
            Agree
          </Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
}
