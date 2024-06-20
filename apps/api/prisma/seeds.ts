import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const [user, user2, user3] = await prisma.user.createMany({
    data: [
      {
      name: 'John Doe',
      email: 'john@acme.com',
      avatarUrl: 'https://github.com/andrellgrillo.png',
      passwordHash: await hash('123456789', 1)
      },
      {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash: await hash('123456789', 1)
      },
      {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash: await hash('123456789', 1)
      },
   ]
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain: true,
      owner: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              userId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id
              ]),
            }
          ]
        }
      },
      members: {
        createMany: {
          data:[
            {
              userId: user.id,
              role: 'ADMIN'
            },
            {
              userId: user2.id,
              role: 'MEMBER'
            },
            {
              userId: user3.id,
              role: 'MEMBER'
            },
          ]
        }
      }
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
})
