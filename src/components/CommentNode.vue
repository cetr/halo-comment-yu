<template>
  <li
      :id="'li-comment-'+comment.id"
      class="comment"
      :class="isChild?'':'index-1'"
      itemtype="http://schema.org/Comment"
      itemprop="comment"
  >
    <div
        :id="'comment-'+comment.id"
        class="comment-body"
    >
      <div class="comment-avatar">
        <img
            :src="avatar"
            onerror="this.src='data:image/jpeg;base64,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'"
            class="avatar"
        />
      </div>
      <div class="contain-main">
        <div class="comment-meta">
          <div
              class="comment-author"
              itemprop="author"
          >
            <a
                v-if="comment.authorUrl != null && comment.authorUrl != ''"
                :href="comment.authorUrl"
                rel="nofollow"
                target="_blank"
                class="author-name"
            >{{ comment.author }}</a>
            <a
                v-else
                class="author-name"
            >{{ comment.author }}</a>
            <span v-if="comment.isAdmin" class="is-admin">博主</span>
            <span
                v-if="configs.showUserAgent"
                class="useragent-info"
            >{{ compileUserAgent }}
                        </span>
          </div>
          <div class="comment-info">
            <time
                class="comment-time"
                itemprop="datePublished"
                :datetime="comment.createTime"
            >{{ this.timeAgo(comment.createTime) }}
            </time>
          </div>
        </div>
        <div
            class="comment-content markdown-body"
            itemprop="description"
            v-html="compileContent"
        >
        </div>
        <div class="comment-info">
          <span
              class="comment-reply"
              @click="handleReplyClick"
          >{{ editing ? '取消回复' : '回复' }}</span>
        </div>
      </div>
    </div>
    <comment-editor
        v-if="editing"
        :targetId="targetId"
        :target="target"
        :replyComment="comment"
        :options="options"
        :configs="configs"
    />
    <ol
        v-if="comment.children"
        class="children"
    >
      <template v-for="(children, index) in comment.children">
        <CommentNode
            :isChild="true"
            :targetId="targetId"
            :target="target"
            :comment="children"
            :options="options"
            :configs="configs"
            :key="index"
        />
      </template>
    </ol>
  </li>
</template>
<script>
import "./index";
import {timeAgo, decodeHTML} from "@/utils/util";
import ua from "ua-parser-js";
import marked from "marked";
import {renderedEmojiHtml} from "../utils/util";

export default {
  name: "CommentNode",
  props: {
    isChild: {
      type: Boolean,
      required: false,
      default: false
    },
    targetId: {
      type: Number,
      required: false,
      default: 0
    },
    target: {
      type: String,
      required: false,
      default: "posts",
      validator: function (value) {
        return ["posts", "sheets", "journals"].indexOf(value) !== -1;
      }
    },
    comment: {
      type: Object,
      required: false,
      default: () => {
      }
    },
    options: {
      type: Object,
      required: false,
      default: () => {
      }
    },
    configs: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false
    };
  },
  computed: {
    avatar() {
      let gravatarDefault = this.options.comment_gravatar_default;
      const gravatarSource = this.options.gravatar_source || '';
      if (gravatarSource != '') {
        return `${gravatarSource}${this.comment.gravatarMd5}?s=256&d=${gravatarDefault}`;
      }
      return '#';
    },
    compileContent() {
      var at = "";
      if (this.comment.parentId !== null && this.comment.parentId > 0) {
        at = '<a>@' + this.comment.parentAuthor + '</a>';
      }
      //要页面展示的评论内容
      let str = at + marked(decodeHTML(this.comment.content));
      return renderedEmojiHtml(str);
    },
    createTimeAgo() {
      return timeAgo(this.comment.createTime);
    },
    compileUserAgent() {
      var parser = new ua();
      parser.setUA(this.comment.userAgent);
      var result = parser.getResult();
      return (
          result.browser.name +
          " " +
          result.browser.version +
          " in " +
          result.os.name +
          " " +
          result.os.version
      );
    }
  },
  methods: {
    handleReplyClick() {
      this.editing = !this.editing;
    },
    timeAgo(dateTimeStamp) {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
      const minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
      const hour = minute * 60;
      const day = hour * 24;
      const week = day * 7;
      // const halfamonth = day * 15;
      const month = day * 30;
      const now = new Date().getTime();   //获取当前时间毫秒
      const diffValue = now - dateTimeStamp;//时间差

      if (diffValue < 0) {
        return;
      }
      const minC = diffValue / minute;  //计算时间差的分，时，天，周，月
      const hourC = diffValue / hour;
      const dayC = diffValue / day;
      const weekC = diffValue / week;
      const monthC = diffValue / month;
      let result;
      if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前";
      } else if (weekC >= 1 && weekC <= 4) {
        if (weekC > 4) {
          result = " " + Math.floor(weekC) + "周前";
        } else {
          result = " " + parseInt(weekC) + "周前";
        }
      } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前";
      } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前";
      } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前";
      } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚";
      } else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "/" + Nmonth + "/" + Ndate + " " + Nhour + ":" + Nminute + ":" + Nsecond;
      }
      return result;
    }
  }
};
</script>
