<template>
    <DxLoadIndicator
        v-if="loading"
        id="large-indicator"
        :height="60"
        :width="60"
    />
    <div class="actions-header">
        <div class="actions-filter">
            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Карта"
                    :show-clear-button="true"
                    v-model="filter.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Статус"
                    :show-clear-button="true"
                    v-model="filter.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Филиал"
                    :show-clear-button="true"
                    v-model="filter.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Город"
                    :show-clear-button="true"
                    v-model="filter.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="ID"
                    :show-clear-button="true"
                    v-model="filter.cardInput"
                />
            </div>

            <div class="dx-field">
                <DxTextBox
                    label-mode="floating"
                    label="Номер телефона"
                    :mask-rules="{ X: /[02-9]/ }"
                    mask="+7 (000) 000-0000"
                    v-model="filter.phoneInput"
                />
            </div>

            <div class="dx-field">
                <DxDateBox
                    value="new Date()"
                    :show-clear-button="true"
                    picker-type="rollers"
                    label-mode="floating"
                    label="Дата"
                    v-model="filter.dateInput"
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
import { ref, reactive } from 'vue'
import DxTextBox from 'devextreme-vue/text-box'
import DxDateBox from 'devextreme-vue/date-box'
import { DxButton } from 'devextreme-vue/button'
import { DxLoadIndicator } from 'devextreme-vue/load-indicator'
import notify from 'devextreme/ui/notify'
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

const loading = ref(false)
const dataSource = ref(null)
let pageSize = ref(20)
let pageIndex = ref(0)

const filter = reactive({
    cardInput: null,
    phoneInput: null,
    dateInput: null
})

const store = new CustomStore({
    key: 'id',
    async load() {
        let params = {
            page: pageIndex.value + 1,
            size: pageSize.value,
            sort: 'id,desc',
            date: new Date()
        }

        try {
            loading.value = true
            const { data } = await Axios.get(
                'manager-api/v2/campaign/campaigns/page',
                {
                    params: params
                }
            )
            const info = {
                data: data.content,
                totalCount: data.totalElements
                // summary: r.data.summary,
                // groupCount: r.data.groupCount
            }
            loading.value = false
            notify(
                {
                    message: `The button was clicked`,
                    width: 300,
                    // height: 100,
                    // shading: false,
                    closeOnOutsideClick: true,
                    // hideOnParentScroll: true,
                    // position: "center center",
                    position: {
                        at: 'top right',
                        my: 'top right',
                        offset: '-50 50'
                    }
                },
                'success',
                121500
            )
            return info
        } catch (error) {
            console.log(error)
        }
    }
})

dataSource.value = store

// ----------  Selects -----------------------

const selectedRows = ref([])

const onSelectionChanged = (e) => {
    selectedRows.value = e.selectedRowKeys
    console.log('onSelectionChanged', e.selectedRowKeys)
    console.log(selectedRows.value)
}

// ---------- Events ----------------------

const logEvent = (e) => console.log(employees)

// --------------------------------

const handlePropertyChange = (e) => {
    // console.log('handlePropertyChange', e)
}

// --------------------------------
</script>
