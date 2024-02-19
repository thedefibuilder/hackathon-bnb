import type { TVulnerability } from '@genezio-sdk/ai-builder_us-east-1';

import EReducerState from '@/constants/reducer-state';

const auditContractInitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  audit: [] as TVulnerability[] | null
};

type TAuditContractState = typeof auditContractInitialState;

type TAuditContractAction = {
  state: EReducerState;
  payload: TVulnerability[] | null;
};

function auditContractReducer(state: TAuditContractState, action: TAuditContractAction) {
  switch (action.state) {
    case EReducerState.start: {
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        audit: null
      };
    }
    case EReducerState.success: {
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        audit: action.payload
      };
    }
    case EReducerState.error: {
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        audit: null
      };
    }
    case EReducerState.reset: {
      return {
        isLoading: false,
        isError: false,
        isSuccess: false,
        audit: null
      };
    }
    default: {
      return state;
    }
  }
}

export type { TAuditContractState, TAuditContractAction };
export { auditContractInitialState, auditContractReducer };
