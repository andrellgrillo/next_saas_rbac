import { fastify } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { createAccount } from "./routes/auth/create-account";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authenticateWithPassword } from "./routes/auth/authenticate-with-password";
import { getProfile } from "./routes/auth/get-profile";
import { errorHandler } from "./error-handler";
import { requestPasswordRecover } from "./routes/auth/request-password-recover";
import { resetPassword } from "./routes/auth/reset-password";
import { authenticateWithGithub } from "./routes/auth/authenticate-with-github";
import { env } from "@saas/env";
import { createOrganization } from "./routes/orgs/create-organizations";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Nextjs SaaS',
      description: 'Full-stack Saas app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'bearer',
        }
      }
    }
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})
app.register(fastifyCors)

app.register(authenticateWithPassword)
app.register(authenticateWithGithub)
app.register(createAccount)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

app.register(createOrganization)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running!')
})
