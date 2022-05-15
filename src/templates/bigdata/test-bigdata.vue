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
        :remote-operations="true"
        :showColumnLines="true"
        :column-auto-width="true"
        :allow-column-resizing="true"
        :showRowLines="true"
        @selection-changed="onSelectionChanged"
        @option-changed="handlePropertyChange"
    >
        <DxColumn data-field="id" data-type="number" />
        <DxColumn data-field="actor_id" data-type="number" />
        <DxColumn data-field="category_id" data-type="number" />
        <DxColumn data-field="client" data-type="string" />
        <DxColumn data-field="client_city_id" data-type="number" />
        <DxColumn data-field="client_name" data-type="string" />
        <DxColumn data-field="dt_created" data-type="date" />
        <DxColumn data-field="dt_updated" data-type="date" />
        <DxColumn data-field="client_phone" data-type="string" />
        <DxColumn data-field="description" data-type="string" />
        <DxColumn data-field="status" data-type="string" />

        <DxExport :enabled="true" :allow-export-selected-data="true" />

        <DxPaging v-model:page-size="pageSize" v-model:page-index="pageIndex" />

        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[10, 20, 30]"
            :show-navigation-buttons="true"
            :show-info="true"
        />

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
    </DxDataGrid>
</template>

<script setup>
import Axios from '../../axios/reqAxios'
import { onMounted, ref } from 'vue'
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
import CustomStore from 'devextreme/data/custom_store'

onMounted(() => console.log('mounted'))

let pageSize = ref(10)
let pageIndex = ref(0)

const dataSource = ref(null)

// --- filter ---------

const cardInput = ref(null)
const phoneInput = ref(null)
const dateInput = ref(null)

// try {
// } catch (error) {}

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
                'manager-api/v2/contactCenter/requests/page',
                {
                    params: params
                }
            )

            // console.log('data', data)

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
const handlePropertyChange = (e) => {
    // console.log('handlePropertyChange', e)
}
</script>
