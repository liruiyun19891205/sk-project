<template>
  <section>
    <section class="search">
      <Row :gutter="16">
        <i-col span="12"><Input search enter-button="Search" v-model="query.ID" v-on:on-search="searchEvent"
            placeholder="Enter something..." />
        </i-col>
        <i-col span="12"><Button type="info">新增</Button></i-col>
      </Row>
    </section>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row,index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page :total="page.total" :page-size="page.per_page" :current="page.current_page" show-total
          @on-change="handlePage"></Page>
      </section>
    </section>
  </section>
</template>

<script>
  import infrastructureService from "../../api/infrastructure";
  // ID` int(11) NOT NULL AUTO_INCREMENT,
  // `PRO_ID` varchar(255) NOT NULL COMMENT '所属项目计划id',
  // `INFRASTRUCTURE_CODE` varchar(255) NOT NULL COMMENT '工程编码',
  // `SUB_PRO_NAME` varchar(255) NOT NULL COMMENT '基建基本属性：工程分项名称',
  // `FONDS_NO` int(11) DEFAULT NULL COMMENT '基建基本属性：卷宗号',
  // `BUILD_M` double DEFAULT NULL COMMENT '基建基本属性：建设总投资，可选填',
  // `NEED_AREA` double DEFAULT NULL COMMENT '基建基本属性：征地面积，可选填',
  // `NEW_BUILD_AREA` double DEFAULT NULL COMMENT '基建基本属性：新增建筑面积，可选填',
  // `REBUILD_AREA` double DEFAULT NULL COMMENT '基建基本属性：改造建筑面积，可选填',
  // `REMARK` varchar(4000) DEFAULT NULL,
  // `NEED_SITE` varchar(255) DEFAULT NULL,
  export default {
    data() {
      return {
        id: '',
        query: {},
        list: [],
        page: {
          current_page: 1,
          per_page: 20
        },
        currentPage: 1,
        columns: [{
            title: 'ID',
            key: 'ID',
            align: "center"
          },
          {
            title: '所属项目计划id',
            key: 'PRO_ID',
            align: "center"
          },
          {
            title: '工程编码',
            align: 'center',
            key: 'INFRASTRUCTURE_CODE',
          },
          {
            title: '工程分项名称',
            width: 150,
            key: 'SUB_PRO_NAME',
            align: "center",
          },
          {
            title: '卷宗号',
            width: 150,
            key: 'FONDS_NO',
            align: "center",
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getList();
    },
    methods: {
      // 获取列表
      async _getList() {
        const res = await infrastructureService.getList({
          page: this.currentPage,
          paveSize: 20,
          param: this.query
        });
        this.list = res.data.data.list;
        this.page.total = res.data.data.total;
      },
      // 切换分页
      handlePage(page) {
        this.currentPage = page;
        this._getList();
      },
      searchEvent() {
        this._getList();
      },
    }
  }

</script>

<style scoped>
  .page {
    padding: 32px 0;
    text-align: center;
  }

  .search {
    margin-bottom: 30px;
  }

</style>
