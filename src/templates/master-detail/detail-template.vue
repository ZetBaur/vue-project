<template>
    <form action="your-action" @submit="onFormSubmit($event)">
        <div class="dx-fieldset">
            <div class="dx-fieldset-header">Credentials</div>
            <div class="dx-field">
                <DxTextBox label-mode="floating" label="Электронная почта">
                </DxTextBox>
            </div>
            <div class="dx-field">
                <DxTextBox
                    v-model:value="password"
                    mode="password"
                    label-mode="floating"
                    label="Пароль"
                >
                    <DxValidator>
                        <DxRequiredRule message="Введите пароль" />
                    </DxValidator>
                </DxTextBox>
            </div>
            <div class="dx-field">
                <DxTextBox
                    mode="password"
                    label-mode="floating"
                    label="Подтверждение пароля"
                >
                    <DxValidator>
                        <DxRequiredRule
                            message="Confirm Password is required"
                        />
                        <DxCompareRule
                            :comparison-target="passwordComparison"
                            message="Пароль и подтверждение пароля не совпадают"
                        />
                    </DxValidator>
                </DxTextBox>
            </div>
        </div>
        <div class="dx-fieldset">
            <div class="dx-fieldset-header">Personal Data</div>
            <div class="dx-field">
                <DxTextBox label-mode="floating" label="Name">
                    <DxValidator>
                        <DxRequiredRule message="Name is required" />
                        <DxPatternRule
                            :pattern="namePattern"
                            message="Do not use digits in the Name"
                        />
                        <DxStringLengthRule
                            :min="2"
                            message="Name must have at least 2 symbols"
                        />
                    </DxValidator>
                </DxTextBox>
            </div>
            <div class="dx-field">
                <DxDateBox
                    label-mode="floating"
                    label="Date of birth"
                    picker-type="rollers"
                    invalid-date-message="The date must have the following format: MM/dd/yyyy"
                >
                    <DxValidator>
                        <DxRequiredRule message="Date of birth is required" />
                        <DxRangeRule
                            :max="maxDate"
                            message="You must be at least 21 years old"
                        />
                    </DxValidator>
                </DxDateBox>
            </div>
        </div>
        <div class="dx-fieldset">
            <div class="dx-fieldset-header">Billing address</div>
            <div class="dx-field">
                <DxSelectBox
                    :data-source="countries"
                    label-mode="floating"
                    label="Country"
                >
                    <DxValidator>
                        <DxRequiredRule message="Country is required" />
                    </DxValidator>
                </DxSelectBox>
            </div>
            <div class="dx-field">
                <DxTextBox label-mode="floating" label="City">
                    <DxValidator>
                        <DxRequiredRule message="City is required" />
                        <DxPatternRule
                            :pattern="namePattern"
                            message="Do not use digits in the City name"
                        />
                        <DxStringLengthRule
                            :min="2"
                            message="City must have at least 2 symbols"
                        />
                    </DxValidator>
                </DxTextBox>
            </div>
            <div class="dx-field">
                <DxTextBox label-mode="floating" label="Address">
                    <DxValidator>
                        <DxRequiredRule message="Address is required" />
                    </DxValidator>
                </DxTextBox>
            </div>
            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Телефон"
                    :mask-rules="phoneRules"
                    mask="+7 (X00) 000-0000"
                    mask-invalid-message="The phone must have a correct USA phone format"
                >
                    <DxValidator>
                        <DxPatternRule
                            :pattern="phonePattern"
                            message="The phone must have a correct USA phone format"
                        />
                        <DxRequiredRule message="Введите телефон" />
                    </DxValidator>
                </DxTextBox>
            </div>
            <div>
                <DxCheckBox
                    id="check"
                    :value="false"
                    text="I agree to the Terms and Conditions"
                >
                    <DxValidator>
                        <DxCompareRule
                            :comparison-target="checkComparison"
                            message="You must agree to the Terms and Conditions"
                        />
                    </DxValidator>
                </DxCheckBox>
            </div>
        </div>

        <div class="dx-fieldset">
            <DxValidationSummary id="summary" />
            <DxButton
                id="button"
                :use-submit-behavior="true"
                text="Register"
                type="success"
            />
        </div>
    </form>
</template>

<script>
import DxSelectBox from 'devextreme-vue/select-box';
import DxCheckBox from 'devextreme-vue/check-box';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxButton from 'devextreme-vue/button';
import DxValidationSummary from 'devextreme-vue/validation-summary';
import {
    DxValidator,
    DxRequiredRule,
    DxCompareRule,
    // DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule
    // DxAsyncRule,
} from 'devextreme-vue/validator';

import notify from 'devextreme/ui/notify';
import service from './data.js';

const sendRequest = function (value) {
    const validEmail = 'test@dx-email.com';
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value === validEmail);
        }, 1000);
    });
};

export default {
    props: ['template-data'],
    components: {
        DxSelectBox,
        DxCheckBox,
        DxTextBox,
        DxDateBox,
        DxButton,
        DxValidator,
        DxRequiredRule,
        DxCompareRule,
        // DxEmailRule,
        DxPatternRule,
        DxStringLengthRule,
        DxRangeRule,
        // DxAsyncRule,
        DxValidationSummary
    },
    data() {
        const currentDate = new Date();
        return {
            countries: service.getCountries(),
            phoneRules: {
                X: /[02-9]/
            },
            password: '',
            namePattern: /^[^0-9]+$/,
            phonePattern: /^[02-9]\d{9}$/,
            maxDate: new Date(
                currentDate.setFullYear(currentDate.getFullYear() - 21)
            )
        };
    },
    methods: {
        passwordComparison() {
            return this.password;
        },
        checkComparison() {
            return true;
        },
        asyncValidation(params) {
            return sendRequest(params.value);
        },
        onFormSubmit(e) {
            notify(
                {
                    message: 'You have submitted the form',
                    position: {
                        my: 'center top',
                        at: 'center top'
                    }
                },
                'success',
                3000
            );

            e.preventDefault();
        }
    }
};
</script>
<style>
/* .dx-texteditor-input {
    margin: 0;
    padding: 7px 9px 8px;
    background: hsl(0deg 0% 0% / 0%);
    color: hsl(0deg 0% 20%);
    font-size: 1em;
    border-radius: 4px;
    min-height: 34px;
} */
#summary {
    padding-left: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
}

#button {
    display: block;
}
</style>
