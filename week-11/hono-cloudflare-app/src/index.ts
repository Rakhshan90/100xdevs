import { Hono, Next } from 'hono'

const app = new Hono()

// authentication middleware 
async function authMiddleware(c: any, Next: any){
  if(c.req.header('Authorization')){
    await Next();
  }
  else {
    return c.text("You are not authorized");
  }
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})


export default app
