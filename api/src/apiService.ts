import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Car, getAllCars, addCar, getCarById } from "./dataService";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/cars", (req: Request, res: Response) => {
  const cars: Car[] = getAllCars();
  res.json(cars);
});

app.post("/cars", (req: Request, res: Response) => {
  const newCar: Car = req.body;
  const car: Car = addCar(newCar);
  res.status(201).json(car);
});

app.get("/cars/:id", (req: Request, res: Response) => {
  const carId: number = parseInt(req.params.id, 10);
  const car: Car | undefined = getCarById(carId);

  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

app.listen(PORT, () => {
  console.log(`API Service running on port ${PORT}`);
});
