<template>
    <section
            class="comment-editor"
            role="form"
    >
        <div class="inner">
            <!--      <div class="commentator">-->
            <!--        <img-->
            <!--          :src="avatar"-->
            <!--          class="avatar"-->
            <!--        >-->
            <!--      </div>-->
            <form class="comment-form">
                <div class="author-info">
                    <input
                            type="text"
                            class="comment-input author"
                            id="author"
                            v-model="comment.author"
                            tabindex="1"
                            required="required"
                            aria-required="true"
                            placeholder="* 昵称"
                    >
                    <input
                            type="text"
                            id="email"
                            class="comment-input email"
                            v-model="comment.email"
                            tabindex="2"
                            required="required"
                            aria-required="true"
                            placeholder="* 电子邮件"
                    >
                    <input
                            type="text"
                            class="comment-input link"
                            id="authorUrl"
                            v-model="comment.authorUrl"
                            tabindex="3"
                            placeholder="个人站点(https://)"
                    >
                </div>
                <div
                        class="comment-textarea"
                >
          <textarea
                  ref="commentTextarea"
                  required="required"
                  aria-required="true"
                  tabindex="4"
                  :placeholder="options.comment_content_placeholder || '撰写评论...'"
                  v-model="comment.content"
          ></textarea>
                </div>

                <div
                        class="comment-pre-content"
                        v-if="previewMode"
                >
                    <div
                            class="markdown-body"
                            v-html="renderedContent"
                    ></div>
                </div>

                <ul class="comment-buttons">
                    <li
                            class="middle"
                            style="margin-right:5px"
                    >
            <span
                    class="preview-btn comment-icon" :class="{'actived':previewMode}"
                    href="javascript:void(0)"
                    rel="nofollow noopener"
                    @click="handlePreviewContent"
            >
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17688" width="22"
                     height="22"><path
                        d="M502.390154 935.384615a29.538462 29.538462 0 1 1 0 59.076923H141.430154C79.911385 994.461538 29.538462 946.254769 29.538462 886.153846V137.846154C29.538462 77.745231 79.950769 29.538462 141.390769 29.538462h741.218462c61.44 0 111.852308 48.206769 111.852307 108.307692v300.268308a29.538462 29.538462 0 1 1-59.076923 0V137.846154c0-26.899692-23.355077-49.230769-52.775384-49.230769H141.390769c-29.420308 0-52.775385 22.331077-52.775384 49.230769v748.307692c0 26.899692 23.355077 49.230769 52.775384 49.230769h360.999385z"
                        p-id="17689"></path><path
                        d="M196.923077 216.615385m29.538461 0l374.153847 0q29.538462 0 29.538461 29.538461l0 0q0 29.538462-29.538461 29.538462l-374.153847 0q-29.538462 0-29.538461-29.538462l0 0q0-29.538462 29.538461-29.538461Z"
                        p-id="17690"></path><path
                        d="M649.846154 846.769231a216.615385 216.615385 0 1 0 0-433.230769 216.615385 216.615385 0 0 0 0 433.230769z m0 59.076923a275.692308 275.692308 0 1 1 0-551.384616 275.692308 275.692308 0 0 1 0 551.384616z"
                        p-id="17691"></path><path
                        d="M807.398383 829.479768m20.886847-20.886846l0 0q20.886846-20.886846 41.773692 0l125.321079 125.321079q20.886846 20.886846 0 41.773693l0 0q-20.886846 20.886846-41.773693 0l-125.321078-125.321079q-20.886846-20.886846 0-41.773693Z"
                        p-id="17692"></path></svg>
            </span>
                        <span
                                class="emoji-btn comment-icon" :class="{'actived': showEmoji}"
                                href="javascript:void(0)"
                                rel="nofollow noopener"
                                @click="handleToogleDialogEmoji"
                        >
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16172" width="22"
                     height="22"><path
                        d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z"
                        p-id="16173"></path><path
                        d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z"
                        p-id="16174"></path><path
                        d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z"
                        p-id="16175"></path><path
                        d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z"
                        p-id="16176"></path></svg>
            </span>
                    </li>
                    <li class="middle">
                        <a
                                class="button-submit"
                                href="javascript:void(0)"
                                tabindex="5"
                                rel="nofollow noopener"
                                @click="handleSubmitClick"
                        >提交</a>
                    </li>
                </ul>
                <div class="comment-alert">
                    <!-- Info -->
                    <template v-if="infoAlertVisiable">
                        <div
                                class="alert info"
                                v-for="(info, index) in infoes"
                                :key="index"
                        >
              <span
                      class="closebtn"
                      @click="clearAlertClose"
              >&times;</span>
                            <strong>{{ info }}</strong>
                        </div>
                    </template>

                    <!-- Success -->
                    <template v-if="successAlertVisiable">
                        <div
                                class="alert success"
                                v-for="(success, index) in successes"
                                :key="index"
                        >
              <span
                      class="closebtn"
                      @click="clearAlertClose"
              >&times;</span>
                            <strong>{{ success }}</strong>
                        </div>
                    </template>

                    <!-- Warning -->
                    <template v-if="warningAlertVisiable">
                        <div
                                class="alert warning"
                                v-for="(warning, index) in warnings"
                                :key="index"
                        >
              <span
                      class="closebtn"
                      @click="clearAlertClose"
              >&times;</span>
                            <strong>{{ warning }}</strong>
                        </div>
                    </template>
                </div>
                <div class="comment-emoji-wrap">
                    <VEmojiPicker
                            :pack="emojiPack"
                            @select="handleSelectEmoji"
                            v-show="emojiDialogVisible"
                            labelSearch="搜索表情"
                    />
                </div>
            </form>
        </div>
    </section>
</template>
<script>
    import marked from "marked";
    import md5 from "md5";
    import VEmojiPicker from "./EmojiPicker/VEmojiPicker";
    import emojiData from "./EmojiPicker/data/emojis.js";
    import {isEmpty, isObject, getUrlKey, renderedEmojiHtml, validEmail, queryStringify} from "../utils/util";
    import commentApi from "../api/comment";
    import axios from "axios";
    import autosize from "autosize";

    export default {
        name: "CommentEditor",
        components: {
            VEmojiPicker
        },
        props: {
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
            replyComment: {
                type: Object,
                required: false,
                default: () => {
                }
            },
            options: {
                required: false,
                default: []
            },
            configs: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                emojiPack: emojiData,
                emojiDialogVisible: false,
                comment: {
                    author: null,
                    authorUrl: null,
                    email: null,
                    content: ""
                },
                previewMode: false,
                showEmoji: false,
                infoes: [],
                warnings: [],
                successes: []
            };
        },
        computed: {
            renderedContent() {
                let str = this.comment.content ? marked(this.comment.content) : "";
                return renderedEmojiHtml(str);
            },
            avatar() {
                if (!this.comment.email || !validEmail(this.comment.email)) {
                    return (
                        this.configs.gravatarSource +
                        "?d=" +
                        this.options.comment_gravatar_default
                    );
                }
                const gravatarMd5 = md5(this.comment.email);
                return (
                    this.configs.gravatarSource +
                    `/${gravatarMd5}?s=256&d=` +
                    this.options.comment_gravatar_default
                );
            },
            commentValid() {
                return (
                    !isEmpty(this.comment.author) &&
                    !isEmpty(this.comment.email) &&
                    !isEmpty(this.comment.content)
                );
            },
            infoAlertVisiable() {
                return this.infoes !== null && this.infoes.length > 0;
            },
            warningAlertVisiable() {
                return this.warnings !== null && this.warnings.length > 0;
            },
            successAlertVisiable() {
                return this.successes !== null && this.successes.length > 0;
            }
        },
        created() {
            // Get info from local storage
            var author = localStorage.getItem("comment-author");
            var authorUrl = localStorage.getItem("comment-authorUrl");
            var email = localStorage.getItem("comment-email");
            this.comment.author = author ? author : "";
            this.comment.authorUrl = authorUrl ? authorUrl : "";
            this.comment.email = email ? email : "";
            // this.handleGetGithubUser();
        },
        mounted() {
            // autosize(this.$refs.commentTextArea);
            autosize(document.querySelector("textarea"));
        },
        methods: {
            handleSubmitClick() {
                if (isEmpty(this.comment.author)) {
                    // this.comment.author = '匿名';
                    this.warnings.push("评论者昵称不能为空");
                    return;
                }
                if (isEmpty(this.comment.email)) {
                    this.warnings.push("邮箱不能为空");
                    return;
                }
                if (isEmpty(this.comment.content)) {
                    this.warnings.push("评论内容不能为空");
                    return;
                }

                const content = this.comment.content;

                // Submit the comment
                this.comment.postId = this.targetId;
                if (this.replyComment) {
                    // Set parent id if available
                    this.comment.parentId = this.replyComment.id;
                }
                commentApi
                    .createComment(this.target, {...this.comment, content})
                    .then(response => {
                        // Store comment author, email, authorUrl
                        localStorage.setItem("comment-author", this.comment.author);
                        localStorage.setItem("comment-email", this.comment.email);
                        localStorage.setItem("comment-authorUrl", this.comment.authorUrl);

                        // clear comment
                        this.comment.content = "";
                        this.handleCommentCreated(response.data.data);
                    })
                    .catch(error => {
                        this.handleFailedToCreateComment(error.response);
                    });
            },
            handlePreviewContent() {
                if (this.comment.content.length > 0) {
                    this.previewMode = !this.previewMode;
                    this.showEmoji = false;
                    this.emojiDialogVisible = false;
                }
            },
            handleCommentCreated(createdComment) {
                this.clearAlertClose();

                if (createdComment.status === "PUBLISHED") {
                    this.successes.push("评论成功，刷新即可显示最新评论！");
                } else {
                    // Show tips
                    this.infoes.push("您的评论已经投递至博主，等待博主审核！");
                }
            },
            handleFailedToCreateComment(response) {
                this.clearAlertClose();
                if (response.status === 400) {
                    this.warnings.push(response.data.message);
                    if (response.data) {
                        const errorDetail = response.data.data;
                        if (isObject(errorDetail)) {
                            Object.keys(errorDetail).forEach(key => {
                                this.warnings.push(errorDetail[key]);
                            });
                        }
                    }
                }
            },
            handleToogleDialogEmoji() {
                this.previewMode = false;
                this.showEmoji = !this.showEmoji;
                this.emojiDialogVisible = !this.emojiDialogVisible;
            },
            handleSelectEmoji(emoji) {
                if (emoji.aliases != null && emoji.aliases != "") {
                    this.comment.content += emoji.aliases;
                } else {
                    this.comment.content += emoji.emoji;
                }
            },
            handleGithubLogin() {
                const githubOauthUrl = "http://github.com/login/oauth/authorize";
                const query = {
                    client_id: "a1aacd842bc158abd65b",
                    redirect_uri: window.location.href,
                    scope: "public_repo"
                };
                window.location.href = `${githubOauthUrl}?${queryStringify(query)}`;
            },
            handleGetGithubUser() {
                const accessToken = this.handleGetGithubAccessToken();
                axios
                    .get(
                        "https://cors-anywhere.herokuapp.com/https://api.github.com/user",
                        {
                            params: {
                                access_token: accessToken
                            }
                        }
                    )
                    .then(function (response) {
                        alert(response);
                    })
                    .catch(error => {
                        alert(error);
                    });
            },
            handleGetGithubAccessToken() {
                const code = getUrlKey("code");
                if (code) {
                    axios
                        .get(
                            "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
                            {
                                params: {
                                    client_id: "a1aacd842bc158abd65b",
                                    client_secret: "0daedb3923a4cdeb72620df511bdb11685dfe282",
                                    code: code
                                }
                            }
                        )
                        .then(function (response) {
                            let args = response.split("&");
                            let arg = args[0].split("=");
                            let access_token = arg[1];
                            alert(access_token);
                            return access_token;
                        })
                        .catch(error => {
                            alert(error);
                        });
                }
            },
            clearAlertClose() {
                this.infoes = [];
                this.warnings = [];
                this.successes = [];
            }
        }
    };
</script>
