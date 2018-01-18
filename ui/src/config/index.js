export default {
    constStatus: {
        NOT_LOGIN : 0,
        FORBIDDEN : 403,
        NOT_FOUND : 404,
        SUCCESS   : 1,
        FAIL      : 2,
        SERVER_ERROR : 500
    },
    //ssoHost: 'http://192.168.101.14:8881',
    ssoBaseUri: '/login',
    ssoTicketName:'ticket',
    ssoUserId: 'userId',
    apiHost: 'http://192.168.101.14:8880',
    apiBaseUri: '/api',
    lastLoginCheckKey: 'lastLoginStateCheck'

}