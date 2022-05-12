<template>
    <DxDataGrid
        :data-source="dataSource"
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
        <DxColumn data-field="OrderNumber" data-type="number" />
        <DxColumn data-field="OrderDate" data-type="date" />
        <DxColumn data-field="StoreCity" data-type="string" />
        <DxColumn data-field="StoreState" data-type="string" />
        <DxColumn data-field="Employee" data-type="string" />
        <DxColumn
            data-field="SaleAmount"
            data-type="number"
            format="currency"
        />

        <!-- ============================== -->
        <!-- <DxEditing
            :allow-updating="true"
            :allow-adding="true">
        /> -->

        <DxExport :enabled="true" :allow-export-selected-data="true" />

        <DxFilterRow :visible="true" />

        <DxPaging
            :page-size="10"
            v-model:page-size="pageSize"
            v-model:page-index="pageIndex"
        />

        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[10, 20, 30]"
            :show-navigation-buttons="true"
            :show-info="true"
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
import { ref } from 'vue'
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

// --------- paging ------------------------

const myDataGrid = ref(null)

const pageSize = ref(20)
const pageIndex = ref(0)

const changePageSize = (value) => {
    console.log(value)

    pageSize.value = value
}

const goToLastPage = () => {
    const pageCount = refs['myDataGrid'].instance.pageCount()
    pageIndex.value = pageCount - 1
}

// --------- paging ------------------------

function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== ''
}

const store = new CustomStore({
    key: 'OrderNumber',
    async load(loadOptions) {
        console.log(loadOptions)

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

        console.log('params', params)

        try {
            const res = await fetch(
                `https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`
            )
            let data = await res.json()

            const info = {
                data: data.data,
                totalCount: data.totalCount,
                summary: data.summary,
                groupCount: data.groupCount
            }
            console.log('data', data)

            return info
        } catch (error) {
            console.log(error)
        }
    }
})

const selectedRows = ref([])

const logEvent = (e) => console.log(employees)

const onSelectionChanged = (e) => {
    selectedRows.value = e.selectedRowKeys
    console.log('onSelectionChanged', e.selectedRowKeys)
    console.log(selectedRows.value)
}

// const store = new CustomStore({
//     key: 'OrderNumber',
//     async load(loadOptions) {
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

const dataSource = store
</script>
