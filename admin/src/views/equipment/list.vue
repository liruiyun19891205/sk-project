<template>
  <div>
    <Row>
      <table>
        <tr>
          <td>设备名称：</td>
          <td>
            <i-input
              v-model="SUB_PRO_NAME"
              :value.sync="value"
              placeholder="请输入..."
              style="width: 300px"
            ></i-input>
            <i-button type="primary" @click="select">查询</i-button>
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
      <i-col span="24">
        <section class="page">
          <Page
            :total="page.total"
            :page-size="page.per_page"
            :current="page.current_page"
            show-total
            @on-change="handlePage"
          ></Page>
        </section>
      </i-col>
    </Row>
  </div>
</template>
<script>
import apiserver from "../../api/equipment";
import { log } from "util";
export default {
  data() {
    return {
      page: {
        current_page: 1,//当前第几页
        per_page: 10 //一页有几条
      },
      SUB_PRO_NAME: "",
      value: "",
      modal: {
        isShow: false,
        title: ""
      },
      tableData: [],
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
    select() {
      this.getList();
    },
    add() {
      this.modal.isShow = true;
    },
    add1() {
      this.$router.push(`/listadd`);
      //  this.$router.push(`/listadd/${id}`);
    },
    //查询
    async getList(index, pageSize) {
      var SUB_PRO_NAME = this.SUB_PRO_NAME;
      let res = await apiserver.list({
        SUB_PRO_NAME,
        index: index,
        pageSize: pageSize
      });
      this.tableData = res.data.data.list;
      this.page.total = res.data.data.count;
    },
    // 分页事件
    handlePage(index) {
      this.page.current_page = index;
      this.getList(this.page.current_page, this.page.per_page);
    },
    // 渲染操作按钮
    renderAction(h, params) {
      return (h, params) => {
        if (params.column.key === "delete") {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                on: {
                  click: () => {
                    params.column.key === "delete"
                      ? this.deleteList(params)
                      : null;
                  }
                }
              },
              "删除"
            )
          ]);
        } else if (params.column.key === "edit") {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                on: {
                  click: () => {
                    params.column.key === "edit" ? this.editList(params) : null;
                  }
                }
              },
              "编辑"
            )
          ]);
        }
      };
    },
    deleteList(params) {
      let id = params.row.ID;

      this.$Modal.confirm({
        title: "删除提示",
        content: "<p style='color:red;'>你确认删除此条信息</p>",
        onOk: () => {
          apiserver.listdel({ id }).then(res => {
            console.log(res.Status);
            if (res.Status == 200) {
              apiserver.list().then(res => {
                // this.$Message.success(content, duration, onClose)
                this.$Message.success("删除成功");
              });
            } else {
              this.$Message.error("删除失败");
            }
          });
        },
        onCancel: () => {
          this.$Message.info("取消成功！");
        }
      });
    },
    editList(params) {
      let id = params.row.ID;
      //  this.$router.push("/listadd?"+id);
      this.$router.push({ name: "listadd", query: { id } });
      //  this.$router.push(`/listadd/${id}`);
    }
  },
  computed: {
    tableColumns() {
      let columns = [];
      columns.push({
        title: "ID",
        key: "ID",
        sortable: true
      });
      columns.push({
        title: "设备名称",
        key: "SUB_PRO_NAME"
      });
      columns.push({
        title: "设备编码",
        key: "EQUIPMENT_CODE",
        sortable: true
      });
      columns.push({
        title: "案卷数",
        key: "FONDS_NO",
        sortable: true
      });
      columns.push({
        title: "生产厂商",
        key: "PRODUCTSUPPLIERS",
        sortable: true
      });
      columns.push({
        title: "外购/自研",
        key: "SOURCE",
        sortable: true
      });
      columns.push({
        title: "进口/国产",
        key: "IS_IMPORT",
        sortable: true
      });
      columns.push({
        title: "国别",
        key: "JK_GC",
        sortable: true
      });
      columns.push({
        title: "删除",
        width: 60,
        align: "center",
        key: "delete",
        render: this.renderAction()
      });
      columns.push({
        title: "编辑",
        width: 60,
        align: "center",
        key: "edit",
        render: this.renderAction()
      });
      return columns;
    }
  },
  mounted() {
    this.getList(this.page.current_page, this.page.per_page);
  }
};
</script>

<style scoped>
.page {
  padding: 32px 0;
  text-align: center;
}
</style>