module.exports = {

    root: function(h, node, data, children, options) {
        return h(node.tagName, data, children);
    },
    element: function(h, node, data, children, options) {
        return h(node.tagName, data, children);
    },
    text: function(h, node) {
        return node.value;
    },
    comment: function () {
        
    },
    component: function (h, node, data) {
        return h(node.component, data);
    },
    raw: function (h, node) {
        return node.value;
    }

};
