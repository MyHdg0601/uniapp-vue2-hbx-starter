// 配置文件 (请勿运行时修改数据)

export default {
  defaults: {
    // 默认当前主题
    currentTheme: {
      appTheme: "light",
      brightness: "light"
    },
    // 默认系统主题 (仅不支持获取系统主题时使用, 程序获取到系统主题时将会被更新)
    systemTheme: "light",
    // 默认主题是否跟随系统
    themeWithSystem: true,
    // 默认状态栏高度 (单位: px) (初始状态下使用, 程序获取到状态栏高度时将会被更新)
    statusBarHeight: 20,
    // 默认标题栏高度 (单位: px) (在App或H5等不能获取标题栏高度的环境中使用)
    titleBarHeight: 40
  },
  route: {
    // 模拟tabbar页面地址
    simulateTabbarPage: "/pages/main/index"
  },
  http: {
    // 请求基地址
    requestBaseUrl: process.env.UNI_APP_REQUEST_BASE_URL,
    // 资源基地址
    sourceBaseUrl: process.env.UNI_APP_SOURCE_BASE_URL,
    // 请求超时 (单位: ms)
    requestTimeout: 10 * 1000,
    // 加载动画延迟时间 (单位: ms)(若请求在此时间内响应, 则不会显示加载动画)
    requestLoadingDelay: 600,
    // 请求接受数据类型
    requestAcceptType: "application/json",
    // 😀 请求发送数据类型
    requestContentType: "application/json",
    // 启用HTTP2
    enableHttp2: false,
    // 启用QUIC
    enableQuic: false,
    // 启用Cache
    enableCache: false,
    // 😀 请求Header中Token的key
    tokenKey: "Authorization",
    // 😀 请求Header中Token的前缀
    tokenPrefix: "",
    // 😀 响应内容字段 - code
    fieldCode: "code",
    // 😀 响应内容字段 - message
    fieldMessage: "message",
    // 😀 响应内容字段 - data
    fieldData: "data",
    // 😀 业务状态 - 操作成功
    codeSuccess: 200,
    // 😀 业务状态 - 登录失效
    codeAuthError: 401,
    // state - 业务正常
    stateSuccess: 100,
    // state - 业务异常 (即[响应内容code字段]的值与[codeSuccess]不相等)
    stateBusinessError: 0,
    // state - 请求异常
    stateRequestError: -1,
    // state - HTTP状态异常
    stateHttpError: -2,
    // state - 未知异常
    stateUnknownError: -3,
    // state - 请求取消
    stateRequestAbort: -4,
    // 😀 登录失效重定向页面地址
    redirectAuthPage: "",
    // 😀 登录失效页重定向方式 [null, "reLaunch", "switchTab", "navigateTo", "simulateSwitchTab"]
    redirectAuthAction: null
  },
  storage: {
    // 当前主题
    currentTheme: "CURRENT_THEME",
    // 主题是否跟随系统
    themeWithSystem: "THEME_WITH_SYSTEM",
    // token
    token: "TOKEN"
  }
};
