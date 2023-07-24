export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

let cars: Car[] = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2020 },
  { id: 2, make: "Honda", model: "Accord", year: 2019 },
  { id: 3, make: "Ford", model: "F-150", year: 2019 },
  { id: 4, make: "Ford", model: "Ka", year: 2019 },
  { id: 5, make: "Volkswagen", model: "Gol", year: 2019 },
  { id: 6, make: "Kia", model: "Rio", year: 2019 },
  { id: 7, make: "Jeep", model: "Wrangler", year: 2019 },
];

export const getAllCars = (): Car[] => cars;

export const getCarById = (id: number): Car | undefined =>
  cars.find((car: Car) => car.id === id);

export const addCar = (car: Car): Car => {
  car.id = cars.length + 1;
  cars.push(car);
  return car;
};
