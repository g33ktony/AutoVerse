import React, { useCallback, useEffect, useState } from "react";
import { CarT, ManufacturerT, ModelT } from "../../types";
import axios from "axios";
import { capitalizeString } from "../../helpers";
import { Autocomplete, Button, FormControl, TextField } from "@mui/material";

interface PropsT {
  fetchCars: () => void;
  setCars: (data: CarT[]) => void;
}

const API_URL = "http://localhost:8080/cars";
const MANUFACTURERS_URL =
  "https://private-anon-e2e1790a4a-carsapi1.apiary-mock.com/manufacturers";
const MODELS_URL =
  "https://private-anon-e2e1790a4a-carsapi1.apiary-mock.com/cars";

const NewCarForm = ({ fetchCars, setCars }: PropsT) => {
  const [selectedManufacturer, setManufacturer] =
    useState<ManufacturerT | null>(null);
  const [manufacturers, setManufacturers] = useState<ManufacturerT[]>([]);
  const [models, setModels] = useState([]);
  const [model, setModel] = useState<ModelT | null | undefined>();
  const [year, setYear] = useState("");

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchModels = useCallback(async () => {
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
  }, [selectedManufacturer]);

  useEffect(() => {
    setModel(null);
    fetchModels();
    if (selectedManufacturer === null) {
      setModel(null);
    }
  }, [selectedManufacturer, fetchModels]);

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get(MANUFACTURERS_URL);
      const mappedManufacturers = response.data.map((man: ManufacturerT) => ({
        label: capitalizeString(man.name),
        img_url: man.img_url,
        id: man.id,
      }));
      setManufacturers(mappedManufacturers);
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

  const handleChangeManufacturer = (
    event: any,
    newValue: string | ManufacturerT | null
  ) => {
    if (typeof newValue === "string") {
      setManufacturer(null);
    } else if (newValue !== null) {
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
      make_img_url: selectedManufacturer?.img_url,
      model: model?.label,
      year: Number(year),
    });
    fetchCars();
  };
  return (
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
        onChange={(event) => setYear(event.target.value)}
        value={year}
      />
      <Button onClick={onSubmit} variant="outlined">
        Submit
      </Button>
    </FormControl>
  );
};

export default NewCarForm;
