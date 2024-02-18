<script setup>
import { useApplicationStore } from '@/stores/application.js';
const { userData, firstRole } = useApplicationStore();
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Home</h1>
                    </div>
                    <div>
                        <p>
                            Logged in as: <strong>{{ userData.username }}</strong>
                        </p>
                        <!-- User Home Page -->
                        <ul v-if="firstRole==='ROLE_USER'">
                            <li>
                                <RouterLink :to="{ name: 'application-form' }">Application Form</RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'change-email' }">Change Email</RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'view-notification' }">Notifications</RouterLink>
                            </li>
                        </ul>

                        <!-- Secretary Home Page -->
                        <ul v-if="firstRole==='ROLE_MODERATOR'">
                            <li>
                                <RouterLink :to="{ name: 'applications' }">Applications</RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'send-notification' }">Send Notification</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
