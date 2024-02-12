<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({
  username: '',
  email: '',
  password: ''
});
const signupError = ref(null);
const loading = ref(false);

const onFormSubmit = () => {
    loading.value = true;

  fetch('http://localhost:9090/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user.value)
  })
  .then(response => {
    if (response.ok) {
      router.push({ name: 'login' });
    } else {
      response.json().then(data => {
        signupError.value = data.message || 'An error occurred during signup.';
      });
    }
  })
  .catch(error => {
    console.error('Signup error:', error);
    signupError.value = 'Failed to sign up.';
  })
  .finally(() => {
    loading.value = false;
  });
};

</script>

<template>
  <div class="bg-body-tertiary">
      <div class="container">
          <div class="row py-4 px-3">
              <div class="col-4">
                  <div class="mb-4">
                      <h1 class="fs-3">Sign Up</h1>
                  </div>
                  <div class="spinner-border" role="status" v-if="loading">
                      <span class="visually-hidden">Loading...</span>
                  </div>
                  <form @submit.prevent="onFormSubmit" v-else>
                      <div class="mb-2" v-if="signupFailed">
                          <div class="alert alert-danger" role="alert">
                              Signup failed!
                          </div>
                      </div>
                      <div class="mb-2">
                          <label for="usernameFormControl" class="form-label mb-1">Username</label>
                          <input
                              v-model="user.username"
                              type="text"
                              class="form-control"
                              id="usernameFormControl"
                              required
                          />
                      </div>
                      <div class="mb-2">
                          <label for="emailFormControl" class="form-label mb-1">Email</label>
                          <input
                              v-model="user.email"
                              type="email"
                              class="form-control"
                              id="emailFormControl"
                              required
                          />
                      </div>
                      <div class="mb-2">
                          <label for="passwordFormControl" class="form-label mb-1">Password</label>
                          <input
                              v-model="user.password"
                              type="password"
                              class="form-control"
                              id="passwordFormControl"
                              required
                              minlength="6"
                              maxlength="40"
                          />
                      </div>
                      <button type="submit" class="btn btn-primary">Sign Up</button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>
