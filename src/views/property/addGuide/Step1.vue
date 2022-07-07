<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" style="margin: 20px auto 0;">
      <a-row>
        <a-col :span="12">
          <a-form-model-item
            label="所属公司"
            :labelCol="labelCol"
            prop="company"
            :wrapperCol="wrapperCol"
          >
            <a-select v-model="form.company">
              <a-select-option
                :value="item.id"
                v-for="(item, index) in select"
                :key="index"
              >{{ item.companyFullName }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item
            label="住宅编码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            prop="estateCode"
            ref="estateCode"
          >
            <a-input v-model="form.estateCode" @blur="() => {$refs.estateCode.onFieldBlur()}" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="住宅名称"
            prop="estateName"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="form.estateName" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="占地面积(平房米)" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.coverArea"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="建筑面积(平房米)" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.buildArea"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="绿地面积(平房米)" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.greenArea"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="道路面积(平房米)" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.roadArea"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item
            label="楼宇数量"
            :labelCol="labelCol"
            prop="buildingNumber"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model.number="form.buildingNumber" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="负责人" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.buildingLeader"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-form-model-item label="住宅地址" :labelCol="{span: 3}" :wrapperCol="{span: 20}">
          <a-input v-model="form.estateAddr"/>
        </a-form-model-item>
      </a-row>
      <a-row>
        <div style="text-align:center;">----开发商信息----</div>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="公司名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.companyName"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="法人代表" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.companyBehalf"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.contact"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="form.contactPhone"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-form-model-item label="备注" :labelCol="{span: 3}" :wrapperCol="{span: 20}">
          <a-input v-model="form.remark"/>
        </a-form-model-item>
      </a-row>
      <a-form-model-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep(123)">下一步</a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">Reset</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { selectCompany, insertEstate } from '@/api/estate'
const QS = require('qs')
export default {
    name: 'Step1',
    data() {
        return {
            select: [],
            labelCol: { lg: { span: 6 }, sm: { span: 4 } },
            wrapperCol: { lg: { span: 16 }, sm: { span: 20 } },
            form: {
                company: [],
                estateCode: '',
                estateName: '',
                coverArea: '',
                buildArea: '',
                greenArea: '',
                roadArea: '',
                buildingNumber: '',
                buildingLeader: '',
                estateAddr: '',
                companyName: '',
                companyBehalf: '',
                contact: '',
                contactPhone: '',
                remark: ''
            },
            rules: {
                estateCode: [
                    { required: true, message: '住宅编码必须填写', trigger: 'blur' }
                    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
                company: [{ required: true, message: '所属公司必须填写', trigger: 'change' }],
                estateName: [{ required: true, message: '楼宇名称必须填写', trigger: 'blur' }],
                buildingNumber: [
                    {
                        required: true,
                        message: '楼宇数量必须填写',
                        trigger: 'change'
                    },
                    { min: 1, max: 20, type: 'number', message: 'Length should be 1 to 20', trigger: 'change' }
                ]
            }
        }
    },
    created() {
        selectCompany().then(res => {
            this.select = res.result
        }).catch(err => {
            this.$notification['error']({
                message: '错误',
                description: err.toString(),
                duration: 1
            })
        })
    },
    methods: {
        nextStep() {
            console.log('name' + this.form.estateName)
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    const data = QS.stringify(this.form)
                    insertEstate(data).then(res => {
                        if (res.message === '1') {
                            setTimeout(() => {
                                this.$notification.success({
                                    message: '成功',
                                    description: res.result
                                })
                            }, 1000)
                            this.$store.commit('SET_TITLE', {
                                buildingNumber: this.form.buildingNumber,
                                estateCode: this.form.estateCode
                            })
                            this.$emit('nextStep')
                        } else {
                            setTimeout(() => {
                                this.$notification.success({
                                    message: '失败',
                                    description: res.result
                                })
                            }, 1000)
                        }
                    }).catch(err => {
                        this.$notification.error({
                            message: '抱歉',
                            description: err.result
                        })
                    })
                } else {
                    return false
                }
            })
        },
        resetForm() {
            this.$refs.ruleForm.resetFields()
            console.log(this.$refs.ruleForm.resetFields)
        }
    }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
    padding: 0 56px;
    color: rgba(0, 0, 0, 0.45);

    h3 {
        margin: 0 0 12px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        line-height: 32px;
    }

    h4 {
        margin: 0 0 4px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
    }

    p {
        margin-top: 0;
        margin-bottom: 12px;
        line-height: 22px;
    }
}
.ant-form-item {
    margin-bottom: 8px;
}
</style>
