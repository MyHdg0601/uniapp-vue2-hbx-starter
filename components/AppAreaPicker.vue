<template>
  <view class="app-area-picker">
    <view class="app-picker">
      <u-picker ref="$picker"
                :show="innerShow"
                :title="title"
                :columns="columns"
                :loading="loading"
                key-name="name"
                :confirm-text="confirmText"
                :cancel-text="cancelText"
                immediate-change
                @change="updatePickerColumns"
                @confirm="$emit('confirm', $event)"
                @cancel="innerShow = false"
                @close="innerShow = false"></u-picker>
    </view>
  </view>
</template>

<script>
  import _ from "lodash";

  // ð æ ¹æ®å®éæåµimportå¯¹åºçæ¥å£å®ä¹
  // import { apiQueryAreasByAdcode } from "@/service/index.js";

  /**
   * AppAreaPicker å°åºéæ©å¨
   *
   * @author        å°ä½åå­¦ (MyHdg0601)
   * @description   æ¬ç»ä»¶ç¨äºå°åºéæ©, ä¼ å¥å°åºç¼ç å³å¯èªå¨å®ä½è³ç®æ å°åºã
   *
   * @property {String}   code                å°åºç¼ç 
   * @property {Boolean}  show                æ¯å¦å±ç¤ºéæ©å¨ <æ¯æ.sync>
   * @property {String}   title               éæ©å¨æ é¢
   * @property {Number}   level               éæ©å°åºå±çº§
   * @property {Number}   codeLevelLength     æ¯çº§å°åºç¼ç é¿åº¦
   * @property {String}   codePadChar         å°åºç¼ç å³è¡¥å­ç¬¦
   * @property {String}   confirmText         ç¡®å®æé®æå­
   * @property {String}   cancelText          åæ¶æé®æå­
   *
   * @event {Function}  confirm     ç¹å»ç¡®å® [indexs: ååéä¸­é¡¹ç´¢å¼, value: ååéä¸­é¡¹çå¼, values: åååè¡¨æ°æ®]
   *
   * @example <app-area-picker :show.sync="show" :code="code"></app-area-picker>
   */
  export default {
    name: "AppAreaPicker",
    props: {
      code: null,
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      level: {
        type: Number,
        default: 3
      },
      codeLevelLength: {
        type: Number,
        default: 2
      },
      codePadChar: {
        type: String,
        default: "0"
      },
      confirmText: {
        type: String,
        default: "ç¡®å®"
      },
      cancelText: {
        type: String,
        default: "åæ¶"
      }
    },
    data() {
      return {
        // éæ©å¨å è½½ç¶æ
        loading: false,
        // å°åºåè¡¨
        areas: null,
        // ååç´¢å¼å¼
        indexs: []
      }
    },
    computed: {
      innerShow: {
        get() {
          return this.show;
        },
        set(value) {
          this.$emit("update:show", value);
        }
      },
      columns() {
        const { level, areas, indexs } = this;

        const theIndexs = Object.assign(new Array(level).fill(0), indexs);

        const columns = [areas ?? []];
        for (let i = 1; i < level; i++) {
          columns[i] = _.get(areas, theIndexs.slice(0, i).map((it) => `[${it}].children`).join("")) ?? [];
        }

        return columns;
      }
    },
    watch: {
      code: {
        async handler(code) {
          await this.$nextTick();

          await this.updatePickerColumns({ code });
        },
        immediate: true
      },
      indexs: {
        async handler(value) {
          await this.$nextTick();

          this.$refs.$picker.setIndexs(value);
        },
        immediate: true
      }
    },
    methods: {
      async requestAreasByAdcode(adcode = "") {
        try {
          this.loading = true;

          // ð æ ¹æ®å®éæåµè°ç¨æ¥å£æ¥è¯¢æå®åºåä¸çå­åºååè¡¨

          // const { data } = await apiQueryAreasByAdcode({
          //   "code": adcode
          // });

          // ð å¦ææ¥å£è¿åæ°æ®ç»æä¸æ¯ {code, name, children} çè¯, éè¦æå¨åä¸ä¸è½¬æ¢
          // code: åºåç¼ç 
          // name: åºååç§°
          // children: å­åºååè¡¨ (è¿éçå¼åºå®è®¾ç½®ä¸ºnull)

          // return data.map((item) => ({
          //   code: item.code,
          //   name: item.name,
          //   children: null
          // }));

          // ð æ¥å£è°æ´å®æå, ç§»é¤ä¸é¢è¿ä¸è¡
          return [];
        } catch {
          return [];
        } finally {
          this.loading = false;
        }
      },
      async updatePickerColumns({ columnIndex, code, indexs }) {
        const { level, areas, codeLevelLength, codePadChar } = this;

        const theColumnIndex = columnIndex ?? -1;
        const theAreas = areas == null ? await this.requestAreasByAdcode() : _.cloneDeep(areas);
        const theIndexs = Object.assign(new Array(level).fill(0), indexs?.slice(0, theColumnIndex + 1) ?? []);

        for (let i = theColumnIndex + 1; i < level; i += 1) {
          const path = theIndexs.slice(0, i).map((it) => `[${it}]`).join(".children");

          if (i > 0) {
            if (_.get(theAreas, `${path}.children`) == null) {
              _.set(theAreas, `${path}.children`, await this.requestAreasByAdcode(_.get(theAreas, path).code));
            }
          }

          if (code != null) {
            const currentCode = _.padEnd(code.slice(0, (i + 1) * codeLevelLength), code.length, codePadChar);

            const currentIndex = _.findIndex(_.get(theAreas, `${path}.children`, theAreas), (item) => item.code === currentCode);

            theIndexs[i] = Math.max(0, currentIndex);
          }
        }

        this.areas = theAreas;
        this.indexs = theIndexs;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
