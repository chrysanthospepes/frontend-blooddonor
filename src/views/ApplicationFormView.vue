<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const store = useApplicationStore();

const router = useRouter();

const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    region: '',
    goodHealth: false,
    bloodType: ''
});

const onFormSubmit = () => {
    console.log('Form Data:', formData.value);
    const url = 'http://localhost:9090/api/donor-application/create';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + store.userData.accessToken
        },
        body: JSON.stringify(formData.value)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
            
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
                <div class="col-4">
                    <div class="mb-4">
                        <h1 class="fs-3">Application Form</h1>
                    </div>
                    <form @submit.prevent="onFormSubmit">
                        <!-- First Name -->
                        <div class="mb-2">
                            <label for="firstNameFormControl" class="form-label mb-1"
                                >First Name</label
                            >
                            <input
                                v-model="formData.firstName"
                                type="text"
                                class="form-control"
                                id="firstNameFormControl"
                                required
                            />
                        </div>

                        <!-- Last Name -->
                        <div class="mb-2">
                            <label for="lastNameFormControl" class="form-label mb-1"
                                >Last Name</label
                            >
                            <input
                                v-model="formData.lastName"
                                type="text"
                                class="form-control"
                                id="lastNameFormControl"
                                required
                            />
                        </div>

                        <!-- Email -->
                        <div class="mb-2">
                            <label for="lastNameFormControl" class="form-label mb-1"
                                >Email</label
                            >
                            <input
                                v-model="formData.email"
                                type="text"
                                class="form-control"
                                id="lastNameFormControl"
                                required
                            />
                        </div>

                        <!-- Region -->
                        <div class="mb-2">
                            <label for="regionFormControl" class="form-label mb-1">Region</label>
                            <input
                                v-model="formData.region"
                                type="text"
                                class="form-control"
                                id="regionFormControl"
                                required
                            />
                        </div>

                        <!-- Good Health -->
                        <div class="mb-2">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="goodHealthFormControl"
                                    v-model="formData.goodHealth"
                                />
                                <label class="form-check-label" for="goodHealthFormControl">
                                    Good Health
                                </label>
                            </div>
                        </div>

                        <!-- Blood Type -->
                        <div class="mb-2">
                            <label for="bloodTypeFormControl" class="form-label mb-1"
                                >Blood Type</label
                            >
                            <select v-model="formData.bloodType" class="form-select" required>
                                <option value="" disabled>Select an option</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="0+">0+</option>
                                <option value="0-">0-</option>
                            </select>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="btn btn-primary">Submit Application</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
