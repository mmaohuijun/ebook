let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : '金地电子台账';
    window.document.title = title;
};

export default util;