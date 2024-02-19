import type TArtifact from '@/types/artifact';

import EReducerState from '@/constants/reducer-state';

const compileContractInitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  artifact: null as TArtifact | null,
  errorMessage: null as string | null
};

type TCompileContractState = typeof compileContractInitialState;

type TCompileContractAction = {
  state: EReducerState;
  payload: TArtifact | string | null;
};

function compileContractReducer(state: TCompileContractState, action: TCompileContractAction) {
  switch (action.state) {
    case EReducerState.start: {
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        artifact: null,
        errorMessage: null
      };
    }
    case EReducerState.success: {
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        artifact: action.payload as TArtifact,
        errorMessage: null
      };
    }
    case EReducerState.error: {
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        artifact: null,
        errorMessage: action.payload as string
      };
    }
    case EReducerState.reset: {
      return {
        isLoading: false,
        isError: false,
        isSuccess: false,
        artifact: null,
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

export type { TCompileContractState, TCompileContractAction };
export { compileContractInitialState, compileContractReducer };
