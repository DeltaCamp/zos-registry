import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'
import * as routes from '~/../config/routes'

export const FourOhFour = class _FourOhFour extends PureComponent {
  render () {
    return (
      <div className='is-positioned-absolutely'>
        <Helmet
          title='404 Page Not Found'
        />

        <ScrollToTop />

        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <Link
                  to={routes.HOME}
                  className='button is-monospaced is-text has-text-weight-bold package-page--back-button'
                >
                  {'<'} Back to Home
                </Link>
                <hr />
                <br />

                <h2 className='is-size-2'>
                  We couldn't find that!
                </h2>
                <br />
                <h4 className='is-size-4'>
                  There is no content here:
                </h4>
                <h5 className='is-size-5'>
                  <em>"{this.props.location.pathname}"</em>
                </h5>

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
        </section>

        <FooterContainer />
      </div>
    )
  }
}
