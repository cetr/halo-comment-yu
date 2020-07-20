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
                <a
                        :href="comment.authorUrl"
                        rel="nofollow"
                        target="_blank"
                ><img
                        :alt="comment.author+`'s avatar`"
                        :src="avatar"
                        class="avatar"
                >
                </a>
            </div>
            <div class="contain-main">
                <div class="comment-meta">
                    <div
                            class="comment-author"
                            itemprop="author"
                    >
                        <a
                                :href="comment.authorUrl"
                                rel="nofollow"
                                target="_blank"
                                class="author-name"
                        >{{ comment.author }}</a>
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
                        <span
                                class="comment-reply"
                                style="cursor: pointer;"
                                :style="editing?'display:block;':''"
                                @click="handleReplyClick"
                        >{{ editing?'取消回复':'回复' }}</span>
                        <!--                                        <a-->
                        <!--                                                class="comment-id"-->
                        <!--                                                :href="'#comment-'+comment.id"-->
                        <!--                                        >#{{ comment.id }}</a>-->
                    </div>
                </div>
                <div
                        class="comment-content markdown-body"
                        itemprop="description"
                        v-html="compileContent"
                >
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
                return (
                    this.configs.gravatarSource +
                    `/${this.comment.gravatarMd5}?s=256&d=` +
                    this.options.comment_gravatar_default
                );
            },
            compileContent() {
                var at = "";
                if (this.comment.parentId !== null && this.comment.parentId > 0) {
                    at =
                        '<a href="#comment-' +
                        this.comment.parentId +
                        '">@' + this.comment.parentAuthor +
                        "</a>";
                }
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
            },

        }
    };
</script>