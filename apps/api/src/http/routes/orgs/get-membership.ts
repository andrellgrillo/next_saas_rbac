import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { roleSchema } from '@saas/auth'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get('/organizations/:slug/membership', {
      schema: {
        tags: ['organization'],
        summary: 'Get user membership on organization',
        security: [{ bearerAuth: []}],
        params: z.object({
          slug: z.string()
        }),
        response: {
          200: z.object({
            membership: z.object({
              id: z.string().uuid(),
              organizationId: z.string().uuid(),
              role: roleSchema,
            })
          })
        },
      },
    }, async (request) => {
      const { slug } = request.params
      const { membership } = await request.getUserMembership(slug)
      return {
        membership: {
          id: membership.id,
          role: membership.role,
          organizationId: membership.organizationId
        }
      }
    })
}
