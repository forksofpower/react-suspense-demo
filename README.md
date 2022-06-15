# wtf is React Suspense

Three approaches to data fetching 1. Fetch-On-Render
ex: useEffect 2. Fetch-Then-Render
ex: 3. Render-As-You-Fetch
ex:

React concurrent features (formerly Concurrent Mode)

- `<Suspense>`
- `React.lazy`
- `startTransition`
- `useTransition`
- `useDeferredValue`

#### React Suspense

> Error Boundaries catch errors, Suspense Boundaries catch promises

# ADD A BASIC ERROR BOUNDARY EXAMPLE WITH SUSPENSE TO SHOW THEY ARE COMPLIMENTARY

**`<Suspense>` & `React.lazy`** can be used in tandem to lazy load typescript modules.

```tsx
import { Suspense, lazy } from 'react';

const UserProfile = lazy(() => import('./components/user-profile'));

const App = () => {
  return (
    <Suspense fallback={<div>loading user profile...</div>}>
      <UserProfile />
    </Suspense>
  );
};
```

**Basic Suspense Resource**

A Suspense compatible resource needs to return an object with a `read()` method. Calling this method will either throw a promise, error, or return the resulting data.

```ts
// src/wrap-promise.ts
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
```

```ts
// color fetch handler
const fetchColor = () => {
  return fetch('https://www.colr.org/json/color/random')
    .then((res) => res.json())
    .then((res: ColrResponse) => {
      // grab the first color returned
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
    });
};

export const fetchColorData = wrapPromise(fetchColor());
```

**Class Based Suspense Resource**

An extensible base class `BaseResource` can be defined and then extended for different types of resources.

```ts
abstract class BaseResource<T> {
  data!: T;
  status = Status.pending;
  error: any = undefined;
  promise: Promise<void> | null = null;

  read() {
    switch (this.status) {
      case Status.pending:
        throw this.promise;
      case Status.error:
        throw this.error;
      case Status.success:
        return this.data;
    }
  }
}
```

`BaseResource` can be extended to match the functionality of `wrapPromise`. Simply define a constructor, call `super()`, and provide a value for `this.promise`.

```ts
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
```

The constructor can accept any data to meet the needs of the resource. Here is an example showing a custom resource for graphql that acccepts an Apollo query.

```ts
// src/resource.ts
export class GraphqlResource<T> extends BaseResource<T> {
  constructor(query: DocumentNode) {
    super();
    this.promise = client.query({ query, fetchPolicy: 'network-only' }).then(
      (response) => {
        this.status = ResourceStatus.success;
        this.data = response.data;
      },
      (error) => {
        this.status = ResourceStatus.error;
        this.data = error;
      }
    );
  }
}
```

```ts
// src/resources/spacex-launches

// query to fetch 10 space-x launch records
export const GET_LAUNCHES = gql`
  query GetLaunches {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
    }
  }
`;

...

export default function launchResource() {
  return new GraphqlResource(GET_LAUNCHES)
}
```

**What is it? When was it created? By whom?**
**Benefits** 1. remove boilerplate 2. improves readability 3. is more declarative 4. can improve performance
**Caveats** 1. Data fetching with suspense is still experimental.

**Can we use Suspense in our stack yet?**
Yes! But only for lazy loading dynamic imports in Next.js

## Resources

<hr>

#### Videos

- [Goodbye, useEffect: David Khourshid](https://www.youtube.com/watch?v=HPoC-k7Rxwo)

  - "useEffect is not for effects"

- [React-ing to David K's useEffect Talk](https://www.youtube.com/watch?v=CFxA5GmDIbU)

#### Articles

- [How you can use React Suspense for data fetching in real-world applications now](https://levelup.gitconnected.com/how-you-can-use-react-suspense-for-data-fetching-in-real-world-applications-now-9fda8138f687)
