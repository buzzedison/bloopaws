// GraphQL schema extensions for the referral program

export const referralTypes = `
  type Referral {
    id: ID!
    referrer: User!
    clientName: String!
    clientEmail: String!
    clientPhone: String
    companyName: String
    message: String
    status: ReferralStatus!
    dateReferred: DateTime!
    potentialValue: Float
    actualValue: Float
    commissionRate: Float!
    commissionAmount: Float
    commissionPaid: Boolean!
    commissionPaidDate: DateTime
  }

  enum ReferralStatus {
    PENDING
    CONTACTED
    MEETING_SCHEDULED
    PROPOSAL_SENT
    CLOSED_WON
    CLOSED_LOST
  }

  type ReferralStats {
    totalReferrals: Int!
    pendingReferrals: Int!
    closedReferrals: Int!
    totalEarnings: Float!
  }

  input ReferralCreateInput {
    referrerId: ID!
    clientName: String!
    clientEmail: String!
    clientPhone: String
    companyName: String
    message: String
    potentialValue: Float
    commissionRate: Float!
  }

  input ReferralUpdateInput {
    status: ReferralStatus
    potentialValue: Float
    actualValue: Float
    commissionAmount: Float
    commissionPaid: Boolean
    commissionPaidDate: DateTime
  }

  extend type Query {
    referral(by: { id: ID! }): Referral
    referralsByUser(userId: ID!): [Referral!]!
    referralStats(userId: ID!): ReferralStats!
  }

  extend type Mutation {
    referralCreate(input: ReferralCreateInput!): ReferralPayload
    referralUpdate(by: { id: ID! }, input: ReferralUpdateInput!): ReferralPayload
    referralDelete(by: { id: ID! }): ReferralDeletePayload
  }

  type ReferralPayload {
    referral: Referral
  }

  type ReferralDeletePayload {
    deletedId: ID
  }
`;

export const createReferralMutation = `
  mutation CreateReferral($input: ReferralCreateInput!) {
    referralCreate(input: $input) {
      referral {
        id
        clientName
        clientEmail
        status
        dateReferred
        potentialValue
        commissionRate
      }
    }
  }
`;

export const updateReferralMutation = `
  mutation UpdateReferral($id: ID!, $input: ReferralUpdateInput!) {
    referralUpdate(by: { id: $id }, input: $input) {
      referral {
        id
        status
        potentialValue
        actualValue
        commissionAmount
        commissionPaid
        commissionPaidDate
      }
    }
  }
`;

export const deleteReferralMutation = `
  mutation DeleteReferral($id: ID!) {
    referralDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const getReferralByIdQuery = `
  query GetReferralById($id: ID!) {
    referral(by: { id: $id }) {
      id
      clientName
      clientEmail
      clientPhone
      companyName
      message
      status
      dateReferred
      potentialValue
      actualValue
      commissionRate
      commissionAmount
      commissionPaid
      commissionPaidDate
      referrer {
        id
        name
        email
      }
    }
  }
`;

export const getReferralsByUserQuery = `
  query GetReferralsByUser($userId: ID!) {
    referralsByUser(userId: $userId) {
      id
      clientName
      clientEmail
      companyName
      status
      dateReferred
      potentialValue
      actualValue
      commissionRate
      commissionAmount
      commissionPaid
      commissionPaidDate
    }
  }
`;

export const getReferralStatsQuery = `
  query GetReferralStats($userId: ID!) {
    referralStats(userId: $userId) {
      totalReferrals
      pendingReferrals
      closedReferrals
      totalEarnings
    }
  }
`;
