<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Row>
        <i-col span="12">
          <FormItem label="项目计划" prop="PRO_ID" :label-width="100">
            <i-input v-model="formValidate.PRO_ID" placeholder="项目计划id"></i-input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="工程编码" prop="INFRASTRUCTURE_CODE" :label-width="100">
            <i-input v-model="formValidate.INFRASTRUCTURE_CODE" placeholder="工程编码"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem label="工程分项名称" prop="SUB_PRO_NAME" :label-width="100">
            <i-input v-model="formValidate.SUB_PRO_NAME" placeholder="工程分项名称"></i-input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="卷宗号" prop="FONDS_NO" :label-width="100">
            <i-input v-model="formValidate.FONDS_NO" placeholder="卷宗号"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem label="建设总投资" prop="BUILD_M" :label-width="100">
            <i-input v-model="formValidate.BUILD_M" placeholder="建设总投资"></i-input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="征地面积" prop="NEED_AREA" :label-width="100">
            <i-input v-model="formValidate.NEED_AREA" placeholder="征地面积"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem label="新增建筑面积" prop="NEW_BUILD_AREA" :label-width="100">
            <i-input v-model="formValidate.NEW_BUILD_AREA" placeholder="新增建筑面积"></i-input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="改造建筑面积" prop="REBUILD_AREA" :label-width="100">
            <i-input v-model="formValidate.REBUILD_AREA" placeholder="改造建筑面积"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem label="REMARK" prop="REMARK" :label-width="100">
            <i-input v-model="formValidate.REMARK" placeholder="REMARK"></i-input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="NEED_SITE" prop="NEED_SITE" :label-width="100">
            <i-input v-model="formValidate.NEED_SITE" placeholder="NEED_SITE"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span='24'>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
          </FormItem>
        </i-col>
      </Row>
    </Form>
  </section>
</template>
<script>
  import infrastructureService from "../../api/infrastructure";
  import {
    log
  } from 'util';
  export default {
    data() {
      return {
        formValidate: {
          id: this.$route.params.id || '',
          PRO_ID: '',
          INFRASTRUCTURE_CODE: '',
          SUB_PRO_NAME: '',
          FONDS_NO: '',
          BUILD_M: '',
          NEED_AREA: '',
          NEW_BUILD_AREA: '',
          REBUILD_AREA: '',
          REMARK: '',
          NEED_SITE: '',
        },
        ruleValidate: {
          PRO_ID: [{
            required: true,
            message: '所属项目计划id不能为空',
            trigger: 'blur'
          }],
          INFRASTRUCTURE_CODE: [{
            required: true,
            message: '工程编码不能为空',
            trigger: 'blur'
          }],
          SUB_PRO_NAME: [{
            required: true,
            message: '工程分项名称不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      async _getInfo() {
        const res = await infrastructureService.getInfo({
          id: this.formValidate.id
        });
        this.formValidate = res.data.data;
      },
      async _saveData() {
        let res = null;
        if (this.formValidate.id) {
          try {
            await infrastructureService.create(this.formValidate);
            this.$Message.success('保存成功');
          } catch (error) {
            this.$Message.error(error);
          }
        } else {
          try {
            await infrastructureService.update(this.formValidate);
            this.$Message.success('保存成功');
          } catch (error) {

          }
        }
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._saveData();
            this.$router.push(`/infrlist`);
          } else {
            this.$Message.error('请填写必填项!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$router.push(`/infrlist`);
      }
    },
    mounted() {
      if (this.formValidate.id) {
        this._getInfo();
      }
    }
  }

</script>
