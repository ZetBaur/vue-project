<template>
    <DxLoadIndicator
        v-if="loading"
        id="large-indicator"
        :height="60"
        :width="60"
    />

    <DxDataGrid
        :data-source="dataSource"
        key-expr="id"
        :show-borders="true"
        :showColumnLines="true"
        :column-auto-width="true"
        :allow-column-resizing="true"
        :showRowLines="true"
        @selection-changed="onSelectionChanged"
        @option-changed="handlePropertyChange"
    >
        >

        <DxColumn data-field="id" data-type="number" />

        <DxColumn data-field="clients_number" data-type="string" />
        <DxColumn data-field="dt_next_build" data-type="date" />

        <DxColumn data-field="name_ml.ru" data-type="string" />

        <DxColumn data-field="version" data-type="number" />

        <DxExport :enabled="true" :allow-export-selected-data="true" />

        <!-- <DxPaging v-model:page-size="pageSize" v-model:page-index="pageIndex" /> -->

        <DxPaging :page-size="10" />

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

        <DxSorting mode="none" />
    </DxDataGrid>
</template>

<script setup>
import Axios from '../../axios/reqAxios';
import { DxLoadIndicator } from 'devextreme-vue/load-indicator';
import { onMounted, ref } from 'vue';
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
} from 'devextreme-vue/data-grid';

const loading = ref(false);

let pageSize = ref(10);
let pageIndex = ref(0);

const changePageSize = (value) => {
    pageSize.value = value;
};

const handlePropertyChange = (e) => {
    // console.log('handlePropertyChange', e)
};

const dataSource = ref(null);

onMounted(async () => {
    let params = {
        page: pageIndex.value + 1,
        size: pageSize.value,
        sort: 'id,desc',
        date: new Date()
    };

    try {
        loading.value = true;

        const { data } = await Axios.get(
            'manager-api/v2//segment/segment/list'
        );

        loading.value = false;

        console.log('rrrrr', data);

        dataSource.value = data;
    } catch (error) {
        console.log(error);
    }
});

const selectedRows = ref([]);

const onSelectionChanged = (e) => {
    selectedRows.value = e.selectedRowKeys;
    console.log('onSelectionChanged', e.selectedRowKeys);
    console.log(selectedRows.value);
};
const logEvent = (e) => console.log(employees);
</script>
