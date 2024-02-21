<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const { userData, firstRole } = useApplicationStore();

const userIdRef = ref(null);

const urlRef = computed(() => {
    return `http://localhost:9090/api/citizen/user/${userIdRef.value}`;
});

const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    userIdRef.value = userData.id;
    performRequest();
});
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
                    <div class="mb-4" v-if="data && firstRole==='ROLE_USER'">
                        <h1 class="fs-3">Citizen Profile</h1>
                    </div>
                    <div v-if="data && firstRole==='ROLE_USER'">
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
                            <tbody>
                                <tr>
                                    <th>Citizen Id</th>
                                    <td>{{ data.citizenId }}</td>
                                </tr>
                                <tr>
                                    <th>First Name</th>
                                    <td>{{ data.firstName }}</td>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <td>{{ data.lastName }}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{{ data.email }}</td>
                                </tr>
                                <tr>
                                    <th>Region</th>
                                    <td>{{ data.region }}</td>
                                </tr>
                                <tr>
                                    <th>Blood donor</th>
                                    <td>{{ data.donor ? 'Yes' : 'No' }}</td>
                                </tr>
                                <tr>
                                    <th>Blood Type</th>
                                    <td>{{ data.bloodTypeString }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
