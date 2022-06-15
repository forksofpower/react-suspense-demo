import { ErrorBoundary } from 'react-error-boundary';
import { AsyncResource } from '../resource';

function dummyResource() {
  return new AsyncResource<{ test: true }>(
    new Promise((_, reject) => {
      setTimeout(() => reject('Something crappy happened!'), 2000);
    })
  );
}
const resource = dummyResource();

const ErrorFallback = (_error: any) => {
  return (
    <div role="alert">
      <h1 style={{ color: 'red' }}>Something went wrong!</h1>
    </div>
  );
};

const OhCrapContent = () => {
  const dummy = resource.read();

  return <div>A user should never see this text. {dummy.test}</div>;
};

const OhCrap = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <OhCrapContent />
  </ErrorBoundary>
);

export default OhCrap;
