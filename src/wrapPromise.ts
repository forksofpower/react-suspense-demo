enum Status {
  pending = 'PENDING',
  success = 'SUCCESS',
  error = 'ERROR',
}

export const wrapPromise = <T>(promise: Promise<T>) => {
  let status: Status = Status.pending;
  let result: T;

  let suspender = promise.then(
    (res) => {
      status = Status.success;
      result = res;
    },
    (err) => {
      status = Status.error;
      result = err;
    }
  );
  return {
    read() {
      switch (status) {
        case Status.pending:
          throw suspender;
        case Status.error:
          throw result;
        case Status.success:
          return result;
      }
    },
  };
};
