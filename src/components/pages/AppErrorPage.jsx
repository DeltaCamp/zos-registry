import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'
import * as routes from '~/../config/routes'

export const AppErrorPage = class _AppErrorPage extends PureComponent {
  render () {
    return (
      <div className='is-positioned-absolutely is-full-width'>
        <Helmet
          title='Page Error'
        />

        <ScrollToTop />

        <div className='container'>
          <div className='columns'>
            <div className='column main-content--column is-10-tablet is-10-desktop is-8-widescreen is-offset-2-widescreen is-8-fullhd is-offset-2-fullhd'>
              <Link
                to={routes.HOME}
                className='button is-monospaced is-text has-text-weight-bold package-page--back-button'
              >
                {'<'} Back to Home
              </Link>

              <h1 className='is-size-1'>
                There's been an error!
              </h1>
              <br />
              <h4 className='is-size-4'>
                We're sorry, but we were unable to process that request.
              </h4>

              <br />
              <hr />
              <br />

              <Link
                to={routes.HOME}
                className='button is-pill is-purple'
              >
                {'<'} Take me back to the packages
              </Link>
            </div>
          </div>
        </div>

        <FooterContainer />
      </div>
    )
  }
}
