<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const store = useApplicationStore();

const route = useRoute();
const router = useRouter();
const applicationIdRef = ref(null);


const urlRef = computed(() => {
    return 'http://localhost:9090/api/donor-application/view/' + applicationIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    applicationIdRef.value = route.params.id;
    performRequest();
});

const onAcceptApplication = () => {
    console.log("Accept button clicked");
    reviewApplication(true);
};

const onRejectApplication = () => {
    console.log("Reject button clicked");
    reviewApplication(true);
};

const reviewApplication = (isAccepted) => {
    const reviewUrl = `http://localhost:9090/api/donor-application/review/${applicationIdRef.value}?isAccepted=${isAccepted}`;
    fetch(reviewUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + store.userData.accessToken
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("Application review updated successfully");
        } else {
            console.error("Failed to update application review");
        }
    })
    .then(() => {
            router.push({ name: 'applications' });
        })
    .catch(error => {
        console.error("Error:", error);
    });
};
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'applications' }"
                            >Back to Applications</RouterLink
                        >
                        <h1 class="fs-3">Application #{{ applicationIdRef }}</h1>
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
                            <tbody v-if="data">
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
                                    <th>Healthy</th>
                                    <td>{{ data.goodHealth }}</td>
                                </tr>
                                <tr>
                                    <th>Blood Type</th>
                                    <td>{{ data.bloodType }}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-success" @click="onAcceptApplication">Accept</button>
                        <button class="btn btn-danger" @click="onRejectApplication">Reject</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
