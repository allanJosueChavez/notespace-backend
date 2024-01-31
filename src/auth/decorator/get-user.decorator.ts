import { createParamDecorator, ExecutionContext, ArgumentsHost } from '@nestjs/common';
// ExecutionContext is a class that nestjs provides to get the context of the request
export const GetUser = createParamDecorator(

    (data: string | undefined, host: ArgumentsHost) => {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },

  // (data: string | undefined, ctx: ExecutionContext) => {
  //   const request = ctx.switchToHttp().getRequest();
  //   // ctx stands for context
  //   // rpc is when you're building. rpc stands for remote procedure call
  //   // besides http ctx can be rpc, graphql.
  //   const user = request.user;
  //   return data ? user?.[data] : user;
  // },
);
