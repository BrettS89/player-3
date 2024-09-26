import { router } from './api/utilities/router'
import { trackEndpoints } from './api/v1/track'
import { audioEndpoints } from './api/v1/audio'

trackEndpoints.forEach(endpoint => router.register(endpoint))
audioEndpoints.forEach(endpoint => router.register(endpoint))

export { router }
