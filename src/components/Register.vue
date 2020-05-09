<template>
  <div class="container login-container d-flex justify-content-around">
    <div class="row col-xl-6 login-picture"></div>
    <div class="row col-xl-5 login-form d-flex flex-column justify-content-center">
      <h3 class="text-center mb-5">Vuegram</h3>
      <form>
        <div class="register-form d-flex flex-column">
          <input
            type="name"
            class="form-control mt-5"
            name="email"
            placeholder="Enter your name"
            autocomplete="off"
            v-model="registerForm.name"
          />
          <input
            type="email"
            class="form-control mt-2"
            name="email"
            placeholder="Enter your email"
            autocomplete="off"
            v-model="registerForm.email"
          />
          <input
            type="password"
            class="form-control mt-2"
            name="password"
            placeholder="Enter your password"
            v-model="registerForm.password"
          />
          <input
            type="password"
            class="form-control mt-2"
            name="password"
            placeholder="Confirm your password"
            v-model="registerForm.confirmationPassword"
          />
          <button
            :disabled="registerForm.email === '' || registerForm.password === '' || registerForm.confirmationPassword === '' || registerForm.name === ''"
            type="button"
            class="btn btn-success mt-4"
            @click="register"
          >Sign In</button>
          <p class="mt-2">
            Go to
            <a href="/login">Login</a>
          </p>
          <div v-if="errorMsg !== ''">
            <p class="error mt-2">{{ errorMsg }}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        email: '',
        name: '',
        password: '',
        confirmationPassword: ''
      }
    } 
  }
}
</script>
