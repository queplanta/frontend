import React, { useEffect, useState } from "react";
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

const images = [banner1, banner2, banner3, banner4, banner5];

function VisitShop(props) {
  const [image, setImage] = useState(banner1);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * images.length);
    setImage(images[randomNum]);
  }, []);

  if (!image) {
    return null;
  }

  return (
    <Card>
      <CardActionArea
        href="https://loja.queplanta.com/"
        target="_blank"
        underline="none"
        component={Link}
      >
        <CardMedia
          component="img"
          height="300"
          image={image}
          title="Loja Que Planta"
        />
        <CardContent>
          <Typography component="h5" variant="h5">
            Loja Que Planta
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Ajude-nos a manter esse projeto vivo.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default VisitShop;
