import React from "react";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack direction="row" spacing={2}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    style={{ background: "#000f00" }}
                    sx={{ height: 140 }}
                    image=""
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Temperature
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      La temperatura es una magnitud física escalar que está
                      relacionada con la energía interna de un sistema
                      termodinámico, concretamente con la energía cinética media
                      de sus partículas, referida al movimiento de éstas. Es una
                      propiedad intrínseca, ya que no depende de la cantidad de
                      materia que tenga el cuerpo.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    style={{ background: "#000fff" }}
                    sx={{ height: 140 }}
                    image=""
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
