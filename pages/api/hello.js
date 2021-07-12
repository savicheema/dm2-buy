import { withSentry } from '@sentry/nextjs'

async function handler(req, res) {
  throw new Error('catch')
  res.status(200).json({ name: 'John Doe' })
}

export default withSentry(handler)