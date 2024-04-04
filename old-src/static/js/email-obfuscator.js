function rot(s, i) {
    // modified for general rot# from
    // http://stackoverflow.com/a/617685/987044
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);});
}
var addr = rot("lidql@lidqlclmtawv.kwu", 18);
document.write("<a href=\"mailto:" + addr + "\">" + addr + "</a>");
