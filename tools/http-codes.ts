export interface HttpStatusCode {
    code: number;
    name: string;
    meaning: string;
    category: string;
  }
  
  export const httpStatusCodes: HttpStatusCode[] = [
    {
        code: 100,
        name: "Continue",
        meaning: "Waiting for the client to emit the body of the request.",
        category: "1xx informational response"
      },
      {
        code: 101,
        name: "Switching Protocols",
        meaning: "The server has agreed to change protocol.",
        category: "1xx informational response"
      },
      {
        code: 102,
        name: "Processing",
        meaning: "The server is processing the request, but no response is available yet. For WebDav.",
        category: "1xx informational response"
      },
      {
        code: 103,
        name: "Early Hints",
        meaning: "The server returns some response headers before final HTTP message.",
        category: "1xx informational response"
      },
      {
        code: 200,
        name: "OK",
        meaning: "Standard response for successful HTTP requests.",
        category: "2xx success"
      },
      {
        code: 201,
        name: "Created",
        meaning: "The request has been fulfilled, resulting in the creation of a new resource.",
        category: "2xx success"
      },
      {
        code: 202,
        name: "Accepted",
        meaning: "The request has been accepted for processing, but the processing has not been completed.",
        category: "2xx success"
      },
      {
        code: 203,
        name: "Non-Authoritative Information",
        meaning: "The request is successful but the content of the original request has been modified by a transforming proxy.",
        category: "2xx success"
      },
      {
        code: 204,
        name: "No Content",
        meaning: "The server successfully processed the request and is not returning any content.",
        category: "2xx success"
      },
      {
        code: 205,
        name: "Reset Content",
        meaning: "The server indicates to reinitialize the document view which sent this request.",
        category: "2xx success"
      },
      {
        code: 206,
        name: "Partial Content",
        meaning: "The server is delivering only part of the resource due to a range header sent by the client.",
        category: "2xx success"
      },
      {
        code: 207,
        name: "Multi-Status",
        meaning: "The message body that follows is an XML message and can contain a number of separate response codes. For WebDav.",
        category: "2xx success"
      },
      {
        code: 208,
        name: "Already Reported",
        meaning: "The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response. For WebDav.",
        category: "2xx success"
      },
      {
        code: 226,
        name: "IM Used",
        meaning: "The server has fulfilled a request for the resource, and the response is a representation of the result.",
        category: "2xx success"
      },
      {
        code: 300,
        name: "Multiple Choices",
        meaning: "Indicates multiple options for the resource that the client may follow.",
        category: "3xx redirection"
      },
      {
        code: 301,
        name: "Moved Permanently",
        meaning: "This and all future requests should be directed to the given URI.",
        category: "3xx redirection"
      },
      {
        code: 302,
        name: "Found",
        meaning: "Redirect to another URL. This is an example of industry practice contradicting the standard.",
        category: "3xx redirection"
      },
      {
        code: 303,
        name: "See Other",
        meaning: "The response to the request can be found under another URI using a GET method.",
        category: "3xx redirection"
      },
      {
        code: 304,
        name: "Not Modified",
        meaning: "Indicates that the resource has not been modified since the version specified by the request headers.",
        category: "3xx redirection"
      },
      {
        code: 305,
        name: "Use Proxy",
        meaning: "The requested resource is available only through a proxy, the address for which is provided in the response.",
        category: "3xx redirection"
      },
      {
        code: 306,
        name: "Switch Proxy",
        meaning: "No longer used. Originally meant 'Subsequent requests should use the specified proxy.'",
        category: "3xx redirection"
      },
      {
        code: 307,
        name: "Temporary Redirect",
        meaning: "In this case, the request should be repeated with another URI; however, future requests should still use the original URI.",
        category: "3xx redirection"
      },
      {
        code: 308,
        name: "Permanent Redirect",
        meaning: "The request and all future requests should be repeated using another URI.",
        category: "3xx redirection"
      },
      {
        code: 400,
        name: "Bad Request",
        meaning: "The server cannot or will not process the request due to an apparent client error.",
        category: "4xx client error"
      },
      {
        code: 401,
        name: "Unauthorized",
        meaning: "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.",
        category: "4xx client error"
      },
      {
        code: 402,
        name: "Payment Required",
        meaning: "Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme.",
        category: "4xx client error"
      },
      {
        code: 403,
        name: "Forbidden",
        meaning: "The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource.",
        category: "4xx client error"
      },
      {
        code: 404,
        name: "Not Found",
        meaning: "The requested resource could not be found but may be available in the future.",
        category: "4xx client error"
      },
      {
        code: 405,
        name: "Method Not Allowed",
        meaning: "A request method is not supported for the requested resource.",
        category: "4xx client error"
      },
      {
        code: 406,
        name: "Not Acceptable",
        meaning: "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.",
        category: "4xx client error"
      },
      {
        code: 407,
        name: "Proxy Authentication Required",
        meaning: "The client must first authenticate itself with the proxy.",
        category: "4xx client error"
      },
      {
        code: 408,
        name: "Request Timeout",
        meaning: "The server timed out waiting for the request.",
        category: "4xx client error"
      },
      {
        code: 409,
        name: "Conflict",
        meaning: "Indicates that the request could not be processed because of conflict in the request, such as an edit conflict.",
        category: "4xx client error"
      },
      {
        code: 410,
        name: "Gone",
        meaning: "Indicates that the resource requested is no longer available and will not be available again.",
        category: "4xx client error"
      },
      {
        code: 411,
        name: "Length Required",
        meaning: "The request did not specify the length of its content, which is required by the requested resource.",
        category: "4xx client error"
      },
      {
        code: 412,
        name: "Precondition Failed",
        meaning: "The server does not meet one of the preconditions that the requester put on the request.",
        category: "4xx client error"
      },
      {
        code: 413,
        name: "Payload Too Large",
        meaning: "The request is larger than the server is willing or able to process.",
        category: "4xx client error"
      },
      {
        code: 414,
        name: "URI Too Long",
        meaning: "The URI provided was too long for the server to process.",
        category: "4xx client error"
      },
      {
        code: 415,
        name: "Unsupported Media Type",
        meaning: "The request entity has a media type which the server or resource does not support.",
        category: "4xx client error"
      },
      {
        code: 416,
        name: "Range Not Satisfiable",
        meaning: "The client has asked for a portion of the file, but the server cannot supply that portion.",
        category: "4xx client error"
      },
      {
        code: 417,
        name: "Expectation Failed",
        meaning: "The server cannot meet the requirements of the Expect request-header field.",
        category: "4xx client error"
      },
      {
        code: 418,
        name: "I'm a teapot",
        meaning: "The server refuses the attempt to brew coffee with a teapot.",
        category: "4xx client error"
      },
      {
        code: 421,
        name: "Misdirected Request",
        meaning: "The request was directed at a server that is not able to produce a response.",
        category: "4xx client error"
      },
      {
        code: 422,
        name: "Unprocessable Entity",
        meaning: "The request was well-formed but was unable to be followed due to semantic errors.",
        category: "4xx client error"
      },
      {
        code: 423,
        name: "Locked",
        meaning: "The resource that is being accessed is locked.",
        category: "4xx client error"
      },
      {
        code: 424,
        name: "Failed Dependency",
        meaning: "The request failed due to failure of a previous request.",
        category: "4xx client error"
      },
      {
        code: 425,
        name: "Too Early",
        meaning: "Indicates that the server is unwilling to risk processing a request that might be replayed.",
        category: "4xx client error"
      },
      {
        code: 426,
        name: "Upgrade Required",
        meaning: "The client should switch to a different protocol such as TLS/1.0.",
        category: "4xx client error"
      },
      {
        code: 428,
        name: "Precondition Required",
        meaning: "The origin server requires the request to be conditional.",
        category: "4xx client error"
      },
      {
        code: 429,
        name: "Too Many Requests",
        meaning: "The user has sent too many requests in a given amount of time.",
        category: "4xx client error"
      },
      {
        code: 431,
        name: "Request Header Fields Too Large",
        meaning: "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.",
        category: "4xx client error"
      },
      {
        code: 451,
        name: "Unavailable For Legal Reasons",
        meaning: "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.",
        category: "4xx client error"
      },
      {
        code: 500,
        name: "Internal Server Error",
        meaning: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.",
        category: "5xx server error"
      },
      {
        code: 501,
        name: "Not Implemented",
        meaning: "The server either does not recognize the request method, or it lacks the ability to fulfill the request.",
        category: "5xx server error"
      },
      {
        code: 502,
        name: "Bad Gateway",
        meaning: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
        category: "5xx server error"
      },
      {
        code: 503,
        name: "Service Unavailable",
        meaning: "The server is currently unavailable (because it is overloaded or down for maintenance).",
        category: "5xx server error"
      },
      {
        code: 504,
        name: "Gateway Timeout",
        meaning: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.",
        category: "5xx server error"
      },
      {
        code: 505,
        name: "HTTP Version Not Supported",
        meaning: "The server does not support the HTTP protocol version used in the request.",
        category: "5xx server error"
      },
      {
        code: 506,
        name: "Variant Also Negotiates",
        meaning: "Transparent content negotiation for the request results in a circular reference.",
        category: "5xx server error"
      },
      {
        code: 507,
        name: "Insufficient Storage",
        meaning: "The server is unable to store the representation needed to complete the request.",
        category: "5xx server error"
      },
      {
        code: 508,
        name: "Loop Detected",
        meaning: "The server detected an infinite loop while processing the request.",
        category: "5xx server error"
      },
      {
        code: 510,
        name: "Not Extended",
        meaning: "Further extensions to the request are required for the server to fulfill it.",
        category: "5xx server error"
      },
      {
        code: 511,
        name: "Network Authentication Required",
        meaning: "The client needs to authenticate to gain network access.",
        category: "5xx server error"
      }
  ];
  
  