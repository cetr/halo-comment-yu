/**
 * time ago
 * @param {*} time
 */
export function timeAgo(time) {
    var currentTime = new Date().getTime()
    var between = currentTime - time
    var days = Math.floor(between / (24 * 3600 * 1000))
    if (days === 0) {
        var leave1 = between % (24 * 3600 * 1000)
        var hours = Math.floor(leave1 / (3600 * 1000))
        if (hours === 0) {
            var leave2 = leave1 % (3600 * 1000)
            var minutes = Math.floor(leave2 / (60 * 1000))
            if (minutes === 0) {
                var leave3 = leave2 % (60 * 1000)
                var seconds = Math.round(leave3 / 1000)
                return seconds + ' 秒前'
            }
            return minutes + ' 分钟前'
        }
        return hours + ' 小时前'
    }
    if (days < 0) return '刚刚'
    if (days < 1) {
        return days + ' 天前'
    } else {
        return formatDate(time, 'yyyy/MM/dd hh:mm');
    }
}

function formatDate(date, fmt) {
    date = new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export function isUrl(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    if (regexp.test(str)) {
        return true
    } else {
        return false
    }
}

export function isEmpty(content) {
    return content === null || content === undefined || content === ''
}

export function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object
}

export function validEmail(email) {
    var re = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,8}$/
    return re.test(email);
}

export const queryStringify = query => {
    const queryString = Object.keys(query)
        .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
        .join('&')
    return queryString
}

export function getUrlKey(name) {
    return (
        decodeURIComponent(
            (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
                location.href
            ) || "")[1].replace(/\+/g, "%20")
        ) || null
    );
}

export function decodeHTML(html) {
    /**
     * 特殊字符转义成HTML标签
     */
    var output, elem = document.createElement('div');
    elem.innerHTML = html;
    output = elem.innerText || elem.textContent;
    elem = null;
    return output;
}

export function renderedEmojiHtml(html) {
    const emojiData = require('../components/EmojiPicker/data/_emojis.js');
    for (let i = 0; i < emojiData["default"].length; i++) {
        let aliases = emojiData["default"][i]["aliases"].toString().trim();
        if (aliases != null && aliases != "") {
            html = html.replace(new RegExp(aliases, 'g'), emojiData["default"][i].emoji);
        }
    }
    return html;
}

export function decodeScriptLabel(html) {
    /**
     * 转换评论中的<script></script>标签
     */
    html = html.replace(new RegExp("</[\\s]*.*[\\s]*[sS][cC][rR][iI][pP][tT][\\s]*.*[\\s]*>", 'g'), "&lt;/script&gt;");
    html = html.replace(new RegExp("<[\\s]*.*[\\s]*[sS][cC][rR][iI][pP][tT][\\s]*.*[\\s]*>", 'g'), "&lt;script&gt;");
    return html;
}
