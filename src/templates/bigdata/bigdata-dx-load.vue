<template>
    <div class="actions-header">
        <div class="actions-filter">
            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Карта"
                    :show-clear-button="true"
                    v-model="filterForm.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Статус"
                    :show-clear-button="true"
                    v-model="filterForm.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Филиал"
                    :show-clear-button="true"
                    v-model="filterForm.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Город"
                    :show-clear-button="true"
                    v-model="filterForm.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="ID"
                    :show-clear-button="true"
                    v-model="filterForm.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Телефон"
                    :show-clear-button="true"
                    :mask-rules="{ X: /[02-9]/ }"
                    mask="+7 (000) 000-0000"
                    v-model="filterForm.phoneInput"
                />
            </div>

            <div class="dx-field">
                <DxDateBox
                    value="new Date()"
                    :show-clear-button="true"
                    picker-type="rollers"
                    label-mode="floating"
                    label="Дата"
                    v-model="filterForm.dateInput"
                />
            </div>
        </div>

        <div class="actions-buttons">
            <DxButton
                type="danger"
                :disabled="!selectedRows.length"
                text="Удалить запись"
            />
            <DxButton
                type="success"
                :disabled="!selectedRows.length"
                text="Смена ответственных"
            />
        </div>
    </div>

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
        <DxColumn data-field="id" data-type="number" caption="ID" />

        <DxColumn
            caption="Условия"
            data-field="conditions_ml.ru"
            data-type="number"
            width="200"
        />

        <DxColumn
            caption="Описание"
            data-field="description_ml.ru"
            data-type="number"
            width="200"
        />

        <DxColumn
            caption="Описание"
            data-field="short_conditions_ml.ru"
            data-type="string"
            width="200"
        />

        <DxColumn
            caption="Короткое описание"
            data-field="short_description_ml.ru"
            data-type="number"
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

        <DxExport :enabled="true" :allow-export-selected-data="true" />

        <DxPaging v-model:page-size="pageSize" v-model:page-index="pageIndex" />

        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[10, 20, 30, 50]"
            :show-navigation-buttons="true"
            :show-info="true"
        />

        <DxSelection
            select-all-mode="page"
            show-check-boxes-mode="always"
            mode="multiple"
        />

        <DxColumnChooser :enabled="true" />

        <DxToolbar>
            <DxItem location="before" name="exportButton" />
            <DxItem location="before" name="columnChooserButton" />
        </DxToolbar>

        <DxMasterDetail :enabled="true" template="masterDetailTemplate" />

        <DxSorting mode="multiple" />

        <template #masterDetailTemplate="{ data }">
            <DetailsTemplate :template-data="data" />
        </template>
    </DxDataGrid>
</template>

<script setup>
import Axios from '../../axios/reqAxios';
import { ref, reactive } from 'vue';
import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import { DxButton } from 'devextreme-vue/button';
import notify from 'devextreme/ui/notify';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxSelection,
    DxExport,
    DxColumnChooser,
    DxSorting,
    DxToolbar,
    DxItem,
    DxMasterDetail
} from 'devextreme-vue/data-grid';
import DetailsTemplate from './details-template.vue';
import CustomStore from 'devextreme/data/custom_store';

const loading = ref(false);

// let pageData = ref({
//     pageSize: 10,
//     pageIndex: 0,
//     sort: 'id,desc'
// });

let pageSize = ref(10);
let pageIndex = ref(0);
let sort = ref('id,desc');

// ----------- filter inputs ---------------------------------

const filterForm = reactive({
    cardInput: null,
    phoneInput: null,
    dateInput: null
});

// ------------ table ------------------------------

const dataGridKey = ref(0);
const forceRerender = () => (dataGridKey.value += 1);
const dataSource = ref(null);
const store = new CustomStore({
    key: 'id',
    async load() {
        let params = {
            page: pageIndex.value + 1,
            size: pageSize.value,
            sort: sort.value,
            date: new Date()
        };
        try {
            const { data } = await Axios.get(
                'manager-api/v2/campaign/campaigns/page',
                {
                    params: params
                }
            );
            const info = {
                data: data.content,
                totalCount: data.totalElements
                // summary: r.data.summary,
                // groupCount: r.data.groupCount
            };
            notify(
                {
                    message: `The button was clicked`,
                    width: 300,
                    // height: 100,
                    // shading: false,
                    closeOnOutsideClick: true,
                    hideOnParentScroll: true,
                    // position: 'center center'
                    position: {
                        at: 'top right',
                        my: 'top right',
                        offset: '-50 50'
                    }
                },
                'success',
                121500
            );
            return info;
        } catch (error) {
            console.log(error);
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

// --------------------------------
</script>
