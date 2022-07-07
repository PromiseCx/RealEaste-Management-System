<template>
  <div>
    <!-- <a-form-model ref="ruleForm" :model="form2" :label-col="labelCol" :wrapper-col="wrapperCol"> -->
    <a-row class="header">
      楼宇数量: {{ this.$store.state.oneStep.buildingNumber }}
      <span style="color: blue;font-weight: 700;"></span>
      单元数量:
      <!-- <a-form-model-item label="单元数量：" prop="region" class="units" :labelCol="labelCol" :wrapperCol="wrapperCol"> -->
      <a-select v-model="form2.region" @change="change()">
        <a-select-option value="1">1</a-select-option>
        <a-select-option value="2">2</a-select-option>
        <a-select-option value="3">3</a-select-option>
        <a-select-option value="4">4</a-select-option>
        <a-select-option value="5">5</a-select-option>
      </a-select>
      <!-- </a-form-model-item> -->
    </a-row>
    <a-row>
      <a-table :columns="columns" :dataSource="data" bordered align="center">
        <template
          v-for="col in [
            'buildingCode',
            'buildingName',
            'unitCount',
            'overRoofDate',
            'finishDate',
            'salePermissionId',
            'buildPermissionId',
            'constructionarea',
            'usedArea',
            'remark'
          ]"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">保存</a>
              <a-popconfirm title="确认取消吗?" @confirm="() => cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
            </span>
          </div>
        </template>
      </a-table>
      <a-row>
        <a-button type="primary" @click="nextStep()">下一步</a-button>&nbsp;
        <a-button type="primary" @click="prevStep()">上一步</a-button>
      </a-row>
    </a-row>
  </div>
</template>

<script>
import { selectBuilding, updateBuilding } from '@/api/estate'
const QS = require('qs')
const columns = [
    {
        align: 'center',
        title: '楼宇编码',
        dataIndex: 'buildingCode',
        width: '6%',
        scopedSlots: { customRender: 'buildingCode' }
    },
    {
        align: 'center',
        title: '楼宇名称',
        dataIndex: 'buildingName',
        width: '15%',
        scopedSlots: { customRender: 'buildingName' }
    },
    {
        align: 'center',
        title: '单元数量',
        dataIndex: 'unitCount',
        width: '6%',
        scopedSlots: { customRender: 'unitCount' }
    },
    {
        align: 'center',
        title: '封顶日期',
        dataIndex: 'overRoofDate',
        width: '7%',
        scopedSlots: { customRender: 'overRoofDate' }
    },
    {
        align: 'center',
        title: '竣工日期',
        dataIndex: 'finishDate',
        width: '7%',
        scopedSlots: { customRender: 'finishDate' }
    },
    {
        align: 'center',
        title: '预售许可证',
        dataIndex: 'salePermissionId',
        width: '7%',
        scopedSlots: { customRender: 'salePermissionId' }
    },
    {
        align: 'center',
        title: '建筑许可证',
        dataIndex: 'buildPermissionId',
        width: '7%',
        scopedSlots: { customRender: 'buildPermissionId' }
    },
    {
        align: 'center',
        title: '建筑面积',
        dataIndex: 'constructionarea',
        width: '6%',
        scopedSlots: { customRender: 'constructionarea' }
    },
    {
        align: 'center',
        title: '使用面积',
        dataIndex: 'usedArea',
        width: '6%',
        scopedSlots: { customRender: 'usedArea' }
    },
    {
        align: 'center',
        title: '备注',
        dataIndex: 'remark',
        width: '10%',
        scopedSlots: { customRender: 'remark' }
    },
    {
        align: 'center',
        title: '编辑',
        width: '4%',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
    }
]

const data = []
export default {
    name: 'Step2',
    data() {
        return {
            labelCol: { span: 2 },
            wrapperCol: { span: 1 },
            form2: {
                name: '',
                region: undefined,
                date1: undefined,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            data,
            columns,
            editingKey: ''
            // labelCol: { lg: { span: 5 }, sm: { span: 5 } },
            // wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
            // form: this.$form.createForm(this),
            // loading: false,
            // timer: 0
        }
    },
    created() {
        // 向后台发送请求，完成数据插入和回显的功能
        const sendData = {
            buildingNumber: this.$store.state.oneStep.buildingNumber,
            estateCode: this.$store.state.oneStep.estateCode
        }
        const parameter = QS.stringify(sendData)
        selectBuilding(parameter).then(res => {
            const result = res.result
            const myData = []
            for (let i = 0; i < result.length; i++) {
                const building = result[i]
                myData.push({
                    key: building.id,
                    buildingCode: building.buildingCode,
                    buildingName: building.buildingName,
                    unitCount: building.unitCount,
                    overRoofDate: building.overRoofDate,
                    finishDate: building.finishDate,
                    salePermissionId: building.salePermissionId,
                    buildPermissionId: building.buildPermissionId,
                    usedArea: building.usedArea,
                    remark: building.remark
                })
            }
            this.data = myData
            this.cacheData = this.data.map(item => ({ ...item }))
        }).catch(err => {
            this.$notification.success({
                message: '失败',
                description: err.result
            })
        })
    },
    methods: {
        change() {
            const unitNumber = this.form2.region
            for (let i = 0; i < this.data.length; i++) {
                this.data[i].unitCount = unitNumber
            }
        },
        nextStep() {
            // 获取表格中的数据
            const dataArray = this.data
            // 拼接字符串
            var param = '['
            for (let i = 0; i < dataArray.length; i++) {
                if (i !== dataArray.length - 1) {
                    param += '{ "buildingCode": "' + dataArray[i].buildingCode + '", "unitCount": ' + dataArray[i].unitCount + '},'
                } else {
                    param += '{ "buildingCode": "' + dataArray[i].buildingCode + '", "unitCount": ' + dataArray[i].unitCount + '}]'
                }
            }
            console.log('param:' + param)
            this.$store.commit('SET_TITLE', {
                unitMessage: param,
                estateCode: this.$store.state.oneStep.estateCode
            })
            this.$emit('nextStep')
        },
        prevStep() {
            this.$emit('prevStep')
        },
        handleChange(value, key, column) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            if (target) {
                target[column] = value
                this.data = newData
            }
        },
        edit(key) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            this.editingKey = key
            if (target) {
                target.editable = true
                this.data = newData
                this.editingKey = ''
            }
        },
        save(key) {
            // 此处逻辑完成的是保存之后数据能够正常显示
            console.log(key)
            const newData = [...this.data]
            const newCacheData = [...this.cacheData]
            const target = newData.filter(item => key === item.key)[0]
            const targetCache = newCacheData.filter(item => key === item.key)[0]
            if (target && targetCache) {
                delete target.editable
                this.data = newData
                Object.assign(targetCache, target)
                this.cacheData = newCacheData
            }
            // 获取表单中的单行数据
            // id不能正常回显，因此要进行设置
            target.id = key
            target.estateCode = this.$store.state.oneStep.estateCode
            // 数据格式转换
            const params = QS.stringify(target)
            updateBuilding(params).then(res => {
                setTimeout(() => {
                    this.$notification.success({
                        message: '恭喜',
                        description: res.result
                    })
                }, 1000)
            }).catch(err => {
                setTimeout(() => {
                    this.$notification.err({
                        message: '抱歉',
                        description: err.result
                    })
                }, 1000)
            })
        },
        cancel(key) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            this.editingKey = ''
            if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                delete target.editable
                this.data = newData
            }
        }
    },
    beforeDestroy() {
        //  clearTimeout(this.timer)
    }
}
</script>

<style lang="less" scoped>
.stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
        line-height: 22px;
    }
}
</style>
