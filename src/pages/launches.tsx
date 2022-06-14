import launchResource from '../resources/launchResource';
const resource = launchResource();

const Launches = () => {
  const launches = resource.read();
  return <pre>{JSON.stringify(launches, null, 2)}</pre>;
};

export default Launches;
