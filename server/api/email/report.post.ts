import { string, object } from 'yup'
import { format } from 'date-fns'
import { AdminEmailCategories } from '~/utils/constants'
import {
  renderEmail,
  sendEmail,
  throwErrorIfRateLimited,
  updateUserRateLimit,
  usersToRecipients,
} from '~/utils/email'
import { validateBody } from '~/utils/validation'

const schema = object({
  title: string().required(),
  content: string().required(),
})

/**
 * --- API INFO
 * POST /api/email/report
 * Send an email using Azure
 */
export default defineEventHandler(async (event) => {
  await throwErrorIfRateLimited(event)

  const body = await validateBody(event, schema)

  const recipients = await event.context.prisma.user.findMany({
    where: {
      isAdmin: true,
      subscribedEmailCategories: {
        has: AdminEmailCategories.USER_REPORT,
      },
    },
  })

  const returnObj = {
    recipients: recipients.length,
  }
  if (recipients.length === 0) return returnObj

  // Generates HTML based on the report template with the information from the request body
  const emailHTML = await renderEmail('user-report', event, {
    emailCategory: AdminEmailCategories.USER_REPORT,
    ...body,
  })

  await sendEmail({
    content: {
      subject: `Texas Osteo Report Form - ${format(new Date(), 'MMM d, y')}`,
      html: emailHTML,
    },
    recipients: {
      bcc: usersToRecipients(recipients),
    },
  })

  await updateUserRateLimit(event)

  return returnObj
})
