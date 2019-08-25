module.exports = {
    environment: 'dev',
    database: {
        dbName: 'kgj',
        host: '104.160.41.63',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    db: {
        host: '104.160.41.63',
        user: 'root',
        password: '123456',
        database: 'kgj',
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