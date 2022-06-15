import colorResource from '../resources/colorResource';
const resource = colorResource();

const RandomColor = () => {
  const color = resource.read();
  console.log(color.hex);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: 100,
          height: 100,
          marginRight: 16,
          backgroundColor: color.hex,
        }}
      ></div>
      <h1>Color name: {color.name}</h1>
    </div>
  );
};

export default RandomColor;
