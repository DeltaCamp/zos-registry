import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { CodeSnippet } from '~/components/CodeSnippet'
import { GitHubLink } from '~/components/GitHubLink'
import { ChallengeRow } from '~/components/ChallengeRow'
import { LevelVouch } from '~/components/LevelVouch'
import OpenZeppelinEthLogo from '~/assets/images/openzeppelin-eth-logo.svg'
import { displayWeiToEther } from '~/utils/displayWeiToEther'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const CHALLENGE_1 = {
  name: 'Large unsigned int overflow error',
  status: 'Open',
  priority: 'Low',
  bounty: 800,
  url: 'https://github.com/challenge1'
}

const CHALLENGE_2 = {
  name: 'ERC20 does not support approval to zero',
  status: 'Open',
  priority: 'Medium',
  bounty: 300,
  url: 'https://github.com/challenge2'
}

const CHALLENGE_3 = {
  name: 'ERC20 has a length of 0',
  status: 'Closed',
  priority: 'High',
  bounty: undefined,
  url: 'https://github.com/challenge3'
}

export class PackageDetails extends PureComponent {
  static propTypes = {
    metadata: PropTypes.object.isRequired
  }

  render () {
    const { metadata, vouching } = this.props

    // fake hard-coded data because my mock data isn't working at all:
    CHALLENGE_3.bounty = displayWeiToEther(get(vouching, 'totalVouched'))

    if (isEmpty(metadata.name)) {
      metadata.name = 'OpenZeppelin Eth'
    }
    if (isEmpty(metadata.version)) {
      metadata.version = '1.0.1'
    }
    if (isEmpty(metadata.description)) {
      metadata.description = 'OpenZeppelin is a library for secure smart contract development. It provides implementations of standards like ERC20 and ERC721 which you can deploy as-is or extend to suit your needs, as well as Solidity components to build custom contracts and more complex decentralized systems.'
    }

    return (
      <div>
        <div className='columns reverse-column-order'>
          <div className='column is-6-widescreen'>
            <h1 className='title is-size-1 has-text-weight-normal'>
              {metadata.name}

              <span className='package-item--version has-text-grey has-text-weight-light'>
                v{metadata.version}
              </span>
            </h1>

            <h6 className='is-size-6 has-text-weight-semibold package-item--maintained-by'>
              Maintained by <a href='https://etherscan.com/address/0xf19b...34'>0xf19b...34</a>
            </h6>

            <p className='is-size-6 package-item--description'>
              {metadata.description}
            </p>

            <CodeSnippet metadata={metadata} />

            <GitHubLink url='https://github.com/DeltaCamp/zeppelin-vouching-app' />
          </div>

          <div className='column is-6-widescreen has-text-right--desktop'>
            <OpenZeppelinEthLogo />

            <br />
            <br />

            <button
              className='button is-dark is-pill'
            >
              Vouch
            </button>
          </div>
        </div>

        <hr />

        <div className='columns'>
          <div className='column is-6-widescreen'>
            <h5 className='is-size-5 has-text-weight-semibold'>
              3 addresses vouched 3,000 ZEP
            </h5>

            <div className="level--wrapper">
              <LevelVouch address='0x32Be343B94f860124dC4fEe278FDCBD38C102D88' amount='7000' />
              <LevelVouch address='0xa786bc5f76a5bce6d7108a7bc7a3f4a786a786bc' amount='2200' />
              <LevelVouch address='0x5f76a567abedf7faf8a4f83af7a3f4a786a67999' amount='800' />
            </div>

          </div>
        </div>

        <div className='columns'>
          <div className='column is-12-widescreen'>
            <h5 className='is-size-5 has-text-weight-semibold'>
              Challenges
            </h5>

            <div>
              Create a challenge by running: &nbsp;
              <br className="is-hidden-desktop" />
              <br className="is-hidden-desktop" />
              <CodeSnippet metadata={metadata} action='challenge' />
              <br className="is-hidden-desktop" />
              <br className="is-hidden-desktop" />
            </div>

            <br />

            <div className="table--wrapper">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th width="61%">
                      Name
                    </th>
                    <th width="12%">
                      Status
                    </th>
                    <th width="12%">
                      Severity
                    </th>
                    <th width="12%">
                      Bounty
                    </th>
                    <th width="3%">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ChallengeRow challenge={CHALLENGE_1} />
                  <ChallengeRow challenge={CHALLENGE_2} />
                  <ChallengeRow challenge={CHALLENGE_3} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
