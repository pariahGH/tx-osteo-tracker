import { throwErrorIfNotAdmin } from '~/utils/auth'

/**
 * --- API INFO
 * POST /api/events/[event id]/register/[user id]
 * Registers a user for this event
 * If user id is 'me,' it will update for the currently signed in user
 */

export default defineEventHandler(async (event) => {
  const eventId = getRouterParam(event, 'id')
  if (!eventId) {
    throw createError({
      status: 400,
      message: 'No event id provided',
    })
  }

  let userId = getRouterParam(event, 'user')
  if (!userId) {
    throw createError({
      status: 400,
      message: 'No user id provided',
    })
  }

  const cookieUserId = event.context.txOsteoClaims?.sub
  if (userId === 'me') userId = cookieUserId

  // Only allow if this is the user, or if the user is an admin
  // Checks by making sure the user ids are the same
  if (cookieUserId !== userId) {
    throwErrorIfNotAdmin(event) // Check if user is admin
  }

  const eventData = await event.context.prisma.event.findFirst({
    where: { id: eventId },
    include: {
      signedUpUsers: true,
    },
  })

  if (!eventData) {
    throw createError({
      status: 404,
      message: `Could not find event: ${eventId}`,
    })
  }

  if (eventData.dateAndTime < new Date()) {
    throw createError({
      status: 400,
      message: `This event already happened, so it cannot be registered for`,
    })
  }

  if (eventData.capacity === 0) {
    throw createError({
      status: 400,
      message: `This event is at capacity`,
    })
  }

  const newEvent = await event.context.prisma.event.update({
    where: { id: eventId },
    data: {
      capacity: {
        decrement: 1,
      },
      signedUpUsers: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return newEvent
})