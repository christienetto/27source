import createClient from "openapi-fetch"
import type {paths} from "./schema"

const api = createClient<paths>({baseUrl: "http://192.168.0.117:8080"})

// , credentials="include"

export default api
