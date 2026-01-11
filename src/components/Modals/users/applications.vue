<script setup lang="ts">
import type { InputTypeApplications } from '@/types'
import { useForm } from 'vee-validate'
import { applicationsDataSchema } from '@/schemas/applications'
import { useApplicationStore } from '@/stores/applications'
import { useAuthStore } from '@/stores/auth'

const validationSchema = applicationsDataSchema

const store = useApplicationStore()

const { values, errors, handleSubmit, setFieldValue, submitCount } = useForm({
  validationSchema,
  initialValues: {
    user_id: useAuthStore().authUserData?.id,
    application_status_id: 1,
  },
})

const submitForm = handleSubmit(async (values) => {
  store.storeApplication(values)
})

const inputs: InputTypeApplications[] = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'название',
  },
  {
    name: 'date',
    type: 'date',
    placeholder: 'дата проведения',
  },
  {
    name: 'time',
    type: 'time',
    placeholder: 'время проведения',
  },
]
</script>

<template>
  <form
    class="flex_column"
    @submit="submitForm"
  >
    <div
      v-for="input in inputs"
      :key="input.name"
      class="input-wrapper"
    >
      <InputForm
        :step="input.type === 'time' ? 2 : null"
        :class="{ error: errors[input.name] && submitCount > 0 }"
        :name="input.name"
        :model-value="values[input.name] as any"
        :type="input.type"
        :placeholder="input.placeholder"
        @update:model-value="(newValue) => setFieldValue(input.name, newValue)"
      />

      <span
        v-if="errors[input.name] && submitCount > 0"
        class="error"
      >
        {{ errors[input.name] }}
      </span>
    </div>
    <div
      class="input-wrapper"
    >
      <textarea
        id="description"
        :model-value="values.description"
        placeholder="Введите описание"
        name="description"
        :class="{ error: errors.description }"
        @update:model-value="(val: string) => setFieldValue('description', val)"
      />
      <span
        v-if="errors.description && submitCount > 0"
        class="error"
      >
        {{ errors.description }}
      </span>
    </div>
    <button type="submit">
      Добавить
    </button>
  </form>
</template>
