<template>
    <DxLoadIndicator
        v-if="loading"
        id="large-indicator"
        :height="60"
        :width="60"
    />

    <DxDataGrid
        :data-source="dataSource"
        :show-borders="true"
        :remote-operations="true"
    >
        <DxColumn data-field="total_comments" data-type="string" />
        <!-- <DxColumn data-field="OrderDate" data-type="date" /> -->
        <DxColumn data-field="helpful_count" data-type="string" />
        <DxColumn data-field="product" data-type="string" />
        <DxColumn data-field="profile_name" data-type="string" />

        <DxPaging :page-size="10" />

        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[5, 10, 'all']"
        />
    </DxDataGrid>
</template>
<script setup>
import Axios from '../../axios/reqAxios'
import { DxLoadIndicator } from 'devextreme-vue/load-indicator'

import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager
} from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import { onMounted, ref } from 'vue'
// import 'whatwg-fetch'

const loading = ref(false)

function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== ''
}

// const dataSource = ref([])

// onMounted(async () => {
//     try {
//         loading.value = true
//         const { data } = await Axios.get(
//             'https://www.fakerestapi.com/datasets/api/v1/amazon-echo-reviews.json'
//         )

//         loading.value = false

//         console.log(data)

//         dataSource.value = data

//         console.log(dataSource.value)
//     } catch (error) {
//         console.log(error)
//     }
// })

const store = new CustomStore({
    key: 'profile_name',
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
                `https://www.fakerestapi.com/datasets/api/v1/amazon-echo-reviews.json${params}`
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

console.log(dataSource)
</script>
