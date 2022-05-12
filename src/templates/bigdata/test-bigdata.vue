<template>
    <DxLoadIndicator
        v-if="loading"
        id="large-indicator"
        :height="60"
        :width="60"
    />

    <DxDataGrid
        :data-source="info"
        :show-borders="true"
        :remote-operations="true"
        :showColumnLines="true"
        :column-auto-width="true"
        :allow-column-resizing="true"
        :showRowLines="true"
        @selection-changed="onSelectionChanged"
        ref="myDataGrid"
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
            :page-size="10"
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
import CustomStore from 'devextreme/data/custom_store'
const loading = ref(false)

const info = ref(null)

// --------- paging ------------------------

const pageSize = ref(20)
const pageIndex = ref(0)

const myDataGrid = ref(null)

const changePageSize = (value) => {
    console.log(value)
    pageSize.value = value
}
const goToLastPage = () => {
    const pageCount = myDataGrid.value.instance.pageCount()
    pageIndex.value = pageCount - 1
}

// --------- paging ------------------------

onMounted(async () => {
    console.log(myDataGrid.value.instance)

    try {
        loading.value = true
        const { data } = await Axios.get(
            'manager-api/v2/contactCenter/requests/page'
        )
        info.value = data.content
        pageSize.value = data.pageSize
        pageIndex.value = data.page
        loading.value = false

        console.log(data)
    } catch (error) {
        loading.value = false
        console.log(error)
    }
})

const selectedRows = ref([])

const logEvent = (e) => console.log(employees)

const onSelectionChanged = (e) => {
    selectedRows.value = e.selectedRowKeys
    console.log('onSelectionChanged', e.selectedRowKeys)
    console.log(selectedRows.value)
}

// ----------------------------------------

// function isNotEmpty(value) {
//     return value !== undefined && value !== null && value !== ''
// }

// const store = new CustomStore({
//     key: 'OrderNumber',
//     async load(loadOptions) {
//         console.log(loadOptions)

//         let params = '?'
//         ;[
//             'skip',
//             'take',
//             'requireTotalCount',
//             'requireGroupCount',
//             'sort',
//             'filter',
//             'totalSummary',
//             'group',
//             'groupSummary'
//         ].forEach((i) => {
//             if (i in loadOptions && isNotEmpty(loadOptions[i])) {
//                 params += `${i}=${JSON.stringify(loadOptions[i])}&`
//             }
//         })
//         params = params.slice(0, -1)

//         console.log('params', params)

//         try {
//             const res = await fetch(
//                 `https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`
//             )
//             let data = await res.json()

//             const info = {
//                 data: data.data,
//                 totalCount: data.totalCount,
//                 summary: data.summary,
//                 groupCount: data.groupCount
//             }
//             console.log('data', data)

//             return info
//         } catch (error) {
//             console.log(error)
//         }
//     }
// })

// const dataSource = store
</script>
