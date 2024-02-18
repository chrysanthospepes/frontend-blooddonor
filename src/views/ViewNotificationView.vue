<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const { userData } = useApplicationStore();

const userIdRef = ref(null);

const urlRef = computed(() => {
    return `http://localhost:9090/api/notification/${userIdRef.value}`;
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
                    <div v-if="data && data.length">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Notification ID</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody v-if="loading">
                                <tr>
                                    <td colspan="3">Loading...</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr v-for="notification in data" :key="notification.notificationId">
                                    <td>{{ notification.notificationId || 'No ID' }}</td>
                                    <td>{{ notification.message }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <p>No notifications found.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>