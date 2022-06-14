import { GET_LAUNCHES } from '../graphql/queries/get-launches';
import { GraphqlResource } from '../resource';

export default function launchResource() {
  return new GraphqlResource(GET_LAUNCHES);
}
