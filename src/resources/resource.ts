enum ResourceStatus {
  pending = 'PENDING',
  success = 'SUCCESS',
  error = 'ERROR',
}

abstract class BaseResource<T> {
  data!: T;
  status = ResourceStatus.pending;
  error: any = undefined;
  promise: Promise<void> | null = null;

  read() {
    switch (this.status) {
      case ResourceStatus.pending:
        throw this.promise;
      case ResourceStatus.error:
        throw this.error;
      case ResourceStatus.success:
        return this.data;
    }
  }
}

export class AsyncResource<T> extends BaseResource<T> {
  constructor(promise: Promise<T>) {
    super();
    this.promise = promise.then(
      (data) => {
        this.status = ResourceStatus.success;
        this.data = data;
      },
      (error) => {
        this.status = ResourceStatus.error;
        this.data = error;
      }
    );
  }
}
