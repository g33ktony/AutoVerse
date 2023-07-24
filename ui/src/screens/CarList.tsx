import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CarT, ManufacturerT, ModelT } from "../types";
import { capitalizeString } from "../helpers";

const API_URL = "http://localhost:8080/cars";
const MANUFACTURERS_URL =
  "https://private-anon-e2e1790a4a-carsapi1.apiary-mock.com/manufacturers";
const MODELS_URL =
  "https://private-anon-e2e1790a4a-carsapi1.apiary-mock.com/cars";

const CarList = (): JSX.Element => {
  const [cars, setCars] = useState<CarT[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerT[]>([]);
  const [selectedManufacturer, setManufacturer] =
    useState<ManufacturerT | null>(null);
  const [models, setModels] = useState([]);
  const [model, setModel] = useState<ModelT | null | undefined>();

  useEffect(() => {
    fetchCars();
    fetchManufacturers();
  }, []);

  useEffect(() => {
    setModel(null);
    fetchModels();
  }, [selectedManufacturer]);

  const fetchCars = async () => {
    try {
      const response = await axios.get<CarT[]>(API_URL);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const addCar = async (body: CarT) => {
    try {
      const response = await axios.post<CarT[]>(API_URL, body);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await axios.get(MODELS_URL);
      const filteredModels = selectedManufacturer
        ? response.data
            .filter(
              (model: CarT) =>
                model.make === selectedManufacturer.label?.toLocaleLowerCase()
            )
            .map((car: CarT) => ({
              label: capitalizeString(car.model ?? ""),
              id: car.id,
            }))
        : [];
      setModels(filteredModels);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get(MANUFACTURERS_URL);
      const mappedManufacturers = response.data.map((man: ManufacturerT) => ({
        label: capitalizeString(man.name),
        id: man.id,
      }));
      setManufacturers(mappedManufacturers);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleChangeManufacturer = (
    event: any,
    newValue: string | ManufacturerT | null
  ) => {
    if (typeof newValue === "string") {
      // If 'newValue' is a string, it means the user entered a custom newValue (freeSolo mode).
      setManufacturer(null); // Set the state to null as there is no valid selection.
    } else if (newValue !== null) {
      // If 'newValue' is not null, it means the user selected a manufacturer.
      setManufacturer(newValue);
    }
  };

  const handleChangeModel = (event: any, newValue: string | null) => {
    if (typeof newValue === "string") {
      setModel(null);
    } else if (newValue !== null) {
      setModel(newValue);
    }
  };

  const onSubmit = () => {
    addCar({
      id: 3434,
      make: selectedManufacturer?.label,
      model: model?.label,
      year: 2006,
    });
    fetchCars();
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
          {cars.length
            ? cars.map((car) => (
                <div key={car.id}>
                  <Link to={`/cars/${car.id}`}>
                    <Typography>{`${car.make} ${car.model} (${car.year})`}</Typography>
                  </Link>
                </div>
              ))
            : null}
        </Stack>
        <Grid display="flex" justifyContent="center">
          <FormControl sx={{ width: "35ch" }}>
            <Autocomplete
              id="manufacturer"
              freeSolo
              disablePortal
              onChange={handleChangeManufacturer}
              options={manufacturers}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-basic"
                  label="Manufacturer"
                  variant="standard"
                  value={selectedManufacturer}
                  style={{ margin: 10 }}
                />
              )}
            />
            <Autocomplete
              id="model"
              disabled={!selectedManufacturer}
              disablePortal
              options={models}
              onChange={handleChangeModel}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={!selectedManufacturer}
                  id="outlined-basic"
                  label="Model"
                  variant="standard"
                  style={{ margin: 10 }}
                />
              )}
            />

            <TextField
              id="outlined-basic"
              label="Year"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              variant="standard"
              style={{ margin: 10 }}
            />
            <Button onClick={onSubmit} variant="outlined">
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CarList;
