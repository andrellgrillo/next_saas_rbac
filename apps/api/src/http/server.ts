import { fastify } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { createAccount } from "./routes/auth/create-account";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authehticateWithPassword } from "./routes/auth/authenticate-with-password";
import { getProfile } from "./routes/auth/get-profile";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Nextjs SaaS',
      description: 'Full-stack Saas app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(fastifyJwt, {
  secret: 'my-jwt-secret'
})
app.register(fastifyCors)

app.register(authehticateWithPassword)
app.register(createAccount)
app.register(getProfile)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
