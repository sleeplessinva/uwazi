"use strict";var _immutable = require("immutable");

var actions = _interopRequireWildcard(require("../reducer"));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}

describe('BasicReducer', () => {
  describe('createReducer', () => {
    it('should return a reducer function with default value passed', () => {
      const reducer = (0, actions.default)('namespace', {});
      const newState = reducer();
      expect(newState.toJS()).toEqual({});
    });
  });

  describe('Update', () => {
    it('should set value passed on the same namespace', () => {
      const reducer1 = (0, actions.default)('1', []);
      const reducer2 = (0, actions.default)('2', []);

      const state1 = reducer1({}, actions.set('1', [{ _id: 1, title: 'test' }, { _id: 2, title: 'test2' }]));
      const state2 = reducer2({}, actions.set('2', [{ _id: 2, title: 'test2' }]));

      const newState1 = reducer1(state1, actions.update('1', { _id: 2, title: 'updated' }));
      const newState2 = reducer1(state2, actions.update('2', { _id: 2, title: 'updated' }));

      expect(newState1.toJS()).toEqual([{ _id: 1, title: 'test' }, { _id: 2, title: 'updated' }]);
      expect(newState2.toJS()).toEqual([{ _id: 2, title: 'test2' }]);
    });

    describe('when value does not exist', () => {
      it('should push it to the collection', () => {
        const reducer1 = (0, actions.default)('1', []);
        const reducer2 = (0, actions.default)('2', []);

        const state1 = reducer1({}, actions.set('1', [{ _id: 1, title: 'test' }, { _id: 2, title: 'test2' }]));
        const state2 = reducer2({}, actions.set('2', [{ _id: 2, title: 'test2' }]));

        const newState1 = reducer1(state1, actions.update('1', { _id: 3, title: 'created' }));
        const newState2 = reducer1(state2, actions.update('2', { _id: 3, title: 'not created' }));

        expect(newState1.toJS()).toEqual([{ _id: 1, title: 'test' }, { _id: 2, title: 'test2' }, { _id: 3, title: 'created' }]);
        expect(newState2.toJS()).toEqual([{ _id: 2, title: 'test2' }]);
      });
    });
  });

  describe('Update In', () => {
    let reducer;
    let state;
    beforeEach(() => {
      reducer = (0, actions.default)('1', { nested: { key: [] } });
      state = (0, _immutable.fromJS)({ nested: { key: [{ _id: 1, title: 'test' }, { _id: 2, title: 'test2' }] } });
    });
    it('should update passed value in a list in a nested key at the namespace', () => {
      const newState = reducer(state, actions.updateIn('1', ['nested', 'key'], { _id: 1, title: 'changed test' }));
      expect(newState.toJS()).toEqual({ nested: { key: [{ _id: 1, title: 'changed test' }, { _id: 2, title: 'test2' }] } });
    });
    describe('when value does not exist', () => {
      it('should push it to the collection at the specified key path', () => {
        const newState = reducer(state, actions.updateIn('1', ['nested', 'key'], { _id: 3, title: 'new' }));
        expect(newState.toJS()).toEqual(
        { nested: { key: [{ _id: 1, title: 'test' }, { _id: 2, title: 'test2' }, { _id: 3, title: 'new' }] } });
      });
    });
  });

  describe('Set', () => {
    it('should set value passed on the same namespace', () => {
      const reducer1 = (0, actions.default)('1');
      const reducer2 = (0, actions.default)('2');

      const newState1 = reducer1({}, actions.set('1', { newValue: 'value' }));
      const newState2 = reducer2({}, actions.set('1', { newValue: 'value' }));

      expect(newState1.toJS()).toEqual({ newValue: 'value' });
      expect(newState2.toJS()).toEqual({});
    });
  });

  describe('Unset', () => {
    it('should set value passed on the same namespace', () => {
      const reducer1 = (0, actions.default)('1', {});
      const reducer2 = (0, actions.default)('2', {});

      const newState1 = reducer1({ defaultValue: 'default' }, actions.unset('1'));
      const newState2 = reducer2({ defaultValue: 'default' }, actions.unset('1'));

      expect(newState1.toJS()).toEqual({});
      expect(newState2.toJS()).toEqual({ defaultValue: 'default' });
    });
  });

  describe('Push', () => {
    it('should add an element to an array', () => {
      const reducer1 = (0, actions.default)('namespace1', []);
      const reducer2 = (0, actions.default)('namespace2', []);

      const newState1 = reducer1((0, _immutable.fromJS)([{ _id: '1' }]), actions.push('namespace1', { _id: '2' }));
      const newState2 = reducer2((0, _immutable.fromJS)([{ _id: '1' }]), actions.push('namespace1', { _id: '2' }));

      expect(newState1.toJS()).toEqual([{ _id: '1' }, { _id: '2' }]);
      expect(newState1.get(1).toJS()).toEqual({ _id: '2' });
      expect(newState2.toJS()).toEqual([{ _id: '1' }]);
    });
  });

  describe('Concat', () => {
    it('should concat an array to the list', () => {
      const reducer1 = (0, actions.default)('1', []);
      const reducer2 = (0, actions.default)('2', []);

      const newState1 = reducer1((0, _immutable.fromJS)([1, 2, 3]), actions.concat('1', [4, 5]));
      const newState2 = reducer2((0, _immutable.fromJS)([1, 2, 3]), actions.concat('1', [4, 5]));

      expect(newState1.toJS()).toEqual([1, 2, 3, 4, 5]);
      expect(newState2.toJS()).toEqual([1, 2, 3]);
    });
  });

  describe('Concat In', () => {
    it('should concat an array to the list at the specified key in the map', () => {
      const reducer1 = (0, actions.default)('1', {});
      const reducer2 = (0, actions.default)('2', {});

      const initial = { nested: { key: [1, 2] } };
      const newState1 = reducer1((0, _immutable.fromJS)(initial), actions.concatIn('1', ['nested', 'key'], [3, 4]));
      const newState2 = reducer2((0, _immutable.fromJS)(initial), actions.concatIn('1', ['nested', 'key'], [3, 4]));

      expect(newState1.toJS().nested.key).toEqual([1, 2, 3, 4]);
      expect(newState2.toJS().nested.key).toEqual([1, 2]);
    });
  });

  describe('Delete', () => {
    it('should delete an element from the array based on the id', () => {
      const reducer1 = (0, actions.default)('namespace1', []);
      const reducer2 = (0, actions.default)('namespace2', []);

      const newState1 = reducer1([{ _id: '1' }, { _id: '2' }, { _id: '3' }], actions.remove('namespace1', { _id: '2' }));
      const newState2 = reducer2([{ _id: '2' }], actions.remove('namespace1', { _id: '2' }));

      expect(newState1.toJS()).toEqual([{ _id: '1' }, { _id: '3' }]);
      expect(newState2.toJS()).toEqual([{ _id: '2' }]);
    });
  });
});