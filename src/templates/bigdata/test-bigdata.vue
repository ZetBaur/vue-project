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
        @option-changed="handlePropertyChange"
    >
        >

        <DxColumn data-field="id" data-type="number" />

        <DxColumn
            data-field="conditions_ml.ru"
            data-type="string"
            width="250"
        />
        <DxColumn data-field="dt_created" data-type="date" />

        <DxColumn
            data-field="description_ml.ru"
            data-type="string"
            width="250"
        />

        <DxColumn data-field="title_ml.ru" data-type="string" />

        <DxColumn
            data-field="short_description_ml.ru"
            data-type="string"
            width="250"
        />

        <DxExport :enabled="true" :allow-export-selected-data="true" />

        <DxPaging v-model:page-size="pageSize" v-model:page-index="pageIndex" />

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

        <DxSorting mode="none" />
    </DxDataGrid>
</template>

<script setup>
import Axios from '../../axios/reqAxios'
import { onMounted, ref } from 'vue'
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxSelection,
    DxFilterRow,
    DxExport,
    DxColumnChooser,
    DxSorting
} from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'

let pageSize = ref(30)
let pageIndex = ref(0)

const handlePropertyChange = (e) => {
    // console.log('handlePropertyChange', e)
}

// const changePageSize = (value) => {
//     pageSize.value = value
// }

// const goToLastPage = () => {
//     const pageCount = refs['myDataGrid'].instance.pageCount()
//     pageIndex.value = pageCount - 1
// }

// function isNotEmpty(value) {
//     return value !== undefined && value !== null && value !== ''
// }

const dataSource = ref(null)

const store = new CustomStore({
    key: 'id',
    async load() {
        let params = {
            page: pageIndex.value + 1,
            size: pageSize.value,
            sort: 'id,desc',
            date: new Date()
        }

        // console.log('params', params)

        try {
            const { data } = await Axios.get(
                'manager-api/v2/campaign/campaigns/page',
                {
                    params: params
                }
            )

            console.log('rrrrr', data)

            const info = {
                data: data.content,
                totalCount: data.totalElements
                // summary: r.data.summary,
                // groupCount: r.data.groupCount
            }

            return info
        } catch (error) {
            console.log(error)
        }
    }
})

dataSource.value = store

const selectedRows = ref([])

const onSelectionChanged = (e) => {
    selectedRows.value = e.selectedRowKeys
    console.log('onSelectionChanged', e.selectedRowKeys)
    console.log(selectedRows.value)
}
const logEvent = (e) => console.log(employees)
</script>
