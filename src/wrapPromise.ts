enum FetchStatus {
  pending = 'PENDING',
  success = 'SUCCESS',
  error = 'ERROR',
}

export const wrapPromise = <T>(promise: Promise<T>) => {
  let status: FetchStatus = FetchStatus.pending;
  let result: T;

  let suspender = promise.then(
    (res) => {
      status = FetchStatus.success;
      result = res;
    },
    (err) => {
      status = FetchStatus.error;
      result = err;
    }
  );
  return {
    read() {
      switch (status) {
        case FetchStatus.pending:
          throw suspender;
        case FetchStatus.error:
          throw result;
        case FetchStatus.success:
          return result;
      }
    },
  };
};
