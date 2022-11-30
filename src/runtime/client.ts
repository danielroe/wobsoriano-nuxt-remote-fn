import { $fetch } from 'ofetch'

export function callRemoteFunction (path: string, args: any[]) {
  return $fetch(`/api/__remote/${path}`, {
    method: 'POST',
    body: {
      input: args
    },
    onResponse ({ response }) {
      if (response.status === 404) {
        const functionName = path.split('.')[1]
        // eslint-disable-next-line no-console
        console.error(`[nuxt-remote-fn]: Make sure ${functionName} returns any data.`)
      }
    }
  })
}