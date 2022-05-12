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
        :remote-operations="true"
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
        <DxColumn data-field="Prefix" caption="Title" />
        <DxColumn data-field="FirstName" />
        <DxColumn data-field="LastName" />
        <DxColumn data-field="Position" />

        <DxColumn data-field="State" caption="Штат">
            <DxLookup :data-source="states" />
        </DxColumn>

        <DxColumn data-field="BirthDate" data-type="date" />

        <DxMasterDetail :enabled="true" template="masterDetailTemplate" />

        <template #masterDetailTemplate="{ data: employee }">
            <DetailTemplate :template-data="employee" />
        </template>

        <!-- ======================================== -->

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
    </DxDataGrid>
</template>

<script setup>
import Axios from '@/axios/reqAxios.js'
import CustomStore from 'devextreme/data/custom_store'

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

const loading = ref(false)

// -----------------------------------

onMounted(async () => {
    try {
        loading.value = true
        const { data } = await Axios.get('manager-api/v2/campaign/tasks/page')
        loading.value = false
        console.log(data)
    } catch (error) {
        console.log(error)
    }
})

// -----------------------------------------

function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== ''
}

const store = new CustomStore({
    key: 'OrderNumber',
    async load(loadOptions) {
        let params = '?'
        ;[
            'skip',
            'take',
            'requireTotalCount',
            'requireGroupCount',
            'sort',
            'filter',
            'totalSummary',
            'group',
            'groupSummary'
        ].forEach((i) => {
            if (i in loadOptions && isNotEmpty(loadOptions[i])) {
                params += `${i}=${JSON.stringify(loadOptions[i])}&`
            }
        })
        params = params.slice(0, -1)

        console.log(params)

        try {
            loading.value = true
            const { data } = await Axios.get(
                `https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`
            )
            loading.value = false

            console.log('data', data)

            const info = {
                data: data.data,
                totalCount: data.data.length,
                summary: data.summary,
                groupCount: data.groupCount
            }

            return info
        } catch (error) {
            console.log(error)
        }
    }
})

const dataSource = store

console.log('store', store)

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
