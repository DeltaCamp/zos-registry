import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { ErrorMessage } from '~/components/ErrorMessage'
import { ScrollToTop } from '~/components/ScrollToTop'
import { PackageDetails } from '~/components/packages/PackageDetails'
import { vouchingQueries } from '~/queries/vouchingQueries'
import * as routes from '~/../config/routes'

export class PackageItemPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='is-positioned-absolutely is-full-width'>
        <Helmet
          title='EVM Package'
        />

        <ScrollToTop />

        <div className='container'>
          <div className='columns'>
            <div className='column main-content--column is-10-tablet is-10-desktop is-8-widescreen is-offset-2-widescreen is-8-fullhd is-offset-2-fullhd'>
              <Link
                to={routes.HOME}
                className='button is-monospaced is-text has-text-weight-bold package-page--back-button'
              >
                {'<'} Back to Packages
              </Link>

              <Query query={vouchingQueries.eventsQuery}>
                {({ loading, error, data }) => {
                  if (loading) return null
                  if (error) return <ErrorMessage errorMessage={error} />

                  const events = data.Vouching ? data.Vouching.Registered : []
                  const id = this.props.match.params.id
                  const event = events.find((event) => event.parsedLog.values.id.eq(id))

                  if (!event) {
                    console.warn('event not found')
                    return null
                  }

                  const packageItem = event.parsedLog.values

                  return (
                    <Query
                      query={vouchingQueries.packageQuery}
                      variables={{ uri: packageItem.metadataURI, id: packageItem.id.toString() }}
                    >
                      {
                        ({ loading, error, data }) => {
                          if (loading) return null
                          if (error) return <ErrorMessage errorMessage={error} />

                          const { metadata, Vouching } = data

                          return (
                            <>
                              <Helmet
                                title={`${metadata.name}`}
                              />
                              <PackageDetails
                                metadata={metadata}
                                vouching={Vouching}
                                registeredEvent={event}
                              />
                            </>
                          )
                        }
                      }
                    </Query>
                  )
                }}
              </Query>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
