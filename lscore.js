/**
    ！！！！ 系统生成
    名称：链尚网主框架合并文件(调试模式)
    日期：2017-02-20
    版本：0.0.1
    ！！！！注意：当前文件由系统文件合并生成，仅供调试用，请不要直接更改其中代码，
          如需要更改代码，请找到该代码对应的文件进行修改，然后再重新打包 
*/

//以下代码源文件：(src/lsmain/core/lib/object.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：框架库类的基类
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：仅供日后扩展用，目前所有标准框架库文件类均继承与当前类
 *******************************************************/
(function (env) {
    'use strict';
    if (env.LSBaseClass) {
        return;
    }

    /**
     * 名称：主框架对象基础类
     */
    function BaseObjectClass() {
    }

    env.LSBaseClass = BaseObjectClass;

    //当前框架版本号
    BaseObjectClass.prototype.version = "0.0.1";

    /**
     * 名称：使指定构造函数继承于指定构造函数
     * 注意：请在构造函数原型没有自定义函数或者属性前使用此方法进行继承，否则会覆盖之前原型的方法
     * 说明：当前仅仅是构造一个面向对象的继承环境，便于以后进行扩展，并不打算建立全面，完整的继承体系
     * @param driverClass 子类构造
     * @param baseClass 父类构造
     */
    BaseObjectClass.extend = function (DriverClass, BaseClass) {
        var origin = DriverClass.prototype;
        DriverClass.prototype = new BaseClass();
        DriverClass.prototype.constructor = DriverClass;
        DriverClass.prototype.__base = DriverClass.prototype;
        overridePrototype(origin, DriverClass.prototype);
        return DriverClass;
    }

    /**
     * 名称：使指定构造函数继承于当前基础类
     * 注意：请在构造函数原型没有自定义函数或者属性前使用此方法进行继承，否则会覆盖之前原型的方法
     * 说明：当前仅仅是构造一个面向对象的继承环境，便于以后进行扩展，并不打算建立全面，完整的继承体系
     */
    BaseObjectClass.driver = function (driverClass) {
        BaseObjectClass.extend(driverClass, this);
    }

    /**
     * 返回一个代理调用函数
     * @param clouser 被代理函数所属的实例
     * @param name 被代理的函数名称
     * @returns {Function}
     */
    BaseObjectClass.prototype.exports = function (clouser, name) {
        if (clouser == null) {
            throw new Error("clouser 不能为null")
        }
        if (!Lsmain.type.isObject(clouser)) {
            throw new Error("clouser 必须为对象类型")
        }
        return function () {
            var args = Lsmain.utils.argumentArray(arguments);
            return Lsmain.utils.apply(clouser, clouser[name], args);
        }
    }

    /**
     * 创建一个代理者 将A对象中的方法,使用B对象作为公共调用 从而保护A对象的成员 通常用于内部类
     * @param inner 内部对象
     * @param exports 公布的成员
     */
    BaseObjectClass.prototype.wraps = function (inner, exports) {
        var types = Lsmain.type;
        if (!types.isObject2(inner)) {
            throw new Error('内部对象inner,并且为object类型');
        }
        if (arguments.length == 1) {
            //如果只有两个参数  则默认公布当前内部实例的所有函数
            exports = Lsmain.utils.ofKeys(inner, 'Function');
        } else {
            exports = Lsmain.utils.ensureArray(exports);
        }
        var wrap = this;
        var methodName = null;
        for (var i = 0, k = exports.length; i < k; i++) {
            methodName = exports[i];
            if (!types.isString(methodName)) {
                throw new Error(methodName + ' 不是一个方法名称');
            }
            wrap[methodName] = this.exports(inner, methodName);
        }
    }


    function overridePrototype(origin, target) {
        for (var i in origin) {
            target[i] = origin[i];
        }
    }

}(window));;

//以下代码源文件：(src/lsmain/core/ls.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架入口类
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：主框架库（由当前文件与src的库文件生成js/common/global.js 包文件)
 *******************************************************/
(function (env) {
    'use strict';
    if (env.Lsmain) {
        return;
    }
    /**
     * 名称：全局网站应用程序类
     */
    var LSApplicationClass = function () {
    }

    //继承与基础类
    env.LSBaseClass.driver(LSApplicationClass);

    //实例化全局应用实例
    env.Lsmain = env.LSApplication = new LSApplicationClass();

    /**
     将图片转为相对协议url
     */
    env.Lsmain.schemaUrl = function (url) {
        return (url || '').replace(/(https:|http:)/, '');
    }

    //基础类引用
    LSApplicationClass.prototype.BaseClass = LSBaseClass;

})(window);;

//以下代码源文件：(src/lsmain/core/lib/type.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：类型检测工具
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：主要提供js基础数据类型的检测
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 类型检测构造函数
     */
    function TypeLibraryClass() { }

    //继承于基础类
    origin.driver(TypeLibraryClass);

    //引用附加
    core.type = new TypeLibraryClass();

    /**
     * 名称：指定传入值是否为指定类型
     * @param obj 待检测的数据
     * @param type 目标类型
     */
    TypeLibraryClass.prototype.isType = function (obj, type) {
        return Object.prototype.toString.call(obj) == "[object " + type + "]";
    }

    /**
     * 名称：获取指定值得类型名称 例如：var num=1; 返回Number
     * @param obj 值
     */
    TypeLibraryClass.prototype.getTypeNameOfObj = function (obj) {
        return Object.prototype.toString.call(obj).replace("[object ", "").replace("]", "");
    }

    /**
     * 名称：判断传入对象是否为指定类型的类，或者指定类型的实例
     * @param obj 待检测实例
     * @param targetClass 目标类型
     */
    TypeLibraryClass.prototype.isClass = function (obj, targetClass) {
        if (this.isObject(obj)) {
            return obj instanceof targetClass;
        } else if (this.isFunction(obj)) {
            return obj.prototype instanceof targetClass;
        } else {
            return false;
        }
    }

    /**
     * 名称：检测传入对象是否为数组类型
     * @param obj 待检测对象
     */
    TypeLibraryClass.prototype.isArray = function (obj) {
        return this.isType(obj, "Array");
    }

    /**
     * 名称：检测传入对象是否为函数类型
     * @param obj 待检测对象
     */
    TypeLibraryClass.prototype.isFunction = function (obj) {
        return this.isType(obj, "Function");
    }

    /**
     * 名称：检测传入对象是否为Object类型
     * @param obj 待检测对象
     */
    TypeLibraryClass.prototype.isObject = function (obj) {
        return this.isType(obj, "Object");
    }

    /**
     * 名称：检测传入对象是否为Boolean类型
     * @param obj 待检测对象
     */
    TypeLibraryClass.prototype.isBoolean = function (obj) {
        return this.isType(obj, "Boolean");
    }

    /**
     * 名称：检测传入对象是否为Date类型
     * @param obj 待检测对象
     */
    TypeLibraryClass.prototype.isDate = function (obj) {
        return this.isType(obj, "Date");
    }

    /**
     * 名称：检测传入对象是否为String类型
     * @param obj 待检测对象
     */
    TypeLibraryClass.prototype.isString = function (obj) {
        return this.isType(obj, "String");
    }

    /**
     * 名称：检测传入对象是否为Nummber类型
     * @param obj 待检测对象
     */
    TypeLibraryClass.prototype.isNumber = function (obj) {
        return this.isType(obj, "Number");
    }

    /**
     * 名称:检测传入参数 是否为object类型,并且不是null
     */
    TypeLibraryClass.prototype.isObject2 = function(obj){
        if(obj==null){
            return false;
        }else{
            return this.isObject(obj);
        }
    }

})(window.Lsmain, window.Lsmain.BaseClass, window);;

//以下代码源文件：(src/lsmain/core/lib/string.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：string 字符串操作工具
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：主要提供字符串的相关操作函数，提高开发效率
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 字符串处理类 构造函数
     */
    function StringLibraryClass() {
    }

    //继承于基础类
    origin.driver(StringLibraryClass);

    //引用附加
    core.string = new StringLibraryClass();

    /**
     * 名称:确保当前传入参数为字符串,如果不是或者为null或者为空字符串则使用默认值进行替换
     */
    StringLibraryClass.prototype.ensure = function (maybe, def) {
        if (!this.isString(maybe)) {
            return def;
        } else if (this.isNullOrWhiteSpace(maybe)) {
            return def;
        } else {
            return maybe;
        }
    }


    /**
     * 名称：简单字符串格式化工具
     * @param str 格式化模板字符串
     * @param arg1-argN 每个占位{0}-{N}对应的值
     */
    StringLibraryClass.prototype.format = function (str, arg1, arg2, argN) {
        if (core.type.isString(str)) {
            var args = Array.prototype.slice.call(arguments, 1);
            str = str.replace(/\{\d+\}/g, function (a) {
                var s = args[a.slice(1, a.length - 1)];
                return s == null ? a : s;
            });
        } else {
            return str;
        }
        return str;
    }

    /**
     * 名称：简单字符串格式化工具
     * @param str 格式化模板字符串
     * @param args 每个占位{0}-{N}对应的数组值[1,2,3,4]
     */
    StringLibraryClass.prototype.format2 = function (str, args) {
        if (str) {
            args = args || [];
            str = str.replace(/\{\d+\}/g, function (a) {
                var s = args[a.slice(1, a.length - 1)];
                return s == null ? a : s;
            });
        }
        return str;
    }

    /**
     * 名称：字符串检测 是否以xx开头
     * @param s 原始字符串
     * @param s2 包含字符串
     * @param ignore 是否忽略大小写
     */
        //
    StringLibraryClass.prototype.startsWith = function (s, s2, ignoreCase) {
        if (this.isNullOrEmpty(s) || this.isNullOrEmpty(s2)) {
            return false;
        } else if (ignoreCase) {
            return s.substring(0, s2.length).toLowerCase() === s2.toLowerCase();
        } else {
            return s.substring(0, s2.length) === s2;
        }
    }

    /**
     * 名称：字符串检测 是否以XX结尾
     * @param s 原始字符串
     * @param s2 包含字符串
     * @param ignore 是否忽略大小写
     */
    StringLibraryClass.prototype.endsWith = function (s, s2, ignoreCase) {
        if (this.isNullOrEmpty(s) || this.isNullOrEmpty(s2)) {
            return false;
        } else if (ignoreCase) {
            return s.substring(s.length - s2.length).toLowerCase() === s2.toLowerCase();
        } else {
            return s.substring(s.length - s2.length) === s2;
        }
    }

    /**
     * 名称：去掉字符串左右两边的空格
     * @param s 字符串
     */
    StringLibraryClass.prototype.trim = function (s) {
        if (s) {
            return this.trimRight(this.trimLeft(s));
        } else {
            return '';
        }
    }

    /**
     * 名称：却掉指定字符串的所有空格
     * @param s 字符串
     */
    StringLibraryClass.prototype.trimAll = function (s) {
        if (s) {
            return s.replace(/\s+/g, '');
        } else {
            return '';
        }
    }

    /**
     * 名称：去掉字符串左边空格
     * @param s 字符串
     */
    StringLibraryClass.prototype.trimLeft = function (s) {
        if (s) {
            return s.replace(/^\s+/g, '');
        } else {
            return '';
        }
    }

    /**
     * 名称：去掉字符串左边空格
     * @param s 字符串
     */
    StringLibraryClass.prototype.trimRight = function (s) {
        if (s) {
            return s.replace(/\s%/g, '');
        } else {
            return '';
        }
    }

    /**
     * 名称：去掉字符串开始的指定字符串
     * @param s 待处理字符串
     * @param trim 需要去掉的开始字符串
     * @param ignore 是否忽略大小写
     */
    StringLibraryClass.prototype.trimStart = function (s, trim, ignoreCase) {
        if (this.startsWith(s, trim, ignoreCase)) {
            return s.substring(trim.length);
        } else {
            return s;
        }
    }

    /**
     * 名称：去掉字符串末尾指定字符串
     * @param s 待处理字符串
     * @param trim 需要去掉的末尾字符串
     * @param ignore 是否忽略大小写
     */
    StringLibraryClass.prototype.trimEnd = function (s, trim, ignoreCase) {
        if (this.endsWith(s, trim, ignoreCase)) {
            return s.substring(0, s.length - trim.length);
        } else {
            return s;
        }
    }

    /**
     * 名称：判断指定字符串是否为null,undefined或者为空字符串
     * @param s 字符串
     */
    StringLibraryClass.prototype.isNullOrEmpty = function (s) {
        return !(s !== null && s !== '' && s !== undefined);
    }

    /**
     * 名称:判断传入字符串参数列表是否存在为null,undefined或者为空字符串的项
     * @param s 字符串
     * @param s2 字符串2 .....
     * @param sN 字符串N
     */
    StringLibraryClass.prototype.isNullOrEmptyAny = function (s, s1, s2) {
        var array = core.utils.argumentArray(arguments);
        return this.isNullOrEmptyArrayOne(array);
    }

    /**
     * 名称:判断传入字符串数组是否存在为null,undefined或者为空字符串
     * @param array 数组
     */
    StringLibraryClass.prototype.isNullOrEmptyArrayOne = function (array) {
        var self = this;
        var rows = core.array.filter(array, function (item) {
            return self.isNullOrEmpty(item);
        });
        return rows.length > 0;
    }

    /**
     * 名称：判断指定值是否存在null,undefined或者空字符串或者包含空格的项
     * @param s 字符串
     */
    StringLibraryClass.prototype.isNullOrWhiteSpace = function (s) {
        if (this.isNullOrEmpty(s)) {
            return true;
        } else {
            return this.trimAll(s.toString()) === '';
        }
    }

    /**
     * 名称:判断传入字参数列表是否存在null,undefined或者空字符串或者包含空格的项
     * @param s 字符串
     * @param s2 字符串2 .....
     * @param sN 字符串N
     */
    StringLibraryClass.prototype.isNullOrWhiteSpaceAny = function (s, s1, s2) {
        var array = core.utils.argumentArray(arguments);
        return this.isNullOrWhiteSpaceArrayOne(array);
    }

    /**
     * 名称:判断传入字符串数组是否存在null,undefined或者空字符串或者包含空格的项
     * @param array 数组
     */
    StringLibraryClass.prototype.isNullOrWhiteSpaceArrayOne = function (array) {
        var self = this;
        var rows = core.array.filter(array, function (item) {
            return self.isNullOrWhiteSpace(item);
        });
        return rows.length > 0;
    }

    /**
     * 名称：比较连个字符串是否相等
     * @param a 字符串1
     * @param b 字符串2
     * @param ignore 是否忽略大小写
     */
    StringLibraryClass.prototype.equals = function (a, b, ignore) {
        if (ignore === true) {
            return (a || '').toString().toLowerCase() === (b || '').toString().toLowerCase();
        } else {
            return a === b;
        }
    }

    /**
     * 名称：如果传入字符串为空或者多个空格则将值替换成指定值
     * @param v 字符串
     * @param dv 替代字符串
     */
    StringLibraryClass.prototype.undef = function (v, dv) {
        if (this.isNullOrWhiteSpace(v)) {
            return dv;
        } else {
            return v;
        }
    }

    /**
     * 名称：14.判断传入值是否为String类型
     * @param v 字符串
     */
    StringLibraryClass.prototype.isString = function (v) {
        return Object.prototype.toString.apply(v) === "[object String]";
    }

    /**
     * 名称:将数字进行0左边补位
     * @param num 数字字符串
     * @param length 数字最大长度
     */
    StringLibraryClass.prototype.padLeft = function (num, length) {
        num = (num || '').toString();
        if (num.length < length) {
            return this.padLeft('0' + num, length);
        } else {
            return num;
        }
    }

    /**
     * 名称：替换指定字符串指定内容
     * @param str 原始字符串
     * @param rep 要替换的字符串
     * @param after 替换成字符串
     */
    StringLibraryClass.prototype.replace = function (str, rep, after) {
        str = (str || "").toString();
        if (this.isNullOrWhiteSpace(rep)) {
            return str;
        }
        str = str.replace(rep, after);
        if (rep !== after) {
            while (str.indexOf(rep) > -1) {
                str = str.replace(rep, after);
            }
        }
        return str;
    }

    /**
     * 名称：批量替换指定字符串的指定内容
     * @param str 原始字符串
     * @param mappings 替换映射 例如:[{req:'',after:''}]
     */
    StringLibraryClass.prototype.replaces = function (str, mappings) {
        mappings = core.utils.ensureArray(mappings);
        var mapping = null;
        for (var i = 0, k = mappings.length; i < k; i++) {
            mapping = mappings[i];
            str = this.replace(str, mapping.req, mapping.after);
        }
        return str;
    }

    /**
     * 名称：确定字符串以什么结尾，如果不是则默认拼接改结尾
     */
    StringLibraryClass.prototype.ensureEndWiths = function (str, ends) {
        str = str || "";
        if (!this.endsWith(str, ends)) {
            str = str + ends;
        }
        return str;
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/array.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：array 辅助工具
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：主要提供针对数组的相关操作方法
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：通用方法工具类
     */
    function ArrayLibraryClass() {
    }

    //继承于基础类
    origin.driver(ArrayLibraryClass);

    //引用附加
    core.array = new ArrayLibraryClass();

    var typeProbe = core.type;
    var strUtils = core.string;

    /**
     * 名称：2.始终返回一个数组 如果传入参数是数组则直接返回 否则将不为null的传入参数作为新数据的项进行返回
     * @param itemOrArray 数组或者非数组变量
     */
    ArrayLibraryClass.prototype.ensureArray = function (itemOrArray) {
        if (typeProbe.isArray(itemOrArray)) {
            return itemOrArray;
        } else if (itemOrArray != null) {
            return [itemOrArray];
        } else {
            return [];
        }
    }

    /**
     * 名称:将传入的对象数组转换成键值对形式(属性值)(数组项)
     * @param arrayObject 对象数组
     * @param p 作为键的属性名称
     * @param filter 过滤值或者过滤函数 如果传入值为非函数 则默认匹配为指定属性的值
     * 例如：[{id:'1',name:'ss'},{'id':2,name:'bb'}] -->this.mapDictionary(data,'id');  --> {1:{id:1,name:'ss'},2:{id:2,name:'bb'} }
     */
    ArrayLibraryClass.prototype.mapDictionary = function (arrayObject, p, filter) {
        arrayObject = this.ensureArray(arrayObject);
        var map = {}, v = null, item = null;
        for (var i = 0, k = arrayObject.length; i < k; i++) {
            item = arrayObject[i];
            v = item[p];
            if (strUtils.isNullOrWhiteSpace(filter)) {
                map[v] = item;
            } else if (typeProbe.isFunction(filter)) {
                if (filter(item)) {
                    map[v] = item;
                }
            } else if (filter == v) {
                map[v] = item;
            }
        }
        return map;
    }

    /**
     * 名称:将传入的对象数组转换成键(属性值)值(属性值)对形式
     * @param arrayObject 对象数组
     * @param p 作为键的属性名称
     * @param vp 作为值得属性名称
     * @param filter 过滤值或者过滤函数 如果传入值为非函数 则默认匹配为指定属性的值
     */
    ArrayLibraryClass.prototype.mapDictionary2 = function (arrayObject, p, vp, filter) {
        arrayObject = this.ensureArray(arrayObject);
        var map = {}, v = null, item = null, vi;
        for (var i = 0, k = arrayObject.length; i < k; i++) {
            item = arrayObject[i];
            v = item[p];
            vi = item[vp];
            if (strUtils.isNullOrWhiteSpace(filter)) {
                map[v] = vi;
            } else if (typeProbe.isFunction(filter)) {
                if (filter(item)) {
                    map[v] = vi;
                }
            } else if (filter == v) {
                map[v] = vi;
            }
        }
        return map;
    }

    /**
     * 名称: join对象数组指定属性
     * @param arrayObject 对象数组
     * @param p 要join的属性名称
     * @param c join字符 默认为','
     */
    ArrayLibraryClass.prototype.arrayJoin = function (arrayObject, p, c) {
        return this.valuesArray(arrayObject, p).join(c);
    }

    /**
     * 名称:获取对象数组指定属性值 返回一个属性值数组 例如:[{name:'1',a:'ss'},{'name':'x',}] --> [1,'x']
     * @param arrayObject 对象数组 如果该参数为对象则会默认转换为对象数组
     * @param p 属性名称 可以是属性名称数组
     * @param unique 属性值是否唯一
     * @param nullable 是否保留为空或者空字符串的属性值
     */
    ArrayLibraryClass.prototype.valuesArray = function (arrayObject, p, unique, nullable) {
        arrayObject = this.ensureArray(arrayObject);
        var values = [], v = null;
        for (var i = 0, k = arrayObject.length; i < k; i++) {
            v = arrayObject[i][p];
            if ((!nullable) && strUtils.isNullOrEmpty(v)) {
                continue;
            } else if (unique && values.indexOf(v) > -1) {
                continue;
            }
            values.push(v);
        }
        return values;
    }

    /**
     * 名称:性能循环遍历方法
     * @param rows 海量级数据 数组
     * @param handler 处理函数
     */
    ArrayLibraryClass.prototype.each = function (rows, handler) {
        rows = this.ensureArray(rows);
        if (rows.length > 500) {
            return this.blockEach(rows, handler);
        } else {
            for (var i = 0, k = rows.length; i < k; i++) {
                if (handler(rows[i], i) === false) {
                    break;
                }
            }
        }
    }

    /**
     * 名称:海量级数据循环遍历方法
     * @param rows 海量级数据 数组
     * @param handler 处理函数
     */
    ArrayLibraryClass.prototype.blockEach = function (rows, handler) {
        if (!typeProbe.isFunction(handler)) {
            return;
        }
        rows = this.ensureArray(rows);
        var len = rows.length, iterations = Math.floor(len / 8), others = len % 8, i = 0;
        if (others > 0) {
            do {
                handler(rows[i++], i);
            } while (--others > 0);
        }
        var ifBreak = false;
        var eachHandler = function (row, i) {
            if (ifBreak) {
                return;
            }
            ifBreak = handler(row, (i - 1)) === false;
        }
        while (iterations > 0) {
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            if (ifBreak) {
                break;
            }
            iterations--;
        }
        handler = null;
    }

    /**
     * 名称：兼容方式indexOf
     * @param rows 数组对象
     * @param row 要查找的数组项
     */
    ArrayLibraryClass.prototype.indexOf = function (rows, row) {
        var index = -1;
        rows = this.ensureArray(rows);
        if (rows.indexOf) {
            index = rows.indexOf(row);
        } else {
            this.each(rows, function (item, i) {
                if (item == row) {
                    index = i;
                    return false;
                }
            });
        }
        return index;
    }

    /**
     * 名称：判断指定数组中是否存在指定元素
     * @param rows 数组对象
     * @param 待判断的数组项
     */
    ArrayLibraryClass.prototype.contains = function (rows, row) {
        return this.indexOf(rows, row) > -1;
    }

    /**
     * 名称：兼容方式Array.filter
     * @param rows 数组对象
     * @param handler filter过滤函数 通过返回true/false来决定当前数组是否需要返回
     */
    ArrayLibraryClass.prototype.filter = function (rows, handler) {
        var filterRows = [];
        rows = this.ensureArray(rows);
        if (rows.filter) {
            filterRows = rows.filter(handler);
        } else {
            this.each(rows, function (item, i) {
                if (handler.call(rows, item, i) === true) {
                    filterRows.push(item);
                }
            });
        }
        return filterRows;
    }

    /**
     * 名称：过滤掉数组为Null或者为空字符串，或者多个空字符的项
     */
    ArrayLibraryClass.prototype.filterEmpty = function (rows) {
        return this.filter(rows, filterEmptyHandler);
    }

    /**
     * 名称：指定数组中符合条件的项,返回被移除项
     */
    ArrayLibraryClass.prototype.arrayQuerySplice = function (rows, handler) {
        rows = this.ensureArray(rows);
        var newRows = [];
        var deleteds = [];
        this.each(rows, function (row) {
            if (handler(row)) {
                deleteds.push(row);
            } else {
                newRows.push(row);
            }
        });
        rows.length = 0;
        rows.push.apply(rows, newRows);
        return deleteds;
    }

    /**
     * 名称:判断传入对象是否为一个不是空的数组(或者包含0个数组元素)
     * @param array
     * @returns {boolean}
     */
    ArrayLibraryClass.prototype.isEmptyArray = function (array) {
        if (!core.type.isArray(array)) {
            return true;
        } else {
            return array.length < 1;
        }
    }


    /**
     * 对象数组中指定字段的和
     */
    ArrayLibraryClass.prototype.sumOf = function (array, p) {
        var values = this.valuesArray(array, p, false, false);
        var value = 0;
        for (var i = 0, k = values.length; i < k; i++) {
            value = value + Number(values[i]);
        }
        return value;
    }

    /**
     * 对象数组中指定字段的乘积
     */
    ArrayLibraryClass.prototype.productOf = function (array, p) {
        var values = this.valuesArray(array, p, false, false);
        var value = 1;
        for (var i = 0, k = values.length; i < k; i++) {
            value = value * Number(values[i]);
        }
        return value;
    }

    /**
     * 名称:
     * @param v
     * @returns {boolean}
     */

    function filterEmptyHandler(v) {
        return !strUtils.isNullOrWhiteSpace(v);
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/date.js)如需调整代码，请更改此路径文件 
 /***************************************************
 * 名称：链尚网主框架库文件：时间操作工具
 * 日期：2015-07-15
 * 作者：Beven
 * 描述：提供相关时间操作函数
 * ************************************************/
(function (core, origin, env) {
    'use strict';
    var zhWeeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    /**
     * 名称：时间辅助函数操作函数类
     */
    function DateLibraryClass() {
    }

    //继承于基础类
    origin.driver(DateLibraryClass);

    //附加引用
    core.date = new DateLibraryClass();

    //类型检测工具
    var typeProbe = core.type;

    /**
     *名称：类似"20150520"字符串想转变成时间字符串格式"2015-05-20"
     */
    DateLibraryClass.prototype.parse = function (ymd) {
        if (!typeProbe.isString(ymd)) {
            ymd = ymd.toString();
        }
        var y = ymd.substring(0, 4);
        var m = ymd.substring(4, 6);
        var d = ymd.substring(6);
        return this.convert(y + "-" + m + "-" + d);
    }
    /**
     *名称(date 将指定时间转换成指定格式的字符串格式
     *格式单位(fmt) 例如： yyyy-MM-dd hh:mm:ss.S
     */
    DateLibraryClass.prototype.format = function (date, fmt) {
        date = this.convert(date);
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3),//季度 
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    /**
     * 名称：判断传入值是否为Date数据类型
     * @param date):待判断的值
     */
    DateLibraryClass.prototype.isDate = function (date) {
        return typeProbe.isDate(date);
    }
    /**
     * 名称：时间转换函数
     * 参数1：maybe. 时间类型，或者时间类型字符串，或者毫秒数字
     */
    DateLibraryClass.prototype.convert = function (maybe) {
        if (this.isDate(maybe)) {
            return maybe;
        } else if (typeProbe.isString(maybe) && isNaN(maybe)) {
            maybe = maybe.replace(/-/g, '/');
            var values = maybe.match(/(\d+)+/g);
            return (new Date(values[0], parseInt(values[1]) - 1, (values[2] || ''), (values[3] || ''), (values[4] || ''), (values[5] || ''), (values[6] || '')));
        } else {
            return new Date(Number(maybe));
        }
    }
    /**
     * 名称：计算两个时间之间的差值
     * 参数1：dtStart. 开始日期 可以是一个时间类型或者一个时间格式的字符串
     * 参数2：dtEnd.   开始日期 可以是一个时间类型或者一个时间格式的字符串
     * 参数3：unit     单位： ss(毫秒) s(秒) mi(分) h(小时) d(天) m(月) y(年)
     */
    DateLibraryClass.prototype.diff = function (dtStart, dtEnd, unit) {
        dtStart = this.convert(dtStart);
        dtEnd = this.convert(dtEnd);
        var v = 0;
        switch (unit) {
            case 'ss':
                v = dtEnd.getTime() - dtStart.getTime();
                break;
            case 's':
                v = (dtEnd.getTime() - dtStart.getTime()) / 1000;
                break;
            case 'mi':
                v = (dtEnd.getTime() - dtStart.getTime()) / 60000;
                break;
            case 'h':
                v = (dtEnd.getTime() - dtStart.getTime()) / 3600000;
                break;
            case 'd':
                v = (dtEnd.getTime() - dtStart.getTime()) / 86400000;
                break;
            case 'm':
                v = ((dtEnd.getMonth() + 1) + (dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
                break;
            case 'y':
                v = (dtEnd.getFullYear() - dtStart.getFullYear());
                break;
            default:
                v = 0;
                break;
        }
        return parseInt(v);
    }
    /**
     * 名称：增加添加指定单位的时间值
     * 参数1：dt   日期 可以是一个时间类型或者一个时间格式的字符串
     * 参数2：num  时间隔值
     * 参数3：unit 时间间隔单位： ss(毫秒) s(秒) mi(分) h(小时) d(天) m(月) y(年)
     */
    DateLibraryClass.prototype.dateAdd = function (dt, num, unit) {
        dt = this.convert(dt);
        switch (unit) {
            case 'ss':
                return new Date(dt.getTime() + num);
            case 's':
                return new Date(dt.getTime() + num * 1000);
            case 'mi':
                return new Date(dt.getTime() + num * 60000);
            case 'h':
                return new Date(dt.getTime() + num * 3600000);
            case 'd':
                return new Date(dt.getTime() + num * 86400000);
            case 'm':
                return new Date(dt.getFullYear(), (dt.getMonth() + num), dt.getDate(), dt.getHours(), dt.getSeconds(), dt.getMilliseconds());
            case 'y':
                return new Date(dt.getFullYear() + num, dt.getMonth(), dt.getDate(), dt.getHours(), dt.getSeconds(), dt.getMilliseconds());
            default:
                return dt;
        }
    }
    /**
     * 名称：给指定时间累加毫秒
     * @param dt 待累加毫秒的时间类型数据(可以是时间类型数据或者时间格式的字符串)
     * @param milliSeconds 累加毫秒
     */
    DateLibraryClass.prototype.addMilliseconds = function (dt, milliSeconds) {
        return this.dateAdd(dt, milliSeconds, 'ss');
    }
    /**
     * 名称：给指定时间累加秒
     * @param dt):待累加秒的时间
     * @param seconds):累加秒
     */
    DateLibraryClass.prototype.addSeconds = function (dt, seconds) {
        return this.dateAdd(dt, seconds, 's');
    }
    /**
     * 名称：给指定时间累加分钟
     * @param dt):待累加分钟的时间(可以是时间类型数据或者时间格式的字符串)
     * @param minutes):累加分钟
     */
    DateLibraryClass.prototype.addMinutes = function (dt, minutes) {
        return this.dateAdd(dt, minutes, 'mi');
    }
    /**
     * 名称：给指定时间累加小时
     * @param dt):待累加小时的时间(可以是时间类型数据或者时间格式的字符串)
     * @param hours):累加小时
     */
    DateLibraryClass.prototype.addHours = function (dt, hours) {
        return this.dateAdd(dt, hours, 'h');
    }
    /**
     * 名称：给指定时间累加天数
     * @param dt):待累加天数的时间(可以是时间类型数据或者时间格式的字符串)
     * @param days):累加天数
     */
    DateLibraryClass.prototype.addDays = function (dt, days) {
        return this.dateAdd(dt, days, 'd');
    }
    /**
     * 名称：给指定时间累加月
     * @param dt):待累加月的时间(可以是时间类型数据或者时间格式的字符串)
     * @param months):累加月
     */
    DateLibraryClass.prototype.addMonths = function (dt, months) {
        return this.dateAdd(dt, months, 'm');
    }
    /**
     * 名称：给指定时间累加年
     * @param dt):待累加年的时间(可以是时间类型数据或者时间格式的字符串)
     * @param years):累加年
     */
    DateLibraryClass.prototype.addYears = function (dt, years) {
        return this.dateAdd(dt, years, 'y');
    }
    /**
     * 名称：获取当前日期所在月的最大天数
     * @param dt):时间类型或者可以是一个时间格式的字符串
     */
    DateLibraryClass.prototype.maxDayOfMonth = function (dt) {
        dt = this.convert(dt);
        var dt2 = this.addMonths(dt, 1);
        return this.diff(dt, dt2, 'd');
    }
    /**
     * 名称：获取当前传入时间天所在汉字星期值
     * @param dt 传入时间类型或者时间类型格式的字符串
     */
    DateLibraryClass.prototype.dayOfWeek = function (dt) {
        dt = this.convert(dt);
        return zhWeeks[dt.getDay()];
    }
    /**
     * 名称：克隆传入时间
     * @param dt 时间类型变量或者时间格式的字符串
     */
    DateLibraryClass.prototype.clone = function (dt) {
        dt = this.convert(dt);
        return new Date(dt.getTime());
    }
    /**
     * 名称：获取当前传入时间的单位部分值
     * @param dt 时间类型或者时间类型格式字符串
     * @param part  时间间隔单位： ss(毫秒) s(秒) mi(分) h(小时) d(天) m(月) y(年) w(星期值)
     */
    DateLibraryClass.prototype.datePart = function (dt, part) {
        dt = this.convert(dt);
        switch (part) {
            case 'ss':
                return dt.getMilliseconds();
            case 's':
                return dt.getSeconds();
            case 'mi':
                return dt.getMinutes();
            case 'h':
                return dt.getHours();
            case 'd':
                return dt.getDate();
            case 'm':
                return dt.getMonth() + 1;
            case 'y':
                return dt.getFullYear();
            case 'w':
                return dt.getDay();
            default:
                return null;
        }
    }
    /**
     * 名称：获取当前日期所在年的第多少天
     * @param dt 时间类型或者为时间类型格式的字符串
     */
    DateLibraryClass.prototype.daysInYear = function (dt) {
        dt = this.convert(dt);
        var dtFirst = new Date(dt.getFullYear(), 0, 0, 0, 0, 0);
        return this.diff(dtFirst, dt, 'd');
    }
    /**
     * 名称：获取当前日期所在年的第几周
     * @param dt 时间类型或者为时间类型格式的字符串
     */
    DateLibraryClass.prototype.weeksInYears = function (dt) {
        dt = this.convert(dt);
        var dtFirst = new Date(dt.getFullYear(), 0, 0, 0, 0, 0);
        var week = dtFirst.getDay();
        week = week === 0 ? 7 : week;
        dtFirst = this.addDays(dtFirst, 7 - week);
        var days = this.diff(dtFirst, dt, 'd');
        var weeks = parseInt(days / 7);
        if (days % 7 !== 0) {
            weeks = weeks + 1;
        }
        return weeks + 1;
    }

    /**
     * 名称:将当前日志转换成unix的时间戳 ..
     * @param date 日期
     */
    DateLibraryClass.prototype.toUnixTimeStamp = function (date) {
        date = this.convert(date);
        return Math.round(date.getTime() / 1000);
    }

    /**
     * 名称:将unix时间戳转换成date类型
     * @param timestamp 时间戳字符串
     */
    DateLibraryClass.prototype.unixTimeStampToDate = function (timestamp) {
        var number = core.utils.ensureDecimal(timestamp);
        return new Date(number * 1000);
    }

    /**
     * 名称:将毫秒转换成 总计多少小时 多少分钟 多少秒
     */
    DateLibraryClass.prototype.countHour = function (milliSeconds) {
        var hour = parseInt(milliSeconds / 1000 / 60 / 60, 10);
        var minutes = parseInt(milliSeconds / 1000 / 60 % 60, 10);
        var seconds = parseInt(milliSeconds / 1000 % 60);
        return format('hh:mm:ss', 0, 0, 0, hour, minutes, seconds, 0, 0);
    }

    /**
     * 名称:将毫秒转换成 总计多少天 多少小时 多少分钟 多少秒
     */
    DateLibraryClass.prototype.countDays = function (milliSeconds) {
        var days = parseInt(milliSeconds / 1000 / 60 / 60 / 24, 10)
        var hour = parseInt(milliSeconds / 1000 / 60 / 60 % 24, 10);
        var minutes = parseInt(milliSeconds / 1000 / 60 % 60, 10);
        var seconds = parseInt(milliSeconds / 1000 % 60);
        return format('dd天hh:mm:ss', 0, 0, days, hour, minutes, seconds, 0, 0);
    }

    function format(fmt, y, m, d, h, mi, s, S, q) {
        var o = {
            "M+": m, //月份
            "d+": d, //日
            "h+": h, //小时
            "m+": mi, //分
            "s+": s, //秒
            "q+": q,//季度
            "S": S //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (y + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }


})(window.Lsmain, window.Lsmain.BaseClass, window);;

//以下代码源文件：(src/lsmain/core/lib/util.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：辅助工具
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：主要提供字符串的相关操作函数，提高开发效率
 *******************************************************/
(function (core, origin, env) {
    /**
     * 名称：通用方法工具类
     */
    function UtilsLibraryClass() {
    }

    //继承于基础类
    origin.driver(UtilsLibraryClass);

    //引用附加
    core.utils = new UtilsLibraryClass();

    var typeProbe = core.type;
    var strUtils = core.string;
    var arrayUtils = core.array;

    /**
     * 名称：字符串空处理函数
     * @param v 待空处理值 当v为null或者空或者多个空字符时 返回bv
     * @param bv 备用值
     */
    UtilsLibraryClass.prototype.ifn = function (v, bv) {
        if (v === null || v === undefined) {
            return bv;
        } else if (typeof v === 'string') {
            var isWhitespace = (v === '') || (v.replace(/\s/g, '') === '');
            return isWhitespace ? bv : v;
        } else {
            return v;
        }
    }

    /**
     * 名称：null与undefined处理
     */
    UtilsLibraryClass.prototype.undef = function (v, dv) {
        if (v === null || v === undefined) {
            return dv;
        } else {
            return v;
        }
    }

    /**
     * 名称：输出控制台日志，在一些不支持控制台的浏览器中，通过使用隐藏快捷键查看异常信息
     * @param
     */
    UtilsLibraryClass.prototype.log = function (message, args1, args2, argsN) {

    }

    /**
     * 名称：将arguments转换成数组
     * @param inArguments arguments对象
     * @param start  从arguments第几个参数开始进行转换 包括当前其实位置参数
     * @param en 截止至arguments第几个参数 不包括当前结束位置参数
     * 例如：{0：'a',1:'b',2:'c',3:'d'} argumentArray(arguments,1,3) 那么返回['b','c']
     */
    UtilsLibraryClass.prototype.argumentArray = function (inArguments, start, end) {
        if (inArguments && end === undefined || end === null) {
            end = inArguments.length;
        }
        return Array.prototype.slice.call(inArguments, start, end);
    }

    /**
     * 名称：2.始终返回一个数组 如果传入参数是数组则直接返回 否则将不为null的传入参数作为新数据的项进行返回
     * @param itemOrArray 数组或者非数组变量
     */
    UtilsLibraryClass.prototype.ensureArray = function (itemOrArray) {
        return arrayUtils.ensureArray(itemOrArray);
    }

    /**
     * 名称：始终返回一个数字类型 如果传入值不值一个数值，则可以指定默认值 如果没有指定默认值则系统默认会返回0
     */
    UtilsLibraryClass.prototype.ensureDecimal = function (num, dv) {
        if (isNaN(num) || num===null || num==="") {
            return this.ensureDecimal(dv, 0);
        } else if (typeProbe.isNumber(num)) {
            return num;
        } else {
            return Number(num);
        }
    }

    /**
     * 名称：计算多个数字进行乘法运算
     */
    UtilsLibraryClass.prototype.mul = function (arg1, arg2, argN) {
        var v = 1;
        var isCaculated = false;
        var numArray = Array.prototype.splice.call(arguments, 0, arguments.length);
        for (var i = 0, k = numArray.length; i < k; i++) {
            v = v * this.ensureDecimal(numArray[i], 1);
            isCaculated = true;
        }
        if (!isCaculated) {
            v = 0;
        }
        return v;
    }

    /**
     * 自动获取方法最后的回调函数
     */
    UtilsLibraryClass.prototype.smartCallback = function (args) {
        return args[args.length - 1];
    }

    /**
     * 名称：返回一个对象的属性keys
     * @param obj 对象
     */
    UtilsLibraryClass.prototype.getKeys = function (obj, lower) {
        if (Object.keys) {
            return Object.keys(obj);
        } else {
            var keys = [];
            for (var i in obj) {
                keys.push(i);
            }
            return keys;
        }
    }

    /**
     * 名称：返回一个对象的指定类型属性keys
     * @param obj 对象
     */
    UtilsLibraryClass.prototype.ofKeys = function (obj, type) {
        var keys = [];
        var types = core.type;
        for (var i in obj) {
            if (types.isType(obj[i], type)) {
                keys.push(i);
            }
        }
        return keys;
    }

    /**
     * 名称：将传入的函数转交给指定的对象执行 如果传入的函数不为函数类型 不触发异常
     */
    UtilsLibraryClass.prototype.call = function (object, fn, arg1, arguN) {
        if (typeProbe.isFunction(fn) && object) {
            var args = Array.prototype.splice.call(arguments, 2, arguments.length);
            var s = fn.apply(object, args);
            args = object = fn = arg1 = arguN = null;
            return s;
        }
    }
    /**
     * 名称：将传入的函数转交给指定的对象执行 如果传入的函数不为函数类型 不触发异常
     */
    UtilsLibraryClass.prototype.apply = function (object, fn, args) {
        if (typeProbe.isFunction(fn) && object) {
            var s = fn.apply(object, args);
            object = fn = null;
            return s;
        }
    }
    /**
     * 名称：返回一个劫持函数，被劫持函数handler调用者转向至getCall调用者，函数柯里化....
     * @param invoker 调用者 默认为window
     * @param handler 待调用的函数 注意：在调用时函数中的this指向当前实例
     * @param closureArgs 额外传递给handler的参数,注意 该参数使用位于handler最后一个 例如：handler(args1,arg2,arg3,...,closureArgs)
     */
    UtilsLibraryClass.prototype.getCall = function (invoker, handler, closureArgs) {
        if (typeof handler !== 'function') {
            throw new Error('handler must be a function !');
        }
        var delayHandler = function () {
            invoker = invoker || this;
            var args = Array.prototype.slice.call(arguments, 0);
            args.push(closureArgs);
            invoker.___caller = this;
            var v = handler.apply(invoker, args);
            if (invoker === window) {
                window.___caller = null;
            } else {
                delete invoker.___caller;
            }
            return v;
        }
        return delayHandler;
    };

    /**
     * 名称：返回一个劫持函数，该函数仅能调用一次，多次调用无效，被劫持函数handler调用者转向至getCall调用者，函数柯里化....
     * @param invoker 调用者 默认为window
     * @param handler 待调用的函数 注意：在调用时函数中的this指向当前实例
     * @param closureArgs 额外传递给handler的参数,注意 该参数使用位于handler最后一个 例如：handler(args1,arg2,arg3,...,closureArgs)
     */
    UtilsLibraryClass.prototype.getOnceCall = function (invoker, handler, closureArgs) {
        if (typeof handler !== 'function') {
            throw new Error('handler must be a function !');
        }
        var calleed = false;
        var delayHandler = function () {
            if (calleed === true) {
                handler = null;
                return;
            }
            calleed = true;
            invoker = invoker || window;
            var args = Array.prototype.slice.call(arguments, 0);
            args.push(closureArgs);
            return handler.apply(invoker, args);
        }
        return delayHandler;
    };

    /**
     * 名称:获取指定对象指定属性值 返回一个数组
     * @param object 对象
     * @param p 属性名 也可以是一个属性数组
     */
    UtilsLibraryClass.prototype.valuesObject = function (object, p) {
        var values = [];
        if (object && p) {
            p = this.ensureArray(p);
            for (var i = 0, k = p.length; i < k; i++) {
                values.push(object[p[i]]);
            }
        }
        return values;
    }


    /**
     * dom方式html编码,仅能使用与浏览器环境
     * @param s
     */
    UtilsLibraryClass.prototype.htmlEncode = function(s){
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return  div.innerHTML;
    }

    /**
     * dom方式html解码
     * @param s
     */
    UtilsLibraryClass.prototype.htmlDecode =function(s){
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.innerText || div.textContent;
    }

    /**
     * 名称:树结构数据自动分类
     * @param rows 对象数组
     * @param parent 父级属性
     * @param child 子级属性
     * @param cp 自定义对象子级数据属性名 默认为children 例如:{name:1,children:[....]}
     * @param del 默认为true 是否清除死循环属性链 例如:默认在每个数据里边会有一个parent{name:1,children:[],parent:{xxx}}
     * @param formatter 格式化器函数 例如：function(item){ item.id =s;item.key=1; }
     */
    UtilsLibraryClass.prototype.classify = function (rows, parent, child, cp, del, formatter) {
        del = del == null ? true : del;
        cp = this.undef(cp, 'children');
        var pv, id, linkParent = null, cd = null;
        var links = {}, childs = null, self = this;
        arrayUtils.each(rows, function (item, i) {
            pv = item[parent];
            id = item[child];
            linkParent = links[pv];
            if (linkParent == null) {
                cd = linkParent = links[pv] = {};
                cd[cp] = [];
                linkParent[child] = pv;
            }
            self.call(this, formatter, item);
            childs = linkParent[cp];
            childs.push(item);
            item.parent = linkParent;
            if (links[id]) {
                item[cp] = links[id][cp];
            } else {
                links[id] = item;
                item[cp] = [];
            }
        });
        arrayUtils.each(rows, function (item) {
            if ('parent' in item) {
                delete links[item[child]];
                if (del) {
                    (delete item.parent);
                }
            }
        });
        return links;
    }

    /**
     * 名称：浅层扩展对象
     * @param to 待扩展的对象
     * @param from 扩展来源对象
     * @param fnIngore 是否忽略函数
     */
    UtilsLibraryClass.prototype.override = function (to, from, fnIngore) {
        to = this.undef(to, {});
        from = this.undef(from, {});
        var keys = this.getKeys(from);
        var key = null, v;
        for (var i = 0, k = keys.length; i < k; i++) {
            key = keys[i];
            v = this.undef(from[key], to[key]);
            //判断是否需要忽略函数
            if (fnIngore && typeProbe.isFunction(v)) {
                continue;
            }
            to[key] = v;
        }
        return to;
    }

    /**
     * 名称：合并连个url片段
     */
    UtilsLibraryClass.prototype.combineURL = function (url, url2) {
        return strUtils.format("{0}/{1}", strUtils.trimEnd(url, "/"), strUtils.trimStart(url2, "/"));
    }

    //自定义获取堆栈
    UtilsLibraryClass.prototype.getStack = function (ex) {
        ex = ex || {message: ''};
        if (ex.stack) {
            return ex.stack;
        } else {
            var htmls = [ex.message];
            var callee = arguments.callee;
            if (callee) {
                var caller = callee.caller;
                while (caller) {
                    htmls.push('at ' + caller.toString().split('\n')[0]);
                    caller = caller.caller;
                }
            }
            return htmls.join('\n');
        }
    }

    /**
     * 比较两个对象的属性值是否相等
     * @parma origin 比较对象A
     * @param compare 比较对象B
     * @param originProp 比较对象A属性 不能为null
     * @param compareProp 比较对象B属性 可以为null 默认为originProp
     */
    UtilsLibraryClass.prototype.objectPropEqual = function (origin, compare, originProp, compareProp) {
        if (originProp == null) {
            throw new Error('originProp 不能为null');
        }
        if (origin == null || compare == null || !typeProbe.isObject(origin) || !typeProbe.isObject(compare)) {
            return false;
        } else {
            compareProp = arguments.length == 3 ? originProp : compareProp;
            return defaultValueCompareHandler(origin[originProp], compare[compareProp]);
        }
    }

    /**
     * 两个值逻辑比较
     * @param v1 值1
     * @param v2 值2
     * @param logic
     */
    UtilsLibraryClass.prototype.logicOf = function (v1, v2, logic) {
        var r = false;
        switch (logic) {
            case '=':
                r = v1 == v2;
                break;
            case '!=':
                r = v1 != v2;
                break;
            case '>':
                r = v1 > v2;
                break;
            case '<':
                r = v1 < v2;
                break;
            case '>=':
                r = v1 >= v2;
                break;
            case '<=':
                r = v1 <= v2;
                break;
            default:
                break;
        }
        return r;
    }

    /**
     * 值比较器
     */
    function defaultValueCompareHandler(v, v2) {
        if (v == null || v2 == null) {
            return false;
        } else {
            return v == v2;
        }
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));



;

//以下代码源文件：(src/lsmain/core/lib/cookie.js)如需调整代码，请更改此路径文件 
 /*****************************************************************
 * 名称：用于解析document.cookie字符串的工具
 * 作者：Beven
 * 日期：2015-02-19
 * 版本：0.0.1
 * 描述：无
 ****************************************************************/
(function (core, Class, env) {
    /**
     * Cookie解析构造函数
     * @constructor
     */
    function CookieParser() {
        initParser.apply(this, arguments);
    }

    core.CookieParser = CookieParser;

    /**
     * 名称：根据传入名称获取指定cookie的值
     * @param name cookie名称（可不区分大小写)
     */
    CookieParser.prototype.getCookie = function (name) {
        name = (name || '').toString().toLowerCase();
        return this.__cookies[name];
    }

    /**
     * 清除指定cookie
     */
    CookieParser.prototype.removeCookie = function (name,path) {
        this.setCookie(name, "", -1,path);
    }

    /**
     * 名称：设置一个cookie
     * @param name cookie 名称
     * @param v cookie 对应的值
     * @param expires 过期时间 可以是一个date类型，或者date类型的字符串
     * @param path cookie路径
     */
    CookieParser.prototype.setCookie = function (name, v, expires,path) {
        if (core.string.isNullOrWhiteSpace(name)) {
            return;
        }
        if (core.type.isDate(expires)) {
            expires = expires.toGMTString();
        }
        name = core.string.trim(name)
        window.document.cookie = core.string.format("{0}={1};expires={2};path={3}", name, encodeURI(v), expires,(path||""));
        this[name] = v;
        this.__cookies[name.toLowerCase()] = v;
    }

    CookieParser.prototype.parse = function (cookie) {
        InitParser.apply(this, cookie);
    }

    CookieParser.cookieKeyValues = function (cookies) {
        cookies = core.array.ensureArray(cookies);
        var commonCookies = [];
        var cstr = null;
        for (var i = 0, k = cookies.length; i < k; i++) {
            cstr = cookies[i];
            commonCookies.push(cstr.split(';')[0]);
        }
        return commonCookies;
    }

    /**
     * 名称：初始化解析器
     */
    function initParser(docOrCookie) {
        this.__cookies = {};
        if (docOrCookie == null) {
            return;
        }
        var cookie = null;
        if (core.type.isString(docOrCookie)) {
            cookie = docOrCookie;
        } else {
            cookie = docOrCookie.cookie;
        }
        cookie = cookie || '';
        var kv = null, name = null, v = null;
        var cookieKvs = cookie.split(';');
        var cookies = {};
        for (var i = 0, k = cookieKvs.length; i < k; i++) {
            kv = cookieKvs[i].split('=');
            name = core.string.trim(kv.shift());
            v = decodeURI(trimQuotCookieParamValue(kv.join('=')));
            cookies[name.toLowerCase()] = v;
            if(core.string.isNullOrWhiteSpace(v)){
                continue;
            }
            this[name] = v;
        }
        this.__cookies = cookies || {};
    }

    /**
     * 格式化cookie参数值
     */
    function trimQuotCookieParamValue(v) {
        v = core.string.trimStart(v, "\"");
        v = core.string.trimEnd(v, "\"");
        return v;
    }


}(window.Lsmain, window.Lsmain.BaseClass, window));
;

//以下代码源文件：(src/lsmain/core/lib/list.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：集合代理类
 * 日期：2015-07-16
 * 版本：0.0.1
 * 作者：Beven
 * 描述：支持代理数组的查询，移除，添加，批量添加等操作
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：集合代理构造函数
     */
    function ListLibraryClass(oriJsonArray) {
        InitListClass.apply(this, arguments);
    }

    //继承于基础类
    origin.driver(ListLibraryClass);

    //引用附加
    core.List = ListLibraryClass;

    //通用工具
    var utils = core.utils;
    //数组操作工具
    var arrayUtils = core.array;
    //类型检测工具
    var typeProbe = core.type;

    //集合代理原数组
    ListLibraryClass.prototype.items = null;

    /**
     * 名称：添加一项到集合中去,如果存在则不进行添加
     */
    ListLibraryClass.prototype.addOnly = function (obj) {
        if (!this.contains(obj)) {
            this.add(obj);
        }
    }

    /**
     * 名称：添加一项对象到集合中去
     */
    ListLibraryClass.prototype.add = function (obj) {
        this.items.push(obj);
    }

    /**
     * 名称：将制定数组添加集合中去
     */
    ListLibraryClass.prototype.addRange = function (jsonArray) {
        if (core.type.isClass(jsonArray, ListLibraryClass)) {
            jsonArray = jsonArray.items;
        }
        jsonArray = arrayUtils.ensureArray(jsonArray);
        this.items.push.apply(this.items, jsonArray);
    }

    /**
     * 名称：迭代当前集合
     */
    ListLibraryClass.prototype.each = function (handler) {
        return arrayUtils.each(this.items, handler);
    }

    /**
     * 名称：是否包含传入项
     * @param obj 待检测的项
     */
    ListLibraryClass.prototype.contains = function (obj) {
        return this.indexOf(obj) > -1;
    }

    /**
     * 名称:判断当前集合是否包含指定集合或者数组
     * @param compareListOrArray 待判断集合或者数组
     * @param name  匹配项的属性名称
     *              例如: 'id' (当前集合与compareListOrArray中对象使用同名属性'id'值进行匹配)
     *              或者'id:name' (当前集合项使用id属性与compareListOrArray数组项属性name值进行匹配是否相等
     *              或者name为function 例如: function(originItem,compareItem){ return originItem.name==compareItem.id; }
     */
    ListLibraryClass.prototype.includes = function (compareListOrArray, name) {
        var compareArray = null;
        var compareHandler = null, r;
        if (name == null) {
            throw new Error('必须填写比较器,可以是属性名称(例如:id)或者属性对(例如 id:name)或者属性比较器(例如:function(a,b){ return a.id==b.id}');
        }
        if (core.type.isClass(compareListOrArray, ListLibraryClass)) {
            compareArray = compareListOrArray.items;
        } else if (!core.type.isArray(compareListOrArray)) {
            return false;
        } else {
            compareArray = compareListOrArray;
        }
        if (core.type.isFunction(name)) {
            compareHandler = name;
        } else if (name.toString().indexOf(":") > -1) {
            var kv = name.toString().split(':');
            compareHandler = getDefaultCompareHandler(kv[0], kv[1]);
        } else {
            compareHandler = getDefaultCompareHandler(name.toString());
        }
        r = (compareArray.length > 0 && this.size() > 0);
        for (var i = 0, k = compareArray.length; i < k; i++) {
            if (this.query(queryCompare(compareArray[i], compareHandler)).length < 1) {
                r = false;
                break;
            }
        }
        return r;
    }

    /**
     * 名称：获取集合指定范围的元素
     * @param start 开始位置（包括开始位置)
     * @param end 结束位置 (不包括结束位置)
     */
    ListLibraryClass.prototype.slice = function (start, end) {
        return this.items.slice(start, end);
    }

    /**
     * 名称：获取当前集合总数量
     */
    ListLibraryClass.prototype.size = function () {
        return this.items.length;
    }

    /**
     * 名称：获取指定下标的项
     */
    ListLibraryClass.prototype.item = function (i) {
        return this.items[i];
    }

    /**
     * 名称：移除集合指定范围的元素
     * @param start 开始位置 （包括开始位置)
     * @param deleteCount 删除元素个数
     */
    ListLibraryClass.prototype.splice = function (start, deleteCount) {
        return this.items.splice(start, deleteCount);
    }

    /**
     * 名称：移除元素
     * @param indexOrHandler 下标或者刷选函数
     * 例如：this.remove(1); 或者 this.remove(function(v){ return v.id>10;});
     */
    ListLibraryClass.prototype.remove = function (indexOrHandler) {
        if (typeProbe.isFunction(indexOrHandler)) {
            return arrayUtils.arrayQuerySplice(this.items, indexOrHandler);
        }
        else if (!isNaN(indexOrHandler)) {
            this.items.splice(indexOrHandler, 1);
        } else {
            throw new Error("indexOrHandler only be a number or function");
        }
    }

    /**
     * 名称：移除指定元素
     */
    ListLibraryClass.prototype.removeItem = function (item) {
        return arrayUtils.arrayQuerySplice(this.items, function (v) {
            return v == item;
        });
    }

    /**
     * 名称：获取指定匹配的元素
     * @param handler 匹配函数 例如： function(row){return row.id==1}
     */
    ListLibraryClass.prototype.query = function (handler) {
        return arrayUtils.filter(this.items, handler);
    }

    /**
     * 名称：查询集合，根据指定属性值
     * @param property 属性名
     * @param v 属性值
     * @param express 比较表达式 有: = != > < >= <= 默认为=
     */
    ListLibraryClass.prototype.queryOf = function (property, v, express) {
        express = utils.ifn(express, '=');
        return this.query(function (item) {
            return utils.logicOf(fieldValue(item, property), v, express);
        });
    }

    /**
     * 名称：查询集合，查询指定项
     * @param item 集合项
     * @param express  比较表达式 有: = != > < >= <= 默认为=
     */
    ListLibraryClass.prototype.queryItem = function (item, express) {
        express = utils.ifn(express, '=');
        return this.query(function (t) {
            return utils.logicOf(t, item, express);
        });
    }

    /**
     * 判断当前集合是否有元素
     */
    ListLibraryClass.prototype.isEmpty = function () {
        return this.count() < 1;
    }

    /**
     * 名称：返回指定数据在当前集合中的下标位置
     * @param item 已存在的数据项
     */
    ListLibraryClass.prototype.indexOf = function (row) {
        return arrayUtils.indexOf(this.items, row);
    }

    /**
     * 名称：查询集合 ，根据指定属性值匹配，对比值可以有多个
     * @parma property 属性名
     * @param values 匹配值列表
     */
    ListLibraryClass.prototype.queryByValues = function (property, values) {
        values = arrayUtils.ensureArray(values);
        return this.query(function (item) {
            return arrayUtils.contains(values, fieldValue(item, property));
        });
    }

    /**
     * 名称：查询集合 ，根据对象数组的指定属性的所有值进行筛选
     * @param jsonArray 对象数组
     * @parma property 属性名
     * 例如： this.queryByArray('id',[{id:1},{id:2}]);
     */
    ListLibraryClass.prototype.queryByArray = function (property, jsonArray) {
        jsonArray = arrayUtils.ensureArray(jsonArray);
        var values = arrayUtils.valuesArray(jsonArray, property);
        return this.queryByValues(property, values);
    }

    /**
     * toString 重写
     */
    ListLibraryClass.prototype.toString = function () {
        var items = this.items || [];
        return items.toString();
    }

    /**
     * 对象数组中指定字段的和
     */
    ListLibraryClass.prototype.sumOf = function (p) {
        return arrayUtils.sumOf(this.items, p);
    }

    /**
     * 对象数组中指定字段的乘积
     */
    ListLibraryClass.prototype.productOf = function (p) {
        return arrayUtils.productOf(this.items, p);
    }

    /**
     * 返回当前集合项的个数
     */
    ListLibraryClass.prototype.count = function () {
        return this.items.length;
    }

    /**
     * 获取集合指定下标的项
     * @param index 下标
     */
    ListLibraryClass.prototype.get = function (index) {
        return this.items[index];
    }

    /**
     * 判断当前集合是否有元素
     */
    ListLibraryClass.prototype.isEmpty = function () {
        return this.count() < 1;
    }

    /**
     * 移除最后一项 并且返回最后一项
     */
    ListLibraryClass.prototype.pop = function () {
        return Array.prototype.pop.apply(this.items, arguments);
    }

    /**
     * 删除集合第一项 并且返回第一项
     */
    ListLibraryClass.prototype.shift = function () {
        return Array.prototype.shift.apply(this.items, arguments);
    }

    /**
     * 清空集合
     */
    ListLibraryClass.prototype.clear = function () {
        this.items.length = 0;
    }

    /**
     * 名称：获取指定项的值
     */
    function fieldValue(item, field) {
        if (item && typeProbe.isObject(item)) {
            return item[field];
        } else {
            return item;
        }
    }

    /**
     *
     */
    function queryCompare(item, compareHandler) {
        return function (origin) {
            return compareHandler(origin, item);
        }
    }

    /**
     * 获取默认属性比较函数
     */
    function getDefaultCompareHandler(originName, compareName) {
        if (arguments.length == 1) {
            compareName = originName;
        }
        var types = core.type;
        var handler = function (originItem, compareItem) {
            if (originItem == null || compareItem == null || !types.isObject(originItem) || !types.isObject(compareItem)) {
                return false;
            } else {
                return defaultValueCompareHandler(originItem[originName], compareItem[compareName]);
            }
        }
        return handler;
    }

    /**
     * 值比较器
     */
    function defaultValueCompareHandler(v, v2) {
        if (v == null || v2 == null) {
            return false;
        } else {
            return v == v2;
        }
    }

    /**
     * 名称：初始化集合
     */
    function InitListClass(jsonArray) {
        if (core.type.isClass(jsonArray, ListLibraryClass)) {
            jsonArray = jsonArray.items;
        }
        this.items = arrayUtils.ensureArray(jsonArray);
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/browser.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：判断当前浏览器类型以及版本的探测工具
 * 日期：2015-07-29
 * 版本：0.0.1
 * 作者：Beven
 * 描述：判断当前浏览器类型以及版本的探测工具
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：浏览器探测工具构造函数
     */
    function BrowserTypeVersionClass() {
    }

    /**
     * 名称：设配探测结果构造函数
     */
    function App(handler) {
        if (handler) {
            var info = handler((navigator.userAgent || "")) || {};
            this.matched = info.matched;
            this.version = info.version;
            this.name = info.name;
        }
    }

    //继承于基础类
    origin.driver(BrowserTypeVersionClass);

    //引用附加
    core.browser = new BrowserTypeVersionClass();

    //浏览器类型
    App.prototype.name = null;

    //浏览器版本号
    App.prototype.version = null;

    //当前结果是否能匹配当前浏览器
    App.prototype.matched = false;

    //当前匹配成功的app
    var currentApp = null;

    /**
     * 名称：获取当前浏览器的信息
     */
    BrowserTypeVersionClass.prototype.getCurrent = function () {
        if (currentApp) {
            return {name: currentApp.name, version: currentApp.version, equipment: mobileOf(), os: systemOf()};
        } else {
            return {name: 'unknow', version: 'nuknow', equipment: 'unknow'}
        }
    }

    /**
     * 名称：获取当前浏览器简写
     */
    BrowserTypeVersionClass.prototype.getClassName = function () {
        var app = this.getCurrent();
        var nameList = [];
        nameList.push(app.name);
        nameList.push(app.name + "_" + parseInt(app.version));
        nameList.push(app.name + "_" + (app.version || '').replace(/\./g, '_'));
        return nameList.join(' ').toLowerCase();
    }

    /**
     * 名称:判断是否为移动端,或者为移动端指定操作系统
     * @param  sys (ios | android )
     */
    BrowserTypeVersionClass.prototype.mobile = function (sys) {
        if (arguments.length === 0) {
            return navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
        } else {
            return mobileOf() === sys;
        }
    }

    /**
     * 名称:获取或者比较当前操作系统
     * @param os 操作系统类型 可以比较: windows,mac,unix,linux,ios,android或者其他
     *          注意:如果不填写此值,则默认返回当前操作系统信息
     */
    BrowserTypeVersionClass.prototype.os = function (os) {
        if (arguments.length === 1) {
            return systemOf().type == os;
        } else {
            return systemOf();
        }
    }

    /**
     * 名称：添加一个浏览器类型探测
     * @param name 浏览器名称 例如: ie
     * @param handler 检测函数 例如：function(){  return {version:'',matched:(true/false)} }
     */
    function add(name, handler) {
        if (currentApp) {
            handler = null;
        }
        var app = new App(handler);
        if (app.matched) {
            currentApp = app;
        }
        BrowserTypeVersionClass.prototype[name] = function (eq, version) {
            if (arguments.length == 1) {
                version = eq;
                return app.matched && version === app.version;
            } else if (arguments.length > 1) {
                return app.matched && expressVersion(version, app.version, eq);
            }
            else {
                return app.matched;
            }
        }
    }

    //firefox浏览器
    add('firefox', firefox);
    //ie浏览器
    add('ie', ie);
    //opera浏览器
    add('opera', opera);
    //Chrome浏览器
    add('chrome', chrome);
    //safari 浏览器
    add('safari', safari);

    //ie浏览器
    function ie(userAgent) {
        var values = userAgent.match(/MSIE\s(\d+\.\d+)/);
        if (values === null) {
            values = userAgent.match(/rv:(\d+\.\d+)/);
        }
        return infoVersion('MSIE', values);
    }

    //火狐浏览器
    function firefox(userAgent) {
        return infoVersion('Firefox', userAgent.match(/Firefox\/(\d+(\.|\d)+)/))
    }

    //Opera浏览器
    function opera(userAgent) {
        return infoVersion('Opera', userAgent.match(/OPR\/(\d+(\.|\d)+)/));
    }

    //Safari浏览器
    function safari(userAgent) {
        return infoVersion('Safari', userAgent.match(/Safari\/(\d+(\.|\d)+)/));
    }

    //Chrome浏览器
    function chrome(userAgent) {
        return infoVersion('Chrome', userAgent.match(/Chrome\/(\d+(\.|\d)+)/));
    }

    //返回浏览器信息
    function infoVersion(name, values) {
        var version = values !== null ? values[1] : null;
        return {version: version, name: name, matched: values !== null}
    }

    /**
     * 动态 比较版本号
     */
    function expressVersion(version, currentVersion, eq) {
        version = core.utils.ensureDecimal(version, -99);
        currentVersion = core.utils.ensureDecimal(currentVersion, -100);
        eq = core.utils.undef(eq, '==');
        var v = false;
        switch (eq) {
            case '>':
                v = currentVersion > version;
                break;
            case '<':
                v = currentVersion < version;
                break;
            case '>=':
                v = currentVersion >= version;
                break;
            case '<=':
                v = currentVersion <= version;
                break;
            default:
                v = currentVersion === version;
                break;
        }
        return v;
    }

    /**
     * 获取设备类型
     */
    function deviceTypeOf() {
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        if (ipad) {
            return {name: 'ipad', title: '平板'};
        } else if (ua.match(/AppleWebKit.*Mobile.*/)) {
            return {name: 'phone', title: '手机'};
        } else {
            return {name: 'pc', title: '电脑'};
        }
    }

    /**
     * 获取手机操作系统类型
     */
    function mobileOf() {
        var userAgent = navigator.userAgent;
        if (!userAgent.match(/AppleWebKit.*Mobile.*/)) {
            return 'pc';
        }
        if (userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return 'ios';
        } else if (userAgent.indexOf('Android') > -1) {
            return 'android';
        } else {
            return 'other';
        }
    }

    /**
     * 获取当前操作系统信息
     */
    function systemOf() {
        var userAgent = navigator.userAgent;
        var osVersion = (userAgent.split(';')[0] || '').split('(')[1];
        var os = null;
        if (!userAgent.match(/AppleWebKit.*Mobile.*/)) {
            os = pcSystemOf(osVersion);
        }else if (userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            os = {name: 'ios', version: osVersion, type: 'ios'};
        } else if (userAgent.indexOf('Android') > -1) {
            os = {name: 'android', version: osVersion, type: 'android'};
        } else {
            os = {name: 'other', version: osVersion, type: 'other'};
        }
        os.device = deviceTypeOf();
        return os;
    }

    /**
     * pc操作系统获取
     * @param osVersion
     * @returns {*}
     */
    function pcSystemOf(osVersion) {
        var platform = navigator.platform;
        if (platform == "Win32" || platform == "Windows") {
            return {name: windowsOf(osVersion), version: osVersion, type: 'windows'}
        } else if (platform == "Mac68K" || platform == "Macintosh" || platform == "MacPPC") {
            return {name: 'Mac', version: osVersion, type: 'mac'}
        } else if (platform == "X11") {
            return {name: 'Unix', version: osVersion, type: 'unix'}
        } else if (platform == "Linux") {
            return {name: "Linux", version: osVersion, type: 'linux'}
        } else {
            return {name: platform, version: osVersion, type: platform};
        }
    }

    function windowsOf(osVersion) {
        if (osVersion.indexOf("Windows NT 5.0") > -1 || osVersion.indexOf("Windows 2000") > -1) {
            return "Win2000";
        } else if (osVersion.indexOf("Windows NT 5.1") > -1 || osVersion.indexOf("Windows XP") > -1) {
            return "WinXP";
        } else if (osVersion.indexOf("Windows NT 5.2") > -1 || osVersion.indexOf("Windows 2003") > -1) {
            return "Win2003";
        } else if (osVersion.indexOf("Windows NT 6.0") > -1 || osVersion.indexOf("Windows Vista") > -1) {
            return "WinVista";
        } else if (osVersion.indexOf("Windows NT 6.1") > -1 || osVersion.indexOf("Windows 7") > -1) {
            return "Win7";
        } else if (osVersion.indexOf("Windows NT 6.2") > -1 || osVersion.indexOf("Windows 8") > -1) {
            return "win8";
        } else if (osVersion.indexOf("Windows NT 6.3") > -1 || osVersion.indexOf("Windows 8.1") > -1) {
            return "win8.1"
        } else if (osVersion.indexOf("Windows NT 6.4") || osVersion.indexOf("Windows NT 10.0") > -1 || osVersion.indexOf("Windows 10") > -1) {
            return "win10";
        } else {
            return osVersion;
        }
    }
}(window.Lsmain, window.Lsmain.BaseClass, window));

;

//以下代码源文件：(src/lsmain/core/lib/emitter.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：自定义事件容器
 * 日期：2015-07-16
 * 版本：0.0.1
 * 作者：Beven
 * 描述：事件容器，通过创建的事件容器实例进行自定义事件注册，以及在对应的时机触发指定事件
 *       例如： var emitter = new core.EventEmitterClass();
 *              //添加事件处理队列函数
 *              emitter.on('change',function(newValue,oldValue){  console.log('something is changed');});
 *              //触发事件，并且实行事件的队列函数
 *              emitter.emit('change',newValue,oldValue);
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：事件容器构造函数
     * 通过实例化当前容器 可以对其进行添加事件，以及执行指定类型的事件队列
     * 例如： var emitter = new core.EventEmitterClass();
     *              //添加事件处理队列函数
     *              emitter.on('change',function(newValue,oldValue){  console.log('something is changed');});
     *              //触发事件，并且实行事件的队列函数
     *              emitter.emit('change',newValue,oldValue);
     */
    function EventEmitterLibraryClass() { this.regHandlers = {}; }

    //继承于基础类
    origin.driver(EventEmitterLibraryClass);

    //引用附加
    core.EventEmitterClass = EventEmitterLibraryClass;

    //辅助工具
    var utils = core.utils;
    //数组辅助工具
    var arrayUtils = core.array;
    //类型检测工具
    var typeProbe = core.type;

    /**
     * 名称：添加衣蛾指定事件的处理函数 该函数仅执行一次
     * @param name 事件名称
     * @param handler 事件函数
     */
    EventEmitterLibraryClass.prototype.once = function (name, handler) {
        if (core.string.isNullOrWhiteSpace(name)) {
            return;
        }
        if (!core.type.isFunction(handler)) {
            return;
        }
        var self = this;
        var onceHandler = function () {
            if (onceHandler.called) {
                self.off(name, onceHandler);
                handler = name = self = onceHandler = null;
            } else {
                onceHandler.called = true;
                handler.apply(this, arguments);
            }
        }
        this.on(name, onceHandler);
    }

    /**
    * 名称：添加一个指定事件的处理函数
    * @param name 事件名称
    * @param handler 事件处理函数
    */
    EventEmitterLibraryClass.prototype.on = function (name, handler) {
        if (name === null || name === '') {
            return;
        }
        var handlers = this.getListeners(name);
        if (typeof handler == 'function') {
            handlers.push(handler);
        }
    }

    /**
     * 名称：移除一个指定事件的处理函数
     * @param name 事件名称 
     * @param handler 事件处理函数 如果handler参数为null 则取消当前事件的所有已绑定的函数
     */
    EventEmitterLibraryClass.prototype.off = function (name, handler) {
        var handlers = this.getListeners(name);
        if (arguments.length === 1) {
            handlers.length = 0;
        } else {
            arrayUtils.arrayQuerySplice(handlers, function (h) { return h === handler; });
        }
    }

    /**
     * 名称：销毁事件容器
     */
    EventEmitterLibraryClass.prototype.destroy = function () {
        var allHandlers = this.regHandlers || {};
        for (var i in allHandlers) {
            if (typeProbe.isArray(allHandlers[i])) {
                allHandlers[i].length = 0;
            } else {
                allHandlers[i] = null;
            }
        }
    }

    /**
     * 名称：获取指定事件的已注册的事件列表
     */
    EventEmitterLibraryClass.prototype.getListeners = function (name) {
        if (name === null || name === "") {
            return [];
        }
        var handlers = this.regHandlers[name];
        if (handlers == null) {
            handlers = this.regHandlers[name] = [];
        }
        return handlers;
    }

    /**
     * 名称：执行指定事件
     */
    EventEmitterLibraryClass.prototype.emit = function (name, arg1, argN) {
        var handlers = this.getListeners(name);
        var args = Array.prototype.slice.call(arguments, 1);
        var returnValue = null;
        arrayUtils.each(handlers, function (handler) {
			if(typeof handler=='function'){
				returnValue = handler.apply(window, args);
			}
            return returnValue;
        });
        return returnValue;
    }
}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/angel.js)如需调整代码，请更改此路径文件 
 /*************************************************************************
 作者:Beven
 描述:Angel.js框架 主要用于js面向对象开发  并且支持模块化开发 已及依赖js项自动引用 无需再进行繁琐的js文件引用
 同时集成了复杂的js脚本与css动态加载工具(ResourceUtility)
 例如:
 1.面向对象开发
 Angel.build('A','B',
 function(using,base){
                    base('/Scripts/');//指定依赖项根目录
                    using('b.js');//引用/Scripts/b.js
                },
 function(P){
                    //P 当前定义类的原型(P = Function.prototype)
                    P.show = function(){
                
                    }
                    P.B = new B();
                },
 //当前定义A类的构造函数
 function(){
            
                },
 false,//(单例模式标记) false：表示非单例，true：单例模式 在单例模式下获取当前单例实例调用: A.getInstance();
 []//当前如果为单例模式 则在构造单例实例时 构造函数所需要的初始化参数
 );
 2.js动态载入
 ResourceUtility.setBaseUrl('/Scripts/');
 var resource = ResourceUtility.createResource("jquery-1.7.1.js,load2.js", "jquery", true);
 resource.setReference('load.js');
 resource.addCall(function () { alert('ok'); });
 resource.go();
 当然也有更加简单的引入方式
 请参见具体方法定义
 ResourceUtility.loadJs2 //动态加载复杂js文件
 ResourceUtility.loadCss2 //加载一组css文件
 ResourceUtility.loadJs //动态加载单个js文件
 ResourceUtility.loadCss //动态加载css文件
 *************************************************************************/
(function (myevn) {
    window.Angel = {};

    window.ResourceUtility = {};

    Angel.author = 'beven';

    Angel.version = 1.0;

    Angel.Closure = AngelClosure;

    //Angel.build中依赖项
    var usings = [];

    //Angel.using 回调队列
    var usingHandlers = [];

    //Angel.build异步创建队列
    var createHandlers = [];

    //创建一个类定义
    Angel.build = function (name, parent, references, define, constructor, singleton, paras) {
        usings = [];
        //1.加载依赖项
        doCall(references, this, using, setBaseUrl);

        //2加载依赖项后进行构造类扩展
        goUsings(function () {
            //1.渲染构造函数 如果在单例模式下 返回自定义的单例构造函数
            var constrcutor2 = getConstructor(constructor, singleton);
            //2.自主创建类函数
            constrcutor2 = createLevelClass(name, constrcutor2);
            //3.继承父类成员
            toExtend(constrcutor2, parent);
            //4.定义类加载完成函数
            constrcutor2.prototype.ClassInit = classInit;
            //5.扩建类成员
            doCall(define, this, constrcutor2.prototype);
            //6.单例模式渲染
            singletonRender(singleton, constrcutor2, constructor, paras);
            //7.调用加载启动函数
            setup(constrcutor2.prototype);
            name = parent = references = define = constrcutor2 = constructor = singleton = paras = null;
        });
    }

    //引用一个模块类
    Angel.using = function (url, handler) {
        AngelClosure.ResourceManager.getInstance().loadJs(url,handler);
    }

    //引用js与css资源
    Angel.loadResource = function (files,callback) {
        var urls = files.join(',');
        var resource = AngelClosure.ResourceManager.getInstance().createResource(urls);
        resource.addCall(callback);
        resource.go();
    }

    //设置一个基础路径 在加载资源时 会默认拼接基础路径
    ResourceUtility.setBaseUrl = function (basePath) {
        AngelClosure.ResourceManager.getInstance().tmpBaseUrl = basePath;
    }

    //设置一个临时基础路径 在加载资源时 会默认拼接基础路径 在加载完毕后会销毁临时路径
    ResourceUtility.setTempBasePath = function (path) {
        AngelClosure.ResourceManager.getInstance().tmpBaseUrl = path;
    }

    //创建一个页面资源 会根据不同的资源类型返回不同的资源代理对象 目前只支持js与css
    //src:资源路径
    //name:资源名称
    //async:指定当前资源是否异步加载
    ResourceUtility.createResource = function (src, name, async) {
        return AngelClosure.ResourceManager.getInstance().createResource(src, name, async);
    }

    //加载一个简单脚本
    //uRL:脚本资源路径 不支持','号隔开的路径
    //callBack:加载完毕后的回调函数
    //data:回调函数所用的数据
    //async:是否异步加载
    ResourceUtility.loadJs = function (uRL, callBack, data, async) {
        AngelClosure.ResourceManager.getInstance().loadJs(uRL, callBack, data, async);
    }
    //加载一个简单样式文件
    //uRL:样式资源路径 不支持','号隔开的路径
    //callBack:加载完毕后的回调函数
    //data:回调函数所用的数据
    ResourceUtility.loadCss = function (uRL, callBack, data) {
        AngelClosure.ResourceManager.getInstance().loadCss(uRL, callBack, data);
    }

    //加载一个包含层次js依赖引用的资源
    //source:{uRL:'',deps:[{uRL:'',deps:[]}],calls:[{data:1,handler:function(){}}]}或者 {uRL:'',deps:''} 或者 {uRL:'',deps:{uRL:'',deps:[]}
    //async:整个资源是否使用异步加载
    ResourceUtility.loadJs2 = function (source, async) {
        AngelClosure.ResourceManager.getInstance().loadJsGroup(source, async);
    }

    //加载一个包含层次css依赖引用的资源
    //source:{uRL:'',deps:[{uRL:'',deps:[]}],calls:[{data:1,handler:function(){}}]}或者 {uRL:'',deps:''} 或者 {uRL:'',deps:{uRL:'',deps:[]}
    ResourceUtility.loadCss2 = function (source) {
        AngelClosure.ResourceManager.getInstance().loadCssGroup(source);
    }

    //设置一个基础路径 在加载资源时 会默认拼接基础路径
    function setBaseUrl(basePath) {
        AngelClosure.ResourceManager.getInstance().baseUrl = basePath;
    }

    //引入一个依赖项(针对当前定义的类)
    //uRL:依赖项地址
    //deps:当前依赖项的依赖项 例如:(如果多个)deps:[{uRL:'',deps:[]}] 或者 (单个)'angel.js'
    function using(uRL, deps) {
        usings = usings || [];
        if (isString(uRL)) {
            usings.push(uRL);
        } else {
            var resource = new AngelClosure.JsResource(uRL, Angel.author);
            AngelClosure.ResourceManager.getInstance().parseJsReferences(deps, true, resource);
            usings.push(resource);
        }
    }

    //加载usings资源
    function goUsings(handler) {
        usings = usings || [];
        if (usings.length <= 0) {
            doCall(handler, Angel);
            goUsingHandler();
        } else {
            if (isFn(handler)) {
                createHandlers.push(handler);
            }
            var resource = new AngelClosure.JsResource('', 'usings');
            resource.setReferences2(usings);
            resource.addCall(goUsingHandler);
            resource.go();
        }
    }

    //goUsing依赖项加载完毕后的调用监听函数
    function goUsingHandler() {
        if (AngelClosure.ResourceManager.getInstance().isCompleted()) {
            doHandlers();
        }
    }

    //执行创建队列 与回调队列
    function doHandlers() {
        for (var i = createHandlers.length - 1; i > -1; i--) {
            doCall(createHandlers[i], Angel);
        }
        createHandlers = [];
        for (var n = 0, k = usingHandlers.length; n < k; n++) {
            doCall(usingHandlers[n], window);
        }
        usingHandlers = [];
    }

    //在自动获取构造函数
    function getConstructor(constructor, singleton) {
        if (singleton === true) {
            var fn = getSingleton();
            if (isFn(constructor)) {
                var Class = fn;
                constructor.prototype = new Class();
                constructor.prototype.constructor = constructor;
            }
            return fn;
        } else {
            return constructor;
        }
    }

    //如果是在单例模式下,则初始化单例数据
    function singletonRender(singleton, sfn, constructor, paras) {
        if (singleton === true) {
            var fn = sfn || constructor;
            var Class = fn;
            var ins = new Class();
            if (paras != null && constructor) {
                constructor.apply(ins, paras);
            }
            sfn.getInstance = function () { return ins; }
            //release(function () { ins = null; });
        }
    }

    //设置启动函数
    function setup(p) {
        if (typeof p.ClassInit === 'function') {
            p.ClassInit();
        }
    }

    //默认 类加载完毕 初始化函数 可以自定义 当类的依赖项加载完毕后，并且类原型构造完毕后调用
    function classInit() { }

    //获取单例模式构造函数
    function getSingleton() {
        return function () {
            if (this.constructor.getInstance) {
                return this.constructor.getInstance();
            }
        }
    }

    //继承实现
    function toExtend(child, parent) {
        if (parent == null || !isFn(child)) {
            return;
        }
        if (isString(parent)) {
            parent = createClass(getEnviroment(), parent);
        }
        if (isFn(parent)) {
            var Class = parent;
            var pps = child.prototype = new Class();
            //继承时需要克隆一些原型链上的一些对象属性 防止共享使用
            cloneByKeys(pps, getObjectKeys(pps));
            //设置构造函数索引
            pps.constructor = child;
        }
    }

    //指定传入的函数
    function doCall(handler, target, args1, args2) {
        if (isFn(handler)) {
            var caller = isObject(target) ? target : this;
            var paras = [];
            paras.push.apply(paras, arguments);
            paras.shift();
            paras.shift();
            return handler.apply(caller, paras);
        }
    }

    //克隆对象
    //obj:待克隆的对象
    //deep:如果值为true 则进行深克隆
    function clone(obj, deep) {
        var cInstance = null;
        if (obj) {
            var hasProperty = obj.constructor != Object;
            if (isArray(obj)) {
                cInstance = [];
                for (var i = 0, k = obj.length; i < k; i++) {
                    cInstance.push(clone(obj[i]));
                }
            }
            else if (!isObject(obj)) {
                cInstance = new obj.constructor(obj.valueOf());
            }
            else {
                cInstance = new obj.constructor();
                var v = null;
                for (var p in obj) {
                    v = obj[p];
                    if (isFn(v) && hasProperty) {
                        continue;
                    }
                    else if (isObject(v)) {
                        cInstance[p] = deep === true ? clone(v, deep) : v;
                    } else {
                        cInstance[p] = v;
                    }
                }
            }
        }
        return cInstance;
    }

    //获取指定对象属性中所有对象属性
    function getObjectKeys(obj) {
        var keys = [];
        peach(obj, keys, function (k, v, args) {
            if (isObject(v) || isArray(v)) {
                args.push(k);
            }
        });
        return keys;
    }

    //克隆指定对象的指定对象属性
    function cloneByKeys(obj, keys) {
        each(keys, obj, function (i, name, ps) {
            ps[name] = clone(ps[name]);
        });
    }

    //轮询数组执行相关操作
    function each(array, args, handler) {
        if (!isArray(array) || !isFn(handler)) { return; }
        for (var i = 0, k = array.length; i < k; i++) {
            if (handler(i, array[i], args) === true) {
                break;
            }
        }
        handler = array = null;
    }

    //轮询对象属性执行相关操作
    function peach(obj, args, handler) {
        if (!isObject(obj) || !isFn(handler)) { return; }
        for (var i in obj) {
            if (handler(i, obj[i], args) === true) {
                break;
            }
        }
    }

    //层级类函数创建器
    function createLevelClass(name, last) {
        var env = getEnviroment();
        var levels = (name || '').toString().split('.');
        var lastLevel = levels.pop();
        var level = levels.shift();
        while (level) {
            env = createClass(env, level);
            level = levels.shift();
        }
        if (isFn(last)) {
            return env[lastLevel] = last;
        } else {
            return createClass(env, lastLevel);
        }
    }

    //类函数构建函数
    function createClass(enviroment, name) {
        var fn = enviroment[name];
        if (!isFn(fn)) {
            fn = enviroment[name] = function () { };
        }
        return fn;
    }

    //类函数构建宿主环境
    function getEnviroment(env) {
        return Angel.Env || myevn;
    }

    //在浏览器离开时进行释放操作
    function release(handler) {
        var doHanlder = function () {
            try {
                handler();
            } finally {
                remHandler(window, 'beforeunload', doHanlder);
            }
        }
        addHanlder(window, 'beforeunload', doHanlder);
    }

    //移除事件
    function remHandler(sender, evs, handler) {
        if (sender == null || evs == null || !isFn(handler)) { return; }
        if (sender.detachEvent) {
            sender.detachEvent('on' + evs, handler);
        } else if (sender.removeEventListener) {
            sender.removeEventListener(evs, handler);
        } else {
            sender['on' + evs] = null;
        }
    }

    //添加事件
    function addHanlder(sender, evs, handler) {
        if (sender == null || evs == null || !isFn(handler)) { return; }
        if (sender.attachEvent) {
            sender.attachEvent('on' + evs, handler);
        } else if (sender.addEventListener) {
            sender.addEventListener(evs, handler);
        } else if (isFn(sender['on' + evs])) {
            sender['on' + evs] = handler;
        }
    }

    //检测传入对象是否为数组
    function isArray(a) {
        return isType(a, "Array");
    }

    //检测传入对象是否为字符串
    function isString(s) {
        return isType(s, "String");
    }

    //检测传入对象是否为对象
    function isObject(o) {
        return isType(o, "Object");
    }

    //检测传入对象是否为函数
    function isFn(fn) {
        return isType(fn, "Function");
    }

    //检测传入对象是否为指定类型
    function isType(obj, type) {
        return Object.prototype.toString.call(obj) == "[object " + type + "]";
    }

    //检测一个字符串是否为空或者空字符串
    function isEmpty(str) {
        if (str) {
            return str.toString().replace(/\s/g, '') === '';
        } else {
            return true;
        }
    }

    //内部环境索引
    function AngelClosure() { }
    Angel.Env = AngelClosure;

    //已经加载的资源管理工具
    Angel.build('ResourceManager', null, null, function (P) {
        //正在加载资源列表
        P.loadingUrls = [];
        //加载完毕的资源列表
        P.completedUrls = [];
        P.version = null;
        //基础目录
        P.baseUrl = null;
        //临时基础目录
        P.tmpBaseUrl = null;
        //是否已经存在指定资源
        P.isResourced = function (uRL) {
            var loadingList = new Lsmain.List(this.loadingUrls);
            var completedList = new Lsmain.List(this.completedUrls);
            var self = this;
            var hasResource = completedList.query(function (url) {
                    return self.equalUrl(uRL, url);
                }).length > 0;
            if (!hasResource) {
                hasResource = loadingList.query(function (url) {
                        return self.equalUrl(uRL, url);
                    }).length > 0;
            }
            return hasResource;
        }
        //判断当前加载资列表是否已经全部加载完毕
        P.isCompleted = function () {
            return this.loadingUrls.length <= 0;
        }
        //添加已经加载的资源
        P.addCompletedSources = function (uRL) {
            this.removeLoadingResource(uRL);
            if (!this.isResourced(uRL)) {
                this.completedUrls.push(uRL);
            }
        }
        //添加正在加载中的资源
        P.addLoadingResources = function (uRL) {
            this.loadingUrls.push(uRL);
        }
        //比较两个Url是否指向同一个资源
        P.equalUrl = function (uRL1, uRL2) {
            uRL1 = (uRL1 || '').replace(/\s/g, '').toLowerCase();
            uRL2 = (uRL2 || '').replace(/\s/g, '').toLowerCase();
            return uRL1 == uRL2;
        }
        //移除正在加载的资源
        P.removeLoadingResource = function (uRL) {
            var rs = this.loadingUrls;
            var len = rs.length - 1;
            var rind = -1;
            for (var i = len; i >= 0; i--) {
                if (this.equalUrl(uRL, rs[i])) {
                    rind = i;
                    break;
                }
            }
            if (rind > -1) {
                rs.splice(rind, 1);
            }
        }
        //记录日志
        P.log = function (msg) {
            if (Angel.debug) {
                if (console && console.log) {
                    console.log(msg);
                }
            }
        }
        //加载一个简单脚本
        P.loadJs = function (uRL, callBack, data, async) {
            var jsResource = new AngelClosure.JsResource(uRL, Angel.author, async);
            jsResource.addCall(callBack, data).go();
        }
        //加载一个加单样式文件
        P.loadCss = function (uRL, callBack, data) {
            var cssResource = new AngelClosure.CssResource(uRL, Angel.author);
            cssResource.addCall(callBack, data).go();
        }
        //加载一组脚本包括依赖引用
        //source:{uRL:'',deps:[{uRL:'',deps:[]}],calls:[{data:1,handler:function(){}}]}或者 {uRL:'',deps:''} 或者 {uRL:'',deps:{uRL:'',deps:[]}
        P.loadJsGroup = function (source, async) {
            if (!isObject(source) || isEmpty(source.uRL)) { return; }
            var jsResource = new AngelClosure.JsResource(source.uRL, Angel.author, async);
            jsResource.calls = source.calls;
            this.parseJsReferences(source.deps, async, jsResource);
            jsResource.go();
        }
        //加载一组css样式
        P.loadCssGroup = function (source) {
            if (!isObject(source) || isEmpty(source.uRL)) { return; }
            var cssResource = new AngelClosure.CssResource(source.uRL, Angel.author);
            cssResource.calls = source.calls;
            this.parseCssReferences(source.deps, async, cssResource);
            cssResource.go();
        }
        //解析复杂js资源组
        P.parseJsReferences = function (source, async, jsResource) {
            var myRef = null;
            if (isString(source) && !isEmpty(source)) {
                jsResource.setReference(new AngelClosure.JsResource(source, Angel.author, async));
            } else if (isArray(source)) {
                for (var i = 0, k = source.length; i < k; i++) {
                    this.ParseReferences(source[i], async, jsResource);
                }
            } else if (isObject(source) && !isEmpty(source.uRL)) {
                myRef = new AngelClosure.JsResource(source.uRL, Angel.author, async);
                if (jsResource == null) {
                    jsResource = myRef;
                } else {
                    jsResource.setReference(myRef);
                }
                myRef.calls = source.calls;
                this.ParseReferences(source.deps, async, myRef);
            }
            return jsResource;
        }
        //解析复杂css资源组
        P.parseCssReferences = function (source, cssResource) {
            var myRef = null;
            if (isString(source) && !isEmpty(source)) {
                cssResource.setReference(new AngelClosure.CssResource(source, Angel.author));
            } else if (isArray(source)) {
                for (var i = 0, k = source.length; i < k; i++) {
                    this.parseCssReferences(source[i], cssResource);
                }
            } else if (isObject(source) && !isEmpty(source.uRL)) {
                myRef = new AngelClosure.CssResource(source.uRL, Angel.author);
                if (cssResource == null) {
                    cssResource = myRef;
                } else {
                    cssResource.setReference(myRef);
                }
                myRef.calls = source.calls;
                this.parseCssReferences(source.deps, myRef);
            }
            return cssResource;
        }
        //创建一个页面资源 会根据不同的资源类型返回不同的资源代理对象 目前只支持js与css
        //src:资源路径
        //name:资源名称
        //async:指定当前资源是否异步加载
        P.createResource = function (src, name, async) {
            src = (src || '').toString().replace(/\s/g, '');
            if (src === '') { return new AngelClosure.Resource(); }
            var dotPos = src.lastIndexOf(".");
            var queryPos = src.lastIndexOf("?");
            var extension = src.substring(dotPos + 1, queryPos > -1 ? queryPos : src.length);
            switch (extension) {
                case "js":
                    return new AngelClosure.JsResource(src, name || src, async);
                case "css":
                    return new AngelClosure.CssResource(src, name);
                default:
                    return new AngelClosure.Resource();
            }
        }

    }, null, true, []);

    //资源项基类
    Angel.build('Resource', null, null, function (P) {
        //资源项名称
        P.name = "";
        //资源项url
        P.url = "";
        //是否异步加载资源 默认为:异步加载
        P.sync = true;
        //获取script标签目标位置元素
        P.getPosition = function () {
            var headers = document.getElementsByTagName("head");
            var target = null;
            headers = headers || [];
            target = headers.length < 0 ? document.body : headers[0];
            return target;
        }
        //管理对象
        P.global = AngelClosure.ResourceManager.getInstance();
        //当前资源引用项(即 当前资源被谁引用的资源项实例)
        P.referencer = null;
        //已经加载完毕的依赖引用项列表
        P.completedReferences = [];
        //当前资源依赖引用资源列表
        P.references = [];
        //当前资源加载完毕后的回调配置
        P.calls = [{ data: null, handler: null }];
        //添加回调函数
        P.addCall = function (handler, data) {
            if (typeof handler === 'function') {
                this.calls.push({ data: data, handler: handler });
            }
            return this;
        }
        //获取根据资源项url解析而来的资源路径列表
        P.getPaths = function () {
            var nav = this.global;
            var uRL = this.url;
            var paths = [];
            var files = uRL.split(',');
            var filename = null;
            var hasCombine = files.length == 1;
            var host = this.isEmpty(nav.tmpBaseUrl) ? nav.baseUrl : nav.tmpBaseUrl;
            for (var i = 0, k = files.length; i < k; i++) {
                filename = (files[i]).replace(/\s/g, '');
                if (filename !== '') {
                    if ((filename.indexOf("http://") === 0) || filename.indexOf("https://") === 0) {
                        paths.push(filename);
                    } else {
                        paths.push(hasCombine ? this.combine(host, filename) : filename);
                    }
                }
            }
            return paths;
        }
        //获取调试清除缓存用的后缀参数
        P.cacheRender = function () {
            var nav = this.global;
            var v = '';
            if (Angel.debug) {
                v = '?v=' + (new Date()).getTime();
            } else if (!this.isEmpty(nav.version)) {
                v = '?v=' + nav.version;
            }
            return v;
        }
        //地址合并
        P.combine = function (path, path2) {
            path = (path || '').replace(/\\\\/g, "/");
            path2 = (path2 || '').replace(/\\\\/g, "/");
            if (path[path.length - 1] != "/") {
                path = path + "/";
            }
            if (path2[0] == "/") {
                path2 = path2.substr(1, path2.length);
            }
            return path + path2;
        }
        //检测一个字符串是否为空或者空字符串
        P.isEmpty = function (str) {
            if (str) {
                return str.toString().replace(/\s/g, '') === '';
            } else {
                return true;
            }
        }
        //加载资源
        P.go = function () {
            this.doOnStart();
            //this.clearErrorReferences();
            //1.首先加载依赖引用项 如果依赖引用项加载完毕后再加载当前资源项
            if (this.references instanceof Array && this.references.length > 0) {
                this.loadReferences();
            } else {
                this.loadResource();
            }
            this.global.tmpBaseUrl = null;
        }
        //清理错误的依赖引用项
        P.clearErrorReferences = function () {
            var refs = this.references;
            if (refs instanceof Array) {
                var noErrors = [];
                for (var i = 0, k = refs.length; i < k; i++) {
                    if (refs[i] instanceof this.constructor) {
                        noErrors.push(refs[i]);
                    }
                }
                this.references = noErrors;
            }
        }
        //加载依赖项资源
        P.loadReferences = function () {
            var refs = this.references;
            for (var i = 0, k = refs.length; i < k; i++) {
                refs[i].go();
            }
        }
        //加载当前资源项
        P.loadResource = function () {
            var nav = this.global;
            var paths = this.getPaths();
            if (paths.length >= 2) {
                var refs = this.references = [];
                this.completedReferences = [];
                var myRef = null;
                for (var i = 0, k = paths.length; i < k; i++) {
                    myRef = AngelClosure.ResourceManager.getInstance().createResource(paths[i]);
                    myRef.referencer = this;
                    refs.push(myRef);
                }
                this.url = '';
                this.go();
            } else if (paths.length == 1) {
                var uRL = paths[0];
                if (nav.isResourced(uRL)) {
                    this.doOnCompleted('(跳过)'+uRL);
                } else {
                    this.global.log("开始加载资源:" + uRL);
                    nav.addLoadingResources(uRL);
                    this.goResource(uRL, this.name, this.cacheRender());
                }
            } else {
                this.doOnCompleted("");
            }
        }
        //加载实现
        P.goResource = function (src, name) {

        }
        //开始加载资源
        P.doOnStart = function () {

        }
        //加载资源完毕
        P.doOnCompleted = function (uRL) {
            this.global.log("加载资源:" + uRL + "完毕");
            this.global.addCompletedSources(uRL);
            if (this.referencer != null) {
                var refer = this.referencer;
                var completeds = refer.completedReferences;
                completeds.push(this);
                if (completeds.length == refer.references.length) {
                    refer.references = null;
                    refer.completedReferences = null;
                    refer.loadResource();
                }
            }
            this.doCalls();
            if (this.referencer == null) {
                this.destroy();
            }
        }
        //资源加载出错
        P.doOnError = function (uRL) {
            this.global.log("加载资源:" + uRL + "出现错误");
            this.global.removeLoadingResource(uRL);
            if (this.referencer == null) {
                this.destroy();
            } else {
                var refer = this.referencer;
                var completeds = refer.completedReferences;
                completeds.push(this);
                if (completeds.length == refer.references.length) {
                    refer.references = null;
                    refer.completedReferences = null;
                    refer.loadResource();
                }
            }
            this.doCalls();
        }
        //执行回调函数
        P.doCalls = function () {
            var calls = this.calls;
            if (calls) {
                var cb = null;
                for (var i = 0, k = calls.length; i < k; i++) {
                    cb = calls[i];
                    if (typeof cb.handler === 'function') {
                        cb.handler(cb.data);
                    }
                }
            }
        }
        //销毁资源项
        P.destroy = function () {
            var refs = this.references;
            if (refs) {
                for (var i = 0, k = refs.length; i < k; i++) {
                    refs[i].destroy();
                }
            }
            delete this.calls;
            delete this.referencer;
            delete this.references;
            delete this.doOnStart;
            delete this.doOnCompleted;
            delete this.completedReferences;
        }
        //添加一个引用项
        P.setReference = function (reference) {
            if (reference instanceof this.constructor) {
                reference.referencer = this;
                this.references.push(reference);
            } else if (typeof reference === 'string') {
                if (reference.toString().replace(/\s/g, '') !== '') {
                    var refer = this.global.createResource(reference, null, this.sync);
                    this.setReference(refer);
                }
            }
            return this;
        }
        //添加多个引用项
        P.setReferences = function (ref1, refN) {
            var refs = this.references;
            for (var i = 0, k = arguments.length; i < k; i++) {
                this.setReference(arguments[0]);
            }
            return this;
        }
        //添加多个引用项
        P.setReferences2 = function (refs) {
            var myRefs = this.references;
            if (refs instanceof Array) {
                for (var i = 0, k = refs.length; i < k; i++) {
                    this.setReference(refs[i]);
                }
            }
            return this;
        }
        //初始化
        P.init = function () {
            this.initParts.apply(this, arguments);
            this.myInit.apply(this, arguments);
        }
        //初始化对象成员 防止共享
        P.initParts = function () {
            this.calls = [];
            this.completedReferences = [];
            this.references = [];
        }
        //其他初始化
        P.myInit = function (uRL, name, async) {
            this.url = uRL;
            this.name = name;
            if (async !== undefined) { this.sync = async; }
        }
    });

    //js脚本资源项
    Angel.build('JsResource', 'Resource', null, function (P) {
        //加载脚本
        P.goResource = function (src, name, version) {
            var target = this.getPosition();
            var scriptElement = document.createElement("script");
            scriptElement.type = "text/javascript";
            scriptElement.name = name;
            scriptElement.async = this.sync;
            this.statusListener(scriptElement, src);
            scriptElement.src = src + version;
            target.appendChild(scriptElement);
        }
        //添加监听事件
        P.statusListener = function (scriptElement, oriUrl) {
            if (scriptElement == null) { return; }
            var self = this;
            if (scriptElement.readyState) {
                scriptElement.onreadystatechange = function () {
                    if (this.readyState === 'complete' || this.readyState === 'loaded') {
                        this.onreadystatechange = null;
                        self.doOnCompleted(oriUrl);
                        self = oriUrl = null;
                    }
                };
            } else {
                scriptElement.onload = function () {
                    this.onload = null;
                    self.doOnCompleted(oriUrl);
                    self = oriUrl = null;
                };
            }
            scriptElement.onerror = function () {
                this.onerror = null;
                self.doOnError(oriUrl);
                self = oriUrl = null;
            };
        }
    }, function (uRL, name, async) { this.init.apply(this, arguments); });

    //css样式表资源项
    Angel.build('CssResource', 'Resource', null, function (P) {
        //加载脚本
        P.goResource = function (src, name, version) {
            var target = this.getPosition();
            var linkElement = document.createElement("link");
            linkElement.type = "text/css";
            linkElement.rel = "stylesheet";
            this.statusListener(linkElement, src);
            linkElement.href = src + version;
            target.appendChild(linkElement);
        }
        //添加监听事件
        P.statusListener = function (linkElement, oriUrl) {
            if (linkElement == null) { return; }
            var self = this;
            if (linkElement.readyState) {
                linkElement.onreadystatechange = function () {
                    if (this.readyState === 'complete' || this.readyState === 'loaded') {
                        this.onreadystatechange = null;
                        self.doOnCompleted(oriUrl);
                        self = oriUrl = null;
                    }
                };
            } else {
                linkElement.onload = function () {
                    this.onload = null;
                    self.doOnCompleted(oriUrl);
                    self = oriUrl = null;
                };
            }
            linkElement.onerror = function () {
                this.onerror = null;
                self.doOnError(oriUrl);
                self = oriUrl = null;
            };
        }
    }, function (uRL, name) { this.init.apply(this, arguments); });

    Angel.Env = myevn;

    Angel.setBaseUrl = setBaseUrl;

    ResourceUtility.setBaseUrl = setBaseUrl;

})(window);
;

//以下代码源文件：(src/lsmain/core/lib/animation.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：基于jquery动画库
 * 日期：2015-07-14
 * 版本：0.0.1
 * 作者：Beven
 * 描述：无
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * css3动画播放工具
     */
    function OriginAnimationLibaray() { }

    origin.driver(OriginAnimationLibaray);

    //引用附加
    var OriginAnimation = core.originAnimation = new OriginAnimationLibaray();

    //辅助工具
    var utils = core.utils;

    var animations = {};

    /**
     * 名称：播放一个jquery原生态动画
     */
    OriginAnimationLibaray.prototype.playAnimation = function (element, animation, callback, time) {
        var animationHandler = animations[animation];
        if (typeof animationHandler == 'function') {
            playAnimation(animationHandler, jQuery(element), callback, time);
        } else {
            utils.call(this, callback);
        }
    }
    /**
     * 名称：添加一个动画到动画库
     */
    OriginAnimationLibaray.prototype.addAnimation = function (name, handler) {
        animations[name] = handler;
    }

    /**
     * 名称：获取已经存在 可用的动画名称
     */
    OriginAnimationLibaray.prototype.getAnimations = function () {
        return core.utils.getKeys(animations);
    }

    /**
     * 名称：判断指定动画是否可以播放
     */
    OriginAnimationLibaray.prototype.isOriginAnimation = function (name) {
        var animationHandler = animations[name];
        return typeof animationHandler == 'function';
    }

    //动画：从屏幕上方开始逐渐淡入到元素目标位置
    OriginAnimation.addAnimation('translateFromTop', translateFromTop);
    //动画：从元素当前位置逐渐下降淡出
    OriginAnimation.addAnimation('translateToBottom', translateToBottom);
    //动画：滑动从右边淡入
    OriginAnimation.addAnimation('translateFromRight', translateFromRight);
    //动画：滑动至左边淡出
    OriginAnimation.addAnimation('translateToLeft', translateToLeft);
    //动画：滑动从下边边淡入
    OriginAnimation.addAnimation('translateFromBottom', translateFromBottom);
    //动画：滑动至上边淡出
    OriginAnimation.addAnimation('translateToTop', translateToTop);
    //动画：滑动从左边淡入
    OriginAnimation.addAnimation('translateFromLeft', translateFromLeft);
    //动画：滑动至右边淡出
    OriginAnimation.addAnimation('translateToRight', translateToRight);
    //动画：放大淡入
    OriginAnimation.addAnimation('scaleUpFadeIn', scaleUpFadeIn);
    //动画：缩小淡出
    OriginAnimation.addAnimation('scaleDownFadeOut', scaleDownFadeOut);

    function translateFromTop(container, time, callback) {
        var top = ensureNumber(container.css("top"), 0);
        container.css({ top: -100, opacity: 0 });
        container.animate({ top: top, opacity: 1 }, time, 'swing', callback);
    }

    function translateToBottom(container, time, callback) {
        var top = ensureNumber(container.css("top"), 0);
        container.animate({ top: top + animationHeight(container), opacity: 0.5 }, time, 'swing', function () {
            container.css({ top: top });
            callback();
        });
    }

    function translateFromRight(container, time, callback) {
        var left = ensureNumber(container.css("left"), 0);
        var width = ensureNumber(container.width(), 200);
        container.css({ left: width, opacity: 0.5 });
        container.animate({ left: left, opacity: 1 }, time, 'swing', callback);
    }

    function translateToLeft(container, time, callback) {
        var left = ensureNumber(container.css("left"), 0);
        var toLeft = ensureNumber(left - animationWidth(container), 0);
        container.animate({ left: toLeft, opacity: 0.5 }, time, 'swing', function () {
            container.css({ left: left });
            callback();
        });
    }

    function translateFromBottom(container, time, callback) {
        var hei = ensureNumber(container.height(), 0);
        var top = ensureNumber(container.css("top"), 0);
        container.css({ top: (top + hei), opacity: 0.5 });
        container.animate({ top: top, opacity: 1 }, time, 'swing', callback);
    }

    function translateToTop(container, time, callback) {
        var top = ensureNumber(container.css("top"), 0);
        container.animate({ top: top - animationHeight(container), opacity: 0.5 }, time, 'swing', function () {
            container.css({ top: top });
            callback();
        });
    }

    function translateFromLeft(container, time, callback) {
        var left = ensureNumber(container.css("left"), 0);
        var oriLeft = ensureNumber(left - container.width(), 30);
        container.css({ left: oriLeft, opacity: 0.5 });
        container.animate({ left: left, opacity: 1 }, time, 'swing', callback);
    }

    function translateToRight(container, time, callback) {
        var left = ensureNumber(container.css("left"), 0);
        container.animate({ left: left + animationWidth(container), opacity: 0.5 }, time, 'swing', function () {
            container.css({ left: left });
            callback();
        });
    }

    function scaleUpFadeIn(container, time, callback) {
        var width = container.width();
        var height = container.height();
        container.css({ width: width / 2, height: height / 2, opacity: 0.5 });
        container.animate({ width: width, height: height, opacity: 1 }, time, 'swing', callback);
    }

    function scaleDownFadeOut(container, time, callback) {
        var width = container.width() / 2;
        var height = container.height() / 2;
        container.animate({ width: width, height: height, opacity: 0.5 }, time, 'swing', callback);
    }

    function animationHeight(container) {
        var hei = container.height();
        if (hei > 150) {
            hei = 150;
        } else if (hei < 0) {
            hei = 30;
        }
        return hei;
    }

    function animationWidth(container) {
        var wid = container.width();
        if (wid > 150) {
            wid = 150;
        } else if (wid < 0) {
            wid = 30;
        }
        return wid;
    }

    function ensureNumber(maybeNum, dv) {
        maybeNum = parseInt(maybeNum);
        dv = isNaN(dv) ? 0 : dv;
        return isNaN(maybeNum) ? dv : maybeNum;
    }

    function playAnimation(handler, container, callback, time) {
        var called = false;
        time = isNaN(time) ? 500 : time;
        time = time < 0 ? 500 : time;
        var anyCallback = function () {
            if (called === true) { return; }
            called = true;
            anyCallback = function () { }
            utils.call(this, callback);
        }
        container.css("display", "");
        handler(container, time, callback);
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/base.api.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：接口中心基础类，提供接口基础方法
 * 日期：2015-07-08
 * 版本：0.0.1
 * 描述：无
 *******************************************************/
(function(core, origin, env) {
    if (env.ApiCenter) {
        return;
    }
    /**
     * 接口中心，接口基础类 构造函数
     * 通过该类可以构建出一个标准的接口子类
     */
    var BaseAPIClass = function() {}

    var baseUri = null;


    origin.driver(BaseAPIClass);

    //辅助工具
    var utils = Lsmain.utils;

    //公布接口基类实例
    var center = core.api = env.ApiCenter = new BaseAPIClass();
    //公布事件容器类
    var EventEmitterClass = Lsmain.EventEmitterClass;

    //事件容器
    var eventEmitter = new EventEmitterClass();

    var apiList = [];
    var globalEvents = ['starting', 'redirect', 'end', 'success', 'error', 'error-message', "setup"];

    var $ = env.$;

    center.processLoading = true; //是否在接口请求是，显示请求进度提示

    center.getApis = function() {
        return apiList;
    }

    /**
     * 名称：在请求是显示等待效果(默认没有实现该函数，请通过等待插件重写该函数实现)
     */
    BaseAPIClass.prototype.showLoading = function(message) {

    }

    /**
     * 名称：在请求完毕后，关闭等待效果(默认没有实现该函数，请通过等待插件重写该函数实现)
     */
    BaseAPIClass.prototype.closeLoading = function() {

    }

    /**
     * 设置接口基础host
     */
    BaseAPIClass.prototype.setBaseUri = function(uri) {
        baseUri = uri;
    }

    //默认当接口请求异常时返回的默认结果 如果要查看http返回异常结果，请在回调函数中查看第二个传入参数
    BaseAPIClass.prototype.defaultErrorResult = {
            netwrok: 'exception',
            status: -1,
            message: '接口异常'
        }
        //由于通常接口会返回一个事务结果 例如:{code:1/2/3} 其中code:1表示成功 其他表示失败 这时候需要定制当code:不是1时要需要执行error函数可以重写此函数
    BaseAPIClass.prototype.defaultResponseConfirm = function(data) {
        return true;
    }

    /**
     * 名称：从arguments中获取回调函数，默认回调函数为最后一个参数
     * 设计原由：当某个方法后期需要新增形参时，可以改动参数列表，在为新增形参时调用的方式仍然有效
     *           例如：function getUser(name,callback){}  -->function getUser(name,id,callback){}
     *                 getUser('ss',callback);   ---->    getUser('ss',1,callback);
     *           由于取回调函数是作为最后一个参数来，所以之前调用方式仍然有效
     */
    BaseAPIClass.prototype.smartCallback = function(args) {
        return args[args.length - 1];
    }


    /**
     * 名称：注册一个接口子类
     * @param name 接口名称 在注册后可以通过window.ApiCenter[name]访问当前注册的接口实例
     * @param driverClass 子接口类构造函数
     * 例如: ApiCenter.api
     */
    BaseAPIClass.prototype.regist = function(name, DriverClass) {
        if (center[name]) {
            throw new Error('exists a api instance of name' + name);
        }
        //继承基础接口
        DriverClass.prototype = new BaseAPIClass();
        //还原子类构造函数
        DriverClass.prototype.constructor = DriverClass;
        //删除注册方法 ，防止多级子接口注册
        delete DriverClass.prototype.regist;
        //这里返回子接口单例，考虑到多个就接口实例没有意义
        var driverInstance = (new DriverClass());
        center[name] = driverInstance;
        apiList.push({
            name: name,
            instance: driverInstance
        });
        return driverInstance;
    }

    /**
     * 名称：添加一个接口监听事件
     * @param name 事件名称：(不区分大小写)随着不同的子接口实例，事件类型也不一样，具体可参照子接口定义的事件
     *             另外：支持一下几个标准全局事件(适用于所有接口)，通过一下事件可以进行全局控制:
     *                  starting(发起请求前事件),end(发起请求完毕) success(访问成功) error(访问失败) error-message (统一提示异常消息)
     */
    BaseAPIClass.prototype.on = function(name, handler) {
        if (this.ifn(name, '') === '') {
            throw new Error('event name cannot be null');
        }
        name = getEventName(name, this);
        eventEmitter.on(name, handler);
    }

    /**
     * 名称：执行指定名称的事件
     * @param name 事件名称 不区分大小写
     * @param arg1 参数 1
     * @param .... argN 参数N
     */
    BaseAPIClass.prototype.emit = function(name, arg1, argN) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(getEventName(name, this));
        return eventEmitter.emit.apply(eventEmitter, args);
    }

    /**
     * 名称：基于jquery的.extend方法
     */
    BaseAPIClass.prototype.extend = function(a, b, c) {
        return $.extend.apply($, Array.prototype.slice.call(arguments, 0));
    }

    /**
     * 名称：字符串空处理函数
     * @param v 待空处理值 当v为null或者空或者多个空字符时 返回bv
     * @param bv 备用值
     */
    BaseAPIClass.prototype.ifn = function(v, bv) {
        if (v == null) {
            return bv;
        } else if (typeof v == 'string') {
            var isWhitespace = (v === '') || (v.replace(/\s/g, '') === '');
            return isWhitespace ? bv : v;
        } else {
            return v;
        }
    }

    /**
     * 名称：返回一个劫持函数，被劫持函数handler调用者转向至getCall调用者，函数柯里化....
     * @param handler 待调用的函数 注意：在调用时函数中的this指向当前实例
     * @param closureArgs 额外传递给handler的参数,注意 该参数使用位于handler最后一个 例如：handler(args1,arg2,arg3,...,closureArgs)
     */
    BaseAPIClass.prototype.getCall = function(handler, closureArgs) {
        return utils.getCall(this, handler, closureArgs);
    }

    /**
     * 名称：使用自身做为调用者，调用指定函数，如果传入参数不是函数则不进行调用
     * @param arg1 参数1 ....
     * @param argN 参数N
     */
    BaseAPIClass.prototype.doCall = function(handler, arg1, argN) {
        var args = utils.argumentArray(arguments);
        args.unshift(this);
        return utils.call.apply(utils, args);
    }

    /**
     * 名称：使用GET方式发起指定接口请求
     * @param url 接口地址
     * @param data 接口数据
     * @param dataType 接口数据类型
     * @param options 配置对象
     * @param errorResult 默认当请求异常（如：网络断开等异常）时默认返回的错误结果，通过这个可以保证始终返回目标格式的结果
     *                    如果errorResult没有指定 则默认为接口实例的defaultErrorResult
     */
    BaseAPIClass.prototype.getRequest = function(url, data, dataType, options, errorResult) {
        return this.request(url, data, 'GET', dataType, options, errorResult);
    }

    /**
     * 名称：使用POST方式发起指定接口请求
     * @param url 接口地址
     * @param data 接口数据
     * @param dataType 接口数据类型
     * @param options 配置对象
     * @param errorResult 默认当请求异常（如：网络断开等异常）时默认返回的错误结果，通过这个可以保证始终返回目标格式的结果
     *                    如果errorResult没有指定 则默认为接口实例的defaultErrorResult
     */
    BaseAPIClass.prototype.postRequest = function(url, data, dataType, options, errorResult) {
        return this.request(url, data, 'POST', dataType, options, errorResult);
    }

    /**
     * 名称：使用ajax发起一个接口请求，可以根据传入参数进行决定请求的方式，
     * 以及是否包含权限校验，容错处理等等。
     * @param url 接口地址
     * @param data 接口数据
     * @param method 接口http请求方式 例如: GET / POST /PUT / DELETE ....
     * @param datType 返回数据类型
     * @param options 可以是配置参数或者回调函数
     *                如果是配置参数:则{callback:xxx,otherParams:xxx}
     *                如果options为函数 则为回调函数
     *                注意：回调函数的数据结构： { code:错误编号，status:(1成功,-1失败),message:'返回消息',data:接口返回数据}
     * @param errorResult 默认当请求异常（如：网络断开等异常）时默认返回的错误结果，通过这个可以保证始终返回目标格式的结果
     *                    如果errorResult没有指定 则默认为接口实例的defaultErrorResult
     */
    BaseAPIClass.prototype.request = function(url, data, method, dataType, options, errorResult) {
        options = options || {};
        var self = this;
        var afterArguments = {
            callback: null,
            api: this,
            cloneArgs: Array.prototype.slice.apply(arguments),
            defaultResult: (errorResult || this.defaultErrorResult)
        };
        var ajaxOptions = $.extend({}, options);
        data = eventEmitter.emit('setup', data) || data;
        //执行事件
        this.doCall(onRequestStarting, options.loading, options.message);
        ajaxOptions.url = this.getUri(url);
        ajaxOptions.dataType = this.ifn(options.dataType, dataType);
        ajaxOptions.type = this.ifn(method, 'GET'); //默认为GET访问形式
        ajaxOptions.success = this.getCall(onRequestSuccess, afterArguments); //调用成功回调处理
        ajaxOptions.error = this.getCall(onRequestError, afterArguments); //调用失败回调处理
        ajaxOptions.data = data; //设置接口请求数据
        afterArguments.dataType = this.ifn(ajaxOptions.dataType, 'json');

        this.contentTypeRender(ajaxOptions);
        return new core.Promise(function(resolve, rejected) {
            afterArguments.callback = function(data, status) {
                    if (status == 'error') {
                        rejected(data);
                        eventEmitter.emit('error-message', data);
                    } else {
                        resolve(data);
                    }
                    self = null;
                    afterArguments = null;
                    ajaxOptions = null;
                }
                //开始发起ajax请求进行接口处理
            $.ajax(ajaxOptions);
        })
    }

    /**
     * 渲染接口url
     */
    BaseAPIClass.prototype.getUri = function(url) {
        if (/^https:|http:|\/\//.test(url)) {
            return url;
        } else {
            return (baseUri || "") + url;
        }
    }


    /**
     * 根据contentType自动处理ajaxOptions.data
     * @param ajaxOptions
     */
    BaseAPIClass.prototype.contentTypeRender = function(ajaxOptions) {
        switch (core.string.trim(ajaxOptions.contentType)) {
            case 'application/json':
                if (core.type.isObject2(ajaxOptions.data)) {
                    ajaxOptions.data = JSON.stringify(ajaxOptions.data);
                }
                break;
            default:
                break;
        }
    }

    /**
     * 当ajax接口成功后 状态判断
     */
    function doDefaultResponseConfirm(data, context, api) {
        if (typeof api.defaultResponseConfirm == 'function') {
            return api.defaultResponseConfirm(data, context.dataType);
        } else {
            return true;
        }
    }

    /**
     * 事件，当接口请求访问成功时
     */
    function onRequestSuccess(data) {
        var invoker = this;
        var clusorContext = arguments[arguments.length - 1];
        var delayPromise = false;
        //延迟处理
        var doDelayPromise = function() {
            delayPromise = true;
            return {
                args: clusorContext.cloneArgs,
                next: function(finalData) {
                    onFinalRequestSuccess.call(invoker, finalData, clusorContext);
                }
            }
        }
        eventEmitter.emit('success', data, doDelayPromise);
        if (!delayPromise) {
            //如果不需要延迟处理
            onFinalRequestSuccess.call(invoker, data, clusorContext);
        }
    }

    function onFinalRequestSuccess(data, clusorContext) {
        //由于调用劫持，这里的this指向api实例 注意：当前函数onRequestSuccess不推荐其他地方使用，闭包是为了防止篡改
        this.doCall(onRequestCompleted);
        var apiCallback = clusorContext.callback;
        var defaultResult = clusorContext.defaultResult || center.extend({}, center.defaultErrorResult);
        data = data == null ? defaultResult : data;
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        var marker = doDefaultResponseConfirm(data, clusorContext, this) ? "ok" : "error";
        //调用回调函数
        apiCallback(data, marker, otherArgs);
    }

    /**
     * 事件：当接口请求异常时
     */
    function onRequestError(a, b, c) {
        //调用全局事件 error
        eventEmitter.emit('error', a, b, c);
        //由于调用劫持，这里的this指向api实例 注意：当前函数onRequestSuccess不推荐其他地方使用，闭包是为了防止篡改
        this.doCall(onRequestCompleted);
        var clusorContext = arguments[arguments.length - 1];
        var apiCallback = clusorContext.callback;
        var defaultResult = clusorContext.defaultResult || center.defaultErrorResult;
        var otherArgs = Array.prototype.slice.call(arguments, 0);
        var apiResult = center.extend({}, defaultResult, {
            statusCode: a.status
        });
        //调用回调函数
        apiCallback(apiResult, 'error', otherArgs);
    }

    /**
     * 事件：当接口请求前
     */
    function onRequestStarting(processLoading, message) {
        //只有在启用等待效果，并且当前接口当前函数允许启用等待效果
        if (center.processLoading && processLoading) {
            //显示等待效果
            this.doCall(this.showLoading, message);
        }
        //调用全局 事件 starting
        eventEmitter.emit('starting');
    }

    /**
     * 事件：当接口请求完成
     */
    function onRequestCompleted() {
        //关闭等待效果
        this.doCall(this.closeLoading);
        eventEmitter.emit('end');
    }

    /**
     * 名称：获取指定api对应的名称
     */
    function getApiInstanceName(api) {
        var itemInfo = null;
        var name = null;
        for (var i = 0, k = apiList.length; i < k; i++) {
            itemInfo = apiList[i];
            if (itemInfo.instance == api) {
                name = itemInfo.name;
                break;
            }
        }
        return name;
    }

    /**
     * 名称：判断指定事件是否为全局事件
     * @param name 事件名称
     */
    function isGlobalEventName(name) {
        if (globalEvents.indexOf) {
            return globalEvents.indexOf(name) > -1;
        } else {
            var sure = false;
            for (var i = 0, k = globalEvents.length; i < k; i++) {
                if (globalEvents[i] == name) {
                    sure = true;
                    break;
                }
            }
            return sure;
        }
    }

    /**
     * 名称：事件名称渲染
     */
    function getEventName(name, api) {
        name = name.toLowerCase();
        var apiName = getApiInstanceName(this);
        var isGlobal = isGlobalEventName(name);
        if (isGlobal) {
            return name;
        } else {
            return apiName + "_" + name;
        }
    }
})(window.Lsmain, window.Lsmain.BaseClass, window);;

//以下代码源文件：(src/lsmain/core/lib/console.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：兼容形式控制台
 * 日期：2015-07-17
 * 版本：0.0.1
 * 作者：Beven
 * 描述：在不支持console的浏览器下，构建自定义的控制台对象
 *       如果存在console 则使用console输出日志
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：自定义控制台容器构造函数
     * 当前控制台主要用于兼容低版本浏览器，这些浏览器可能没有控制台
     * 在低版本浏览器下 可以使用ctrl+ shift + c弹出控制台
     * 输出日志可以使用console.log(xxx);
     */
    function ConsoleLibraryClass() { this.init(); }

    //继承于基础类
    origin.driver(ConsoleLibraryClass);

    //辅助工具
    var utils = core.utils;
    //数组辅助工具
    var arrayUtils = core.array;
    //字符串辅助工具
    var strUtils = core.string;

    //提前消息列表
    var firstLevelMessages = [];

    var out = env.console;

    var customer = null, content = null;

    ConsoleLibraryClass.prototype.init = function () {
        if (out == null) {
            pageReady(function () {
                customer = document.createElement('div');
                customer.className = "customer-console";
                customer.style.display = "none";
                var header = document.createElement("div");
                content = document.createElement("div");
                header.className = "customer-console-header";
                header.innerHTML = "链尚网日志控制台";
                content.className = "customer-console-content";
                customer.appendChild(header);
                customer.appendChild(content);
                document.body.appendChild(customer);
                addListener(document, 'keyup', onKeyupDocument);
                core.UI.Scrollbar.register(content);
                arrayUtils.each(firstLevelMessages, function (v) { outCustomer(v.message, v.cls); });
                firstLevelMessages.length = 0;
            });
        }
        this.debug = this.info = this.trace = this.log;
        this.initConsole();
    }

    /**
     * 名称：当没有控制台时，先补全console，然后转交输出至自定义输出
     */
    ConsoleLibraryClass.prototype.initConsole = function () {
        if (out == null) {
            env.console = this;
        }
    }

    /**
     * 名称：输出普通日志
     */
    ConsoleLibraryClass.prototype.log = function (message, arg1, argN) {
        message = formatter(utils.argumentArray(arguments));
        if (out) {
            return out.log(message);
        } else {
            outCustomer(message, 'customer-console-log');
        }
    }

    /**
     * 名称：输出错误日志
     */
    ConsoleLibraryClass.prototype.error = function (message, arg1, argN) {
        if (message == null) { return; }
        if (message.stack) {
            message = message.stack;
        } else {
            message = message.toString();
        }
        message = formatter(utils.argumentArray(arguments));
        if (out) {
            return out.error(message);
        } else {
            outCustomer(message, 'customer-console-error');
        }
    }

    /**
     * 名称：输出日志到自定义控制台
     */
    function outCustomer(message, cls) {
        if (customer) {
            var line = document.createElement("div");
            line.className = "customer-console-line " + cls;
            message = (message || "").toString();
            var mlist = message.split('\n');
            message = '<p class="">' + mlist.join('</p><p>') + '</p>';
            message = message.replace(/\s/g, '&nbsp;');
            line.innerHTML = message;
            content.appendChild(line);
        } else {
            firstLevelMessages.push({ message: message, cls: cls });
        }
    }

    /**
     * 名称：控制自定义控制台显示与隐藏
     */
    function onKeyupDocument(ev) {
        ev = ev || event;
        if (ev.ctrlKey && ev.keyCode == 67 && ev.shiftKey) {
            if (customer.style.display == "none") {
                customer.style.display = "";
            } else {
                customer.style.display = "none";
            }
        }
    }

    /**
     * 名称：当window.onload事件触发
     */
    function pageReady(handler) {
        addListener(window, 'load', handler);
    }

    /**
     * 名称：兼容方式添加事件
     */
    function addListener(element, name, handler) {
        if (element.attachEvent) {
            element.attachEvent('on' + name, handler);
        } else if (element.addEventListener) {
            element.addEventListener(name, handler);
        } else if (element['on' + name] == null) {
            element['on' + name] = handler;
        }
    }

    /**
     * 名称：格式化日志信息
     */
    function formatter(args) {
        return strUtils.format.apply(strUtils, args);
    }

    //引用附加
    core.console = new ConsoleLibraryClass();

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/f2e.config.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：f2e    f2e 配置对象
 * 日期：2016-05-27
 * 版本：0.0.1
 * 作者：Beven
 * 描述：主要用于获取前端相关配置数据
 *******************************************************/
(function (core, origin, env) {

    var utils = core.utils;

    function F2eConfigurationLibraryClass() {
        this.refresh();
    }

    /**
     * 刷新配置数据
     */
    F2eConfigurationLibraryClass.prototype.refresh = function () {
        this.configurationData = getConfiguraionData();
    }

    /**
     * 获取指定名称的参数值
     * @param name
     * @param dv 如果该参数不存在只是用此默认值
     */
    F2eConfigurationLibraryClass.prototype.get = function (name, dv) {
        return utils.ifn(this.configurationData[name], dv);
    }

    /**
     * 使用指定url配置参数拼接一段Path
     * @param name 参数名称
     * @param path 路径
     */
    F2eConfigurationLibraryClass.prototype.urlJoin = function (name, path) {
        return utils.combineURL(this.get(name), path);
    }

    //继承与基础类
    origin.driver(F2eConfigurationLibraryClass);

    function getConfiguraionData() {
        var script = document.getElementById("f2eConfiguration");
        if (script) {
            var json =  core.string.trim(script.innerHTML.replace(/&quot;/g,'"').replace(/\n/g," "));
            var code = ['return',core.string.trim(json), ';'].join('');
            var ClassFun = Function;
            var getter = new ClassFun(code);
            var data = getter();
            var local = document.getElementById('localUrl');
            if(local){
                data['f2e-framework.cdnUrl'] = local.value;
            }
            return data;
        } else {
            return {};
        }
    }

    core.F2eConfigration = F2eConfigurationLibraryClass;

    core.config = new F2eConfigurationLibraryClass();

}(window.Lsmain, window.Lsmain.BaseClass, window));

;

//以下代码源文件：(src/lsmain/core/lib/css3.animation.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：css3动画播放工具
 * 日期：2015-07-14
 * 版本：0.0.1
 * 作者：Beven
 * 描述：主要css3动画播放,并且兼容大部分浏览器对动画播放事件的支持等等。
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    if (typeof core.AnimationMiddler !== 'undefined') { return; }

    var utils = core.utils;

    function AnimationMiddlerLibraryClass() { }

    /**
     * css3动画播放工具
     */
    origin.driver(AnimationMiddlerLibraryClass);

    //引用附加
    core.animationMiddler = new AnimationMiddlerLibraryClass();

    var $ = env.$;
    var prefix = null;
    var animationEnd = null;

    /**
     * 名称：针对指定元素播放一个动画，在动画播放完毕后清除动画样式类
     * @param element 要实现动画的元素
     * @param animation 动画样式名称
     * @param callback 播放完毕后的回调函数
     */
    AnimationMiddlerLibraryClass.prototype.animation = function (element, animation, callback) {
        if (this.supportCSS3Animation()) {
            var self = this;
            element.style.display = "none";
            //加入动画样式
            this.addClass(element, animation);
            //绑定一次动画回调函数
            this.onceAnimationed(element, function () {
                self.removeClass(element, animation);
                utils.call(window, callback);
            });
            this.redraw(element);//强制重绘
        } else {
            element.style.display = "";
            core.originAnimation.playAnimation(element, animation, callback, 200);
        }
    }

    /**
     * 名称：交替一个元素的动画
     * @param element 要实现动画的元素
     * @param inAnimation 当前要实现的动画样式
     * @param outAnimation 要退出的动画样式
     * @param callback 播放完毕后的回调函数
     */
    AnimationMiddlerLibraryClass.prototype.animationInOut = function (element, inAnimation, outAnimation, callback) {
        if (this.supportCSS3Animation()) {
            var self = this;
            element.style.display = "none";
            if (outAnimation) { this.removeClass(element, outAnimation); }
            //加入动画样式
            this.addClass(element, inAnimation);
            //绑定一次动画回调函数
            this.onceAnimationed(element, function () {
                self.removeClass(element, inAnimation);
                utils.call(window, callback);
            });
            this.redraw(element)//强制重绘
        } else {
            core.originAnimation.playAnimation(element, inAnimation, callback);
        }
    }

    /**
     * 名称：绑定指定元素播放动画结束事件
     */
    AnimationMiddlerLibraryClass.prototype.onceAnimationed = function (element, handler) {
        var delay = parseFloat(getStyleValue(element, 'animationDelay'));
        var duration = parseFloat(getStyleValue(element, 'animationDuration'));
        var called = false;
        var callback = function () {
            if (!called) {
                called = true;
                utils.call(window, handler);
            }
        }
        var outtime = ((delay + duration) * 1000) + 50;
        if ($) {
            $(element).one(animationEnd, callback);
        } else if (element.addEventListener) {
            element.addEventListener(animationEnd, callback);
        }
        setTimeout(callback, outtime);
    }

    /**
     * 名称：在能运行css3动画情况下，为指定元素添加指定样式名称
     */
    AnimationMiddlerLibraryClass.prototype.addClass = function (element, clsChars) {
        clsChars = clsChars || "";
        if (element && element.classList) {
            var cls  =null;
            clsChars = clsChars.split(' ');
            for(var i=0,k=clsChars.length;i<k;i++){
                cls  =clsChars[i];
                if(cls){
                    element.classList.add(cls);
                }
            }
        }
    }

    /**
     * 名称：尝试重绘元素
     */
    AnimationMiddlerLibraryClass.prototype.redraw = function (element) {
        if (element) {
            var hei = element.offsetHeight;
            element.style.display = "";
        }
    }

    /**
     * 名称：在能运行css3动画情况下，为指定元素移除指定样式名称
     */
    AnimationMiddlerLibraryClass.prototype.removeClass = function (element, clsChars) {
        clsChars = clsChars || "";
        if (element && element.classList) {
            var cls  =null;
            clsChars = clsChars.split(' ');
            for(var i=0,k=clsChars.length;i<k;i++){
                cls  =clsChars[i];
                if(cls){
                    element.classList.remove(cls);
                }
            }
        }
    }

    /**
     * 名称：判断当前浏览器是否支持CSS3动画
     */
    AnimationMiddlerLibraryClass.prototype.supportCSS3Animation = function () {
        var styles = getStyles(document.body || document.documentElement);
        prefix = prefix || "";
        var name = prefix === "" ? "animationDuration" : prefix + "AnimationDuration";
        return name in styles;
    }

    //初始化容器
    function compactLoader() {
        if (animationEnd == null) {
            var eventNames = { 'webkit': 'webkitAnimationEnd', 'o': 'oAnimationEnd', 'ms': 'MSAnimationEnd' };
            prefix = getPrefix();
            animationEnd = eventNames[prefix] || 'animationend';
        }
    }

    //获取不同浏览器特性样式前缀
    function getPrefix() {
        var styles = getStyles(document.documentElement) || {};
        var vendors = { 'webkitAnimationName': 'webkit', 'mozAnimationName': 'moz', 'msAnimationName': 'ms', 'oAnimationName': 'o', 'animation': '' };
        var prx = '';
        for (var i in vendors) {
            if (i in styles) {
                prx = vendors[i];
                break;
            }
        }
        return prx;
    }
    //获取指定元素的样式列表
    function getStyles(element) {
        return (window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle);
    }
    //获取指定元素指定样式值
    function getStyleValue(element, name) {
        name = name || "";
        var firstChar = (name[0] || "").toUpperCase();
        var afterChars = (name.substring(1));
        var cssName = prefix + firstChar + afterChars;
        var values = getStyles(element);
        return values[cssName] || values[name];
    }
    compactLoader();

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/event.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：事件Event辅助工具
 * 日期：2015-07-22
 * 版本：0.0.1
 * 作者：Beven
 * 描述：事件Event辅助工具
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：UI组件辅助工具构造函数
     */
    function EventUtilsLibraryClass() { }

    //继承于基础类
    origin.driver(EventUtilsLibraryClass);

    //引用附加
    core.event = new EventUtilsLibraryClass();

    /**
     * 名称：兼容方式获取event.offsetX
     */
    EventUtilsLibraryClass.prototype.getOffsetX = function (ev) {
        if (ev.offsetX) {
            return ev.offsetX;
        } else {
            var target = evt.target || evt.srcElement;
            return ev.clientX - (target.getBoundingClientRect().left)
        }
}

    /**
     * 名称：兼容方式获取event.offsetY
     */
    EventUtilsLibraryClass.prototype.getOffsetY = function (ev) {
        if (ev.offsetY) {
            return ev.offsetY;
        } else {
            var target = evt.target || evt.srcElement;
            return ev.clientY - (target.getBoundingClientRect().top)
        }
    }

    /**
     * 名称：获取当前事件的触发元素
     */
    EventUtilsLibraryClass.prototype.getTarget = function (ev) {
        return ev.target || ev.srcElement;
    }

    /**
     * 名称：阻止事件冒泡的空函数
     */
    EventUtilsLibraryClass.prototype.stopParentHandler = function (ev) {
        if (ev) {
            ev.cancelBubble = true;
            ev.stopPropagation();
        }
    }

    /**
     * 名称：获取不同浏览器器下面mousewheel的事件名称 例如：在firfox 中为DOMMouseScroll 其他为：mousewheel
     */
    EventUtilsLibraryClass.prototype.nameOfMouseWheel = function () {
        return core.browser.firefox() ? 'DOMMouseScroll' : 'mousewheel';
    }

    /**
     * 名称：获取不同浏览器下mousewheel的滚动数值
     */
    EventUtilsLibraryClass.prototype.getWheelData = function (ev) {
        var original = ev.originalEvent;
        if (!original) {
            return 0;
        }
        if (original.wheelDelta) {
            return (ev.originalEvent.wheelDelta / 120);
        }
        else if (ev.originalEvent.detail) {
            //由于在火狐中负数代表向上 整数代表向下 所以这里去反值
            return -(ev.originalEvent.detail / 3);
        }
    }

    /**
     * 名称：判断在触发mouseover 与mouseout时，是不是由子元素导致
     */
    EventUtilsLibraryClass.prototype.mouseTriggerOfChild = function (ev) {
        var type = ev.type;
        var related = null;
        var currentTarget = ev.currentTarget;
        switch (type) {
            case 'mouseover':
                related = ev.fromElement || ev.relatedTarget;
                break;
            case 'mouseout':
                related = ev.toElement || ev.relatedTarget;
                break;
            default:
                break;
        }
        return this.isChild(related,currentTarget);
    }

    /**
     * 名称:判断指定元素是否为目标元素的子元素
     * @param child 子元素
     * @param parent 可能的父元素
     */
    EventUtilsLibraryClass.prototype.isChild = function(child,parent){
        if (parent.contains) {
            return parent.contains(child);
        } else if (parent.compareDocumentPosition) {
            return parent.compareDocumentPosition(child) == 20;
        }
    }

    /**
     * 给指定容器添加自定义鼠标滑轮滚动事件,该事件能够阻止滚轮连带效应 ,即会影响到父级容器的滚动
     */
    EventUtilsLibraryClass.prototype.customMouseWheel = function (element, prefix, speed) {
        if (prefix) {
            $(element).bind(this.nameOfMouseWheel() + "." + prefix,getMouseWheelHandler(speed));
        } else {
            $(element).bind(this.nameOfMouseWheel(),getMouseWheelHandler(speed));
        }
    }

    function getMouseWheelHandler(speed) {
        return function (ev) {
            customMouseWheel(ev, this, speed);
        }
    }

    function customMouseWheel(ev,sender,speed) {
        ev.preventDefault();
        speed = Number(speed);
        speed = isNaN(speed)?60:speed;
        sender.scrollTop += core.event.getWheelData(ev) <= 0 ? speed : -speed;
        return false;
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));
;

//以下代码源文件：(src/lsmain/core/lib/form.data.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：表单容器自动获取与填充工具 
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：读取指定表单中表单数据并且返回json格式 以及将指定json数据填充到表单中去
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 表单容器数据读写工具构造函数
     */
    function FormWRLibraryClass() { }

    //继承于基础类
    origin.driver(FormWRLibraryClass);

    //引用附加
    var formWR = core.formWR = new FormWRLibraryClass();

    //辅助工具
    var utils = core.utils;
    //字符串辅助工具
    var strUtils = core.string;
    //类型检测工具
    var typeProbe = core.type;

    var noneInput = "input[type='submit'],input[type='button'],input[type='image']";

    var $ = env.$;
    //类型读写规则列表
    var rules = {};

    /**
     * 名称：自动组装值
     * @param formid 表单容器元素选择器或者容器对象
     * @param data 待填充的数据
     * @param changes 当在填充级联下拉框时在填充值后自动触发change事件
     * @parma dv  默认值
     */
    FormWRLibraryClass.prototype.fill = function (formid, data, changes, dv) {
        if (data == null) { return; }
        var formContainer = $(formid);
        var target = null, name = null;
        data = data || {};
        dv = utils.ifn(dv, '');

        for (var i in data) {
            target = ofForms(formContainer, "input[name='" + i + "'],select[name='" + i + "'],textarea[name='" + i + "'],[data-form][name='" + i + "'],[data-provider='" + i + "']");
            if (target.length > 0) {
                if (target.is(noneInput)) { continue; }
                name = target.attr("name") || target.data().provider;
                this.getRule(target).fill(target, utils.ifn(data[i], dv).toString(), name, data);
            }
        }
    }

    /**
     * 名称：读取指定表单容器的表单数据返回JSON数据
     * @param formid 表单容器元素选择器或者容器对象
     * @param chArray 是否当复选框选择多个值时返回数组，而不是使用','号连接
     * @param nameType 表单名称类型 默认为 both 同时根据name属性或者data-provider属性 1:data-provider 2:name
     */
    FormWRLibraryClass.prototype.read = function (formid, chArray, nameType) {
        var formContainer = $(formid);
        var inputs = ofForms(formContainer, "input,select,textarea,[data-form],[data-provider]");
        var data = {}, name = null, rule = null, target = null, value, readValue;
        var chReaders = {};
        for (var i = 0, k = inputs.length; i < k; i++) {
            target = inputs.eq(i);
            if (target.is(noneInput)) { continue; }
            name = getFormName(target, nameType);
            if (strUtils.isNullOrWhiteSpace(name)) { continue; }
            if (target.is("input[type='checkbox'],input[type='radio']")) {
                if (chReaders[name] === true) { continue; }
                chReaders[name] = true;
                var attrSelector = "input[type='" + target.attr("type") + "'][name='" + name + "'],input[type='" + target.attr("type") + "'][data-provider='" + name + "']";
                data[name] = this.getRule(target).read(ofForms(formContainer, attrSelector), formContainer, name, data, chArray);
            } else {
                value = data[name];
                readValue = this.getRule(target).read(target, formContainer, name, data, chArray);
                if (core.type.isArray(value)) {
                    value.push.apply(value, core.utils.ensureArray(readValue));
                } else {
                    data[name] = readValue;
                }
            }
        }
        return data;
    }

    /**
     *名称：清空指定容器表单元素验证与值
     */
    FormWRLibraryClass.prototype.clear = function (element) {
        var target = $(element);
        if (target == null) {
            return null;
        }
        if (target.is("form")) {
            target[0].reset();
        } else {
            target.find("input,select,textarea").val("");
        }
        ofForms(target, "[data-label]").html("");
    }

    /**
     * 名称：添加一个新的表单读写规则
     * @param wr
     *      {
     *           name 类型名称 如果存在相同读取器会抛出异常，另外非表单读取器名称 使用规则：<label name="age" data-form="name(规则名称)"><label>,
     *           read:function(target, container, name, data){},
     *           fill:function(element,v,name,data){}
     *      }
     */
    FormWRLibraryClass.prototype.addRule = function (rule) {
        if (rule == null) { return; }
        var name = utils.ifn(rule.name, '');
        if (name === '') {
            throw new Error("formwr: rule's name cannot be null or whitespace");
        }
        if (rules[name]) {
            throw new Error("formwr: exists  a rule with name (" + name + ")");
        }
        rules[name] = rule;
    }

    /**
     * 名称：获取指定元素对应的读写规则 如果匹配的规则，则使用默认读写规则
     */
    FormWRLibraryClass.prototype.getRule = function (target) {
        target = $(target);
        var mapName = target.attr("data-form");
        if (rules[mapName] == null) {
            if (target.is("input")) {
                mapName = target.attr("type");
            } else {
                mapName = target[0].nodeName.toLowerCase();
            }
        }
        return rules[mapName] || rules['default'];
    }

    //动态获取表单名称
    function getFormName(target, nameType) {
        var name = null;
        switch (nameType) {
            case 1: //only dataProvider
                name = target.data().provider;
                break;
            case 2://only name
                name = target.attr("name");
                break;
            default://both
                name = target.attr("name") || target.data().provider;
                break;
        }
        return name;
    }

    //兼容方式获取元素
    function ofForms(container, selector) {
        if ($.zepto) {
            return $(compactQuerySelectorAll($(container)[0], selector));
        } else {
            return $(container).find(selector);
        }
    }

    //兼容
    function compactQuerySelectorAll(dom, selector) {
        var old = dom.id;
        var id = dom.id = 'query____compact___';
        var n = '#' + id + ' ' + selector;
        var results = dom.querySelectorAll(n);
        var items = [];
        dom.id = old;
        items.push.apply(items, results);
        return items;
    }

    //注册radio读写器
    formWR.addRule({ name: 'radio', read: radioReader, fill: radioFiller });
    //注册checkbox读写器
    formWR.addRule({ name: 'checkbox', read: checkboxReader, fill: checkboxFiller });
    //注册html普通标签text读写器
    formWR.addRule({ name: ':html', read: htmlReader, fill: htmlFiller });
    //注册html普通标签属性读写器
    formWR.addRule({ name: 'attribute', read: attributeReader, fill: attributeFiller });
    //注册默认表单值读写器
    formWR.addRule({ name: 'default', read: defaultReader, fill: defaultFiller });
    //注册图片列表表单类型读写器
    formWR.addRule({ name: 'imglist', read: imgListReader, fill: imgListFiller });

    //读取：radio 值读取器
    function radioReader(target, container, name, data) {
        var checkedTarget = getCheckeds(target);
        if (checkedTarget.length > 0) {
            return checkedTarget.val();
        } else {
            return null;
        }
    }
    //读取：checkbox 值读取器
    function checkboxReader(target, container, name, data, chArray) {
        var checkedTarget = getCheckeds(target);
        //如果是选中与不选中
        if (target.length == 1) {
            var v = target.val();
            //如果自定义开关值
            if (!core.string.isNullOrWhiteSpace(target.attr("data-on"))) {
                var attr = checkedTarget.length > 0 ? "data-on" : "data-off";
                return target.attr(attr);
            }
            //如果元素有设置值，则默认在选中情况下，获取value属性值，没有选中则返回""
            if (!core.string.isNullOrWhiteSpace(v) && v != "on" && v != "off") {
                return target[0].checked ? v : "";
            } else {
                //如果没有设置值 则默认返回true/false
                return target[0].checked;
            }
        }
        var ids = [];
        //如果不是 则将所有选中的值按照','号隔开
        checkedTarget.each(function () { ids.push($(this).val()); });
        if (chArray === true) {
            return ids;
        } else {
            return ids.join(',');
        }
    }
    //读取：html标签text值读取器
    function htmlReader(target, container, name, data) {
        return target.html();
    }
    //读取：html标签属性值读取器
    function attributeReader(target, container, name, data) {
        return target.attr(target.attr("data-attribute-name"));
    }
    //读取：input ,select,textarea 值读取器
    function defaultReader(target, container, name, data) {
        return (target.val() || target[0].value);
    }
    //读取：获取图片列表
    function imgListReader(target) {
        var imgs = ofForms(target, "[data-img]");
        var imgList = [];
        imgs.each(function () {
            var src = "";
            if ($(this).is("img")) {
                src = this.src;
            } else {
                src = $(this).css("background-image").replace("url(", "").replace(")", "");
            }
            if (!strUtils.isNullOrWhiteSpace(src)) {
                imgList.push(src);
            }
        });
        return imgList;
    }

    //获取已选中的radio或者checkbox
    function getCheckeds(target) {
        return target.filter(function () { return this.checked; });
    }

    //填充：radio 值填充器
    function radioFiller(target, v, name, data) {
        target.removeAttr("checked", "checked");
        target.each(function () {
            if ($(this).val() === v) { $(this).attr("checked", "checked"); }
        });
    }
    //填充：checkbox 值填充器
    function checkboxFiller(target, v, name, data) {
        var checkedTarget = ofForms(checkedTarget, "input[type='checked']");
        //如果是选中与不选中
        if (target.length == 1) {
            var checked = false;
            var dataOn = target.attr("data-on");
            if (!core.string.isNullOrWhiteSpace(dataOn)) {//自定义开关值
                checked = dataOn == v;
            } else if (!core.string.isNullOrWhiteSpace(target.attr("value"))) {//选中返回值
                checked = target.attr("value") === v || (v === 1) || (v === '1') || v === true;
            } else {
                checked = (v.toLowerCase() === "true" || v === "1");//默认boolean开关
            }
            if (checked) {
                target.attr("checked", "checked");
            } else {
                target.removeAttr("checked");
            }
            return;
        }
        var values = v;
        if (!typeProbe.isArray(values)) {
            values = (v || "").toString().split(',');
        }
        //如果不是 则将所有选中的值按照','号隔开
        for (var i = 0, k = target.length; i < k; i++) {
            var current = target.eq(i);
            var va = current.val();
            if (values.indexOf(va) > -1) {
                current.attr("checked", "checked");
            } else {
                current.removeAttr("checked");
            }
        }
    }
    //填充：html标签text值填充器
    function htmlFiller(target, v, name, data) {
        target.html(v);
    }
    //填充：html标签属性值填充器
    function attributeFiller(target, v, name, data) {
        var attrName = target.attr("data-attribute-name") || "";
        target.attr(attrName, v);
        target.data(attrName.replace('data-', ''), v);
    }
    //填充：input ,select,textarea 值填充器
    function defaultFiller(target, v, name, data) {
        target.val(v);
    }
    //填充：图片列表
    function imgListFiller(target, v) {
        var imgs = ofForms(target, "[data-img]");
        var imgList = v || [], img;
        for (var i = 0, k = imgList.length; i < k; i++) {
            img = imgs.eq(i);
            if (img.is("img")) {
                img.attr("src", imgList[i]);
            } else {
                img.css("background-image", imgList[i]);
            }
        }
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/jscomments.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：Javascript代码注释解析工具
 * 日期：2015-07-27
 * 版本：0.0.1
 * 作者：Beven
 * 描述：Javascript代码注释解析工具
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：Javascript代码注释解析工具构造函数
     */
    function JsCommentsParserLibraryClass() { }

    //继承于基础类
    origin.driver(JsCommentsParserLibraryClass);

    //引用附加
    core.jsCommentsParser = new JsCommentsParserLibraryClass();

    //数组操作工具
    var arrayUtils = core.array;
    //集合类
    var List = core.List;

    /**
     * 名称：解析指定javascript代码的注释
     * @param content js代码内容
     */
    JsCommentsParserLibraryClass.prototype.parse = function (content) {
        content = standard(content);
        var self = this;
        var comments = new List();
        content.replace(/(\/\/.*$)|(\/\*(.|\s)*?\*\/)/g, function (a, b, c, d, e) {
            var start = a.length + e;
            var name = content.substring(start, content.indexOf('\n', start + 2)).replace(/\n/g, '');
            comments.add({ oriComment: a, name: standard(name), comment: formatter(a), parameters: self.parameters(a) });
        });
        var lines = content.split('\n');
        arrayUtils.each(lines, function (line, i) {
            if (line.replace(/\s/g, '').indexOf("//") === 0) {
                var nextLine = lines[i + 1] || "";
                comments.add({ oriComment: line, name: standard(nextLine), comment: formatter(line), parameters: [] });
            }
        });
        return comments;
    }

    /**
     * 名称：解析指定函数注释的 参数注释
     * @param content 函数标准注释内容
     */
    JsCommentsParserLibraryClass.prototype.parameters = function (content) {
        content = standard(content);
        var items = new List(content.split('\n'));
        var parameters = items.query(function (item) { return item.indexOf("@param") > -1; });
        var kvs = null, comments = [];
        for (var i = 0, k = parameters.length; i < k; i++) {
            kvs = arrayUtils.filter(parameters[i].split(' '), filterEmptyHandler);
            comments.push({ comment: (kvs.slice(2, kvs.length).join('')), name: standard(kvs[1]) });
        }
        return comments;
    }

    /**
     * 名称：远程解析多个js资源注释
     * @param info 解析数据 [{name:'a',url:'/ss/x/a.js'}]
     * @param callback 所有资源解析完毕后的回调函数 callback({a:{},b:{}....}) 
     */
    JsCommentsParserLibraryClass.prototype.parseMulRemote = function (info, callback) {
        var readyProcess = 0;
        var total = info.length;
        var self = this;
        var allComments = {};
        arrayUtils.each(info, function (item) {
            self.parseRemote(item.url, function (comment) {
                readyProcess++;
                var cc = allComments[item.name];
                if (cc) {
                    cc.addRange(comment.items);
                } else {
                    allComments[item.name] = comment;
                }
                if (readyProcess >= total) {
                    callback(allComments);
                }
            });
        });
    }

    /**
     * 名称：远程解析单个js文件注释
     * @param url js资源地址
     * @param callback 回调函数 callback({....})
     */
    JsCommentsParserLibraryClass.prototype.parseRemote = function (url, callback) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'text',
            success: function (content) {
                callback(self.parse(content));
            },
            error: function () {
                callback(null);
            }
        });

    }

    //标准化代码内容
    function standard(content) {
        return (content || "").toString().replace(/\n/g, '\n');
    }

    //过滤空字符操作
    function filterEmptyHandler(v) {
        return core.string.isNullOrWhiteSpace(v) === false;
    }

    //格式化信息，将换行符替换成p标签
    function formatter(content) {
        content = content || "";
        var items = content.replace(/\/\*/g, '').replace(/\*\//, '').replace(/\*/g, '').replace(/\n/g, '\n').split('\n');
        items = arrayUtils.filterEmpty(items);
        content = '<p class="comment">' + items.join('</p><p>') + '</p>';
        return content;
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));
;

//以下代码源文件：(src/lsmain/core/lib/play.js)如需调整代码，请更改此路径文件 
 /**
 * 名称:兼容音频播放工具
 * 作者:Beven
 * 日期:2015-11-27
 * 描述: 目前兼容ie7-ie11 firfox chorme
 */
(function (core, origin, env) {
    'use strict';
    var browser = Lsmain.browser;

    function AudioPlayLibraryClass(src) {
        this.src = src;
        var playerWrap = document.createElement("div");
        playerWrap.style.display = "none";
        playerWrap.innerHTML = getPlayer(this.src);
        this.audio = playerWrap.firstElementChild || playerWrap.children.item(0);
        this.target = playerWrap;
        this.hasError  =false;
        document.body.appendChild(playerWrap);
        initPlayer(this);
    }

    AudioPlayLibraryClass.prototype.emitter = new core.EventEmitterClass();

    /**
     * 绑定播放器事件
     */
    AudioPlayLibraryClass.prototype.on = function (name, handler) {
        this.emitter.on(name, handler);
        return this;
    }

    /**
     * 名称:开始播放
     */
    AudioPlayLibraryClass.prototype.start = function () {
        if (this.audio && !this.hasError) {
            this.emitter.emit('start');
            this.audio.play();
            if(this.processTimer){
                this.processTimer.start();
            }
        }
    }

    /**
     * 名称:停止播放
     */
    AudioPlayLibraryClass.prototype.stop = function () {
        if (this.audio  && !this.hasError) {
            this.emitter.emit('stop');
            try {
                this.audio.stop();
            } catch (ex) {

            }
        }
    }

    /**
     * 名称:暂停播放
     */
    AudioPlayLibraryClass.prototype.pause = function () {
        if (this.audio && !this.hasError) {
            this.emitter.emit('pause');
            this.audio.pause();
            if(this.processTimer){
                this.processTimer.stop();
            }
        }
    }

    /**
     * 名称:获取播放状态
     */
    AudioPlayLibraryClass.prototype.getState = function () {
        if (this.audio) {
            if (!window.Audio) {
                return this.audio.playState;
            } else {
                if (this.audio.paused) {
                    return 1;
                } else {
                    return 2;
                }
            }
        }
    }

    /**
     * 名称:切换状态 如果在播放状态下 则暂停 如果在暂停状态下则播放
     * @param 返回当前状态是否在播放中
     */
    AudioPlayLibraryClass.prototype.toggle = function () {
        if (this.getState() == 1) {
            this.start();
            return true;
        } else {
            this.pause();
            return false;
        }
    }


    /**
     * 关闭播放器
     */
    AudioPlayLibraryClass.prototype.destroy = function () {
        if (this.target) {
            this.stop();
            this.emitter.emit('destroy');
            this.target.parentNode.removeChild(this.target);
        }
    }

    function initPlayer(player) {
        if (window.Audio) {
            player.audio.addEventListener('ended', function () {
                player.emitter.emit('end');
            });
            player.audio.addEventListener('error', function () {
                player.hasError=true;
                player.emitter.emit('error');
            });
            player.audio.addEventListener('loadedmetadata', function () {
                player.emitter.emit('load', createMetaData(player.audio));
            });
        } else {
            compactInitPlayer(player);
        }
    }

    function compactInitPlayer(player){
        var timer = new Lsmain.Timer(1000);
        timer.iterator(function () {
            if (player.audio.readyState == 4) {
                var duration  =player.audio.Duration;
                if((duration>0)===false){
                    player.hasError=true;
                    player.emitter.emit('error');
                    return false;
                }
                player.emitter.emit('load', createMetaData(player.audio));
                player.processTimer = Lsmain.Timer.counter((player.audio.Duration));
                player.processTimer.complete(function(){
                    player.emitter.emit('end');
                });
                player.processTimer.start();
                return false;
            }
        });
        timer.start();
    }

    function createMetaData(audio) {
        return {duration: (audio.duration || audio.Duration)}
    }

    function getPlayer(src) {
        var htmls = null;
        if (window.Audio) {
            htmls = '<audio src="' + src + '" type="audio/mp3" hidden="true"></audio>';
        } else {
            htmls = [
                '<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95">',
                '<param name="Src" value="' + src + '" />',
                '<embed src="' + src + '" hidden="true" loop="false"></embed>',
                '</object>'
            ].join('\n');
        }
        return htmls;
    }

    core.Audio = AudioPlayLibraryClass;

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/promise.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：Promise 工具类
 * 日期：2015-12-16
 * 版本：0.0.1
 * 作者：Beven
 * 描述：定制Promise 使其兼容低版本浏览器
 *******************************************************/
(function(core, origin, env) {
    var STATUS = {
        pending: 'pending',
        fulfilled: 'fulfilled',
        rejected: 'rejected'
    }

    var identifier = 0;

    /**
     * PromiseA+规范 构造函数
     * @constructor
     * @param resolver 任务函数
     */
    function PromiseA(resolver) {
        if (!core.type.isFunction(resolver)) {
            throw new Error("resolver 必须为函数");
        }
        if (this.constructor !== PromiseA) {
            throw new Error("不允许 劫持调用")
        }
        this.id = (++identifier);
        this.status = STATUS.pending;
        this.value = null;
        this.reason = null;
        this.emitter = new core.EventEmitterClass();
        PromiseA.log("create promise with id:" + this.id);
        runResolver(this, resolver);
    }

    core.Promise = PromiseA;


    //是否为调试模式
    PromiseA.debug = false;

    //输出日志
    PromiseA.log = function(message) {
        if (PromiseA.debug) {
            console.log(message);
        }
    }

    //默认状态
    PromiseA.prototype.status = STATUS.pending;

    //返回值
    PromiseA.prototype.value = null;

    //拒绝原因
    PromiseA.prototype.reason = null;

    //函数队列容器
    PromiseA.prototype.emitter = null;

    /**
     * 将thenable转换成PromiseA
     * @param thenable 包含then函数对象
     */
    PromiseA.resolve = function(thenable) {
        if (thenable instanceof PromiseA) {
            return thenable;
        } else {
            return convertThenable(thenable);
        }
    }

    /**
     * 名称:判断传入对象是否为一个thenable对象
     */
    PromiseA.thenable = function(thenObj) {
        return (thenObj && thenObj.then && core.type.isFunction(thenObj.then));
    }

    /**
     * 接受一个promise列表 返回一个rootPromise
     * 1.当任意一个promise reject时 当前返回的rootPromise也已同样的reason reject
     * 2.当所有promise 均onfulfilled 时触发resolve
     */
    PromiseA.all = function(promises) {
        if (!core.type.isArray(promises)) {
            throw new Error("参数promises 必须为一个Promise对象的数组")
        }
        var rootPromise = new PromiseA(emptyResolver);
        var total = promises.length ;
        var values = [];
        var reasons = [];
        var current = 0;
        var keep = true;
        core.array.each(promises, function(promise, i) {
            promise.then(function(value) {
                values[i] = value;
                listener();
            }, function(reason) {
                reasons[i] = (reason);
                listener();
            });
        });

        function listener() {
            current++;
            if (current != total) {
                return;
            }
            if (reasons.length < 0) {
                rootPromise.resolve(values);
            } else {
                rootPromise.reject(reasons);
            }
        }
        return rootPromise;
    }

    /**
     * 回调处理then
     * @param resovle fulfilled状态回调函数或者thenable 选填
     * @param rejected rejected状态回调函数或者thenable 选填
     */
    PromiseA.prototype.then = function(resovle, rejected) {
        var nextPromise = this.nextPromise || (this.nextPromise = new PromiseA(emptyResolver));
        switch (this.status) {
            case STATUS.pending:
                //绑定onFulfilled
                this.on(STATUS.fulfilled, resovle);
                //绑定onRejected
                this.on(STATUS.rejected, rejected);
                break;
            case STATUS.fulfilled:
                //如果状态已经为fulfilled 则直接调用resolve
                this.call(nextPromise, resovle);
                break;
            default:
                //如果状态已经为rejected 则直接调用rejected
                this.call(nextPromise, rejected);
                break;
        }
        return nextPromise;
    }

    /**
     * success Promise fulfilled状态
     * @param handler fulfilled回调函数
     */
    PromiseA.prototype.success = function(handler) {
        return this.then(handler, null);
    }

    /**
     * catch Promise rejected状态
     * @param handler fulfilled回调函数
     */
    PromiseA.prototype.error = PromiseA.prototype['catch'] = function(handler) {
        return this.then(emptyResolver, handler);
    }

    /**
     * complete Promise fulfilled与rejected均会触发
     * @param handler fulfilled与rejected回调函数
     */
    PromiseA.prototype.complete = function(handler) {
        if (!core.type.isFunction(handler)) {
            return;
        }
        return this.then(function(data) {
                return handler(null, data);
            },
            function(reason) {
                return handler(reason, null);
            });
    }

    /**
     * 将当前状态更新为fulfilled 并且调用onFulfilled
     * @param value fulfilled 状态时 的返回值
     */
    PromiseA.prototype.resolve = function(value) {
        if (this.status !== STATUS.pending) {
            throw new Error('Illegal call,only pending status can call');
        }
        this.status = STATUS.fulfilled;
        this.value = value;
        var nextPromise = this.nextPromise;
        var length = this.emitter.getListeners(this.status).length;
        PromiseA.log("resolve :" + this.id + " of value");
        PromiseA.log(value);
        this.emitter.emit(this.status, value);
        //如果当前没有设置rejected回调队列 则nextPromise跟随当前promise
        if (nextPromise && length < 1) {
            nextPromise.resolve(value);
        }
    }

    /**
     * 将当前状态更新为rejected 并且调用onRejectd
     * @param reason rejected原因
     */
    PromiseA.prototype.reject = function(reason) {
        if (this.status !== STATUS.pending) {
            throw new Error('Illegal call,only pending status can call');
        }
        this.status = STATUS.rejected;
        this.reason = reason;
        var nextPromise = this.nextPromise;
        var length = this.emitter.getListeners(this.status).length;
        PromiseA.log("rejected :" + this.id + " of reason");
        PromiseA.log(reason);
        this.emitter.emit(this.status, reason);
        //如果当前没有设置rejected回调队列 则nextPromise跟随当前promise
        if (nextPromise && length < 1) {
            nextPromise.reject(reason);
        }
    }

    /**
     * 立即调用
     * @param nextPromise 链式then返回的promise
     * @param resolveOrReject resolve或者reject 回调
     */
    PromiseA.prototype.call = function(nextPromise, resolveOrReject) {
        var fulfilled = this.status === STATUS.fulfilled;
        var v = fulfilled ? this.value : this.reason;
        try {
            nextPromise.value = this.value;
            if (core.type.isFunction(resolveOrReject)) {
                var x = resolveOrReject(v);
                this.resolveX(nextPromise, (x || this.value));
            } else if (fulfilled) {
                nextPromise.resolve(resolveOrReject);
            } else {
                nextPromise.reject(resolveOrReject);
            }
        } catch (ex) {
            console.error(ex.stack);
            nextPromise.reject(ex);
        }
    }

    /**
     * promise解析流程
     */
    PromiseA.prototype.resolveX = function(promise, x) {
        if (promise === x) {
            promise.reject(new TypeError('x'));
        } else if (x instanceof PromiseA) {
            switch (x.status) {
                case STATUS.pending:
                    //promise 将等到x执行完毕后再更新状态
                    bindPromise(promise, x);
                    break;
                case STATUS.fulfilled:
                    //更新状态为fulfilled
                    promise.resolve(x.value);
                    break;
                default:
                    //更新状态为rejected
                    promise.reject(x.reason);
                    break;
            }
        } else {
            resolveThenable(promise, x, this.status);
        }
    }

    /**
     * 添加指定状态的回调队列函数
     * @param name 状态名称
     * @param handler 回到函数
     */
    PromiseA.prototype.on = function(name, handler) {
        var promise = this;
        var nextPromise = this.nextPromise;
        if (core.type.isFunction(handler)) {
            this.emitter.once(name, function() {
                promise.call(nextPromise, handler);
            });
        }
    }

    /**
     * 空处理函数
     */
    function emptyResolver() {

    }

    /**
     * 开始执行初始任务
     */
    function runResolver(promise, resolver) {
        setTimeout(function() {
            try {
                resolver(function(value) {
                    if (promise) {
                        promise.resolve(value);
                    }
                    promise = null;
                }, function(reason) {
                    if (promise) {
                        promise.reject(reason);
                    }
                    promise = null;
                });
            } catch (ex) {
                promise.resolve(ex.message);
                console.error(ex.stack);
            }
        }, 10);
    }

    /**
     * 挂在promise 到thenable上
     * @parma promise promise对象
     * @param thenable thenable 对象
     * @param status 状态
     */
    function resolveThenable(promise, thenable, status) {
        var utils = core.utils;
        if (PromiseA.thenable(thenable)) {
            bindPromise(promise, thenable);
        } else if (status == STATUS.fulfilled) {
            promise.resolve(thenable);
        } else {
            promise.reject(thenable);
        }
        return promise;
    }

    /**
     * 将thenable 转换成PromiseA
     */
    function convertThenable(thenable) {
        var promise = new PromiseA(emptyResolver);
        return resolveThenable(promise, thenable);
    }

    /**
     * 绑定promise 到另一个promise后执行
     * @param promise1 待绑定promise
     * @param promise2 目标promise
     */
    function bindPromise(promise1, promise2) {
        promise2.then(core.utils.getCall(this, thenableResolveCallback, promise1), core.utils.getCall(this, thenableRejectdCallback, promise1));
    }

    /**
     * 转换thenable 时的代理fulfilled回调函数
     */
    function thenableResolveCallback(value, args) {
        var promise = arguments[arguments.length - 1];
        if (value === promise) {
            promise.reject(new TypeError("value"));
        } else {
            promise.resolve(value);
        }
    }

    /**
     * 转换thenable 时的代理rejected回到函数
     */
    function thenableRejectdCallback(reason) {
        var promise = arguments[arguments.length - 1];
        promise.reject(reason);
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/test.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：前端测试工具
 * 日期：2015-07-27
 * 版本：0.0.1
 * 作者：Beven
 * 描述：前端测试工具
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：Javascript代码注释解析工具构造函数
     */
    function TestApplicationLibraryClass() { }

    //继承于基础类
    origin.driver(TestApplicationLibraryClass);

    //引用附加
    env.TestApplication = new TestApplicationLibraryClass();

    var tests = {};

    /**
     * 名称：添加一个测试用例
     */
    TestApplicationLibraryClass.prototype.add = function (classify, name, method, handler) {
        tests[[classify, name, method].join('-')] = handler;
    }

    /**
     * 名称：获取指定测试用例
     */
    TestApplicationLibraryClass.prototype.get = function (classify, name, method) {
        return tests[[classify, name, method].join('-')];
    }

    /**
     * 名称：根据标识获取指定测试用例
     */
    TestApplicationLibraryClass.prototype.get2 = function (id) {
        return tests[id];
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));
;

//以下代码源文件：(src/lsmain/core/lib/timer.js)如需调整代码，请更改此路径文件 
 /**
 * 名称:计时工具
 * 作者:Beven
 * 日期:2015-11-27
 * 描述: 时间轮询操作工具,例如:包含快速开启一个倒计时操作,以及开启一个计时器操作等等
 */
(function (env) {
    'use strict';
    var core = env.Lsmain;
    var origin = core.BaseClass;

    var identifier = 0;

    /**
     * 计时器工具构造函数
     */
    function TimerLibraryClass(interval) {
        if (isNaN(interval) || interval <= 0) {
            throw new Error("interval 必须为>0的数字  单位为:毫秒");
        }
        this.wraps((new TimerInnerClass(interval)), ['start', 'stop', 'on', 'iterator']);
    }

    /**
     * 计时器工具内部类构造函数
     * @param interval 间隔 单位:毫秒
     */
    function TimerInnerClass(interval) {
        this.id  =identifier++;
        this.emitter = new Lsmain.EventEmitterClass();
        this.init.apply(this, arguments);
    }

    //继承于基础类
    origin.driver(TimerLibraryClass);

    //引用附加
    core.Timer = TimerLibraryClass;

    /**
     * 静态函数:开启一个计时器
     * @param interval 间隔时间 单位:毫秒
     */
    TimerLibraryClass.interval = function (millSeconds) {
        return new TimerLibraryClass(millSeconds);
    }

    /**
     * 静态函数:开启一个倒计时
     * @param total 开始数字 默认:秒
     * @type {null}
     */
    TimerLibraryClass.counter = function (total) {
        return new CountDownLibraryClass(total);
    }

    TimerInnerClass.prototype.timerId = 0;

    //setTimeout id
    TimerInnerClass.prototype.id = null;

    //是否能够继续
    TimerInnerClass.prototype.keeping = false;

    //事件容器
    TimerInnerClass.prototype.emitter =null;

    /**
     * 初始化计时器
     */
    TimerInnerClass.prototype.init = function (interval) {
        this.interval = interval;
        if (isNaN(interval) || interval <= 0) {
            throw new Error("interval 必须为>0的数字 单位为:毫秒");
        }
    }

    /**
     * 名称: 开始计时器工具 ,并且调用绑定的step任务
     */
    TimerInnerClass.prototype.start = function () {
        if (!this.keeping) {
            this.keeping = true;
            this.stopif(this.emitter.emit('iterator'));
            this.iterate();
        }
    }

    /**
     * 名称: 停止计时器工具运行
     */
    TimerInnerClass.prototype.stop = function () {
        this.keeping = false;
        clearTimeout(this.timerId);
    }

    /**
     * 名称: 绑定当前计时器每次运行的迭代函数
     */
    TimerInnerClass.prototype.iterate = function (handler) {
        if (this.keepif()) {
            var self = this;
            clearTimeout(this.timerId);
            var id = setTimeout(function () {
                self.stopif(self.emitter.emit('iterator'));
                self.iterate();
            }, this.interval);
            this.timerId = id;
        }
    }

    /**
     * 名称:结束监听
     */
    TimerInnerClass.prototype.stopif = function (r) {
        if (r === false) {
            this.stop();
        }
    }

    /**
     * 名称:是否可以迭代判断
     */
    TimerInnerClass.prototype.keepif = function () {
        if (!this.keeping) {
            return false;
        } else {
            //这里需要自动判断是否有迭代函数 如果没有则停止任务
            return this.emitter.getListeners('iterator').length > 0;
        }
    }

    /**
     * 名称: 绑定当前计时器每次运行的迭代函数
     */
    TimerInnerClass.prototype.iterator = function (handler) {
        this.emitter.on('iterator', handler);
        if (this.keeping) {
            //当新的迭代函数添加进来时,如果当前计时器已经启动 则默认重新开始
            this.keeping = false;
            this.start();
        }
        return this;
    }

    /**
     * 倒计时工具构造函数
     */
    function CountDownLibraryClass(total) {
        if (isNaN(total) || total <= 0) {
            throw new Error("interval 必须为>0的数字");
        }
        var self = this;
        self.total = total;
        self.current = total;
        this.emitter  =new core.EventEmitterClass();
        self.timer = new TimerLibraryClass(1000);//默认间隔为1秒执行
        self.timer.iterator(function () {
            return self.iterate();
        });
    }

    //倒计时事件容器
    CountDownLibraryClass.prototype.emitter=null;

    /**
     * 名称:添加倒计时每步的事件函数
     * @param handler
     */
    CountDownLibraryClass.prototype.iterator = function (handler) {
        this.emitter.on('step', handler);
        return this;
    }

    /**
     * 名称:添加倒计时结束时调用的事件函数
     * @param handler
     */
    CountDownLibraryClass.prototype.complete = function (handler) {
        this.emitter.on('complete', handler);
        return this;
    }

    /**
     * 名称:开始倒计时
     */
    CountDownLibraryClass.prototype.start = function () {
        this.timer.start();
    }

    /**
     * 停止倒计时
     */
    CountDownLibraryClass.prototype.stop  =function(){
        this.timer.stop();
    }

    /**
     * 名称:清空计数
     */
    CountDownLibraryClass.prototype.clear = function () {
        this.stop();
        this.current = this.total;
    }

    /**
     * 名称:倒计时迭代函数
     * @returns {boolean}
     */
    CountDownLibraryClass.prototype.iterate = function () {
        var current = this.current;
        if (current <= 0) {
            return false;
        }
        current--;
        var continueof = current > 0;
        this.emitter.emit('step', this.current, this.total);
        //这里不能用else 因为complete是紧跟着结束就执行的
        if (!continueof) {
            this.emitter.emit('complete', this.current, this.total);
        }
        this.current = current;
        return continueof;
    }

}(window));
;

//以下代码源文件：(src/lsmain/core/lib/uiHelp.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：UI组件辅助工具
 * 日期：2015-07-22
 * 版本：0.0.1
 * 作者：Beven
 * 描述：UI组件辅助工具
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：UI组件辅助工具构造函数
     */
    function UIUtilsLibraryClass() {
    }

    //继承于基础类
    origin.driver(UIUtilsLibraryClass);

    //引用附加
    core.uiHelp = new UIUtilsLibraryClass();

    var prefix = null;

    /**
     * 名称：判断指定坐标是否在指定元素内 返回值为：0(完全在该元素内) 1:在该元素后面 -1：在该元素前
     * @param left left坐标
     * @param top  top坐标
     * @param container 目标容器dom元素
     */
    UIUtilsLibraryClass.prototype.positionIn = function (left, top, container) {
        var element = {
            noElement: true,
            top: top,
            left: left,
            right: left + 1,
            bottom: top + 1,
            offsetParent: container
        };
        return this.elementIn(element, container);
    }

    /**
     * 名称：判断指定元素位置是否在指定元素内 返回值为：0(完全在该元素内) 1:在该元素后面 -1：在该元素前
     * @param element 待判断元素
     * @param container 目标容器dom元素
     */
    UIUtilsLibraryClass.prototype.elementIn = function (element, container) {
        return this.verticalInParent(element, container) && this.horizonInParent(element, container);
    }

    /**
     * 名称：判断制定元素是否在浏览器的可视区域
     * @param element 要判断的元素
     */
    UIUtilsLibraryClass.prototype.inParentAvaView = function (element) {
        return this.verticalInClientView(element) && this.horizonInClientView(element);
    }

    /**
     * 名称：判断制定元素是否在浏览器的可视区域
     * @param element 要判断的元素
     */
    UIUtilsLibraryClass.prototype.inClientView = function (element) {
        return this.verticalInClientView(element) && this.horizonInClientView(element);
    }

    /**
     * 名称：判断指定元素是否在父元素的垂直区域可见 返回值为：true/false
     * @param element 要判断的元素
     */
    UIUtilsLibraryClass.prototype.verticalInClientView = function (element) {
        if (element === document.body || element === document.documentElement) {
            return true;
        }
        var pScroll = this.getBodyScroll();
        var pRect = this.getBoundingClientRect(window);
        var rect = element.noElement ? element : this.getBoundingClientRect(element);
        if (rect.top == rect.left == rect.bottom == rect.right) {
            return false;
        }
        return (rect.top >= 0 && rect.top <= pRect.bottom);
    }

    /**
     * 名称：判断指定元素是否在父元素的水平区域可见 返回值为：true/false
     * @param element 要判断的元素
     */
    UIUtilsLibraryClass.prototype.horizonInClientView = function (element, parentElement) {
        if (element === document.body || element === document.documentElement) {
            return true;
        }
        var pScroll = this.getBodyScroll();
        var pRect = this.getBoundingClientRect(window);
        var rect = element.noElement ? element : this.getBoundingClientRect(element);
        if (rect.top == rect.left == rect.bottom == rect.right) {
            return false;
        }
        return (rect.right >= pScroll.left && rect.left <= pRect.right) || (rect.left > pScroll.left && rect.left < pScroll.right);
    }

    /**
     * 名称：判断指定元素是否在父元素的垂直区内 返回值为：true/false
     * @param element 要判断的元素
     */
    UIUtilsLibraryClass.prototype.verticalInParent = function (element, parentElement) {
        var parent = parentElement || this.getScrollOffsetParent(element);
        if (parent) {
            var pRectElement = parent == document.documentElement ? document.body : parent;
            var pRect = this.getBoundingClientRect(pRectElement);
            var rect = element.noElement ? element : this.getBoundingClientRect(element);
            if (rect.top == rect.left == rect.bottom == rect.right) {
                return false;
            }
            return (rect.top >= pRect.top && rect.bottom <= pRect.bottom);
        } else {
            return false;
        }
    }

    /**
     * 名称：判断指定元素是否在父元素的水平区内 返回值为：true/false
     * @param element 要判断的元素
     */
    UIUtilsLibraryClass.prototype.horizonInParent = function (element, parentElement) {
        var parent = parentElement || this.getScrollOffsetParent(element);
        if (parent) {
            var pRectElement = parent == document.documentElement ? document.body : parent;
            var pRect = this.getBoundingClientRect(pRectElement);
            var rect = element.noElement ? element : this.getBoundingClientRect(element);
            if (rect.top == rect.left == rect.bottom == rect.right) {
                return false;
            }
            return (rect.left >= pRect.left && rect.right < pRect.right);
        } else {
            return false;
        }
    }

    /**
     * 名称：判断指定元素是否在父元素的垂直区域完全可见 返回值为：0(完全在可见区域) 1:在可见区域后面 -1：在可见区域前
     * @param element 要判断的元素
     * @param offsetParent 考虑到父容器的offsetParent有多个，所以可以自定义offsetParent 默认为element.offsetParent
     */
    UIUtilsLibraryClass.prototype.verticalFullInClientView = function (element, offsetParent) {
        var parent = this.getScrollOffsetParent(element);
        if (parent) {
            var top = element.offsetTop;
            var maxTop = top + element.offsetHeight;
            var minView = getScrollTop(parent);
            var maxView = minView + parent.clientHeight;
            if (maxTop > maxView) {
                return 1;
            } else if (top < minView) {
                return -1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    /**
     * 名称：判断指定元素是否在父元素的水平区域完全可见 返回值为：0(完全在可见区域) 1:在可见区域右边 -1：在可见区域左边
     * @param element 要判断的元素
     * @param offsetParent 考虑到父容器的offsetParent有多个，所以可以自定义offsetParent 默认为element.offsetParent
     */
    UIUtilsLibraryClass.prototype.horizonFullInClientView = function (element, offsetParent) {
        var parent = this.getScrollOffsetParent(element);
        if (parent) {
            var left = element.offsetLeft;
            var maxLeft = left + element.offsetWidth;
            var minView = getScrollLeft(parent);
            var maxView = minView + parent.clientWidth;
            if (maxLeft > maxView) {
                return 1;
            } else if (left < minView) {
                return -1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    /**
     * 名称：滚动至指定子元素，使指定子元素能够出现在父容器的水平可见区域
     * @param element 要呈现的子元素
     * @param offset 水平偏移量 默认为0
     */
    UIUtilsLibraryClass.prototype.scrollIntoHorizonView = function (element, offset) {
        var left = 0;
        var parent = this.getScrollOffsetParent(element);
        var status = this.horizonFullInClientView(element);
        offset = core.utils.ensureDecimal(offset, 0);
        if (parent) {
            //让父级出现在可视区域
            this.scrollIntoHorizonView(parent, offset);
        }
        if (status === 0) {
            return;
        }
        var offsetLeft = domOffset(element).left;
        var ranger  =new core.UIScrollCompactClass(parent);
        if (status === 1) {
            //在父元素可见区域右边 需要往右滚动
            left = offsetLeft + element.clientWidth + offset;
            ranger.scrollLeft(left);
        } else if (status === -1) {
            //在父元素可见区域左边 需要往左滚动
            left = offsetLeft - element.clientWidth - offset;
            ranger.scrollLeft(left);
        }
    }

    /**
     * 名称：滚动至指定子元素，使指定子元素能够出现在父容器的垂直可见区域
     * @param element 要呈现的子元素
     * @param offset 垂直偏移量 默认为0
     */
    UIUtilsLibraryClass.prototype.scrollIntoVerticalView = function (element, offset) {
        var status = this.verticalFullInClientView(element);
        var top = 0;
        var parent = this.getScrollOffsetParent(element);
        offset = core.utils.ensureDecimal(offset, 0);
        if (parent) {
            this.scrollIntoVerticalView(parent, offset);
        }
        if (status === 0) {
            return;
        }
        var offsetTop = domOffset(element).top;
        var ranger  =new core.UIScrollCompactClass(parent);
        if (status === 1) {
            //在父元素可见区域后面 需要往下滚动
            top = offsetTop + element.clientHeight + offset;
            ranger.scrollTop(top);
        } else if (status === -1) {
            //在父元素可见区域前 需要往前滚动
            top = offsetTop - element.clientHeight - offset;
            ranger.scrollTop(top);
        }
    }

    /**
     * 名称：使指定元素呈现在父元素的可见区域
     * @param element 要判断的元素
     * @param offsetX 水平偏移量
     * @param offsetY 垂直偏移量
     */
    UIUtilsLibraryClass.prototype.scrollIntoView = function (element, offsetX, offsetY) {
        this.scrollIntoHorizonView(element, offsetX);
        this.scrollIntoVerticalView(element, offsetY);
    }

    /**
     * 名称：获取指定元素最近的可滚动的父元素
     */
    UIUtilsLibraryClass.prototype.scrollParent = function (element) {
        var parent = element.parentElement;
        var scrollParent = null, overflowX = "", overflowY = "";
        while (parent) {
            overflowX = this.cssOf(parent, "overflowX");
            overflowY = this.cssOf(parent, "overflowY");
            if (overflowX == "auto" || overflowX == "scroll" || (parent === document.documentElement && overflowX === 'visible')) {
                scrollParent = parent;
                break;
            } else if (overflowY == "auto" || overflowY == "scroll" || (parent === document.documentElement && overflowY === 'visible')) {
                scrollParent = parent;
                break;
            }
            parent = parent.parentElement;
        }
        return scrollParent;
    }

    /**
     * 名称：优先获取就近的可滚动父元素，如果没有则获取当前元素的offsetParent
     */
    UIUtilsLibraryClass.prototype.getScrollOffsetParent = function (element) {
        return this.scrollParent(element) || element.offsetParent;
    }

    /**
     * 兼容方式获取document.body.scrollTop 与left
     */
    UIUtilsLibraryClass.prototype.getBodyScroll = function () {
        var top = (document.body.scrollTop || document.documentElement.scrollTop);
        var left = (document.body.scrollLeft || document.documentElement.scrollLeft);
        return { top: top, left: left }
    }

    /**
     * 名称：获取指定元素offsetHeight，如果元素不存在 则返回0
     * @param target 原生态dom元素 注意：不是jquery包装元素
     */
    UIUtilsLibraryClass.prototype.getOffsetHeight = function (target) {
        return this.offsetOf(target, 'Height');
    }

    /**
     * 名称：获取指定元素offset相关属性值 如果元素不存在则返回0
     * @param element 原生态dom元素 注意：不是jquery包装元素
     * @param name 要获取的属性 例如offsetHeight 则传入 Height
     */
    UIUtilsLibraryClass.prototype.offsetOf = function (element, name) {
        if (element === null || element === undefined) {
            return 0;
        } else {
            return element['offset' + name];
        }
    }

    /**
     * 名称：获取元素margin数值
     * @param element 原生态dom元素 注意：不是jquery包装元素
     */
    UIUtilsLibraryClass.prototype.getMargin = function (element) {
        var marginLeft = 0, marginRight = 0, marginTop = 0, marginBottom = 0;
        if (element) {
            marginLeft = this.intCssOf(element, "margin-left");
            marginRight = this.intCssOf(element, "margin-right");
            marginTop = this.intCssOf(element, "margin-top");
            marginBottom = this.intCssOf(element, "margin-bottom");
        }
        return { left: marginLeft, top: marginTop, right: marginRight, bottom: marginBottom };
    }

    /**
     * 名称：获取元素padding数值
     * @param element 原生态dom元素 注意：不是jquery包装元素
     */
    UIUtilsLibraryClass.prototype.getPadding = function (element) {
        var paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0;
        if (element) {
            paddingLeft = this.intCssOf(element, 'padding-left');
            paddingRight = this.intCssOf(element, "padding-right");
            paddingTop = this.intCssOf(element, "padding-top");
            paddingBottom = this.intCssOf(element, "padding-bottom");
        }
        return { left: paddingLeft, top: paddingTop, right: paddingRight, bottom: paddingBottom };
    }

    /**
     * 名称：获取元素border数值
     * @param element 原生态dom元素 注意：不是jquery包装元素
     */
    UIUtilsLibraryClass.prototype.getBorder = function (element) {
        var borderLeft = 0, borderRight = 0, borderTop = 0, borderBottom = 0;
        if (element) {
            borderLeft = this.intCssOf(element, 'border-left-width');
            borderRight = this.intCssOf(element, "border-right-width");
            borderTop = this.intCssOf(element, "border-top-width");
            borderBottom = this.intCssOf(element, "border-bottom-width");
        }
        return { left: borderLeft, top: borderTop, right: borderRight, bottom: borderBottom };
    }

    /**
     * 名称：获取指定元素的style列表
     * @param element  原生态dom元素 注意：不是jquery包装元素
     */
    UIUtilsLibraryClass.prototype.getStyles = function (element) {
        if (element.currentStyle) {
            return element.currentStyle;
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(element);
        } else {
            return element.style;
        }
    }

    /**
     * 名称：样式名称转换属性名称
     */
    UIUtilsLibraryClass.prototype.cssNameOf = function (name) {
        name = name || "";
        var vs = name.split('-');
        var item = null;
        vs = core.array.filterEmpty(vs);
        for (var i = 1, k = vs.length; i < k; i++) {
            item = vs[i];
            vs[i] = (item.substr(0, 1).toUpperCase() + item.substr(1, item.length));
        }
        return vs.join('');
    }

    /**
     * 名称：获取指定元素的style对应的值
     * @param element  原生态dom元素 注意：不是jquery包装元素
     * @param name css样式名称
     */
    UIUtilsLibraryClass.prototype.cssOf = function (element, name) {
        name = name || "";
        if (element) {
            var styles = this.getStyles(element);
            return styles[name] || styles[this.cssNameOf(name)];
        }
    }

    /**
     * 名称：获取css名称 ，自动补全特有css前缀
     */
    UIUtilsLibraryClass.prototype.getCssName = function (name) {
        prefix = prefix == null ? this.getPrefix() : prefix;
        name = name || "";
        if (prefix !== '') {
            var firstChar = (name[0] || "").toUpperCase();
            var afterChars = (name.substring(1));
            name = prefix + firstChar + afterChars;
        }
        return name;
    }

    /**
     * 名称：获取浏览器css前缀
     */
    UIUtilsLibraryClass.prototype.getPrefix = function () {
        var styles = this.getStyles(document.documentElement) || {};
        var vendors = {
            'webkitAnimationName': 'webkit',
            'mozAnimationName': 'moz',
            'msAnimationName': 'ms',
            'oAnimationName': 'o',
            'animation': ''
        };
        var prx = '';
        for (var i in vendors) {
            if (i in styles) {
                prx = vendors[i];
                break;
            }
        }
        return prx;
    }

    /**
     * 名称：获取window的高度
     */
    UIUtilsLibraryClass.prototype.getWindowHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    /**
     * 名称：获取window的宽度度
     */
    UIUtilsLibraryClass.prototype.getWindowWidth = function () {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

    /**
     * 获取元素的viewport坐标
     * @param element
     * @returns {{top: number, bottom: number, left: number, right: number}}
     */
    UIUtilsLibraryClass.prototype.getBoundingClientRect = function (element) {
        //如果传入的是document 则使用window获取clientRect
        element = element === document ? window : element;
        if (element === window) {
            return this.getWindowBoundingClientRect();
        } else {
            return this.getDomBoundingClientRect(element);
        }
    }

    /**
     * 获取window或者document的getBoundingClientRect
     * @param
     */
    UIUtilsLibraryClass.prototype.getWindowBoundingClientRect = function () {
        return { left: 0, top: 0, right: this.getWindowWidth(), bottom: this.getWindowHeight() };
    }

    /**
     * 获取dom元素的
     * @param element dom元素
     */
    UIUtilsLibraryClass.prototype.getDomBoundingClientRect = function (element) {
        var isAuto = (element.offsetWidth === 0 && element.offsetHeight === 0);
        var width = element.style.width;
        if (!element.parentElement && element != document.documentElement) {
            return { top: 0, bottom: 0, left: 0, right: 0 };
        }
        if (isAuto) {
            element.style.width = "1px";
        }
        var rect = element.getBoundingClientRect();
        var top = document.documentElement.clientTop;
        var left = document.documentElement.clientLeft;
        var rect2 = {
            top: rect.top - top,
            bottom: rect.bottom - top,
            left: rect.left - left,
            right: rect.right - left
        }
        if (isAuto) {
            element.style.width = width;
        }
        return rect2;
    }

    /**
     * 名称：获取指定样式值并且转换成Int类型 如果转换失败返回0
     * @param element  原生态dom元素 注意：不是jquery包装元素
     * @param name css样式名称
     * @param dv 如果存在该值则 使用dv默认值
     */
    UIUtilsLibraryClass.prototype.intCssOf = function (element, name, dv) {
        var v = null;
        dv = dv || 0;
        if (element) {
            v = parseInt(this.cssOf(element, name));
        }
        v = isNaN(v) ? dv : v;
        return v;
    }

    /**
     * 名称：获取指定元素除去border+ padding的值
     */
    UIUtilsLibraryClass.prototype.getPbs = function (element) {
        var values = { x: 0, y: 0 };
        if (element) {
            var padding = this.getPadding(element);
            var border = this.getBorder(element);
            values.x = padding.left + padding.right + border.left + border.right;
            values.y = padding.top + padding.bottom + border.top + border.bottom;
        }
        return values;
    }

    /**
     * 名称：设置元素高度 保证元素在存在padding以及border时高度始终等于所设置的高度
     */
    UIUtilsLibraryClass.prototype.setClientHeight = function (element, height) {
        if (element) {
            var padding = this.getPadding(element);
            var border = this.getBorder(element);
            height = (height - padding.top - padding.bottom - border.top - border.bottom);
            height = height < 0 ? 0 : height;
            element.style.height = height + 'px';
        }
    }

    /**
     * 名称：设置元素宽度 保证元素在存在padding以及border时宽度始终等于所设置的宽度
     */
    UIUtilsLibraryClass.prototype.setClientWidth = function (element, width) {
        if (element) {
            var padding = this.getPadding(element);
            var border = this.getBorder(element);
            width = (width - padding.left - padding.right - border.left - border.right);
            width = width < 0 ? 0 : width;
            element.style.width = width + 'px';
        }
    }

    /**
     * 获取指定控件中，光标所在位置
     */
    UIUtilsLibraryClass.prototype.getCursortPosition = function (ctrl) {
        var cursorPosition = -1;
        if (!ctrl) {
            cursorPosition = -1;
        } else if ('selectionStart' in ctrl) {
            cursorPosition = ctrl.selectionStart;
        } else if (document.selection) {
            ctrl.focus();
            var selectionRange = document.selection.createRange();
            selectionRange.moveStart('character', -ctrl.value.length);
            cursorPosition = selectionRange.text.length;
        }
        return cursorPosition;
    }

    /**
     * 设置光标位置
     * @param ctrl 控件
     * @param pos 位置
     */
    UIUtilsLibraryClass.prototype.setCursorPosition = function (ctrl, pos) {
        if(!ctrl || pos<0){
            return;
        }else if(ctrl.setSelectionRange){
            ctrl.focus(); 
            ctrl.setSelectionRange(pos,pos);
        }else if(ctrl.createTextRange){
            var range = ctrl.createTextRange(); 
            range.collapse(true); 
            range.moveEnd('character', pos); 
            range.moveStart('character', pos); 
            range.select(); 
        }
        ctrl.focus();
    }

    function getScrollTop(element) {
        if (element == document.body || element == document.documentElement) {
            return (document.body.scrollTop || document.documentElement.scrollTop);
        } else {
            return element.scrollTop;
        }
    }

    function getScrollLeft(element) {
        if (element == document.body || element == document.documentElement) {
            return (document.body.scrollLeft || document.documentElement.scrollLeft);
        } else {
            return element.scrollLeft;
        }
    }

    function domOffset(dom){
        var offsetParent  =dom.offsetParent;
        var top=dom.offsetTop;
        var left =dom.offsetLeft;
        while(offsetParent){
            top = top + offsetParent.offsetTop;
            left  = left + offsetParent.offsetLeft;
            offsetParent = offsetParent.offsetParent;
        }
        return {top:top,left:left};
    }

} (window.Lsmain, window.Lsmain.BaseClass, window));
;

//以下代码源文件：(src/lsmain/core/lib/urlparser.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：客户端浏览器Url解析器
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：解析指定URL地址
 *       解析部分包含：协议，域名，访问路径，访问Get参数
 *       例如：http://www.lianshang.cn/orders?id=1&productid=2333
 *       解析结构类似：{protocol:'http:',host:'www.lianshang.cn',pathname:'/orders',paras:{id:1,productid:23333} }
 *******************************************************/
(function (core, origin, env) {
    'use strict';
    /**
     * 名称：URL解析工具构造函数
     */
    function UrlParserLibraryClass(url) {
        this.parse(url);
    }

    //继承于基础类
    origin.driver(UrlParserLibraryClass);

    //辅助工具
    var strUtils = core.string;

    /**
     * 名称：解析指定url
     */
    UrlParserLibraryClass.prototype.parse = function (url) {
        url = (url || '').toString().split('#')[0] || "";
        var kvs = url.split('?');
        url = kvs.shift();
        var queryParams = kvs.join('?');
        var fragments = url.match(/(\w+\:)\/\/(([\w,\-]+(\.|))+)(:\d+|)((\/.+)|)/) || [];
        var attributes = ['href', 'protocol', 'host', null, null, 'port', 'pathname'];
        var attr = null;
        for (var i = 0, k = attributes.length; i < k; i++) {
            attr = attributes[i];
            if (attr) {
                this[attr] = fragments[i] || "";
            }
        }
        if(fragments.length<1){
            this.pathname = url;
        }
        this.url = (url);
        this.port = this.port.replace(":", "");
        var kv = (this.pathname || "").split('?');

        this.search = queryParams || "";
        this.pathname = kv[0];
        this.parseParams(this.search);
    }

    /**
     * 名称：解析get参数
     */
    UrlParserLibraryClass.prototype.parseParams = function (search) {
        search = (search || "");
        search = core.string.trimStart(search, "?");
        var kvs = search.split('&');
        var kv = null, paras = {};
        for (var i = 0, k = kvs.length; i < k; i++) {
            kv = kvs[i];
            if (kv === '') {
                continue;
            }
            kv = kv.split('=');
            paras[decodeURIComponent(kv.shift())] = decodeURIComponent(kv.join('=') || "");
        }
        this.paras = paras;
        return this;
    }

    /**
     * 名称：直接绑定当前window.location
     */
    UrlParserLibraryClass.prototype.bind = function () {
        var attributes = ['href', 'protocol', 'host', 'port', 'search', 'pathname'];
        var attr = null, location = window.location;
        for (var i = 0, k = attributes.length; i < k; i++) {
            attr = attributes[i];
            if (attr) {
                this[attr] = location[attr];
            }
        }
        this.parseParams(this.search);
        return this;
    }
    /**
     * 名称：将当前解析器的参数转换成url参数形式
     */
    UrlParserLibraryClass.prototype.toParamString = function (ignoreEmpty) {
        var paras = this.paras || {};
        var strArray = [];
        for (var i in paras) {
            if (ignoreEmpty === true && strUtils.isNullOrWhiteSpace(paras[i])) {
                continue;
            }
            strArray.push(i + '=' + paras[i]);
        }
        return '?' + strArray.join('&');
    }
    /**
     * 名称：重写toString方法
     */
    UrlParserLibraryClass.prototype.toString = function (ignoreEmpty) {
        var port = "";
        if (!core.string.isNullOrWhiteSpace(this.port)) {
            port = ":" + this.port;
        }
        var sp = this.protocol?"//":"";
        return core.string.format("{0}{1}{2}{3}{4}{5}", this.protocol,sp, this.host, port, this.pathname, this.toParamString(ignoreEmpty));
    }

    //引用附加
    core.UrlParserClass = UrlParserLibraryClass;

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/validator.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：数据规则校验器
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：主要提供字符串的相关操作函数，提高开发效率
 *******************************************************/
(function(core, origin, env) {
    'use strict';
    /**
     * 名称：通用方法工具类
     */
    function ValidatorLibraryClass() {
        this.emitter = new core.EventEmitterClass();
        this.emitter.validator = this;
    }

    //继承于基础类
    origin.driver(ValidatorLibraryClass);

    //引用附加
    core.DataValidator = ValidatorLibraryClass;

    core.validator = new ValidatorLibraryClass();

    /**
     * 注册一个规则
     * @param name 校验器名称
     * @param handler 校验器函数 返回 true/false
     * @param defaultMessage 验证失败消息
     */
    ValidatorLibraryClass.registerRule = function(name, handler, defaultMessage) {
        var p = ValidatorLibraryClass.prototype;
        if (name in p) {
            throw new Error(core.string.format('已存在名称为{0}的校验器', name));
        }
        if (!core.type.isFunction(handler)) {
            throw new Error("检验器必须为一个function")
        }
        p[name] = function(value, parasOne, parasN, model) {
            var r = handler.apply(this, arguments);
            //消息为默认第倒数二个参数，最后一个参数为框架注入de
            var message = arguments[arguments.length - 2];
            var args = core.utils.argumentArray(arguments);
            var params = args.slice(1, arguments.length - 1)
            return traslate(this.emitter, r, message, defaultMessage, params, value);
        }
    }


    /**
     * 绑定一个invalid事件
     */
    ValidatorLibraryClass.prototype.onInvalid = function(handler) {
        this.emitter.on('invalid', handler);
    }

    /**
     * 绑定一个valid事件
     */
    ValidatorLibraryClass.prototype.onValid = function(handler) {
        this.emitter.on('valid', handler);
    }

    /**
     * 清空绑定的invalid事件
     */
    ValidatorLibraryClass.prototype.clear = function() {
        this.emitter.off();
    }

    /**
     * 校验指定model
     * @param model object对象
     * @param cfg 配置对象
     * @param slient 是否 为静默模式 如果为true 则不触发onInvalid与inValid事件 错误消息可以从currentMessage中取出
     */
    ValidatorLibraryClass.prototype.model = function(model, cfg, slient) {
        this.currentFormName = null;
        if (!core.type.isObject2(model)) {
            throw new Error('model参数必须为不为null的object对象');
        }
        if (!core.type.isObject(model)) {
            throw new Error("参数cfg 必须设置")
        }
        this.slient = slient;
        var keys = core.utils.getKeys(cfg);
        var r = keys.length < 1,
            keyName;
        for (var i = 0, k = keys.length; i < k; i++) {
            keyName = keys[i];
            r = this.attr(keyName, model[keyName], cfg, model);
            if (!r) {
                break;
            }
        }
        if (r) {
            this.currentFormName = null;
        }
        return r;
    }

    /**
     * 使用指定验证配置对象验证指定model指定属性
     * @param name 验证属性名称
     * @param value 属性值
     * @param cfg 验证配置对象
     * @parma model 上下文对象 可以不填写
     */
    ValidatorLibraryClass.prototype.attr = function(name, value, cfg, model) {
        var rules = cfg[name];
        var ruleKey = null;
        var types = core.type;
        var r = true,
            hasValue = true;
        this.currentFormName = name;
        if (rules === null || rules === undefined) {
            return true;
        }
        var ruleKeys = core.utils.getKeys(rules);
        if (rules.required) {
            r = this.required(value, rules.required);
        }else if(rules.twoRequired) {
            r = this.twoRequired.apply(this,([value].concat(rules.twoRequired)));
        }else if(!(core.type.isObject2(value) || core.type.isArray(value))){
            hasValue = (value||'').toString().replace(/\s/g,'')!=='';
        }
        if (!r || !hasValue) {
            return r;
        }

        var ruleHandler = null;
        for (var i = 0, k = ruleKeys.length; i < k; i++) {
            ruleKey = ruleKeys[i];
            if (ruleKey === 'required') {
                continue;
            }
            ruleHandler = this[ruleKey];
            if (!types.isFunction(ruleHandler)) {
                continue;
            }
            var paras = [];
            var paramArray = core.array.ensureArray(rules[ruleKey]);
            paras.push(value);
            paras.push.apply(paras, paramArray);
            paras.push(model);
            r = ruleHandler.apply(this, paras);
            if (!r || r === 'break') {
                break;
            }
        }
        if (r) {
            this.currentFormName = null;
        }
        return r;
    }

    /**
     * 非空校验器
     * @param value 值
     * @parma message 验证失败消息
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.required = function(value, message) {
        var r = !core.string.isNullOrWhiteSpace(value)
        return traslate(this.emitter, r, message, '不能为空', value);
    }

    /**
     * 二选一必填
     * @param v 值
     * @param attr 属性名
     * @parma message 验证失败消息 可不填
     * @param model 上下文对象 v2值来源于model[attr]
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.twoRequired = function(value, attr, message, model) {
        var r = !core.string.isNullOrWhiteSpace(value);
        var otherProp = attr;
        var other = null,
            final = false;
        if (core.type.isFunction(otherProp)) {
            other = otherProp();
        } else {
            other = (model || {})[attr];
        }
        var r2 = !core.string.isNullOrWhiteSpace(other);
        if ((r || r2)) {
            final = true;
        }
        traslate(this.emitter, final, message, '不能为空', value);
        return r ? true : 'break';
    }

    /**
     * 邮件校验器
     * @param v 值
     * @parma message 验证失败消息
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.email = function(value, message) {
        var r = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
        return traslate(this.emitter, r, message, '请输入有效的电子邮件地址', value);
    };

    /**
     * url地址校验器
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.url = function(value, message) {
        var r = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
        return traslate(this.emitter, r, message, '请输入有效的网址', value);
    };

    /**
     * 时间校验器
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.date = function(value, message) {
        var r = !/Invalid|NaN/.test(new Date(value).toString());
        return traslate(this.emitter, r, message, '请输入有效的日期', value);
    };

    /**
     * ISO时间格式校验器
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.dateISO = function(value, message) {
        var r = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
        return traslate(this.emitter, r, message, '请输入有效的日期 (YYYY-MM-DD)', value);
    };

    /**
     * 整数格式校验器
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.number = function(value, message) {
        var r = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value, value);
        return traslate(this.emitter, r, message, '请输入有效的数字');
    };

    /**
     * 数字格式校验器
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.digits = function(value, message) {
        var r = /^\d+$/.test(value);
        return traslate(this.emitter, r, message, '只能输入数字', value);
    };

    /**
     * 银行卡号校验器
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.creditcard = function(value, message) {
        if (/[^0-9 \-]+/.test(value)) {
            return false;
        }
        var nCheck = 0,
            nDigit = 0,
            bEven = false,
            n, cDigit;

        value = value.replace(/\D/g, "");

        if (value.length < 13 || value.length > 19) {
            return false;
        }
        for (n = value.length - 1; n >= 0; n--) {
            cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        var r = (nCheck % 10) === 0;
        return traslate(this.emitter, r, message, '请输入有效的信用卡号码', value);
    };

    /**
     * 最小长度校验器
     * @param v 值
     * @param min 最小长度
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.minlength = function(value, min, message) {
        var r = (value || '').length >= min;
        return traslate(this.emitter, r, message, '最少要输入 {0} 个字符', [min], value);
    };

    /**
     * 最大长度校验器
     * @param v 值
     * @param max 最大长度
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.maxlength = function(value, max, message) {
        var r = (value || '').length <= max;
        return traslate(this.emitter, r, message, '最多可以输入 {0} 个字符', [max], value);
    };

    /**
     * 长度范围校验
     * @param v 值
     * param min 最小长度
     * param max 最大长度
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.rangelength = function(value, min, max, message) {
        var len = (value || '').length;
        var r = len >= min && len <= max;
        return traslate(this.emitter, r, message, '请输入长度在 {0} 到 {1} 之间的字符串', [min, max], value);
    };

    /**
     * 最小值校验器
     * @param v 值
     * @param min 最小值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.min = function(value, min, message) {
        var r = value >= min;
        return traslate(this.emitter, r, message, '请输入不小于 {0} 的数值', [min], value);
    };

    /**
     * 最大值校验
     * @param v 值
     * @param max 最大值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.max = function(value, max, message) {
        var r = value <= max;
        return traslate(this.emitter, r, message, '请输入不大于 {0} 的数值', [max], value);
    };

    /**
     * 值范围校验
     * @param v 值
     * param min 最小值
     * param max 最大值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.range = function(value, min, max, message) {
        var r = value >= min && value <= max;
        return traslate(this.emitter, r, message, '请输入范围在 {0} 到 {1} 之间的数值', [min, max], value);
    };

    /**
     * 手机号校验
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.mobile = function(value, message) {
        var r = /^1[1-9][0-9]\d{8}$/.test(value);
        return traslate(this.emitter, r, message, '请输入有效的手机号码', value);
    };

    /**
     * 手机号校验
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.tel = function(value, message) {
        var r = /^(\d{3,4}-)?\d{7,8}$/.test(value);
        return traslate(this.emitter, r, message, '请输入有效的电话号码', value);
    };


    /**
     * 校验两个值是否相等
     * @param v 值
     * @param attr 属性名
     * @parma message 验证失败消息 可不填
     * @param model 上下文对象 v2值来源于model[attr]
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.equalTo = function(value, attr, message, model) {
        model = model || {};
        var v2 = (model[attr]);
        var r = value != null && value === v2;
        return traslate(this.emitter, r, message, '值不匹配', value);
    };

    /**
     * 校验当前值 是否 小于指定属性值
     * @param v 值
     * @param attr 属性名
     * @parma message 验证失败消息 可不填
     * @param model 上下文对象 v2值来源于model[attr]
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.minTo = function(value, attr, message, model) {
        model = model || {};
        var v2 = (model[attr]);
        var r = value != null && Number(value) < Number(v2);
        return traslate(this.emitter, r, message, '{1}不能大于{2}', [r, v2], value);
    };

    /**
     * 校验当前值 是否 大于指定属性值
     * @param v 值
     * @param attr 属性名
     * @parma message 验证失败消息 可不填
     * @param model 上下文对象 v2值来源于model[attr]
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.maxTo = function(value, attr, message, model) {
        model = model || {};
        var v2 = (model[attr]);
        var r = value != null && Number(value) >= Number(v2);
        return traslate(this.emitter, r, message, '{1}不能小于{2}', [r, v2], value);
    };

    /**
     * 中华人民共和国身份证校验
     * @param v 值
     * @parma message 验证失败消息 可不填
     * @param model 上下文对象 v2值来源于model[attr]
     * @returns {boolean} 失败(false)/成功(true)
     */
    ValidatorLibraryClass.prototype.idCard = function(value, message, params) {
        var sumNumbers = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var verfifyChars = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        var r = false;
        if (value.length == 15 && (!isNaN(value))) {
            r = true;
        } else if (value.length == 18) {
            var sum = 0;
            for (var i = 0, k = sumNumbers.length; i < k; i++) {
                sum = sum + Number(value[i]) * sumNumbers[i];
            }
            return verfifyChars[(sum % 11)] === value[17];
        } else {
            r = false;
        }
        return traslate(this.emitter, r, message, '无效的身份证号码', params, value);
    };


    function traslate(emitter, r, message, defaultMessage, params, value) {
        if (!emitter) {
            return r;
        }
        message = core.utils.ifn(message, defaultMessage);
        var validator = emitter.validator;
        validator.currentMessage = message;
        if (!validator.slient) {
            if (!r) {
                var strings = core.string;
                var args = [message];
                params = core.array.ensureArray(params);
                args.push.apply(args, params);
                args.push((value || '').toString().substring(0, 10));
                emitter.emit('invalid', strings.format.apply(strings, args));
            } else {
                emitter.emit('valid');
            }
        }
        return r;
    }

}(window.Lsmain, window.Lsmain.BaseClass, window));;

//以下代码源文件：(src/lsmain/core/lib/scroll.js)如需调整代码，请更改此路径文件 
 /*******************************************************
 * 名称：链尚网主框架库文件：SCROLL 兼容工具
 * 日期：2015-07-15
 * 版本：0.0.1
 * 作者：Beven
 * 描述：
 *******************************************************/
(function (core, origin, env) {
    'use strict';

    /**
     * 滚动已滚动参数兼容工具
     */
    function UIScrollCompactClass(container) {
        this.container = this.compactContainer($(container));
    }

    //引用附加
    core.UIScrollCompactClass = UIScrollCompactClass;

    /**
     * 名称：设置当前容器滚动x轴值
     */
    UIScrollCompactClass.prototype.scrollLeft = function (v) {
        if (arguments.length === 0) {
            return this.container.scrollLeft();
        } else {
            this.container.scrollLeft(v);
        }
    }

    /**
     * 名称：设置当前容器滚动x轴值
     */
    UIScrollCompactClass.prototype.scrollTop = function (v) {
        if (arguments.length === 0) {
            return this.container.scrollTop();
        } else {
            this.container.scrollTop(v);
        }
    }

    /**
     * 名称：获取当前容器的总宽度包括滚动条
     */
    UIScrollCompactClass.prototype.scrollWidth = function () {
        return this.container[0].scrollWidth;
    }

    /**
     * 名称：获取当前容器的总高度包括滚动条
     */
    UIScrollCompactClass.prototype.scrollHeight = function () {
        return this.container[0].scrollHeight;
    }

    /**
     * 名称：获取当前容器 的可是区域宽度
     */
    UIScrollCompactClass.prototype.clientWidth = function () {
        if (this.container.is("body") && this.bodyScrollLeftUseful()) {
            return document.documentElement.clientWidth;
        } else {
            return this.container[0].clientWidth;
        }
    }

    /**
     * 名称：获取当前容器 的可是区域高度
     */
    UIScrollCompactClass.prototype.clientHeight = function () {
        if (this.container.is("body") && this.bodyScrollLeftUseful()) {
            return document.documentElement.clientHeight;
        } else {
            return this.container[0].clientHeight;
        }
    }

    /**
     * 名称：兼容方式获取容器
     */
    UIScrollCompactClass.prototype.compactContainer = function (container) {
        if (container.length <= 0) {
            container = $(document.body);
        }
        if(container.is("html")){
            container = $(document.body);
        }
        if (container.is("body") && !this.bodyScrollLeftUseful()) {
            container = $(document.documentElement);
        }
        return container;
    }

    /**
     * 名称：判断document.body.scrollLeft是否有效
     */
    UIScrollCompactClass.prototype.bodyScrollLeftUseful = function () {
        if (core.browser.chrome()) {
            return true;
        }
    }
}(window.Lsmain, window.Lsmain.BaseClass, window));