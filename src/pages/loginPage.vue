<script setup lang="ts">
import type { InputType } from '@/types'
import { useForm } from 'vee-validate'
import { loginSchema } from '@/schemas/login'
import { useAuthStore } from '@/stores/auth'

const validationSchema = loginSchema

const store = useAuthStore()

let errorTimer: ReturnType<typeof setTimeout> | null = null

const { values, errors, handleSubmit, setFieldValue, submitCount } = useForm({
  validationSchema,
})

const submitForm = handleSubmit(async (values) => {
  store.login(values)
})

const inputs: InputType[] = [
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
]

watch(() => store.messageError, (newError) => {
  if (newError && newError.type === 'login') {
    if (errorTimer) clearTimeout(errorTimer)
    errorTimer = setTimeout(() => {
      store.messageError = {
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
    <Transition name="fade">
      <div
        v-if="store.messageError?.message && store.messageError.type === 'login'"
        class="messageError"
      >
        {{ store.messageError.message }}
      </div>
    </Transition>
      <div
        v-for="input in inputs"
        :key="input.name"
        class="input-wrapper"
      >
        <InputForm
          :class="{ error: errors[input.name] && submitCount > 0 }"
          :name="input.name"
          :model-value="values[input.name]"
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
        Войти
      </button>
    </form>
  </div>
</template>
