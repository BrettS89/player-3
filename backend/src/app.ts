import { router } from './api/utilities/router'
import { trackEndpoints } from './api/v1/track'
import { audioEndpoints } from './api/v1/audio'
import { controlEndpoints } from './api/v1/control'

trackEndpoints.forEach(endpoint => router.register(endpoint))
audioEndpoints.forEach(endpoint => router.register(endpoint))
controlEndpoints.forEach(endpoint => router.register(endpoint))

export { router }
