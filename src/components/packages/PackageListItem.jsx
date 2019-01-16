import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import get from 'lodash.get'
import AntdIcon from '@ant-design/icons-react'
import { CopyOutline, GithubFill } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { formatRoute } from 'react-router-named-routes'
import { Redirect, Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import ZeppelinOSLogo from '~/assets/images/zep-token-logo.svg'
import { stringToSlug } from '~/utils/stringToSlug'
import * as routes from '~/../config/routes'

const packageQuery = gql`
  query packageQuery($path: String!) {
    metadata(path: $path) @rest(path: $path) {
      id
      name
      version
      description
    }
  }
`

export const PackageListItem = ReactTimeout(class _PackageListItem extends PureComponent {
  state = {}

  static propTypes = {
    package: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.setTimeout(() => {
      this.setState({ startAnimating: true })
    }, 50)
  }

  handlePackageItemClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log('package link click')

    this.setState({ toPackage: true })
  }

  handleGitHubLinkClick = (url) => {
    console.log('github link click')
    if (window) {
      window.location.href = url
    }
  }

  handleCodeClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleCopyClick = () => {
    this.setState({ copied: true })

    this.props.setTimeout(() => {
      this.setState({ copied: false })
    }, 3000)
  }

  render () {
    return (
      <Query query={packageQuery} variables={{ path: this.props.package.metadataURI }}>
        {
          ({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error!: ${error}`

            const { metadata } = data
            const { version } = metadata

            const slug = stringToSlug(metadata.name)
            const id = parseInt(metadata.id, 10) - 1
            const zosInstallSnippet = `zos link ${slug}`
            const link = formatRoute(routes.PACKAGE_ITEM, { id, version })

            if (this.state.toPackage) {
              return <Redirect to={link} />
            }

            return (
              <div
                className={
                  classnames(
                    'package-list-item',
                    'panel',
                    'slide-up',
                    'fade-in',
                    'slow',
                    {
                      'slide-up-enter': this.state.startAnimating,
                      'fade-in-enter': this.state.startAnimating
                    }
                  )
                }
                onClick={this.handlePackageItemClick}
                style={{ 'transitionDelay': `${this.props.index * 100}ms` }}
              >
                <div className='panel-block'>
                  <div className='columns'>
                    <div className='column is-three-quarters'>
                      <h4 className='title is-size-4'>
                        {get(metadata, 'name')}

                        <span className='package-list-item--version has-text-grey has-text-weight-light'>
                          v{get(metadata, 'version')}
                        </span>
                      </h4>
                      <code className='code--quick-install' onClick={this.handleCodeClick}>
                        $ {zosInstallSnippet}

                        <span className='has-text-right is-inline-block is-copy-button'>
                          {this.state.copied ? 'Copied!' : ''}
                          <CopyToClipboard text={zosInstallSnippet}
                            onCopy={this.handleCopyClick}>
                            <span className='has-text-right'><AntdIcon type={CopyOutline} className='antd-icon' /></span>
                          </CopyToClipboard>
                        </span>
                      </code>
                      <button
                        className='package-list-item--github-icon is-text button'
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()

                          // this should be coming from the json data
                          const url = 'https://github.com/DeltaCamp/zeppelin-vouching-app'

                          this.handleGitHubLinkClick(url)
                        }}
                      >
                        <AntdIcon type={GithubFill} className='antd-icon' />
                      </button>
                    </div>

                    <div className='column has-text-right'>
                      <h6 className='subtitle is-size-7 package-list-item--subtitle'>
                        VOUCHED
                      </h6>

                      <span className='is-inline-block'>
                        <ZeppelinOSLogo width='20' height='20' className='package-list-item--zep-token-logo' />
                      </span>

                      <h3 className='is-inline-block is-size-3 has-text-weight-light'>
                        4,000
                      </h3>

                      <Link
                        to={link}
                        className='is-block package-list-item--challenges-link'
                      >
                        2 challenges
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
      </Query>
    )
  }
})
