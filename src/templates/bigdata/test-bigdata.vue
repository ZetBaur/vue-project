<template>
    <DxLoadIndicator
        v-if="loading"
        id="large-indicator"
        :height="60"
        :width="60"
    />

    <DxDataGrid
        @option-changed="handlePropertyChange"
        :data-source="dataSource"
        :show-borders="true"
        :remote-operations="true"
        :showColumnLines="true"
        :column-auto-width="true"
        :allow-column-resizing="true"
        :showRowLines="true"
        @selection-changed="onSelectionChanged"
        ref="myDataGrid"
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
    >
        >
        <DxColumn data-field="id" data-type="number" />
        <DxColumn data-field="dt_created" data-type="date" />
        <DxColumn data-field="client_name" data-type="string" />
        <DxColumn data-field="description" data-type="string" />
        <DxColumn data-field="status" data-type="string" />
        <DxColumn data-field="sub_status" data-type="string" />

        <!-- ============================== -->

        <DxExport :enabled="true" :allow-export-selected-data="true" />

        <DxFilterRow :visible="true" :show-operation-chooser="false" />

        <DxPaging
            :enabled="true"
            v-model:page-size="pageSize"
            v-model:page-index="pageIndex"
        />

        <DxPager
            :visible="true"
            :show-page-size-selector="true"
            :allowed-page-sizes="[10, 20, 30]"
            :show-navigation-buttons="true"
            :show-info="true"
            display-mode="full"
        />

        <DxSelection
            select-all-mode="allPages"
            show-check-boxes-mode="always"
            mode="multiple"
        />

        <DxColumnChooser :enabled="true" />
    </DxDataGrid>
</template>

<script setup>
import Axios from '../../axios/reqAxios'
import { DxLoadIndicator } from 'devextreme-vue/load-indicator'

import { onMounted, ref } from 'vue'
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxSelection,
    DxFilterRow,
    DxExport,
    DxColumnChooser
} from 'devextreme-vue/data-grid'
const loading = ref(false)

const dataSource = ref(null)

// --------- paging ------------------------

const pageSize = ref(10)
const pageIndex = ref(0)

// --------- paging ------------------------

const handlePropertyChange = function (e) {
    // console.log('handlePropertyChange', e)
    if (e.fullName === 'paging.pageSize') {
        pageSize.value = e.value
        console.log(pageSize.value)
    }
    if (e.fullName === 'paging.pageIndex') {
        pageIndex.value = e.value
        console.log(pageIndex.value)
    }
}

onMounted(async () => {
    try {
        loading.value = true
        const { data } = await Axios.get(
            'manager-api/v2/contactCenter/requests/page'
        )
        dataSource.value = data.content
        pageSize.value = data.pageSize
        pageIndex.value = data.page
        loading.value = false

        // console.log(data)
    } catch (error) {
        loading.value = false
        console.log(error)
    }
})

const selectedRows = ref([])

const onSelectionChanged = (e) => {
    // console.log('onSelectionChanged', e)
    selectedRows.value = e.selectedRowKeys
    // console.log('onSelectionChanged', e.selectedRowKeys)
    // console.log(selectedRows.value)
}

const logEvent = (eventName) => {
    console.log('eventName', eventName)
}
</script>
