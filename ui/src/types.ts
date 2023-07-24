export interface CarT {
  id: number;
  make: string | undefined | null;
  make_img_url: string | undefined;
  model: string | undefined | null;
  year: number;
}

export interface ManufacturerT {
  label?: string;
  num_model: number;
  img_url: string;
  max_car_id: number;
  id: number;
  name: string;
}

export interface ModelT {
  label: string | null | undefined;
}
