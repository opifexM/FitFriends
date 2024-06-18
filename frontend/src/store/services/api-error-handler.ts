import { AxiosError } from 'axios';

type ApiErrorDetail = {
  messages: string[];
};

type ApiErrorResponse = {
  message: string;
  details?: ApiErrorDetail[];
};

function handleApiError(error: unknown): string {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data as ApiErrorResponse;
    const { message, details } = responseData;

    let detailedMessages: string;
    detailedMessages = Array.isArray(message) ? message.join(' ') : message;

    if (details?.length) {
      const additionalMessages = details.map((detail) => detail.messages.join(' ')).join(' ');
      detailedMessages += ` ${additionalMessages}`;
    }

    return detailedMessages;
  }
  return 'An unexpected error occurred while communicating with the API.';
}

export { handleApiError };
