import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { CarT } from "../types";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/cars";

const CarDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarT>();

  const fetchCarDetail = async () => {
    try {
      if (!id) {
        return;
      }
      const response = await axios.get<CarT>(`${API_URL}/${id}`);
      setCar(response.data);
    } catch (error) {
      console.error("Error fetching car detail:", error);
    }
  };

  useEffect(() => {
    fetchCarDetail();
  }, []);

  return (
    <div>
      <Typography variant="h4">Car Detail</Typography>
      {car ? (
        <>
          <p>Id: {car?.id}</p>
          {<p>Make: {car?.make}</p>}
          <p>Model: {car?.model}</p>
          <p>Year: {car?.year}</p>
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
      <Link to="/">Back to Car List</Link>
    </div>
  );
};

export default CarDetail;
