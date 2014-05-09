/**
 * 爱消除
 * @author stuart.shi
 * @link http://www.shizuwu.cn
 * @time 2014.4
 */
$(function() {
    var Game = {
        opts: {
            "theme": "default",
            "canvasID": "demoCanvas"
        },
        debug: true,
        sound: true,
        assets: {}, //缓存数据
        score: null, //积分元素
        canvas: null, //画布
        stage: null, //舞台
        timeBtn: true, //是否在移动
        needReset: false, //是否需要还原
        reset: false, //是否还原
        needMove: [], //需删除的元素
        remove: false,
        dir: 0, //移动方向(1→,2←,3↓,4↑)
        dirThis: null, //目标对象
        startThis: null, //拖动对象
        countAvatar: 6, //默认头像总数
        colNum: 5, //默认列数
        rowNum: 6, //默认行数
        frameArr: [], //数据矩阵
        moveCount: 0, //待消除个数
        dropCount: 0, //待下落个数
        dropArr: [],
        check: false,
        loading: null,

        /**
         * 初始化
         * @param  {[type]} opt [description]
         * @return {[type]}     [description]
         */
        init: function(opt) {
            this.opts = $.extend(this.opts, opt);

            this.theme = this.opts.theme;
            this.canvas = document.getElementById(this.opts.canvasID);
            this.stage = new createjs.Stage(this.canvas);

            //根据页面尺寸判断画布大小
            this.stage.width = this.canvas.width;
            this.stage.height = this.canvas.height;

            this.assets = {};

            //载入loading
            this.getAssets(Util.loading[this.theme], "loading");

            return this;
        },

        /**
         * loading
         * @return {[type]} [description]
         */
        createLoading: function() {
            //loading背景
            this.addImg(this.assets["bg"]);

            //loading动画
            //载入排队
            Ani.init(this.assets['team'].result, this);

            this.stage.update();

            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.setFPS(10);
            createjs.Ticker.addEventListener("tick", this.stage);
        },

        loadAnimate: function(config, offsetX, offsetY) {
            var ss = new createjs.SpriteSheet(config);
            var grant = new createjs.Sprite(ss, "run");

            grant.x = offsetX;
            grant.y = offsetY;

            if (config.shadow) {
                grant.shadow = new createjs.Shadow("#fde988", 2, 1, 15);
            }

            if (config.scale) {
                grant.scaleX = 0.5;
                grant.scaleY = 0.5;
            }

            this.stage.addChild(grant);
        },



        /**
         * 获取游戏元素
         * @param  {[type]} manifest [description]
         * @return {[type]}          [description]
         */
        getAssets: function(manifest, type) {
            this.assets = {};
            var que = new createjs.LoadQueue(true);
            if (type == "loading") {
                que.on('fileload', this.handleFileLoad, this);
                que.on('complete', this.createLoading, this);

            } else {
                
            }
            que.loadManifest(manifest);
            que.load();
        },

        /**
         * 元素载入后的处理
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        handleFileLoad: function(event) {
            this.assets[event.item.id] = event;
        },

        /**
         * 设置背景
         * @param {[type]} result [description]
         */
        setBg: function(result) {
            var This = this;

            this.addImg(result);

            createjs.Sound.play("ready", createjs.Sound.INTERRUPT_NONE, 0, 0, false, 1);

            setTimeout(function() {
                This.loadSound("bgsound", -1);
            }, 2500);
        },

        addImg: function(img) {
            var This = this;
            var result = img.result;
            var gamebg = new createjs.Shape();
            var g = gamebg.graphics;

            g.bf(result);
            g.dr(0, 0, result.width, result.height);

            if (img.item.id == "bg") {
                gamebg.scaleX = this.stage.width / result.width;
                gamebg.scaleY = this.stage.height / result.height;
            }

            if (img.item.id == "start") {
                gamebg.x = (this.stage.width - result.width) / 2;
                gamebg.y = this.stage.height - 80;

                gamebg.buttonMode = true;
                gamebg.on("click", function() {
                    This.startGame();
                })
                //gamebg.onclick = this.startGame();
            }

            this.stage.addChild(gamebg);
            this.stage.update();
        },


        log: function(msg) {
            if (this.debug) {
                console.log(msg);
            }
        }

    }

    window.Game = Game;
});