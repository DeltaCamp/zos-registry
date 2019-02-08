import React, { Component } from 'react'
import classnames from 'classnames'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import ZeppelinOSRegistryLogo from '~/assets/images/zeppelin-os-registry--logo.svg'
import ZeppelinLogo from '~/assets/images/zeppelin_white.svg'
import * as routes from '~/../config/routes'

export const Nav = class _Nav extends Component {
  state = {
    mobileNavActive: false
  }

  handleToggleMobileNav = (e) => {
    const mobileNavActive = !this.state.mobileNavActive

    this.setState({ mobileNavActive })
  }

  closeMobileNav = (e) => {
    this.setState({ mobileNavActive: false })
  }

  render () {
    const navColor = 'is-dark'

    return (
      <>
        <div
          className={classnames('nav-background no-select', { 'is-active': this.state.mobileNavActive })}
          onClick={this.closeMobileNav}
        />

        <nav className={`navbar ${navColor}`}>
          <div className='container'>
            <div className='row'>
              <div className='navbar-brand col-xs-12 col-md-8'>
                <Link to={routes.HOME} className='navbar-item no-margin-right'>
                  <ZeppelinOSRegistryLogo />
                </Link>

                <a href='https://zeppelin.solutions/' className='navbar-item'>
                  <ZeppelinLogo className='navbar-brand__tertiary-logo' />
                </a>

                <button
                  className={classnames(
                    'burger',
                    'burger-slip',
                    { 'open': this.state.mobileNavActive }
                  )}
                  data-target='navbar-menu'
                  onClick={this.handleToggleMobileNav}
                >
                  <div className='burger-lines' />
                </button>
              </div>

              <div id='navbar-menu' className={classnames(
                'navbar-menu',
                'col-md-4',
                { 'is-active': this.state.mobileNavActive }
              )}>
                <div className='navbar-end'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href='https://docs.zeppelinos.org/'
                      className='navbar-item'
                    >
                      Docs
                  </a>

                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href='https://github.com/zeppelinos'
                      className='navbar-item'
                    >
                      GitHub
                  </a>

                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href='https://zeppelinos.org/'
                      className='navbar-item'
                    >
                      Site
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </nav>
      </>
    )
  }
}

export const NavContainer = withRouter(Nav)
