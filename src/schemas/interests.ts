import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const interestsDataSchema = toTypedSchema(
  z.object({
    user_id: z.number(),
    title: z.string('Обязательно для заполнения').min(1, 'Обязательно для заполнения').max(150, 'Максимум 150 символов'),
    description: z.string()
      .max(1000, 'Максимум 1000 символов')
      .nullish(),
    interest_category_id: z.number('Пожалуйста, выберите категорию')
      .int()
      .positive('Пожалуйста, выберите категорию'),
  }),
)
