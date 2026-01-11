import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const applicationsDataSchema = toTypedSchema(
  z.object({
    user_id: z.number(),
    application_status_id: z.number(),
    title: z.string('Обязательно для заполнения').min(1, 'Обязательно для заполнения').max(150, 'Максимум 150 символов'),
    description: z.string()
      .max(1000, 'Максимум 1000 символов')
      .nullish(),
    date: z.string(),
    time: z.string(),
  }),
)
