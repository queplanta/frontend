import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@material-ui/core";
import banner1 from "../assets/banners/shop/banner1.jpg";
import banner2 from "../assets/banners/shop/banner2.jpg";
import banner3 from "../assets/banners/shop/banner3.jpg";
import banner4 from "../assets/banners/shop/banner4.jpg";
import banner5 from "../assets/banners/shop/banner5.jpg";

function VisitShop(props) {
  const Images = [banner1, banner2, banner3, banner4, banner5];
  const randomNum = Math.floor(Math.random() * Images.length);

  return (
    <Card>
      <CardActionArea
        to="https://loja.queplanta.com/"
        underline="none"
        component={Link}
      >
        <CardMedia
          component="img"
          height="300"
          image={Images[randomNum]}
          title="Loja Que Planta"
        />
        <CardContent>
          <Typography component="h5" variant="h5">
            Loja Que Planta
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Something here
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default VisitShop;
