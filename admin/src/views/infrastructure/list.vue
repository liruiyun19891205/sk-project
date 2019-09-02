<template>
  <section>
    <section class="search">
      <Row :gutter="16">
        <i-col span="12">
          <i-input search enter-button="Search" v-model="query.ID" v-on:on-search="searchEvent"
            placeholder="Enter something..." />
        </i-col>
        <i-col span="12"><Button type="info" @click="goAdd">新增</Button></i-col>
      </Row>
    </section>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row,index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.ID)">删除</Button>
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
  import {
    log
  } from 'util';
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
      goAdd() {
        this.$router.push(`/infrAdd`);
      },
      update(row) {
        this.$router.push({
          name: 'infrAdd',
          params: {
            id: row.ID
          }
        })
        // this.$router.push(`/infrAdd`);
      },
      // 
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await infrastructureService.destroy(id);
              this.$Message.success('删除成功');
              this._getList();
            } catch (e) {
              this.$Message.error(e);
            } finally {
              this.$Modal.remove();
            }
          },
          onCancel: () => {
            this.$Message.warning('取消！');
          }
        });
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
