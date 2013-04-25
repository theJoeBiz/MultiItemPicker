(function ($) {
    /*
      ======== A Handy Little QUnit Reference ========
      http://api.qunitjs.com/
  
      Test methods:
        module(name, {[setup][ ,teardown]})
        test(name, callback)
        expect(numberOfAssertions)
        stop(increment)
        start(decrement)
      Test assertions:
        ok(value, [message])
        equal(actual, expected, [message])
        notEqual(actual, expected, [message])
        deepEqual(actual, expected, [message])
        notDeepEqual(actual, expected, [message])
        strictEqual(actual, expected, [message])
        notStrictEqual(actual, expected, [message])
        throws(block, [expected], [message])
    */

    module('MultiItemPicker jQuery Plugin', {
        // This will run before each test in this module.
        setup: function () {
            this.customDiv = $('#custom-picker-div');
            this.customTable = $('#custom-picker-table');
            this.emptyDiv = $('#empty-picker-div');
            this.emptyTable = $('#empty-picker-table');
            this.honorGenerateElementsFlag = $('#honor-generate-elements-flag');
        }
    });

    test('is chainable', function () {
        expect(1);
        // Not a bad test to run on collection methods.
        strictEqual(this.customDiv.MultiItemPicker(), this.customDiv, 'should be chainable');
    });

    test('accepts an object, a string, or no parameter', function () {
        expect(4);

        ok(this.customDiv.MultiItemPicker(), 'should run parameterless');
        ok(this.customDiv.MultiItemPicker({}), 'should accept an object as a parameter');
        ok(this.customDiv.MultiItemPicker('getRightBoxItems'), 'should accept a string as a parameter');
        throws(function () { this.customDiv.MultiItemPicker(function () { }); }, function (err) { return err.message === 'The MultiItemPicker plugin requires the first argument to be an object or string.'; }, 'should throw exception when parameter is a function');
    });

    test('creates "fromBox" when it doesn\'t exist', function () {
        this.emptyDiv.empty();
        this.emptyDiv.MultiItemPicker();

        strictEqual(this.emptyDiv.find('.fromBox').length, 1, 'should exist');
        ok(this.emptyDiv.find('.fromBox').is('select[multiple]'), 'should be a multiple select box');
    });

    test('creates "toBox" when it doesn\'t exist', function () {
        this.emptyDiv.empty();
        this.emptyDiv.MultiItemPicker();

        strictEqual(this.emptyDiv.find('.toBox').length, 1, 'should exist');
        ok(this.emptyDiv.find('.toBox').is('select[multiple]'), 'should be a multiple select box');
    });

    test('creates "addButton" when it doesn\'t exist', function () {
        this.emptyDiv.empty();
        this.emptyDiv.MultiItemPicker();

        strictEqual(this.emptyDiv.find('.addButton').length, 1, 'should exist');
        ok(this.emptyDiv.find('.addButton').is('button'), 'should be a button');
    });

    test('creates "removeButton" when it doesn\'t exist', function () {
        this.emptyDiv.empty();
        this.emptyDiv.MultiItemPicker();

        strictEqual(this.emptyDiv.find('.removeButton').length, 1, 'should exist');
        ok(this.emptyDiv.find('.removeButton').is('button'), 'should be a button');
    });

    test('uses "fromBox" if it already exists', function () {
        this.customDiv.MultiItemPicker();

        strictEqual(this.customDiv.find('.fromBox').length, 1, 'should exist');
        ok(this.customDiv.find('.fromBox').is('select[multiple]'), 'should be a multiple select box');
    });

    test('uses "toBox" if it already exists', function () {
        this.customDiv.MultiItemPicker();

        strictEqual(this.customDiv.find('.toBox').length, 1, 'should exist');
        ok(this.customDiv.find('.toBox').is('select[multiple]'), 'should be a multiple select box');
    });

    test('uses "addButton" if it already exists', function () {
        this.customDiv.MultiItemPicker();

        strictEqual(this.customDiv.find('.addButton').length, 1, 'should exist');
        ok(this.customDiv.find('.addButton').is('button'), 'should be a button');
    });

    test('uses "removeButton" if it already exists', function () {
        this.customDiv.MultiItemPicker();

        strictEqual(this.customDiv.find('.removeButton').length, 1, 'should exist');
        ok(this.customDiv.find('.removeButton').is('button'), 'should be a button');
    });

    test('honors false generateElements flag', function () {
        this.honorGenerateElementsFlag.MultiItemPicker({ generateElements: false });

        strictEqual(this.honorGenerateElementsFlag.find('.fromBox').length, 0, 'fromBox should not exist');
        strictEqual(this.honorGenerateElementsFlag.find('.toBox').length, 0, 'toBox should not exist');
        strictEqual(this.honorGenerateElementsFlag.find('.addButton').length, 0, 'addButton should not exist');
        strictEqual(this.honorGenerateElementsFlag.find('.removeButton').length, 0, 'removeButton should not exist');
    });

    test('correctly returns values when public functions are called via string', function () {
        var leftBoxItems = [
            ["Test One", "TestOne"],
            ["Test Two", "TestTwo"]
        ];
        var rightBoxItems = [
            ["Test Three", "TestThree"],
            ["Test Four", "TestFour"]
        ];

        this.customTable.MultiItemPicker({
            toBoxItems: rightBoxItems,
            fromBoxItems: leftBoxItems
        });

        var expectedLeftBoxItems = [];
        $.each(leftBoxItems, function (index, item) {
            expectedLeftBoxItems.push({text: item[0], value: item[1]});
        });

        var expectedRightBoxItems = [];
        $.each(rightBoxItems, function (index, item) {
            expectedRightBoxItems.push({ text: item[0], value: item[1] });
        });

        deepEqual(this.customTable.MultiItemPicker('getLeftBoxItems'), expectedLeftBoxItems, 'should return same items that were passed into left box as an array of objects');
        deepEqual(this.customTable.MultiItemPicker('getRightBoxItems'), expectedRightBoxItems, 'should return same items that were passed into right box as an array of objects');
    });

}(jQuery));
