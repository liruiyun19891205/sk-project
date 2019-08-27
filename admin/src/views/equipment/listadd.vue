<template>
  <i-form :model="formItem" :label-width="100">
    <row>
      <i-col span="24">
        <Form-item label="验收计划">
          <i-select v-model.trim="formItem.PRO_ID" :model.sync="formItem.select" placeholder="验收计划">
            <i-option value="0">1</i-option>
            <i-option value="1">2</i-option>
          </i-select>
        </Form-item>
      </i-col>
    </row>
    <row>
      <i-col span="8">
        <Form-item label="设备编码">
          <i-input
            v-model="formItem.EQUIPMENT_CODE"
            :input-width="100"
            :value.sync="formItem.input"
            placeholder="设备编码"
          ></i-input>
        </Form-item>
      </i-col>
      <i-col span="8">
        <Form-item label="设备名称">
          <i-input
            v-model="formItem.SUB_PRO_NAME"
            :input-width="100"
            :value.sync="formItem.input"
            placeholder="设备名称"
          ></i-input>
        </Form-item>
      </i-col>
      <i-col span="8">
        <Form-item label="生产厂商">
          <i-input
            v-model="formItem.PRODUCTSUPPLIERS"
            :input-width="100"
            :value.sync="formItem.input"
            placeholder="生产厂商"
          ></i-input>
        </Form-item>
      </i-col>
    </row>
    <row>
      <i-col span="8">
        <Form-item label="案卷数">
          <i-input
            v-model="formItem.FONDS_NO"
            :input-width="80"
            :value.sync="formItem.input"
            placeholder="案卷数"
          ></i-input>
        </Form-item>
      </i-col>
      <i-col span="8">
        <Form-item label="外购/自研">
          <i-select v-model="formItem.SOURCE" :model.sync="formItem.select" placeholder="请选择">
            <i-option value="0">外购</i-option>
            <i-option value="1">自研</i-option>
          </i-select>
        </Form-item>
      </i-col>
      <i-col span="8">
        <Form-item label="进口/国产">
          <i-select v-model="formItem.IS_IMPORT" :model.sync="formItem.select" placeholder="请选择">
            <i-option value="0">进口</i-option>
            <i-option value="1">国产</i-option>
          </i-select>
        </Form-item>
      </i-col>
    </row>
    <row>
      <i-col span="8">
        <Form-item label="设备单价(万元)">
          <i-input
            v-model="formItem.SB_DJ"
            :input-width="80"
            :value.sync="formItem.input"
            placeholder="设备单价"
          ></i-input>
        </Form-item>
      </i-col>
      <i-col span="8">
        <Form-item label="设备合计(万元)">
          <i-input
            v-model="formItem.SB_HJ"
            :input-width="80"
            :value.sync="formItem.input"
            placeholder="设备合计"
          ></i-input>
        </Form-item>
      </i-col>
      <i-col span="8">
        <Form-item label="外汇(万美元)">
          <i-input
            v-model="formItem.SB_WH"
            :input-width="80"
            :value.sync="formItem.input"
            placeholder="外汇"
          ></i-input>
        </Form-item>
      </i-col>
    </row>
    <row>
      <i-col span="8">
        <Form-item label="进口原始金额">
          <i-input
            v-model="formItem.SB_YSJE"
            :input-width="80"
            :value.sync="formItem.input"
            placeholder="进口原始金额"
          ></i-input>
        </Form-item>
      </i-col>
      <i-col span="8">
        <Form-item label="进口币种">
          <i-select v-model="formItem.SB_BZ" :model.sync="formItem.select" placeholder="进口币种">
            <i-option value="0">人民币</i-option>
            <i-option value="1">其他</i-option>
          </i-select>
        </Form-item>
      </i-col>
      <i-col span="8">
        <Form-item label="招标情况">
          <i-input
            v-model="formItem.ZBQK"
            :input-width="80"
            :value.sync="formItem.input"
            placeholder="招标情况"
          ></i-input>
        </Form-item>
      </i-col>
    </row>
    <row>
      <i-col span="24">
        <Form-item label="备注">
          <i-input v-model="formItem.BZ" type="textarea" :rows="4" placeholder="备注"></i-input>
        </Form-item>
      </i-col>
    </row>
    <row>
      <i-col span="24" style="text-align:center">
        <Form-item>
          <i-button type="primary" @click="add">确定</i-button>
          <i-button type="primary" @click="goback">返回</i-button>
        </Form-item>
      </i-col>
    </row>
  </i-form>
</template>
<script>
import apiserver from "../../api/equipment";
import { log } from 'util';
export default {
  data() {
    return {
      id: this.$route.query.id,
      formItem: {
        PRO_ID: "", //计划ID
        EQUIPMENT_CODE: "", //设备编码
        SUB_PRO_NAME: "", //设备名称
        FONDS_NO: "", //档号
        SOURCE: "", //外购/自研
        IS_IMPORT: "", //进口国别
        DW_TT: "", //单位(台/套)
        SL: 0, //数量
        ZBQK: "", //招标情况
        BZ: "", //备注
        SB_DJ: 0, //单价(元)
        SB_HJ: 0, //合计(元)
        SB_WH: 0, //其中：外汇(美元)
        SB_YSJE: 0, //进口原始金额
        SB_BZ: 0, //币种
        // JK_GC: "", //进口还是国产
        PRODUCTSUPPLIERS: "" //产品供应商
      }
    };
  },
  methods: {
    async _save(obj) {
      let res = await apiserver.listadd(obj);
    },
    goback() {
      this.$router.push(`/list`);
    },
    add() {
      let EQUIPMENT_CODE = this.formItem.EQUIPMENT_CODE;
      let PRO_ID = "1"; //计划id，暂时写死的 110,以后记得改
      //this.formItem.PRO_ID;
      let SUB_PRO_NAME = this.formItem.SUB_PRO_NAME;
      let FONDS_NO = this.formItem.FONDS_NO;
      let SOURCE = this.formItem.SOURCE;
      let IS_IMPORT = this.formItem.IS_IMPORT;
      let DW_TT = this.formItem.DW_TT;
      let SL = this.formItem.SL;
      let ZBQK = this.formItem.ZBQK;
      let BZ = this.formItem.BZ;
      let SB_DJ = this.formItem.SB_DJ;
      let SB_HJ = this.formItem.SB_HJ;
      let SB_WH = this.formItem.SB_WH;
      let SB_YSJE = this.formItem.SB_YSJE;
      let SB_BZ = this.formItem.SB_BZ;
      let JK_GC = this.formItem.JK_GC;
      let PRODUCTSUPPLIERS = this.formItem.PRODUCTSUPPLIERS;
      let obj = {
        EQUIPMENT_CODE,
        PRO_ID,
        SUB_PRO_NAME,
        FONDS_NO,
        SOURCE,
        IS_IMPORT,
        DW_TT,
        SL,
        ZBQK,
        BZ,
        SB_DJ,
        SB_HJ,
        SB_WH,
        SB_YSJE,
        SB_BZ,
        JK_GC,
        PRODUCTSUPPLIERS
      };
      if (this.id) {
        obj.id=this.id;
        apiserver.listEdit(obj).then(res=>{
          console.log(res.code);
          if(res.data.code==200){
            this.$Message.success("修改成功!");
            this.$router.push(`/list`);
          }
        })
      } else {
        this._save(obj);
        this.$Message.success("新增成功!");
        this.$router.push(`/list`);
      }
    }
  },
  mounted() {
    //编辑
    if (this.id) {
      var obj = { id: this.id };
      apiserver.listByid(obj).then(res => {
        var list = res.data.data[0];
        this.formItem.EQUIPMENT_CODE = list.EQUIPMENT_CODE;
        this.formItem.PRO_ID = list.PRO_ID;
        this.formItem.SUB_PRO_NAME=list.SUB_PRO_NAME;
        this.formItem.FONDS_NO = list.FONDS_NO;
        this.formItem.SOURCE = list.SOURCE;
        this.formItem.IS_IMPORT = list.IS_IMPORT;
        this.formItem.DW_TT = list.DW_TT;
        this.formItem.SL = list.SL;
        this.formItem.ZBQK = list.ZBQK;
        this.formItem.BZ = list.BZ;
        this.formItem.SB_DJ = list.SB_DJ;
        this.formItem.SB_HJ = list.SB_HJ;
        this.formItem.SB_WH = list.SB_WH;
        this.formItem.SB_YSJE = list.SB_YSJE;
        this.formItem.SB_BZ = list.SB_BZ;
        this.formItem.JK_GC = list.JK_GC;
        this.formItem.PRODUCTSUPPLIERS = list.PRODUCTSUPPLIERS;
      });
    }
  }
};
</script>
