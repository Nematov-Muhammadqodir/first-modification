import { Button, Container, Stack } from "@mui/material";

export default function Menu() {
  return (
    <div style={{ flex: 1 }}>
      <Container maxWidth="sm">
        <Stack>
          <div className="menu-item-container">
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <h3>Margherita</h3>
              <p>tomato, mozzarella, basil</p>
              <div>
                <p>$12.00</p>
                <Button>-</Button>
                <Button>+</Button>
                <Button>DELETE</Button>
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
