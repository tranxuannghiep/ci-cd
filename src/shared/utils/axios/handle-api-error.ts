import { HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { CustomException } from 'src/shared/exception/exception';

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    // Handle Axios-specific errors
    const axiosError = error as AxiosError;
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorString = 'Something went wrong in our end!';
    if (axiosError.response) {
      const data: any = axiosError.response.data;
      if (data) {
        if (data.status) {
          httpStatus = data.status;
        }
        if (data.error) {
          errorString = data.error;
        }
      }
    }

    throw new CustomException(
      { httpCode: httpStatus, name: errorString },
      errorString,
    );
  } else {
    throw error;
  }
}
