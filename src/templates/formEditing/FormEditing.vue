<template>
    <div id="data-grid-demo">
        <DxDataGrid
            :key="dataGridKey"
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
            <DxEditing
                :allow-updating="true"
                :allow-adding="true"
                :allow-deleting="true"
                mode="form"
            />

            <DxPaging
                v-model:page-size="pageSize"
                v-model:page-index="pageIndex"
            />

            <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[10, 20, 30, 50]"
                :show-navigation-buttons="true"
                :show-info="true"
            />

            <!-- ----------------------------------------- -->

            <DxColumn
                data-field="id"
                data-type="number"
                caption="ID"
                width="70"
            />

            <DxColumn
                caption="Условия"
                data-field="conditions_ml.ru"
                data-type="string"
                width="100"
            />

            <DxColumn
                caption="Описание"
                data-field="description_ml.ru"
                data-type="string"
                width="150"
            />

            <DxColumn
                caption="Описание"
                data-field="short_conditions_ml.ru"
                data-type="string"
                width="100"
            />

            <DxColumn
                caption="Короткое описание"
                data-field="short_description_ml.ru"
                data-type="string"
                width="200"
            />

            <DxColumn
                caption="Название"
                data-field="title_ml.ru"
                data-type="string"
            />

            <DxColumn
                caption="Дата создания"
                data-field="dt_created"
                data-type="date"
            />

            <DxColumn
                caption="Дата изменения"
                data-field="dt_end"
                data-type="date"
            />

            <!-- <DxColumn
                caption="Тэги"
                data-field="dt_end"
                data-type="DxTagBox"
            /> -->

            <!-- <DxTagBox :items="simpleProducts" :search-enabled="true" /> -->
        </DxDataGrid>
    </div>
</template>
<script setup>
import Axios from '../../axios/reqAxios';
import notify from 'devextreme/ui/notify';

import {
    DxDataGrid,
    DxColumn,
    DxFormItem,
    DxPaging,
    DxEditing,
    DxLookup,
    DxPager
} from 'devextreme-vue/data-grid';
import 'devextreme-vue/text-area';

import CustomStore from 'devextreme/data/custom_store';

import { ref, reactive } from 'vue';

import { employees, states } from './data';

const dataSource = ref([]);

let pageSize = ref(10);
let pageIndex = ref(0);
let sort = ref('id,desc');

const get = async () => {
    const { data } = await Axios.get(
        'manager-api/v2/promotion/discounts/page',
        { params: params }
    );

    console.log(data);
};

// ------------ table ------------------------------

const dataGridKey = ref(0);
const forceRerender = () => (dataGridKey.value += 1);

const store = new CustomStore({
    key: 'id',
    async load() {
        let params = {
            page: pageIndex.value + 1,
            size: pageSize.value,
            sort: sort.value,
            show_all: true,
            type_id: null
        };
        try {
            const { data } = await Axios.get(
                process.env.VUE_APP_API_URL +
                    'manager-api/v2/promotion/discounts/page',
                { params }
            );

            const info = {
                data: data.content
                // totalCount: data.totalElements
                // summary: r.data.summary,
                // groupCount: r.data.groupCount
            };

            notify(
                {
                    message: `notify`,
                    width: 300,
                    // height: 100,
                    // shading: false,
                    closeOnOutsideClick: true,
                    hideOnParentScroll: true
                    // position: 'center center'
                    // position: {
                    //     at: 'top right',
                    //     my: 'top right',
                    //     offset: '-50 50'
                    // }
                },
                'success',
                121500
            );
            return info;
        } catch (error) {
            console.log('error', error);
        }
    }
});
dataSource.value = store;

// ----------  Selects -----------------------

const selectedRows = ref([]);

const onSelectionChanged = (e) => {
    selectedRows.value = e.selectedRowKeys;
    console.log('onSelectionChanged', e.selectedRowKeys);
    console.log(selectedRows.value);
};

// ---------- Events ----------------------

const logEvent = (e) => console.log(employees);

// --------------------------------

const handlePropertyChange = (e) => {
    if (e.fullName === 'paging.pageSize') {
        forceRerender();
    }
    // console.log('handlePropertyChange', e);

    handleSort(e);
};

const handleSort = (e) => {
    if (e.fullName === 'columns[0].sortOrder') {
        sort.value = e.value === 'asc' ? 'id, desc' : 'id, asc';
    }

    if (e.fullName === 'columns[1].sortOrder') {
        sort.value =
            e.value === 'asc' ? 'conditions_ml, desc' : 'conditions_ml, asc';
    }

    if (e.fullName === 'columns[2].sortOrder') {
        sort.value =
            e.value === 'asc' ? 'description_ml, desc' : 'description_ml, asc';
    }

    if (e.fullName === 'columns[3].sortOrder') {
        sort.value =
            e.value === 'asc'
                ? 'short_conditions_ml, desc'
                : 'short_conditions_ml, asc';
    }

    if (e.fullName === 'columns[4].sortOrder') {
        sort.value =
            e.value === 'asc'
                ? 'short_description_ml, desc'
                : 'short_description_ml, asc';
    }

    if (e.fullName === 'columns[5].sortOrder') {
        sort.value = e.value === 'asc' ? 'title_ml, desc' : 'title_ml, asc';
    }

    if (e.fullName === 'columns[6].sortOrder') {
        sort.value = e.value === 'asc' ? 'dt_created, desc' : 'dt_created, asc';
    }

    if (e.fullName === 'columns[6].sortOrder') {
        sort.value = e.value === 'asc' ? 'dt_end, desc' : 'dt_end, asc';
    }
};
</script>

<style>
#data-grid-demo {
    min-height: 700px;
}
</style>
