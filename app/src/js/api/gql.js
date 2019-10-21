import { createClient } from 'urql'
import { api } from "./util"

export const gqlClient = createClient({
  url: api('graphql')
})
