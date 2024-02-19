export function mapViemErrorToMessage(error: unknown) {
  const defaultErrorMessage = 'Something horribly wrong happened with your transaction.';

  if (
    error !== null &&
    error !== undefined &&
    typeof error === 'object' &&
    'name' in error &&
    typeof error.name === 'string'
  ) {
    switch (error.name) {
      case 'SyntaxError': {
        return 'You misspelled one or more constructor arguments. Please check and try again.';
      }
      case 'UserRejectedRequestError': {
        return 'You rejected the request.';
      }
      case 'TransactionExecutionError': {
        return 'You cancelled the transaction.';
      }
      default: {
        return defaultErrorMessage;
      }
    }
  }

  return defaultErrorMessage;
}
