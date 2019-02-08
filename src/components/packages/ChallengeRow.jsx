import React, { Component } from 'react'
import classnames from 'classnames'
import gh from 'parse-github-url'
import gql from 'graphql-tag'
import AntdIcon from '@ant-design/icons-react'
import { MinusCircleOutline, PlusCircleOutline } from '@ant-design/icons'
import { formatRelative } from 'date-fns'
import { ethers } from 'ethers'
import { get } from 'lodash'
import { Query } from 'react-apollo'
import { CSSTransition } from 'react-transition-group'
import { CodeSnippet } from '~/components/CodeSnippet'
import { EnsName } from '~/components/EnsName'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'
import { GitHubLink } from '~/components/GitHubLink'
import { vouchingFragments } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { challengeStatus } from '~/utils/challengeStatus'
import * as constants from '~/constants'

export const challengeRowQuery = gql`
  query challengeRowQuery($challengeId: String!, $uri: String!) {
    metadata(uri: $uri) @client {
      ...md
    }
    Vouching @contract(type: "Challenge", id: $challengeId) {
      ...challengeFragment
    }
  }
  ${vouchingFragments.metadataFragment}
  ${vouchingFragments.challengeFragment}
`

export const ChallengeRow = class extends Component {
  state = { challengeDetailsActive: false }

  displayPriority = (amount) => {
    const packageAmount = displayWeiToEther(this.props.packageTotalVouched)
    const challengeAmount = displayWeiToEther(amount)
    const severityPercent = challengeAmount / packageAmount

    if (severityPercent >= 0.66) {
      return constants.CHALLENGE_PRIORITY_HIGH
    } else if (severityPercent >= 0.33 && severityPercent < 0.66) {
      return constants.CHALLENGE_PRIORITY_MEDIUM
    } else {
      return constants.CHALLENGE_PRIORITY_LOW
    }
  }

  handleChallengeRowMouseOver = (e) => {
    e.preventDefault()
    this.setState({ challengeRowHovered: true })
  }

  handleChallengeRowMouseOut = (e) => {
    e.preventDefault()
    this.setState({ challengeRowHovered: false })
  }

  handleChallengeRowClick = (e) => {
    e.preventDefault()
    this.setState({ challengeDetailsActive: !this.state.challengeDetailsActive })
  }

  render() {
    const { challenged } = this.props
    const challengeId = challenged.parsedLog.values.challengeID
    const amount = ethers.utils.bigNumberify(challenged.parsedLog.values.amount.toString())
    const { metadataURI } = challenged.parsedLog.values
    const { repo } = gh(metadataURI)

    const priority = this.displayPriority(amount)


    return (
      <Query query={challengeRowQuery} variables={{ uri: metadataURI, challengeId }}>
        {({ data, loading, error }) => {
          if (loading) return null
          if (error) return error.toString()

          const { challenge, appeal } = data.Vouching

          const status = challengeStatus(challenge.answer, !appeal.amount.eq(0), challenge.resolution)
          const statusLabel = constants.CHALLENGE_STATUS_LABEL[status]
          const priorityColor = constants.CHALLENGE_PRIORITY_COLORS[priority]

          const { metadata } = data || {}

          const timestampDate = new Date(0)
          timestampDate.setUTCSeconds(challenge.createdAt.toString())
          const dateRelative = formatRelative(timestampDate, new Date())

          const hasAnswer = parseInt(challenge.answeredAt, 10) > 0
          const hasAppeal = parseInt(appeal.createdAt, 10) > 0

          return (
            <>
              <li className={classnames(
                'list--row',
                'list--row_challenge',
                {
                  'list--row__hovered': this.state.challengeRowHovered,
                  'is-active': this.state.challengeDetailsActive
                }
              )}>
                <span className='list--cell'>
                  <button
                    onMouseOver={this.handleChallengeRowMouseOver}
                    onMouseOut={this.handleChallengeRowMouseOut}
                    onClick={this.handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale'
                  >
                    {get(metadata, 'description')}
                  </button>
                </span>
                <span className={`list--cell has-text-${statusLabel.colour}`}>
                  <button
                    onMouseOver={this.handleChallengeRowMouseOver}
                    onMouseOut={this.handleChallengeRowMouseOut}
                    onClick={this.handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale'
                  >
                    {statusLabel.label}
                  </button>
                </span>
                <span className={`list--cell has-text-${priorityColor}`}>
                  <button
                    onMouseOver={this.handleChallengeRowMouseOver}
                    onMouseOut={this.handleChallengeRowMouseOut}
                    onClick={this.handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale'
                  >
                    {priority}
                  </button>
                </span>
                <span className='list--cell'>
                  <button
                    onMouseOver={this.handleChallengeRowMouseOver}
                    onMouseOut={this.handleChallengeRowMouseOut}
                    onClick={this.handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale'
                  >
                    {displayWeiToEther(amount)} Z
                  </button>
                </span>
                <span className='list--cell'>
                  <GitHubLink
                    url={`https://github.com/${repo}`}
                    cssClassNames='list__wrapping-anchor list__has-padding no-scale'
                  />
                </span>
                <span className='list--cell'>
                  <button
                    onMouseOver={this.handleChallengeRowMouseOver}
                    onMouseOut={this.handleChallengeRowMouseOut}
                    onClick={this.handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale has-text-centered list--accordion-icon'
                  >
                    <AntdIcon
                      type={this.state.challengeDetailsActive ? MinusCircleOutline : PlusCircleOutline}
                      className='antd-icon'
                    />
                  </button>
                </span>
              </li>
              <CSSTransition
                timeout={600}
                classNames='accordion'
                in={this.state.challengeDetailsActive}
              >
                {state => (
                  <li className='accordion accordion--panel'>
                    <span className='accordion--header'>
                      <h5 className='is-size-5'>
                        Challenge #{challenge.entryID.toString()}
                      </h5>
                      <h6 className='is-size-6 has-text-weight-semibold'>
                        Challenger <EtherscanAddressLink address={challenge.challenger.toString()}>
                          <EnsName address={challenge.challenger.toString()} shorten />
                        </EtherscanAddressLink>
                      </h6>
                      <h6 className='is-size-6 has-text-weight-semibold'>
                        Challenged <span className='has-text-grey'>{dateRelative}</span>
                      </h6>
                    </span>

                    <span className='accordion--column accordion--column__1'>
                      {hasAnswer ? (
                        <>
                          <span><strong>Answer:</strong> {challenge.answer.toString()}</span>
                          <br />
                          <span><strong>Answered on:</strong> {challenge.answeredAt.toString()}</span>
                          <br />
                          <span><strong>Resolution:</strong> {challenge.resolution.toString()}</span>
                        </>
                      ) : (
                        <span className='accordion--column__blank-state is-size-6'>
                          Currently no responses. Respond with:
                          <br />
                          <CodeSnippet metadata={metadata} action='answer' id={challenge.entryID.toString()} />
                        </span>
                      )}
                    </span>

                    <span className='accordion--column accordion--column__2'>
                      {hasAppeal ? (
                        <>
                          <span><strong>Appeal Amount:</strong> {appeal.amount.toString()} Z</span>
                          <br />
                          <span><strong>Appealed on:</strong> {appeal.createdAt.toString()}</span>
                          <br />
                          <span>
                            <strong>Appealed by:</strong> <EtherscanAddressLink address={challenge.challenger.toString()}>
                              <EnsName address={appeal.appealer.toString()} shorten />
                            </EtherscanAddressLink>
                          </span>
                        </>
                      ) : (
                        <span className='accordion--column__blank-state is-size-6'>
                          Currently no appeals. Appeal with:
                          <br />
                          <CodeSnippet metadata={metadata} action='appeal' id={challenge.entryID.toString()} />
                        </span>
                      )}
                    </span>

                    <span className='accordion--footer'>
                      <GitHubLink
                        url={`https://github.com/${repo}/issues`}
                        viewLink
                        cssClassNames='is-text'
                      />
                    </span>

                  </li>
                )}
              </CSSTransition>
            </>
          )
        }}
      </Query>
    )
  }
}
