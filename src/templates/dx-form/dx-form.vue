<template>
    <form
        @submit="onFormSubmit($event)"
        style="width: 500px; margin-left: auto; margin-right: auto"
    >
        <DxTextBox
            label-mode="floating"
            label="Электронная почта"
            style="margin-bottom: 32px"
            :show-clear-button="true"
        >
            <DxValidator>
                <DxRequiredRule message="Укажите Email" />
                <DxEmailRule message="Ведите валидный Email" />
            </DxValidator>
        </DxTextBox>

        <br />

        <DxTextBox
            v-model:value="password"
            mode="password"
            label-mode="floating"
            label="Password"
            :show-clear-button="true"
        >
            <DxValidator>
                <DxRequiredRule message="Password is required" />
            </DxValidator>
        </DxTextBox>

        <br />

        <DxTextBox mode="password" label-mode="floating" label="gggggg">
            <DxValidator>
                <DxRequiredRule message="Confirm Password is required" />
                <DxCompareRule
                    :comparison-target="passwordComparison"
                    message="Password and Confirm Password do not match"
                />
            </DxValidator>
        </DxTextBox>

        <br />

        <DxTextBox value="Peter" label-mode="floating" label="Name">
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

        <br />

        <DxDateBox
            invalid-date-message="The date must have the following format: MM/dd/yyyy"
            picker-type="rollers"
            placeholder="Выберите дату"
        >
            <DxValidator>
                <DxRequiredRule message="Date of birth is required" />
                <DxRangeRule
                    :max="maxDate"
                    message="You must be at least 21 years old"
                />
            </DxValidator>
        </DxDateBox>

        <br />

        <DxSelectBox :data-source="countries">
            <DxValidator>
                <DxRequiredRule message="Country is required" />
            </DxValidator>
        </DxSelectBox>

        <br />

        <DxTextBox>
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

        <br />

        <DxTextBox
            :mask-rules="phoneRules"
            mask="+7 (X00) 000-0000"
            mask-invalid-message="The phone must have a correct USA phone format"
        >
            <DxValidator>
                <DxPatternRule
                    :pattern="phonePattern"
                    message="The phone must have a correct USA phone format"
                />
            </DxValidator>
        </DxTextBox>

        <br />

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
    DxEmailRule,
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
    components: {
        DxSelectBox,
        DxCheckBox,
        DxTextBox,
        DxDateBox,
        DxButton,
        DxValidator,
        DxRequiredRule,
        DxCompareRule,
        DxEmailRule,
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
<style >
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

/* .dx-invalid-message.dx-overlay-wrapper {
    visibility: visible;
}

.dx-invalid.dx-texteditor.dx-editor-outlined.dx-show-invalid-badge
    .dx-texteditor-input-container::after {
    display: none;
} */
</style>