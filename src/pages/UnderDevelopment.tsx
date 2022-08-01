import { Container, Stack, Typography } from "@mui/material";
import React from "react";

export default function UnderDevelopment(props: any) {
  return (
    <Container>
      <Stack alignItems="center" justifyContent="center" direction="column">
        <Typography variant="h2">Under development.</Typography>
      </Stack>
    </Container>
  );
}
