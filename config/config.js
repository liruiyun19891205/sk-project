module.exports = {
    environment: 'dev',
    database: {
        dbName: 'boblog',
        host: '172.16.3.101',
        port: 3306,
        user: 'enginer',
        password: 'dataisbest'
    },
    db: {
        host: '172.16.3.101',
        user: 'enginer',
        password: 'dataisbest',
        database: 'mayson_demo_db',
        port: 3306,
        // 最大连接数
        connectionLimit: 10
    },
    security: {
        secretKey: "secretKey",
        // 过期时间 1小时
        expiresIn: 60 * 60
    }
    // wx: {
    //     appId: '',
    //     appSecret: '',
    //     loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    // }
}