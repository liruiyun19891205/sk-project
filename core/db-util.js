
/**
 * 通过 SQL 工具类
 * 相关原生 sql 请参考 https://www.npmjs.com/package/mysql
 */
const mysql = require("mysql");
const allConfig = require('../config/config')
/**
 * 构造对象条件查询语句
 * @param sql   sql 主体（select * from xxx）
 * @param modelBean 条件对象
 缺省为 等于条件
 *  例1：
 nodelBean = {
        id: 123
    }
 自定义条件
 *  例2：
 modelBean = {
        name:{
            term: "=",
            value: "223"
        },
        score:{
            term: "<",
            value: "90"
        },
        age:{
            term: ">",
            value: "30"
        },
        level: {
            term: "in",
            value: "12,13"
        }
    }
 * @return {
sql: '完整的 sql 语句',
values: '对应的条件值数组'
}
 */
function bulidEntitySql(sql, modelBean) {
    // 存储查询条件对应的值
    var sqlval = [];
    if (modelBean) {

        // 存储查询条件的 key
        var tmpsql = [];
        // 动态构造查询条件
        for (var key in modelBean) {
            var bean = modelBean[key];
            if (bean.term != "in" && bean.term != "not in") {
                // 兼容模式1 {id:123}
                if (typeof bean != 'object') {
                    tmpsql.push(key + " =? ");
                    sqlval.push(bean);
                } else {
                    // 兼容模式2 {id: {term:'>',value:'123'}}
                    tmpsql.push(key + " " + bean.term + " ? ");
                    sqlval.push(bean.value);
                }
            } else {
                var vx = bean.value.split(',');
                var xm = [];
                for (var i = 0; i < vx.length; i++) {
                    xm.push('?');
                    sqlval.push(vx[i]);
                }
                // 构造 in 条件语句
                tmpsql.push(key + " " + bean.term + "(" + xm.join(',') + ")");
            }

        }
        if (tmpsql.length) {
            // 拼装条件部分语句
            sql += " WHERE " + tmpsql.join(" and ");
        } else {
            // logger.error('sql where is null', modelBean);
        }
    }
    return {
        sql: sql,
        values: sqlval
    };
}
/**
 *  对外开放接口
 *  @param database 数据源配制对象，缺省值为 config.database
 使用方法
 const config = require("./../../config");
 const db = require('./../utils/db-util');
 let result = db(config.database).find(table, entity, fileds);
 let result = db(config.database2).find('doctor', entity, fileds);
 */
module.exports = function (database) {
    /**
     * 创建数据库连接池
     */
    const pool = mysql.createPool(database ? database : allConfig.db);

    return {

        /**
         *  自定义 SQL 语句
         * 【注】表名一定要用??两个问号
         */
        execSql(sql, values) {
            return new Promise((resolve, reject) => {
                pool.getConnection(function (err, connection) {
                    if (err) {
                        resolve(err);
                    } else {
                        var query = connection.query(sql, values, (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(rows);
                            }
                            connection.release();
                        });
                        // logger.trace("Current Exec SQL:[", query.sql, "]");
                    }
                });
            });
        },

        /**
         * 查询指定条件数据或所有数据
         * @param table 表名
         * @param modelBean 查询条件，为空时查询所有数据
         * @param keys 期望查询结果返回的字段，缺省值为"*"返回所有字段
         * 例： db.find(table, {id: 1, name: 'jerry'}, ["id","email"])
         */
        find(table, modelBean, keys) {
            // 指定返回结果字段
            var filed = " ?? ";
            var param = [];
            if (keys) {
                param = [keys, table];
            } else {
                filed = " * ";
                param = [table];
            }
            // 拼装 SQL 语句
            let sqlEntity = bulidEntitySql(
                "SELECT " + filed + " FROM ??",
                modelBean
            );
            return this.execSql(sqlEntity.sql, param.concat(sqlEntity.values));
        },

        /**
         * 查询分页数据
         * @param table 表名
         * @param keys  定制返回结果字段，"*"返回所有字段值; 参数可以为( table, start, end )
         * @param start 开始记录索引 [注]索引从0开始
         * @param end   结束记录索引
         * 例：db.findScrollData(table, "*", 1, 10)
         */
        findScrollData(table, keys, start, end) {

            let _sql = "SELECT ?? FROM ??  LIMIT ? , ?";
            if (arguments.length === 4) {
                return this.execSql(_sql, [keys, table, start, end]);
            } else if (arguments.length === 3) {
                // 参数可以为( table, start, end )
                return this.execSql(_sql, ["*", table, keys, start]);
            }
        },

        /**
         * 开启事务处理
         * @param sqlParamList sql语句和参数对象数组
         例：
         db.execTransaction([{
                    sql: "INSERT INTO ?? SET?",
                    param : [table, entity],
                    callback: function(result){
                        //执行成功回调
                        console.log(result);
                    }
                },{
                    sql: "INSERT INTO ?? SET email=?",
                    param : [table, 'lixia@goinni.com'],
             callback: function(result){
                        console.log(result);
                    }
             },{
                    sql: "INSERT INTO ?? SET email=?",
                    param : [table, 'limeizhen@goinni.com']
             }]);
         */
        execTransaction(sqlParamList) {

            return new Promise((resolve, reject) => {

                pool.getConnection(function (err, connection) {
                    if (err) {
                        resolve(err);
                    } else {
                        connection.beginTransaction(function (err) {

                            if (err) {
                                reject(err);
                                //throw err;
                            }
                            var n = 0,
                                res = [];
                            // 递归处理多条 SQL 语句
                            function ac(sqlParamList) {
                                var item = sqlParamList[n];
                                var qr = connection.query(item.sql, item.param, function (error, results, fields) {
                                    res.push(results); //缓存结果，统一返回
                                    if (error) {
                                        return connection.rollback(function () {
                                            //throw error;
                                            reject(error);
                                        });
                                    }
                                    // logger.trace(`Current Exec SQL:[${qr.sql}]`);
                                    if (n === sqlParamList.length - 1) {
                                        // 最后统一提交
                                        connection.commit(function (err) {
                                            if (err) {
                                                return connection.rollback(function () {
                                                    //throw err;
                                                    reject(err);
                                                });
                                            }
                                            resolve(res);
                                            connection.release();
                                            // logger.info('Transaction Success!');
                                        });

                                    } else {
                                        n++;
                                        //将结果回传给当前方法，方便后续使用
                                        item.callback && item.callback(results);
                                        //递归
                                        ac(sqlParamList);
                                    }
                                });
                            }

                            ac(sqlParamList);

                        });
                    }
                });
            });
        },
        /**
         * 删除数据
         * @param table 表名
         * @param modelBean 删除数据的条件 { 字段名 : 字段值 }
         */
        remove(table, modelBean) {
            let sqlEntity = bulidEntitySql(
                "DELETE FROM ??",
                modelBean
            );
            return this.execSql(sqlEntity.sql, [table].concat(sqlEntity.values));
        },
        /**
         * 添加数据
         * @param table 表名
         * @param values 表对应的字段名和值
         *  例：db.save("user_info", {id:3, email:"houzhenyu@163.com"});
         */
        save(table, values) {
            let _sql = "INSERT INTO ?? SET ?";
            return this.execSql(_sql, [table, values]);
        },
        /**
         * 数据更新 TODO
         * @param table 表名
         * @param moduleBean 要更新的字段 {字段名:字段值}
         * @param whereParam 更新条件
         * 例：db.update(tableName, {level:'12', nick:'jerry'}, {id:'115', name:'hou'});
         */
        update(table, moduleBean, whereParam) {
            var tempSql = [];
            var values = []; // 要更新字段值
            for (var key in moduleBean) {
                tempSql.push(key + "=?");
                values.push(moduleBean[key]);
            }
            let _sql = "UPDATE ?? SET " + tempSql.join(",");
            // 组装条件语句
            let sqlEntity = bulidEntitySql(
                _sql,
                whereParam
            );
            return this.execSql(sqlEntity.sql, [table].concat(values).concat(sqlEntity.values));
        },
        /**
         * 统计数据总记录数
         * @param table 表名
         * @param modelBean 条件对象 {id:'115'}
         * 例： db.count(table, {id:'115'});
         */
        count(table, modelBean) {
            let _sql = "SELECT COUNT(*) AS total FROM ?? ";
            let sqlEntity = bulidEntitySql(
                _sql,
                modelBean
            );
            return this.execSql(sqlEntity.sql, [table].concat(sqlEntity.values));
        }
    };
};