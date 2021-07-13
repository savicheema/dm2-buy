import { withSentry } from '@sentry/nextjs'

async function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

export default withSentry(handler)
