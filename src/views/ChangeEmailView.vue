<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const store = useApplicationStore();

const router = useRouter();

const formData = ref({
    email: ''
});

const onFormSubmit = () => {
    console.log('Form Data:', formData.value);
    const url = 'http://localhost:9090/api/citizen/change-email'
    fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + store.userData.accessToken
            },
        body: JSON.stringify(formData.value)
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    // Check if the response has content
    if (response.headers.get('content-type')?.includes('application/json')) {
        return response.json();
    }
    return null; // Handle empty response
    })
    .then( () => {
        router.push({ name: 'home' });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'home' }"
                            >Back to Home</RouterLink
                        >
                        <h1 class="fs-3">Change Email</h1>
                    </div>
                    <form @submit.prevent="onFormSubmit">
                        <div class="mb-2">
                            <label for="emailFormControl" class="form-label mb-1"
                                >Email</label
                            >
                            <input
                                v-model="formData.email"
                                type="text"
                                class="form-control"
                                id="emailFormControl"
                                required
                            />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit Change</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>