/*! multiitempicker - v0.1.0 - 2013-04-25
* https://github.com/theJoeBiz/MultiItemPicker
* Copyright (c) 2013 Joe Duchnowski; Licensed MIT */
(function ($) {
    $.MultiItemPicker = function (elem, options) {
        var root = $(elem),
            elems = {};

        var publicMethods = {
            getRightBoxItems: function () {
                initializeElements();
                var items = elems.toBox.find('option');
                return convertOptionsToObjectArray(items);
            },
            getLeftBoxItems: function () {
                initializeElements();
                var items = elems.fromBox.find('option');
                return convertOptionsToObjectArray(items);
            }
        };

        /* INTERNAL FUNCTIONS */

        function initialize() {
            initializeElements();

            populateSelectBoxes();

            if (options.generateElements !== false) {
                tableizeElements();
            }

            bindEvents();

            if (options.styleElements !== false) {
                applyElementStyles();
            }

            tidyUpToStart();
        }

        function tidyUpToStart() {
            deselectAllOptionsInBox(elems.fromBox, elems.toBox);
            if (options.keepAlphabetical) {
                alphabetizeItemsInBox(elems.fromBox, elems.toBox);
                if (elems.fromBox.find('option:first').length) {
                    elems.fromBox.find('option:first').attr('selected', true);
                    toggleButtonEnabled('add');
                } else if (elems.toBox.find('option:first').length) {
                    elems.toBox.find('option:first').attr('selected', true);
                    toggleButtonEnabled('remove');
                } else {
                    toggleButtonEnabled('none');
                }
            }
        }

        function initializeElements() {
            // Set fromBox variable to the corresponding DOM element, create if it doesn't already exist
            elems.fromBox = root.find('.fromBox:first');
            if (!elems.fromBox.length && options.generateElements !== false) {
                elems.fromBox = $('<select/>');
            }
            elems.fromBox.addClass('fromBox').attr('multiple', true);

            // Set addButton variable to the corresponding DOM element, create if it doesn't already exist
            elems.addButton = root.find('.addButton:first');
            if (!elems.addButton.length && options.generateElements !== false) {
                elems.addButton = $('<button>Add &gt;</button>');
            }
            elems.addButton.addClass('addButton');

            // Set removeButton variable to the corresponding DOM element, create if it doesn't already exist
            elems.removeButton = root.find('.removeButton:first');
            if (!elems.removeButton.length && options.generateElements !== false) {
                elems.removeButton = $('<button>&lt; Remove</button>');
            }
            elems.removeButton.addClass('removeButton');

            // Set toBox variable to the corresponding DOM element, create if it doesn't already exist
            elems.toBox = root.find('.toBox:first');
            if (!elems.toBox.length && options.generateElements !== false) {
                elems.toBox = $('<select/>');
            }
            elems.toBox.addClass('toBox').attr('multiple', true);
        }

        function populateSelectBoxes() {
            var fillBox = function (box, items) {
                if (!items || !(items instanceof Array) || !items.length) { return; }

                for (var i = 0; i < items.length; i++) {
                    var item = items[i], text, val;
                    if (item instanceof Array && item.length) {
                        text = item[0];
                        val = item[1] || text;
                    } else if (typeof item === 'string') {
                        text = item;
                        val = item;
                    }
                    var opt = $('<option/>');
                    opt.text(text);
                    opt.val(val);
                    opt.appendTo(box);
                }
            };

            fillBox(elems.fromBox, options.fromBoxItems);
            fillBox(elems.toBox, options.toBoxItems);
        }

        function tableizeElements() {
            var table = root.is('table') ? root : $('<table/>').appendTo(root);
            table.addClass('multiItemPicker');

            var row = $('<tr/>').appendTo(table);
            elems.leftCell = $('<td/>')
                .append(elems.fromBox)
                .addClass('leftCell')
                .appendTo(row);

            elems.middleCell = $('<td/>')
                .append(elems.addButton)
                .append(elems.removeButton)
                .addClass('middleCell')
                .appendTo(row);

            elems.rightCell = $('<td/>')
                .append(elems.toBox)
                .addClass('rightCell')
                .appendTo(row);
        }

        function bindEvents() {
            // When an item is double clicked
            // directly trigger the method that moves selected items to the other box
            if (elems.fromBox.length) {
                elems.fromBox.dblclick(moveSelectedItemsRight);
            }
            if (elems.toBox.length) {
                elems.toBox.dblclick(moveSelectedItemsLeft);
            }

            // When add or remove button is clicked
            // directly trigger the method that moves selected items to the other box
            if (elems.addButton.length) {
                elems.addButton.click(moveSelectedItemsRight);
            }
            if (elems.removeButton.length) {
                elems.removeButton.click(moveSelectedItemsLeft);
            }

            // The change event is triggered on multiselect boxes whenever an item is selected
            // We want to disable the unnecessary button and deselect the items in the opposite box
            if (elems.fromBox.length) {
                elems.fromBox.change(function () {
                    deselectAllOptionsInBox(elems.toBox);
                    toggleButtonEnabled('add');
                });
            }
            if (elems.toBox.length) {
                elems.toBox.change(function () {
                    deselectAllOptionsInBox(elems.fromBox);
                    toggleButtonEnabled('remove');
                });
            }
        }

        function toggleButtonEnabled(enabled) {
            elems.addButton.attr('disabled', ('add' !== enabled));
            elems.removeButton.attr('disabled', ('remove' !== enabled));
        }

        function applyElementStyles() {
            if (options.styles !== false) {
                $.each(options.styles, function (elementType) {
                    $.each(options.styles[elementType], function (key, val) {
                        if (elems[elementType]) {
                            elems[elementType].css(key, val);
                        }
                    });
                });
            }
        }

        function moveSelectedItemsRight() {
            var items = elems.fromBox.find('option:selected').remove();
            addItemsToRightBox(items);
        }

        function addItemsToRightBox(items) {
            triggerCallback(options.beforeAdding);

            elems.toBox.append(items);
            toggleButtonEnabled('remove');
            deselectAllOptionsInBox(elems.fromBox);
            if (options.keepAlphabetical) {
                alphabetizeItemsInBox(elems.toBox);
            }

            triggerCallback(options.afterAdded);
        }

        function moveSelectedItemsLeft() {
            var items = elems.toBox.find('option:selected').remove();
            addItemsToLeftBox(items);
        }

        function addItemsToLeftBox(items) {
            triggerCallback(options.beforeRemoving);

            elems.fromBox.append(items);
            toggleButtonEnabled('add');
            deselectAllOptionsInBox(elems.toBox);
            if (options.keepAlphabetical) {
                alphabetizeItemsInBox(elems.fromBox);
            }

            triggerCallback(options.afterRemoved);
        }

        function deselectAllOptionsInBox() {
            for (var i = 0; i < arguments.length; i++) {
                arguments[i].find('option:selected').attr('selected', false);
            }
        }

        function alphabetizeItemsInBox() {
            var alphabetizeSort = function (a, b) {
                var keyA = $(a).text(), keyB = $(b).text();
                if (keyA < keyB) { return -1; }
                if (keyA > keyB) { return 1; }
                return 0;
            };

            var selectBoxAppend = function (index, option) {
                selectBox.append(option);
            };

            for (var i = 0; i < arguments.length; i++) {
                var selectBox = arguments[i];

                var items = selectBox.find('option').get();
                items.sort(alphabetizeSort);

                $.each(items, selectBoxAppend);
            }
        }

        function triggerCallback(arg) {
            return typeof (arg) === 'function' ? arg(elems.fromBox, elems.toBox) : true;
        }

        function convertOptionsToObjectArray(items) {
            var itemsArr = [];
            if (!items || !items.length) { return itemsArr; }

            $.each(items, function (index, item) {
                var text = $(item).text(),
                    val = $(item).val();
                itemsArr.push({
                    text: text,
                    value: val
                });
            });

            return itemsArr;
        }

        /* START PLUGIN */

        if (typeof (options) === 'string') {
            initializeElements();
            if (publicMethods[options]) {
                return publicMethods[options]();
            } else {
                throw new Error("A method named " + options + " does not exist in the MultiItemPicker plugin.");
            }
        } else if (typeof (options) === 'object') {
            initialize();
        } else {
            throw new Error("The MultiItemPicker plugin requires the first argument to be an object or string.");
        }
    };

    $.MultiItemPicker.defaults = {
        styles: {
            fromBox: {
                minWidth: 150,
                minHeight: 200
            },
            toBox: {
                minWidth: 150,
                minHeight: 200
            },
            addButton: {
                display: 'block',
                width: '100%'
            },
            removeButton: {
                display: 'block',
                width: '100%'
            },
            middleCell: {
                paddingLeft: 10,
                paddingRight: 10
            }
        }
    };

    $.fn.extend({
        MultiItemPicker: function (options, args) {
            if (!options || typeof (options) === 'object') {
                options = $.extend({}, $.MultiItemPicker.defaults, options);
            } else if (typeof (options) === 'string') {
                return new $.MultiItemPicker(this, options, args);
            }

            $.each(this, function () {
                new $.MultiItemPicker(this, options, args);
            });

            return this;
        }
    });
})(jQuery);