import type { EventHandler } from 'h3'
import { eventHandler, readBody, isMethod, createError } from 'h3'

export function createRemoteFnHandler<T> (functions: T): EventHandler<T> {
  return eventHandler(async (event) => {
    if (!isMethod(event, 'POST')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Only POST requests are allowed.'
      })
    }

    const body = await readBody(event)
    const name = body.name
    const args = body.args || []

    if (!name || !(name in functions)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Unknown/missing function'
      })
    }

    // @ts-ignore
    const result = await functions[name].apply(event, args)
    return result
  })
}

export function Abort () {
  return createError({
    statusCode: 403
  })
}
