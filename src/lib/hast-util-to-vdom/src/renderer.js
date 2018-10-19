module.exports = {

    root: function(h, node, properties, children, options) {
        return h(node.tagName, properties, children);
    },
    element: function(h, node, properties, children, options) {
        return h(node.tagName, properties, children);
    },
    text: function(h, node) {
        return node.value;
    },
    comment: function () {
        
    },
    component: function (h, node, properties) {
        return h(node.component, properties);
    },
    raw: function (h, node) {
        return node.value;
    },
    highlight: function (h, node, properties) {
        // return h(node.component, properties);
        // debugger
    }
};
