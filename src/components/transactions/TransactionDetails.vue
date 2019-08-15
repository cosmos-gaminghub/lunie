<template>
  <div class="tx__content">
    <component
      :is="messageTypeComponent"
      :transaction="transaction"
      :validators="validators"
      :session-address="address"
      class="tx__content__left"
    />
    <TransactionMetadata
      v-if="showMetaData"
      :fees="transaction.fees"
      :block="transaction.blockNumber"
      :time="transaction.time"
      class="tx__content__right"
    />
  </div>
</template>

<script>
import { messageType } from "./messageTypes.js"
import TransactionMetadata from "./TransactionMetadata"

import Bech32 from "common/Bech32"

export default {
  name: `transaction-details`,
  components: {
    TransactionMetadata,
    Bech32
  },
  props: {
    transaction: {
      type: Object,
      required: true
    },
    validators: {
      type: Object,
      required: true
    },
    address: {
      type: String,
      required: false,
      default: ""
    },
    showMetaData: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    messageTypeComponent: function() {
      switch (this.transaction.type) {
        case messageType.SEND:
          return () => import("./message-view/SendMessageDetails")
        case messageType.DELEGATE:
          return () => import("./message-view/DelegateMessageDetails")
        case messageType.CREATE_VALIDATOR:
          return () => import("./message-view/CreateValidatorMessageDetails")
        case messageType.EDIT_VALIDATOR:
          return () => import("./message-view/EditValidatorMessageDetails")
        case messageType.UNDELEGATE:
          return () => import("./message-view/UndelegateMessageDetails")
        case messageType.BEGIN_REDELEGATE:
          return () => import("./message-view/BeginRedelegateMessageDetails")
        case messageType.UNJAIL:
          return () => import("./message-view/UnjailMessageDetails")
        case messageType.SUBMIT_PROPOSAL:
          return () => import("./message-view/SubmitProposalMessageDetails")
        case messageType.DEPOSIT:
          return () => import("./message-view/DepositMessageDetails")
        case messageType.VOTE:
          return () => import("./message-view/VoteMessageDetails")
        case messageType.SET_WITHDRAW_ADDRESS:
          return () => import("./message-view/SetWithdrawAddressMessageDetails")
        case messageType.WITHDRAW_DELEGATION_REWARD:
          return () =>
            import("./message-view/WithdrawDelegationRewardMessageDetails")
        case messageType.WITHDRAW_VALIDATOR_COMMISSION:
          return () =>
            import("./message-view/WithdrawValidatorCommissionMessageDetails")
        default:
          return ``
      }
    }
  }
}
</script>

<style scoped>
.tx__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}

.tx__content__left,
.tx__content__right {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tx__content__right {
  text-align: right;
}

.tx__content__information,
.tx__content__information > * {
  display: flex;
  flex-direction: row;
}

.tx__content__information,
.tx__content__right {
  font-size: 14px;
  color: var(--dim);
}

.tx__content__caption {
  line-height: 18px;
  font-size: 18px;
  color: var(--bright);
}

@media screen and (max-width: 767px) {
  .tx__content {
    flex-direction: column;
    text-align: left;
  }

  .tx__content__right {
    text-align: left;
    padding-top: 0.5rem;
  }
}
</style>
