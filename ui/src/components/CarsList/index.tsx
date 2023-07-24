import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CarT } from "../../types";

interface PropsT {
  cars: CarT[];
}

const CarsList = ({ cars }: PropsT) => {
  return (
    <>
      {cars.length
        ? cars.map((car: CarT) => (
            <div key={car.id}>
              <Link to={`/cars/${car.id}`}>
                <Typography>{`${car.make} ${car.model} (${car.year})`}</Typography>
              </Link>
            </div>
          ))
        : null}
    </>
  );
};

export default CarsList;
