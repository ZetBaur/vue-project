<template>
    <DxDataGrid
        :data-source="dataSource"
        :show-borders="true"
        :remote-operations="true"
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
        <DxPaging :page-size="12" />
        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[8, 12, 20]"
        />
    </DxDataGrid>
</template>
<script setup>
import Axios from '../../axios/reqAxios'

import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager
} from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
// import 'whatwg-fetch'

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
