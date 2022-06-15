import { AsyncResource } from '../resource';

export interface Tag {
  timestamp: number;
  id: number;
  name: string;
}

interface ColrResponse {
  colors: Array<{ timestamp: number; hex: string; id: number; tags: Tag[] }>;
}

type Color = {
  hex: string;
  name: string;
};

export default function colorResource() {
  return new AsyncResource<Color>(
    fetch(
      `https://www.colr.org/json/color/random?something=${Math.floor(
        Math.random() * 10000
      )}`
    )
      .then((res) => res.json())
      .then((res: ColrResponse) => {
        // grab the first color returned and
        const [color] = res.colors;
        // data can be modified in the resource
        return {
          // append 'FF' to convert to rgba with 100% opacity
          hex: '#' + color.hex + 'FF',
          // grab a random tag
          name: color.tags.map((tag) => tag.name)[
            Math.floor(Math.random() * 100) % color.tags.length
          ],
        };
      })
  );
}
