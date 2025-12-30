<script setup lang="ts">
import type { InputTypeReg } from '@/types'
import { useForm } from 'vee-validate'
import { regSchema } from '@/schemas/reg'
import { useAuthStore } from '@/stores/auth'

const validationSchema = regSchema

const authStore = useAuthStore()

const { values, errors, handleSubmit, defineField, setFieldValue, submitCount } = useForm({
  validationSchema,
})
const [agree, agreeAttrs] = defineField('agree')

const submitForm = handleSubmit(async (values) => {
  authStore.registration(values)
})

const inputs: InputTypeReg[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'имя',
  },
  {
    name: 'surname',
    type: 'text',
    placeholder: 'фамилия',
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'email',
  },
  {
    name: 'password',
    type: 'text',
    placeholder: 'пароль',
  },
  {
    name: 'password_confirmation',
    type: 'text',
    placeholder: 'повтор пароля',
  },
]
</script>

<template>
  <div class="home">
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
      <button type="submit">
        Зарегистрироваться
      </button>
      <div>
        <label name="agree">
          <input
            v-model="agree"
            class="agree"
            v-bind="agreeAttrs"
            type="checkbox"
          >
          <span>согласен на <a href="">обработку личных данных</a></span>
        </label>
        <span
          v-if="errors.agree"
          class="error"
        >
          {{ errors.agree }}
        </span>
      </div>
    </form>
  </div>
</template>
