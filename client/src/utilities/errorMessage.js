import { errorCodeToMessageMap } from "../mocks/errors";

export const getErrorMessage = (response) => {
    let message = '';

    const { status } = response;
    if (status && status >= 400 && status < 600) {
        if (errorCodeToMessageMap[status]) {
            console.log('got the message', errorCodeToMessageMap[status])
            message = errorCodeToMessageMap[status];
        } else {
            message = 'Something went wrong, please try again later';
        }
    }

    return message;
}