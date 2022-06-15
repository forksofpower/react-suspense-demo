import { DocumentNode } from 'graphql';
import client from './graphql/client';

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

export class AsyncResource<Q = any> extends BaseResource<Q> {
  constructor(promise: Promise<Q>) {
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

export class GraphqlResource<T> extends BaseResource<T> {
  constructor(query: DocumentNode) {
    super();
    this.promise = client.query({ query, fetchPolicy: 'network-only' }).then(
      ({ data }) => {
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

// class ObservableResource<T> extends BaseResource<T> {
//   observers: Record<string, Function> = [];

//   constructor(promise: Promise<T>) {
//     super();
//     this.promise = promise
//       .then((data: T) => this.onNext(data))
//       .catch((error: any) => this.onError(error));
//   }
//   onNext(data: T) {
//     this.status = ResourceStatus.success;
//     this.data = data;
//     this.observers.forEach(
//       ({ onNext }) => typeof onNext === 'function' && onNext(this.data)
//     );
//   }
//   onError(error: any) {
//     this.status = ResourceStatus.error;
//     this.error = error;
//     this.observers.forEach(
//       ({ onError }) => typeof onError === 'function' && onError(this.error)
//     );
//   }
//   observe(onNext: Function, onError: Function) {
//     const observer = { onError, onNext };
//     this.observers.push(observer);
//     return () => {
//       this.observers = this.observers.filter(
//         (other) => other !== observer
//       );
//     };
//   }
// }
