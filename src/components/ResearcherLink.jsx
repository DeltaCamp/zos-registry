import React from 'react'
import { EnsName } from '~/components/EnsName'
import { formatRoute } from 'react-router-named-routes'
import yn from 'yn'
import { Link } from 'react-router-dom'

import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'
import * as routes from '~/../config/routes'

export const ResearcherLink = function ({ address, shorten = false, className }) {
  var content = <EnsName address={address} shorten={shorten} />

  if (yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG)) {
    return (
      <Link to={formatRoute(routes.RESEARCHER, { address })} className={className}>
        {content}
      </Link>
    )
  } else {
    return (
      <EtherscanAddressLink address={address} className={className}>
        {content}
      </EtherscanAddressLink>
    )
  }
}
