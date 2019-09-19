/* istanbul ignore file */

import gql from "graphql-tag"

export const schemaMap = {
  cosmoshub: "cosmoshub_",
  [`gaia-testnet`]: "gaia_testnet_",
  testnet: "gaia_testnet_"
}

const ValidatorFragment = `
  operator_address 
  id 
  consensus_address 
  jailed 
  details 
  website 
  identity 
  moniker 
  voting_power 
  start_height 
  uptime_percentage 
  tokens 
  update_time 
  commission 
  max_commission 
  max_change_commission 
  commission_last_update 
  status 
  status_detailed 
`

const ValidatorProfileFragment = `
    operator_address
    name
    details
    website
    picture
`

export const AllValidators = schema => gql`
  query AllValidators {
    ${schemaMap[schema]}validators {
      ${ValidatorFragment}
    }
  }
`

export const ValidatorProfile = schema => gql`
  query ValidatorInfo($address: String) {
    ${schemaMap[schema]}validators(where: { operator_address: { _eq: $address } }) {
      ${ValidatorFragment}
    }
    ${schemaMap[schema]}validatorprofiles(where: { operator_address: { _eq: $address } }) {
      ${ValidatorProfileFragment}
    }
  }
`

export const SomeValidators = schema => gql`
  query ValidatorInfo($addressList: [String!]) {
    ${schemaMap[schema]}validators(where: { operator_address: { _in: $addressList } }) {
      ${ValidatorFragment}
    }
  }
`

export const AllValidatorsResult = schema => data =>
  data[`${schemaMap[schema]}validators`]

export const ValidatorResult = schema => data =>
  Object.assign(
    data[`${schemaMap[schema]}validators`][0],
    data[`${schemaMap[schema]}validatorprofiles`][0]
  )

export const ValidatorByName = schema => active => gql`
  query ${schemaMap[schema]}ValidatorInfo($monikerName: String) {
    ${schemaMap[schema]}validators(
      where: {
        moniker: { _ilike: $monikerName }
        ${active ? 'status: { _neq: "inactive" }' : ""}
      }
    ) {
      ${ValidatorFragment}
    }
  }
`

export const Networks = gql`
  query Networks {
    networks {
      id
      chain_id
      logo_url
      testnet
      title
      rpc_url
    }
  }
`

// capability is 'feature_portfolio' / 'action_send'
export const NetworkCapability = (networkId, capability) => gql`
query Networks {
  networks(where: {id: {_eq: "${networkId}"}, ${capability}: {_eq: true}}) {
    id
  }
}
`

export const NetworkCapabilityResult = data => data.networks.length === 1
export const NetworksResult = data => data.networks
