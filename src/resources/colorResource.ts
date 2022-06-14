import { AsyncResource } from './resource';

type Color = {
  id: number;
  uid: string;
  hex_value: string;
  color_name: string;
  hsl_value: number[];
  hsla_value: number[];
};

export default function colorResource() {
  return new AsyncResource<Color>(
    fetch('https://random-data-api.com/api/color/random_color').then((res) =>
      res.json()
    )
  );
}
