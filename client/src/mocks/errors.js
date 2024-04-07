export const errorCodeToMessageMap = {
    "400": "The request was invalid. Please check your input.",
    "401": "You are not authorized to access this resource. Please log in or check your credentials.",
    "403": "Access to the requested resource is forbidden. You may not have permission to access it.",
    "404": "The resource you are trying to access does not exist.",
    "405": "The requested method is not allowed for the specified resource.",
    "408": "The server timed out waiting for the request. Please try again later.",
    "429": "You have exceeded the rate limit for accessing this resource. Please try again later.",
    "500": "An unexpected error occurred on the server. Please try again later.",
    "501": "The server does not support the functionality required to fulfill the request.",
    "502": "The server received an invalid response from an upstream server.",
    "503": "The server is currently unavailable due to maintenance or overload. Please try again later.",
    "504": "The server did not receive a timely response from an upstream server.",
    "505": "The server does not support the HTTP protocol version used in the request.",
    "NetworkError": "Network Error: Could not connect to server.",
    "UnknownError": "Unknown Error: Please try again later."
  }