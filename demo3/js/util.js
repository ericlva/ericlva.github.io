/**
 * 全局定义
 * @author stuart.shi
 * @link http://www.shizuwu.cn
 * @time 2014.4
 */
(function() {

    $.extend({
        /**
         * 获取网页url的参数
         * @param  {[type]} name [description]
         * @param  {[type]} url  [description]
         * @return {[type]}      [description]
         */
        getVar: function(name, url) {
            var vars = [],
                hash;
            if ("undefined" == typeof url || url == "") {
                var url = window.location.href;
            }
            var hashes = url.slice(url.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            if (typeof name != 'undefined') {
                return typeof vars[name] != 'undefined' ? vars[name] : 0;
            } else {
                return vars;
            }
        },
        /**
         * 日志输出
         * @param  {[type]} msg [description]
         * @return {[type]}     [description]
         */
        log: function(msg) {
            console.log(msg);
        },

        /**
         * ajax get
         * @param  {[type]}   url      [description]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @param  {[type]}   config   [description]
         * @return {[type]}            [description]
         */
        ajaxGet: function(url, data, callback, config) {
            $.extend(data, {
                //自定义全局参数
            })
            var config = $.extend({
                type: "GET",
                url: url,
                data: data,
                dataType: "json",
                success: function(msg) {
                    callback && callback(msg);
                }
            }, config);

            var ajaxXhr = $.ajax(config);

            ajaxXhr.error(function() {
                if (ajaxXhr.status == 404) {
                    //错误处理
                }
            });

        },

        /**
         * ajax post
         * @param  {[type]}   url      [description]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        ajaxPost: function(url, data, callback) {
            var ajaxXhr = $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "json",
                success: function(msg) {
                    callback && callback(msg);
                },
                error: function() {
                    if (ajaxXhr.status == 404) {
                        //错误处理
                    }
                }
            });
        }
    });

    /**
     * 数组克隆
     * @return {[type]} [description]
     */
    Array.prototype.clone = function() {
        return this.slice(0);
    };

    /**
     * 数组去重
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    Array.prototype.unique = function(t) {
        with(this) return !t ?
            join(",").match(/([^,]+)(?!.*\1)/ig) :
            reverse().
        join(",").match(/([^,]+)(?!.*\1)/ig).
        reverse();
    }

    //常量定义
    var Util = {
        "loading":{
            "default":[{
                "src": 'image/default/loading.png',
                "id": "bg"
            }, {
                "src": "image/default/loading_pic.png",
                "id": "loading"
            }, {
                "src": "image/default/team.png",
                "id": "team"
            }]
        }
    }

    window.Util = Util;
})();