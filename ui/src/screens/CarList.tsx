import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Stack, Typography } from "@mui/material";
import CarsList from "../components/CarsList";
import { CarT } from "../types";
import NewCarForm from "../components/NewCarForm";

const API_URL = "http://localhost:8080/cars";

const CarList = (): JSX.Element => {
  const [cars, setCars] = useState<CarT[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get<CarT[]>(API_URL);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <Stack display="flex" justifyContent="center" alignContent="center">
      <Grid
        display="flex"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Typography variant="h4">Car List</Typography>
      </Grid>
      <Grid
        margin={5}
        columnGap={8}
        justifyContent="center"
        display="flex"
        alignItems="space-between"
      >
        <Stack display="flex" justifyContent="center">
          <CarsList cars={cars} />
        </Stack>
        <Grid display="flex" justifyContent="center">
          <NewCarForm fetchCars={fetchCars} setCars={setCars} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CarList;
