import type { ZodTypeProvider } from "fastify-type-provider-zod";
import type { FastifyInstance } from "fastify";
import { z } from 'zod'
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/users',{
    schema: {
      tags: ['auth'],
      summary: 'Create anew Account.',
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
      })
    }
  }, async (request, reply) => {
    const { name, email, password } = request.body
    const userWithSameEmail = await prisma.user.findUnique({
      where: { email }
    })
    if(userWithSameEmail) {
      return reply.status(400).send({ message: 'user with same e-mail already exists.'})
    }
    const passwordHash = await hash(password, 6)
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      },
    })
    return reply.status(201).send()
  })
}
