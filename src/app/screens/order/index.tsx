import { Button, Container, Stack, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function Order() {
  return (
    <div
      style={{
        flex: 1,
        marginTop: "80px",
      }}
      className="order-main-container"
    >
      <img
        src="/pizzaImages/11039274.png"
        alt="Pizza Background"
        className="responsive-bg-image"
      />
      <Container>
        <Stack className="order-container">
          <h2 style={{ textAlign: "center" }}>Ready to order? Let's go!</h2>
          <Stack gap={"20px"}>
            <Stack alignItems={"center"}>
              <label htmlFor="outlined-basic">First Name</label>{" "}
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Your name"
                variant="outlined"
                sx={{
                  width: "80%",
                }}
              />
            </Stack>
            <Stack alignItems={"center"}>
              <label htmlFor="outlined-basic2">Phone number</label>{" "}
              <TextField
                required
                type="text"
                id="outlined-basic2"
                label="Your phone number"
                variant="outlined"
                sx={{
                  width: "80%",
                }}
              />
            </Stack>
            <Stack alignItems={"center"}>
              <label htmlFor="outlined-basic3">Address</label>{" "}
              <TextField
                required
                type="text"
                id="outlined-basic3"
                label="Your address"
                variant="outlined"
                sx={{
                  width: "80%",
                }}
              />
            </Stack>
          </Stack>
          <Button sx={{ marginTop: "40px" }} variant="contained">
            Order now
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
