<template>
  <section>
    <section class="search">
      <Row :gutter="16">
        <!-- <i-col span="12"><Input search enter-button="Search" placeholder="Enter something..." /></i-col>÷ -->
        <i-col span="12"><Button type="info" @click="add">新增</Button></i-col>
      </Row>
    </section>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page :total="page.total" :page-size="page.per_page" :current="page.current_page" show-total
          @on-change="handlePage"></Page>
      </section>
    </section>
    <section>
      <Modal v-model="isUpdate" title="新增修改用户" :mask-closable="false" @on-ok="ok('formValidate')"
        @on-cancel="cancel('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="昵称" prop="nickname">
            <i-input v-model="formValidate.nickname" placeholder="Enter your name"></i-input>
          </FormItem>
          <FormItem label="E-mail" prop="email">
            <i-input v-model="formValidate.email" placeholder="Enter your e-mail"></i-input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <i-input type="password" v-model="formValidate.password"></i-input>
          </FormItem>
          <FormItem label="确认密码" prop="passwdCheck">
            <i-input type="password" v-model="formValidate.passwdCheck"></i-input>
          </FormItem>
        </Form>
      </Modal>
    </section>
  </section>
</template>

<script>
  import merge from 'webpack-merge'
  import {
    mapState,
    mapActions
  } from 'vuex';

  export default {
    name: "list",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码！'));
        } else {
          if (this.formValidate.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value !== this.formValidate.password) {
          callback(new Error('输入密码不一致，请重新输入！'));
        } else {
          callback();
        }
      };
      return {
        formValidate: {
          nickname: '',
          email: '',
          password: '',
          passwdCheck: ''
        },
        ruleValidate: {
          nickname: [{
            required: true,
            message: '昵称不能为空！',
            trigger: 'blur'
          }],
          email: [{
              required: true,
              message: 'Email 不能为空！',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Email输入的格式不正确',
              trigger: 'blur'
            }
          ],
          password: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }],
          passwdCheck: [{
            required: true,
            validator: validatePassCheck,
            trigger: 'blur'
          }],
        },
        isUpdate: false, // 修改模态框
        id: '',
        keyWord: '',
        list: [],
        page: {},
        currentPage: 1,
        columns: [{
            title: 'ID',
            key: 'id',
            align: "center"
          },
          {
            title: '用户名',
            key: 'nickname',
            align: "center"
          },
          {
            title: '邮箱',
            align: 'center',
            key: 'email',
          },
          {
            title: '创建时间',
            width: 150,
            key: 'created_at',
            align: "center"
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
      this._getUserList();
    },
    methods: {
      ...mapActions({
        getUserList: 'user/getUserList',
        createUser: 'user/saveUser',
        updateUser: 'user/updateUser',
        destroyUser: 'user/destroyUser',
      }),
      // 获取用户
      async _getUserList() {
        let {
          page,
          desc,
          keyword
        } = this.$route.query;

        const res = await this.getUserList({
          page: this.currentPage
        });
        this.list = res.data.data.data;
        this.page = res.data.data.meta;
      },
      // 切换分页
      handlePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        });
        this.currentPage = page;
        this._getUserList();
      },
      // 更新
      update(row) {
        this.isUpdate = true;
        this.formValidate.nickname = row.nickname;
        this.formValidate.email = row.email;
        this.id = row.id;
        // this.$router.push(`/user/update/${id}`);
      },
      // 新增
      add() {
        this.isUpdate = true;
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此用户吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyUser(id);
              this.$Message.success('删除成功');
              this._getUserList();
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
      // 创建
      async _createUser() {
        try {
          await this.createUser(this.formValidate);
          this.$Message.success('新增成功!');
          await this._getUserList();
        } catch (e) {

        }
      },
      async _updateUser() {
        this.formValidate.id = this.id;
        try {
          await this.updateUser(this.formValidate);
          this.$Message.success('修改成功!');
          await this._getUserList();
        } catch (e) {

        }
      },
      ok(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.id) {
              this._updateUser();
            } else {
              this._createUser();
            }
          } else {
            this.$Modal.remove();
            this.$Message.error('Fail!');
          }
        });
      },
      cancel(name) {
        console.log(name);

        this.$refs[name].resetFields();
        // this.$Message.info('Clicked cancel');
      }
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
