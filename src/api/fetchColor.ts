import { wrapPromise } from '../wrapPromise';

type Color = {
  id: number;
  uid: string;
  hex_value: string;
  color_name: string;
  hsl_value: number[];
  hsla_value: number[];
};
const fetchColorData = async (): Promise<Color> => {
  return fetch('https://random-data-api.com/api/color/random_color')
    .then((res) => res.json())
    .then((res) => res);
};

export const fetchColor = () => {
  return {
    color: wrapPromise(fetchColorData()),
  };
};
