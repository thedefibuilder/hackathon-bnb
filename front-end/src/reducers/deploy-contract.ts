import EReducerState from '@/constants/reducer-state';

const deployContractInitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  contractAddress: null as string | null,
  errorMessage: null as string | null
};

type TDeployContractState = typeof deployContractInitialState;

type TDeployContractAction = {
  state: EReducerState;
  payload: string | null;
};

function deployContractReducer(state: TDeployContractState, action: TDeployContractAction) {
  switch (action.state) {
    case EReducerState.start: {
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        contractAddress: null,
        errorMessage: null
      };
    }
    case EReducerState.success: {
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        contractAddress: action.payload,
        errorMessage: null
      };
    }
    case EReducerState.error: {
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        contractAddress: null,
        errorMessage: action.payload
      };
    }
    case EReducerState.reset: {
      return {
        isLoading: false,
        isError: false,
        isSuccess: false,
        contractAddress: null,
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

export type { TDeployContractState, TDeployContractAction };
export { deployContractInitialState, deployContractReducer };
