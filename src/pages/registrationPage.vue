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

let errorTimer: ReturnType<typeof setTimeout> | null = null

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
watch(() => authStore.messageError, (newError) => {
  if (newError && newError.type === 'reg') {
    if (errorTimer) clearTimeout(errorTimer)
    errorTimer = setTimeout(() => {
      authStore.messageError = {
        type: '',
        message: ''
      } 
    }, 2000)
  }
})
</script>

<template>
  <div class="home">
    <form
      class="flex_column"
      @submit="submitForm"
    >
       <div
        v-if="authStore.messageError && authStore.messageError.type === 'reg'"
        class="messageError"
      >
        {{ authStore.messageError.message }}
      </div>
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
      <div class="input-wrapper">
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
