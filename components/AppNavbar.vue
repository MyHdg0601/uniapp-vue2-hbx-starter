<template>
  <view class="app-navbar">
    <view class="app-navbar__inner"
          :class="[{'fixed': fixed, 'border': border}]"
          :style="{top: show ? 0 : `${-navigationBarHeight}px`, background: backgroundColor, zIndex: zIndex}">
      <view class="app-navbar__status-bar" :style="{height: `${statusBarHeight}px`}"></view>

      <view class="app-navbar__title-bar" :style="{height: `${titleBarHeight}px`, color: textColor}">
        <slot v-if="useCustomSlot" name="custom"></slot>

        <template v-else>
          <view class="app-navbar__title-bar__left" @tap="onTitleBarLeftTap">
            <template v-if="showLeft">
              <slot v-if="useLeftSlot" name="left"></slot>

              <template v-else>
                <view v-if="shouldBackToHomeShow"
                      class="app-navbar__title-bar__left__home"
                      @tap.stop="executeBackToHome">
                  <u-icon name="home" color="var(--app-navbar__home_color)" size="38rpx"></u-icon>
                </view>

                <template v-else>
                  <view v-if="leftIcon" class="icon">
                    <u-icon :name="leftIcon" :color="iconColor" :size="iconSize"></u-icon>
                  </view>
                  <text v-if="leftText" class="text u-line-1" :style="{color: iconColor}">{{ leftText }}</text>
                </template>
              </template>
            </template>
          </view>

          <view class="app-navbar__title-bar__center" :style="{width: titleWidth}">
            <slot v-if="useCenterSlot" name="center"></slot>

            <template v-else>
              <text class="title u-line-1">{{ title }}</text>
            </template>
          </view>

          <view class="app-navbar__title-bar__right" @tap="$emit('right-tap')">
            <template v-if="showRight">
              <slot v-if="useRightSlot" name="right"></slot>

              <template v-else>
                <view v-if="rightIcon" class="icon">
                  <u-icon :name="rightIcon" :color="iconColor" :size="iconSize"></u-icon>
                </view>
                <text v-if="rightText" class="text u-line-1" :style="{color: iconColor}">{{ rightText }}</text>
              </template>
            </template>
          </view>
        </template>
      </view>
    </view>

    <view v-if="fixed && placeholder"
          class="app-navbar__placeholder"
          :style="{height: `${navigationBarHeight}px`}"></view>
  </view>
</template>

<script>
  import { mapGetters } from "vuex";

  import Config from "@/utils/config";

  /**
   * AppNavbar App?????????
   *
   * @author        ???????????? (MyHdg0601)
   * @description   ????????????????????????????????? (???navbar)???
   *
   * @property {Boolean}  show              ?????????????????????
   * @property {Boolean}  fixed             ?????????????????????????????????
   * @property {Boolean}  placeholder       ???????????????????????????????????????????????????????????????view
   * @property {Boolean}  border            ?????????????????????
   * @property {Boolean}  useCustomSlot     ????????????custom??????
   * @property {Boolean}  showLeft          ????????????????????????
   * @property {Boolean}  useLeftSlot       ????????????left??????
   * @property {String}   leftIcon          ????????????
   * @property {String}   leftText          ????????????
   * @property {Boolean}  showRight         ????????????????????????
   * @property {Boolean}  useRightSlot      ????????????right??????
   * @property {String}   rightIcon         ????????????
   * @property {String}   rightText         ????????????
   * @property {Boolean}  useCenterSlot     ????????????center??????
   * @property {String}   title             ????????????
   * @property {String}   titleWidth        ????????????
   * @property {String}   textColor         ????????????
   * @property {String}   backgroundColor   ????????????
   * @property {String}   iconSize          ??????????????????
   * @property {String}   iconColor         ??????????????????
   * @property {Number}   zIndex            css??????z-index
   * @property {Boolean}  autoBack          ??????navbar??????????????????navigateBack
   *
   * @event {Function}  left-tap    ??????navbar??????
   * @event {Function}  right-tap   ??????navbar??????
   *
   * @example <app-navbar title="??????"></app-navbar>
   */
  export default {
    name: "AppNavbar",
    props: {
      show: {
        type: Boolean,
        default: true
      },
      fixed: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: true
      },
      useCustomSlot: {
        type: Boolean,
        default: false
      },
      showLeft: {
        type: Boolean,
        default: true
      },
      useLeftSlot: {
        type: Boolean,
        default: false
      },
      leftIcon: {
        type: null,
        default: "arrow-left"
      },
      leftText: {
        type: null,
        default: "??????"
      },
      showRight: {
        type: Boolean,
        default: true
      },
      useRightSlot: {
        type: Boolean,
        default: false
      },
      rightIcon: {
        type: null,
        default: ""
      },
      rightText: {
        type: null,
        default: ""
      },
      useCenterSlot: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      titleWidth: {
        type: String,
        default: "var(--app-navbar__title_width)"
      },
      textColor: {
        type: String,
        default: "var(--app-navbar__txt_color)"
      },
      backgroundColor: {
        type: String,
        default: "var(--color-bg-primary)"
      },
      iconSize: {
        type: String,
        default: "var(--app-navbar__icon_size)"
      },
      iconColor: {
        type: String,
        default: "inherit"
      },
      zIndex: {
        type: Number,
        default: 50
      },
      autoBack: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // ?????????????????????????????????
        shouldBackToHomeShow: false,
        // ?????????????????????????????????
        backToHomePage: "TheHome",
        // ????????????????????????
        backToHomeAction: "simulateSwitchTab",
        // ?????????????????????????????????
        backToHomeExcludes: [Config.route.simulateTabbarPage.slice(1)]
      }
    },
    computed: {
      ...mapGetters({
        statusBarHeight: "system/getStatusBarHeight",
        titleBarHeight: "system/getTitleBarHeight",
        navigationBarHeight: "system/getNavigationBarHeight"
      })
    },
    async mounted() {
      await this.$nextTick();

      const pages = getCurrentPages();
      const current = pages[pages.length - 1];

      this.shouldBackToHomeShow = pages.length === 1 && !this.backToHomeExcludes.includes(current.route);
    },
    methods: {
      onTitleBarLeftTap() {
        this.$emit("left-tap");

        if (this.autoBack) {
          uni.navigateBack();
        }
      },
      executeBackToHome() {
        const { backToHomePage, backToHomeAction } = this;

        uni[backToHomeAction]({
          url: backToHomePage
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-navbar {
    position: relative;
  }

  .app-navbar__inner {
    display: flex;
    flex-direction: column;
    transition: top 0.3s ease-out, background 0.3s ease-out;

    &.fixed {
      position: fixed;
      right: 0;
      left: 0;
    }

    &.border {
      border-bottom: var(--app-navbar__body_border);
    }
  }

  .app-navbar__title-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .app-navbar__title-bar__center {
    display: flex;
    flex-direction: column;

    >.title {
      font-size: var(--app-navbar__txt_size);
      text-align: center;
    }
  }

  .app-navbar__title-bar__left,
  .app-navbar__title-bar__right {
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;

    >.icon {
      margin-right: var(--app-navbar__icon_mright);
    }

    >.text {
      font-size: var(--app-navbar__txt_size);
    }
  }

  .app-navbar__title-bar__left {
    padding: 0 10rpx 0 var(--app-main__space_horizontal);
  }

  .app-navbar__title-bar__right {
    padding: 0 var(--app-main__space_horizontal) 0 10rpx;
  }

  .app-navbar__title-bar__left__home {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    background-color: var(--app-navbar__home_background);
    border-radius: 50%;
  }
</style>
