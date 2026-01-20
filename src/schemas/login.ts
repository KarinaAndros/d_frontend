import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const loginSchema = toTypedSchema(
  z.object({
    email: z.string('обязательно для заполнения').email('некорректный email'),
    password: z.string('обязательно для заполнения'),
  }),
)
