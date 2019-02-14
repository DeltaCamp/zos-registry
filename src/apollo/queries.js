import { compact, flatten, map, values } from 'lodash'

// Taken from https://github.com/apollographql/apollo-client/issues/3540#issuecomment-410911223

export const isObservableQueryRefetchable = (observableQuery) => observableQuery.options.fetchPolicy !== 'cache-only'

export const getAllObservableQueries = (client) => {
  const { queryManager: { queries, queryIdsByName } } = client
  const queryIds = flatten(values(queryIdsByName))
  return map(queryIds, (queryId) => queries.get(queryId).observableQuery)
}

export const refetchObservableQueries = (refetchedQueries) => {
  const promises = compact(map(refetchedQueries, (observableQuery) => {
    if (isObservableQueryRefetchable(observableQuery)) {
      return observableQuery.refetch()
    }
  }))

  return Promise.all(promises)
}

export const getObservableQueriesByName = (client, queryName) => {
  const { queryManager: { queries, queryIdsByName } } = client
  const queryIds = queryIdsByName[queryName] || []
  console.log(`for ${queryName} found: ${queryIds.join(', ')}`)
  return map(queryIds, (queryId) => queries.get(queryId).observableQuery)
}

// We're re-writing QueryManager refetchQueryByName to be less brittle:
// https://github.com/apollographql/apollo-client/blob/88a77511467b2735e841df86073ee3af51e88eec/src/core/QueryManager.ts#L1004
export const refetchQueryByName = (client, queryName) => {
  const refetchedQueries = getObservableQueriesByName(client, queryName)

  return refetchObservableQueries(refetchedQueries)
}

export const refetchQueriesByName = (client, queryNames) =>
  Promise.all(map(queryNames, (queryName) => refetchQueryByName(client, queryName)))

export const refetchAllQueries = (client) => {
  const refetchedQueries = getAllObservableQueries(client)

  return refetchObservableQueries(refetchedQueries)
}
