<script setup>
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const router = useRouter();
const store = useApplicationStore();

const sendNotification = () => {
    const url = `http://localhost:9090/api/notification/send-notification`;
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + store.userData.accessToken
            }
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
                <div class="col-4">
                    <form @submit.prevent="sendNotification">
                        <button type="submit" class="btn btn-primary" @click="onButtonClick">Send Notification</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
