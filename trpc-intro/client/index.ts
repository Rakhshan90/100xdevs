import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers(){
        return {
          Authorization: "Bearer fasljkf"
        }
      }
    }),
  ],
});

const main = async ()=>{
    let res = await trpc.createTodo.mutate({
        title: 'First todo',
        description: 'This is the description of the first todo'
    }) 

    console.log(res);
}

main();