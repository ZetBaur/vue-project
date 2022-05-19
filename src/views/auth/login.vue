<template>
    <DxLoadIndicator
        v-if="loading"
        id="large-indicator"
        :height="60"
        :width="60"
    />

    <form class="login-form" @submit.prevent="onSubmit">
        <DxTextBox
            label-mode="floating"
            label="Login"
            v-model="formData.login"
        />
        <DxTextBox
            label-mode="floating"
            label="Пароль"
            v-model="formData.password"
        />
        <DxButton type="success" text="Войти" :use-submit-behavior="true" />
    </form>
</template>

<script setup>
import { useLoginStore } from '@/stores/auth/login-store';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import DxTextBox from 'devextreme-vue/text-box';
import DxButton from 'devextreme-vue/button';
import notify from 'devextreme/ui/notify';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const loginStore = useLoginStore();

const formData = reactive({
    login: '',
    password: ''
});

const onSubmit = async () => {
    try {
        if (!formData.login) throw new Error('Укажите Login');
        if (!formData.password) throw new Error('Укажите пароль');
        loading.value = true;
        await loginStore.login(formData);
        router.push('/');
        loading.value = false;
    } catch (error) {
        loading.value = false;
        notify(
            {
                message: error.message,
                width: 300,
                closeOnOutsideClick: true,
                position: {
                    at: 'top right',
                    my: 'top right',
                    offset: '-50 50'
                }
            },
            'error',
            121500
        );

        if (
            error.response &&
            (error.response.status === 400 || error.response.status === 401)
        ) {
            notify(
                {
                    message: 'Не верные Login или пароль',
                    width: 300,
                    closeOnOutsideClick: true,
                    position: {
                        at: 'top right',
                        my: 'top right',
                        offset: '-50 50'
                    }
                },
                'error',
                121500
            );
            formData.login = '';
            formData.password = '';
        }
    }
};
</script>

<style lang="scss">
.login-form {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 32px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .dx-button {
        margin-top: 16px;
    }
}
</style>