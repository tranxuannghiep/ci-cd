import {
  FORWARDED_FOR_TOKEN_HEADER,
  USER_AGENT_HEADER,
} from './header.constant';
import { REFERER_HEADER } from './header.constant';
import { IncomingHttpHeaders } from 'http';

export function resolveGatewayHeaders(headers: IncomingHttpHeaders): {
  referer?: string;
  userAgent?: string;
  clientIp?: string | string[];
} {
  return {
    referer: headers[REFERER_HEADER],
    userAgent: headers[USER_AGENT_HEADER],
    clientIp: headers[FORWARDED_FOR_TOKEN_HEADER],
  };
}
