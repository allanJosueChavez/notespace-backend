import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SlowBuffer } from 'buffer';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // rpc is when you're building. rpc stands for remote procedure call
    // other options of ctx are http and graphql
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
