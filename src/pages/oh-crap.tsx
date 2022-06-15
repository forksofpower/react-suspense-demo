import { ErrorBoundary } from 'react-error-boundary';
import { AsyncResource } from '../resource';

function dummyResource() {
  return new AsyncResource<{ test: true }>(
    new Promise((_, reject) => {
      setTimeout(() => reject('Something crappy happened!'));
    })
  );
}
const resource = dummyResource();

const ErrorFallback = (_error: any) => {
  return (
    <div role="alert">
      <p>Something went wrong!</p>
    </div>
  );
};

const OhCrapContent = () => {
  const dummy = resource.read();

  return <div>This will always error! {dummy.test}</div>;
};

const OhCrap = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <OhCrapContent />
  </ErrorBoundary>
);

export default OhCrap;
