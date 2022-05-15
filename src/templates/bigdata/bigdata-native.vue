<template>
    <div class="actions-header">
        <div class="actions-filter">
            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Тип обращения"
                    :show-clear-button="true"
                    v-model="cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Статус"
                    :show-clear-button="true"
                    v-model="cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Филиал"
                    :show-clear-button="true"
                    v-model="cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Город"
                    :show-clear-button="true"
                    v-model="cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="ID"
                    :show-clear-button="true"
                    v-model="cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Номер телефона"
                    :mask-rules="{ X: /[02-9]/ }"
                    mask="+7 (000) 000-0000"
                    v-model="phoneInput"
                />
            </div>

            <div class="dx-field">
                <DxDateBox
                    value="new Date()"
                    :show-clear-button="true"
                    picker-type="rollers"
                    label-mode="floating"
                    label="Дата"
                    v-model="dateInput"
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
        :data-source="dataSource"
        :show-borders="true"
        :showColumnLines="true"
        :column-auto-width="true"
        :allow-column-resizing="true"
        :showRowLines="true"
        @selection-changed="onSelectionChanged"
        @option-changed="handlePropertyChange"
    >
        <DxColumn data-field="id" data-type="number" />
        <DxColumn
            data-field="conditions_ml.ru"
            data-type="number"
            width="200"
        />
        <DxColumn
            data-field="description_ml.ru"
            data-type="number"
            width="200"
        />
        <DxColumn
            data-field="short_conditions_ml.ru"
            data-type="string"
            width="200"
        />
        <DxColumn
            data-field="short_description_ml.ru"
            data-type="number"
            width="200"
        />
        <DxColumn data-field="title_ml.ru" data-type="string" />
        <DxColumn data-field="dt_created" data-type="date" />
        <DxColumn data-field="dt_end" data-type="date" />

        <!-- <DxColumn data-field="client_phone" data-type="string" />
        <DxColumn data-field="description" data-type="string" />
        <DxColumn data-field="status" data-type="string" /> -->

        <DxExport :enabled="true" :allow-export-selected-data="true" />

        <DxSelection
            select-all-mode="page"
            show-check-boxes-mode="always"
            mode="multiple"
        />

        <DxColumnChooser :enabled="true" />

        <DxSorting mode="none" />

        <DxToolbar>
            <DxItem location="before" name="exportButton" />
            <DxItem location="before" name="columnChooserButton" />
        </DxToolbar>

        <!-- <DxPaging
            :page-size="requestParams.size"
            :page-index="requestParams.page"
        /> -->

        <DxPaging :page-size="pageSize" :page-index="pageIndex" />

        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[10, 20, 30]"
            :show-navigation-buttons="true"
            :show-info="true"
        />
    </DxDataGrid>
</template>

<script setup>
import Axios from '../../axios/reqAxios'
import { onMounted, ref, reactive } from 'vue'
import DxTextBox from 'devextreme-vue/text-box'
import DxDateBox from 'devextreme-vue/date-box'
import { DxButton } from 'devextreme-vue/button'

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
    DxItem
} from 'devextreme-vue/data-grid'

onMounted(() => {
    getData()
})

const handlePropertyChange = (e) => {
    console.log('handlePropertyChange', e)

    if (e.fullName === 'paging.pageIndex') {
        // requestParams.page = e.value
        pageIndex.value = e.value
        getData()
    }

    if (e.fullName === 'paging.pageSize') {
        // requestParams.size = e.value
        pageSize.value = e.value
        getData()
    }
}

// ------- get data --------------

const dataSource = ref(null)

// const requestParams = reactive({
//     page: 1,
//     size: 5,
//     sort: 'dt_created,desc',
//     date: new Date()
// })

const pageSize = ref(5)
const pageIndex = ref(0)

const getData = async () => {
    try {
        let requestParams = {
            page: pageIndex.value + 1,
            size: pageSize.value === 5 ? 10 : pageSize.value,
            sort: 'dt_created,desc',
            date: new Date()
        }
        console.log('requestParams', requestParams)
        const { data } = await Axios.get(
            'manager-api/v2/campaign/campaigns/page',
            {
                params: requestParams
            }
        )
        dataSource.value = data.content
        console.log('data', data)
    } catch (error) {
        console.log(error)
    }
}

// --- filter ---------

const cardInput = ref(null)
const phoneInput = ref(null)
const dateInput = ref(null)

// --- Selection -----------

const selectedRows = ref([])
const onSelectionChanged = (e) => {
    selectedRows.value = e.selectedRowKeys
    console.log('onSelectionChanged', e.selectedRowKeys)
    console.log(selectedRows.value)
}

// ---------------------

const logEvent = (e) => console.log(employees)

// ---------------------
</script>
