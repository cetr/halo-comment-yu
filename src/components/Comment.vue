<template>
  <div
    :class="mergedConfigs.darkMode ? 'halo-comment dark-mode': 'halo-comment'"
    id="halo-comment"
  >

    <comment-editor
      :targetId="id"
      :target="target"
      :options="options"
      :configs="mergedConfigs"
    />
    <div class="comment-count">
      <span class="vnum" v-html="commentCount"></span>  评论
    </div>
    <div
      class="comment-load-button"
      v-if="!mergedConfigs.autoLoad && !loaded"
    >
      <a
        class="button-load"
        href="javascript:void(0)"
        rel="nofollow noopener"
        @click="loadComments"
      >加载评论</a>
    </div>

    <comment-loading
      v-show="commentLoading"
      :configs="typeof configs === 'string' ? JSON.parse(configs) : configs"
    />

    <ol
      class="comment-nodes"
      id="comment-nodes"
      ref="gallery"
      v-if="comments.length>=1"
    >
      <template v-for="(comment, index) in comments">
        <CommentNode
          :targetId="id"
          :target="target"
          :comment="comment"
          :options="options"
          :configs="mergedConfigs"
          :key="index"
        />
      </template>
    </ol>

    <div
      v-if="loaded && !commentLoading && comments.length<=0"
      class="comment-empty"
    >暂无评论</div>

    <div
      v-if="pagination.pages>1"
      class="comment-page"
    >
      <pagination
        :page="pagination.page"
        :size="pagination.size"
        :total="pagination.total"
        @change="handlePaginationChange"
      />
    </div>
  </div>
</template>
<script>

import "./index";
import commentApi from "../api/comment";
import optionApi from "../api/option";
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

export default {
  name: "Comment",
  props: {
    id: {
      type: Number,
      required: false,
      default: 0
    },
    type: {
      type: String,
      required: false,
      default: "post",
      validator: function(value) {
        return ["post", "sheet", "journal"].indexOf(value) !== -1;
      }
    },
    configs: {
      type: Object,
      required: false,
      default: () => ({
        // auto load comment,default true
        autoLoad: true,
        showUserAgent: true,
        gravatarSource: "//cdn.v2ex.com/gravatar",
        loadingStyle: "default",
        darkMode: false
      })
    },
  },
  data() {
    return {
      comments: [],
      commentAuthor: new Map(),
      pagination: {
        pages: 0,
        page: 0,
        sort: "",
        size: 5,
        total: 0
      },
      commentCount:0,
      commentLoading: false,
      loaded: false,
      repliedSuccess: null,
      replyingComment: null,
      options: {
        comment_gravatar_default: "mm"
      }
    };
  },
  computed: {
    target() {
      // pluralize it
      return `${this.type}s`;
    },
    mergedConfigs() {
      let propConfigs = this.configs;
      if (typeof this.configs === 'string') {
        propConfigs = JSON.parse(this.configs);
      }
      return Object.assign(
              {
                autoLoad: true,
                showUserAgent: true,
                gravatarSource: "//cdn.v2ex.com/gravatar",
                loadingStyle: "default",
                darkMode: false
              },
              propConfigs
      );
    }
  },
  created() {
    if (this.mergedConfigs.autoLoad) {
      this.loadComments();
    }
    this.loadOptions();
  },
  updated() {
    // 评论图片灯箱
    const gallery = this.$refs.gallery;
    if (gallery) {
      new Viewer(gallery, {
        inline: false,
        filter(image) {
          const clsName = image.className + '';
          return clsName.indexOf('avatar') < 0;
        },
      });
    }
  },
  methods: {
    loadComments() {
      this.comments = [];
      this.commentLoading = true;
      commentApi
        .listComments(this.target, this.id, "tree_view", this.pagination)
        .then(response => {
          this.commentCount = response.data.data.commentCount;
          this.comments = response.data.data.content;
          this.pagination.size = response.data.data.rpp;
          this.pagination.total = response.data.data.total;
          this.pagination.pages = response.data.data.pages;
          if (this.comments) {
            this.comments.forEach((comment) => {
              this.setCommentAuthor(comment);
            })
          }
        })
        .finally(() => {
          this.commentLoading = false;
          this.loaded = true;
        });
    },
    setCommentAuthor(comment) {
      if (comment.children) {
        this.commentAuthor.set(comment.id, comment.author);
        this.setCommentAuthor(comment.children);
      }
      if (comment instanceof Array) {
        comment.forEach((c) => {
          if (c.parentId > 0) {
            c.parentAuthor = this.commentAuthor.get(c.parentId);
            this.setCommentAuthor(c);
          }
        });
        comment.sort(this.sortComment);
      }
    },
    sortComment(a, b) {
      return a.id - b.id;
    },
    loadOptions() {
      optionApi.list().then(response => {
        this.options = response.data.data;
      });
    },
    handlePaginationChange(page) {
      this.pagination.page = page;
      this.loadComments();
    }
  }
};
</script>
<style lang="scss">
$color: #666;
$md-link-color:#1890ff;
@import "../styles/global";
@import "../styles/github-markdown";
</style>
