import { DocumentNode } from 'graphql';
import client from '../graphql/client';

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
