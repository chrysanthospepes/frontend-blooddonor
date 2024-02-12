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
                        <RouterLink class="small" :to="{ name: 'home' }"
                            >Back to Home</RouterLink
                        >
                        <h1 class="fs-3">Profile</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Field Name</th>
                                    <th>Field Value</th>
                                </tr>
                            </thead>
                            <tbody v-if="loading">
                                <tr>
                                    <td colspan="2">Loading...</td>
                                </tr>
                            </tbody>
                            <tbody v-if="userData">
                                <tr>
                                    <th>Username</th>
                                    <td>{{ userData.username }}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{{ userData.email }}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{{ firstRole }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
