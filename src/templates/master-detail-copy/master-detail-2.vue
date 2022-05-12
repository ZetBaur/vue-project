<template>
    <div class="actions-header">
        <DxButton :disabled="!selectedRows.length" text="Удалить запись" />
        <DxButton :disabled="!selectedRows.length" text="Смена ответственных" />
    </div>

    <DxLoadIndicator
        v-if="loading"
        id="large-indicator"
        :height="60"
        :width="60"
    />

    <DxDataGrid
        :data-source="employees"
        :showColumnLines="true"
        :column-auto-width="true"
        :allow-column-resizing="true"
        :showRowLines="true"
        :show-borders="true"
        key-expr="ID"
        @selection-changed="onSelectionChanged"
        @editing-start="logEvent('EditingStart')"
        @init-new-row="logEvent('InitNewRow')"
        @row-inserting="logEvent('RowInserting')"
        @row-inserted="logEvent('RowInserted')"
        @row-updating="logEvent('RowUpdating')"
        @row-updated="logEvent('RowUpdated')"
        @row-removing="logEvent('RowRemoving')"
        @row-removed="logEvent('RowRemoved')"
        @saving="logEvent('Saving')"
        @saved="logEvent('Saved')"
        @edit-canceling="logEvent('EditCanceling')"
        @edit-canceled="logEvent('EditCanceled')"
    >
        <DxExport :enabled="true" :allow-export-selected-data="true" />

        <DxSelection
            select-all-mode="allPages"
            show-check-boxes-mode="always"
            mode="multiple"
        />

        <DxFilterRow :visible="true" :show-operation-chooser="false" />

        <DxPaging :page-size="5" />

        <DxPager
            :allowed-page-sizes="[5, 10, 'all']"
            :show-page-size-selector="true"
            :show-navigation-buttons="true"
            :show-info="true"
        />

        <DxEditing
            :allow-updating="true"
            :allow-adding="true"
            :use-icons="true"
            mode="popup"
        />

        <DxColumn data-field="Prefix" caption="Title" />
        <DxColumn data-field="FirstName" />
        <DxColumn data-field="LastName" />
        <DxColumn data-field="Position" />

        <!-- ==================== -->

        <DxColumn data-field="State" caption="Штат">
            <DxLookup :data-source="states" />
        </DxColumn>

        <!-- ==================== -->

        <!-- <DxColumn :width="125" data-field="State" /> -->

        <DxColumn data-field="BirthDate" data-type="date" />

        <DxMasterDetail :enabled="true" template="masterDetailTemplate" />

        <template #masterDetailTemplate="{ data: employee }">
            <DetailTemplate :template-data="employee" />
        </template>
    </DxDataGrid>
</template>

<script setup>
import Axios from '@/axios/reqAxios.js'
import { onMounted, ref } from 'vue'
import { DxButton } from 'devextreme-vue/button'
import { DxLoadIndicator } from 'devextreme-vue/load-indicator'
import {
    DxDataGrid,
    DxColumn,
    DxMasterDetail,
    DxSelection,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxEditing,
    DxLookup,
    DxExport
} from 'devextreme-vue/data-grid'
import DetailTemplate from './detail-template.vue'
import service from './master-data.js'

const loading = false

// -----------------------------------

onMounted(async () => {
    try {
        const { data } = await Axios.get(
            '/manager-api/v2/campaign/tasks/page',
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI0MTg3NjUsIm1hbmFnZXJfaWQiOjg3LCJtZXJjaGFudF9pZCI6Miwicm9sZXMiOlsxLDE1XX0.NWlok8y4QDRdgWgYUuDSUQhaaV6pxHc1Lblci42WG046auLpsHWN9juVL88w2HNnrhSU22TXHWL53tqgdFXvR7F9GHqe3wdQoYGYmtQF2CHTLtnd4Q70wUbLicirz6ZdbZPhI7bCkCjvGpAzCnaKfcs1fMJCEqAhYJbBNgHjEhmj5bq4iaqErYNLPNkm3Jw9FrNvoh-QabMWDbKptn1CvEFtDhM0_CdfSYosOGYHxl226noQbsO1F8wcwbjAzHwReTGW8r675LTF_jTl4DmdaWGFc8BGBJuShEzJQfH9DLJLntCSfY03hjARewUESwPIiVvYL93KPPceDrp1JjFguA`,
                    'Content-Type': 'application/json'
                }
            }
        )

        console.log(data)
    } catch (error) {
        console.log(error)
    }
})

// -----------------------------------

const employees = service.getEmployees()

const states = employees.map((el) => el.State)

const selectedRows = ref([])

const logEvent = (e) => console.log(employees)

const onSelectionChanged = (e) => {
    selectedRows.value = e.selectedRowKeys
    console.log('onSelectionChanged', e.selectedRowKeys)
    console.log(selectedRows.value)
}
</script>

<style lang="scss">
// .dx-icon-spindown::before {
//     display: none;
// }

// .dx-datagrid-export-button .dx-icon-export-to {
//     position: relative;
//     width: 140px;

//     &:before {
//         display: none;
//     }

//     &:after {
//         content: 'Экспорт в Excell';
//         position: absolute;
//         top: 0;
//         left: 0;
//     }
// }
// .dx-toolbar-text-auto-hide .dx-button .dx-icon {
//     width: 75px;
//     position: relative;

//     &:before {
//         display: none;
//     }

//     &:after {
//         content: 'Добавить';
//         position: absolute;
//         top: 0;
//         left: 0;
//     }
// }
</style>
