import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
  createTodo: publicProcedure
    .input(z.object({
      title: z.string(),
      description: z.string()
    }))
    .mutation(async (opts) => {

      console.log(opts.ctx.username);

      const title = opts.input.title;
      const description = opts.input.description;

      // TODO: DB stuff

      return {
        id: "1",
      }
    }),
});


const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    const authHeader = opts.req.headers["authorization"];
    console.log(authHeader);
    // jwt.verify()
    return {
      username: "rakhshan90"
    }
  }
});
server.listen(3000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;