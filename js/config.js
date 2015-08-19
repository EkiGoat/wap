wap_config = {
    corp_id: "10054",
    base_site: "../..",
    resource_site: "http://122.224.171.198/app315",
    mall_site: "http://122.224.171.198/mall",
    basic_wap_site: "http://122.224.171.198/newwap",
    mall: function (corpid) {
        corpid = corpid || "";
        return this.mall_site + "?corpid=" + corpid;
    },
    product: function (corpid, product_id) {
        corpid = corpid || "";
        product_id = product_id || "";
        return this.mall_site + "/ProductDetail.aspx?CorpID=" + corpid + "&ID=" + product_id;
    },
    anti_result: function (id, message) {
        id = id || "";
        message = message || "";
        return this.basic_wap_site + "/Operator/Common/AntiFakeQueryResult.aspx?ID=" + id + "&Message=" + encodeURI(message);
    },
    data_service: function (name) {
        name = name || "";
        return this.basic_wap_site + "/Common/DataService.ashx?function=" + name;
    },
    get_validate_code: function (t, d, w, h) {
        t = t || "";
        d = d || "";
        w = w || "";
        h = h || "";
        return this.basic_wap_site + "/Common/ValidateCode.ashx?Type=" + t + "&Demand=" + d + "&w=" + w + "&h=" + h + "&r=" + Math.random();
    }
}