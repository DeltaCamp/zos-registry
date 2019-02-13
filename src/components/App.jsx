import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { MetaTags } from '~/components/MetaTags'
import { PackageListPage } from '~/components/pages/PackageListPage'
import { NavContainer } from '~/components/layout/Nav'
import { PackageItemPage } from '~/components/pages/PackageItemPage'
import { ResearcherPage } from '~/components/pages/ResearcherPage'
import { FourOhFour } from '~/components/pages/FourOhFour'
import { getPurePathname } from '~/utils/getPurePathname'
import { mixpanel } from '~/mixpanel'
import { withSentryBoundary } from '~/components/withSentryBoundary'
import { withTracker } from '~/components/withTracker'
import { getSystemInfo } from '~/utils/getSystemInfo'
import * as routes from '~/../config/routes'

const App = class _App extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  static defaultProps = {
    location: {}
  }

  currentPage = () => {
    const pathname = this.props.location.pathname
    return getPurePathname(pathname)
  }

  componentWillMount () {
    mixpanel().track('render', {
      path: this.currentPage()
    })
  }

  componentDidMount () {
    window.Intercom('update', {
      "user_id": "25",
      "owner_id": "234768",
      "email": "wash@serenity.io",
      "name": "Hoban asdf",
      "phone": "5555555555",
      "signed_up_at": 1392731331,
      "last_seen_ip" : "1.2.3.4",
      "last_seen_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9",

      // Notice that custom attributes can just be thrown in here
      "paid_subscriber" : true,
      "monthly_spend": 155.5,
      "team_mates": 9,
      "last_order_at":1475569818
    })
  }

  render () {
    const { browser } = getSystemInfo()

    const INTERCOM_API_KEY = process.env.REACT_APP_INTERCOM_API_KEY
    return (
      <div className={browser}>
        <MetaTags {...this.props} cssClass={this.currentPage()} />
        <Helmet script={
          [
            {
              src: `https://widget.intercom.io/widget/${INTERCOM_API_KEY}`,
              type: 'text/javascript'
            }
          ]
        }>
        </Helmet>

        <NavContainer />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={{ enter: 700, exit: 200 }}
            classNames='layout'
            appear
          >
            <Switch location={this.props.location}>
              <Route path={routes.RESEARCHER} component={withSentryBoundary(withTracker(ResearcherPage))} />
              <Route path={routes.PACKAGE_ITEM} component={withSentryBoundary(withTracker(PackageItemPage))} />

              <Route exact path={routes.HOME} component={withSentryBoundary(withTracker(PackageListPage))} />
              <Route exact path={routes.HOME_RESEARCHERS_LIST} component={withSentryBoundary(withTracker(PackageListPage))} />

              <Route component={withTracker(FourOhFour)} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export const AppContainer = withRouter(hot(module)(App))
