import { Button, Container, Stack, TextField } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("Hello");
  const history = useHistory();

  //HANDLERS
  const handleUrlChange = () => {
    history.push("/menu");
  };
  return (
    <div style={{ flex: 1, marginTop: "50px" }}>
      <Container maxWidth="sm">
        <Stack>
          <div className="home-page-main">
            <div className="welcome">
              <h1>The best pizza.</h1>
              <h1>Straight out of the oven, straight to you.</h1>
            </div>

            <div className="homePage-input-container">
              <p>👋 Welcome! Please start by telling us your name:</p>
              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue={inputValue}
                variant="filled"
                placeholder="Your full name"
                sx={{
                  "& .MuiFilledInput-underline:before": {
                    borderBottomColor: "orange", // 🔴 default (normal state)
                  },
                  "& .MuiFilledInput-underline:hover:before": {
                    borderBottomColor: "orange", // 🟠 hover state
                  },
                  "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "orange", // 🟢 focus state
                  },
                }}
              />
            </div>
            {inputValue.length !== 0 ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(255, 191, 0)",
                  color: "black",
                  fontWeight: 500,
                  marginTop: "30px",
                  borderRadius: "19px",
                }}
                onClick={handleUrlChange}
              >
                CONTINUE ORDERING, {inputValue}
              </Button>
            ) : null}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
