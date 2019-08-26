<template>
  <div>
    <Row>
      <table>
        <tr>
          <td>设备名称：</td>
          <td>
            <i-input :value.sync="value" placeholder="请输入..." style="width: 300px"></i-input>
            <i-button type="primary">确定</i-button>
            <i-button type="primary" @click="add1">添加</i-button>
          </td>
        </tr>
      </table>
    </Row>
    <Row>
      <i-col span="24">
        <i-table
          :border="showBorder"
          :stripe="showStripe"
          :show-header="showHeader"
          :height="fixedHeader ? 250 : ''"
          :size="tableSize"
          :data="tableData"
          :columns="tableColumns"
        ></i-table>
      </i-col>
    </Row>
    <Modal v-model="modal.isShow" :footer-hide="true" title="批量处理">
      <div style="height: 132px;">
        <Input type="textarea" :rows="4" />
        <Button type="primary" class="btncss">同意</Button>
        <Button type="primary" class="btncss">拒绝</Button>
        <Button type="primary" class="btncss">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import apiserver from "../../api/equipment";
export default {
  data() {
    return {
      value: "",
      modal: {
        isShow: false,
        title: ""
      },
      tableData:[],
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      fixedHeader: false,
      tableSize: "default"
    };
  },
  methods: {
    add() {
      this.modal.isShow = true;
    },
    add1(){
      this.$router.push(`/listadd`);
      //  this.$router.push(`/listadd/${id}`);
    },
    async getList() {
      let res = await apiserver.list();
      this.tableData=res.data.data;
    }
  },
  computed: {
    tableColumns() {
      let columns = [];
      columns.push({
        title: "ID",
        key: "id",
        sortable: true
      });
      columns.push({
        title: "设备名称",
        key: "SUB_PRO_NAME"
      });
      columns.push({
        title: "设备编码",
        key: "EQUIPMENT_CODE",
        sortable: true,
      });
      return columns;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>