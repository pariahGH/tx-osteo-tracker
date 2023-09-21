import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const client = new PrismaClient()

  // Get the id parameter (the last part of this url)
  const id = getRouterParam(event, 'id')
  if (!id) {
    // If there is no id, throw a 400 (BAD REQUEST) error
    throw createError({
      status: 400,
      message: 'No event id provided',
    })
  }

  // Find the first event with the desired id. null is returned if none found
  const data = await client.event.findFirst({ where: { id } })

  if (data == null) {
    // Return 404 (PAGE NOT FOUND) error if the event wasn't found
    throw createError({
      status: 404,
      statusMessage: `No event by this id found: ${id}`,
    })
  }

  return data
})
