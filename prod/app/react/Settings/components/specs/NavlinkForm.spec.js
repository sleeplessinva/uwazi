"use strict";var _reactReduxForm = require("react-redux-form");
var _immutable = require("immutable");
var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _NavlinkForm = require("../NavlinkForm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('Drag and Drop functions', () => {
  describe('LinkSource', () => {
    it('should have a beginDrag function that returns the index and id of the linked object', () => {
      expect(_NavlinkForm.LinkSource.beginDrag({ localID: 'localID', index: 3 })).toEqual({ id: 'localID', index: 3 });
    });
  });

  describe('LinkTarget', () => {
    let props;
    let monitor;
    let component;

    beforeEach(() => {
      props = { sortLink: jasmine.createSpy('sortLink') };
      monitor = {
        getItem() {
          return { index: 3 };
        } };

    });

    describe('hover', () => {
      it('should not replace items with themselves', () => {
        props.index = 3;
        _NavlinkForm.LinkTarget.hover(props, monitor, component);
        expect(props.sortLink).not.toHaveBeenCalled();
      });

      // Missing a lot of positional-aware tests
    });
  });
});

describe('NavlinkForm', () => {
  let component;
  let props;
  const dragAndDropConnects = {};

  beforeEach(() => {
    dragAndDropConnects.connectDragSource = dropTargetHtml => dropTargetHtml.html;
    dragAndDropConnects.connectDragPreview = dropTargetHtml => dropTargetHtml.html;

    dragAndDropConnects.connectDropTarget = html => ({ html });

    spyOn(dragAndDropConnects, 'connectDragSource').and.callThrough();
    spyOn(dragAndDropConnects, 'connectDropTarget').and.callThrough();

    props = {
      link: { localID: 'newLink1' },
      id: 'newLink1',
      index: 1,
      uiState: (0, _immutable.fromJS)({ editingLink: 0 }),
      formState: { $form: { errors: {} } },
      editLink: jasmine.createSpy('editLink'),
      removeLink: jasmine.createSpy('removeLink'),
      sortLink: jasmine.createSpy('sortLink'),
      isDragging: false,
      connectDragSource: dragAndDropConnects.connectDragSource,
      connectDropTarget: dragAndDropConnects.connectDropTarget,
      connectDragPreview: dragAndDropConnects.connectDragPreview };


    component = (0, _enzyme.shallow)(_react.default.createElement(_NavlinkForm.NavlinkForm, props));
  });

  it('should render a list-group-item wrapped inside dragSource and dropTarget functionality', () => {
    expect(dragAndDropConnects.connectDragSource.calls.argsFor(0)[0].type).toBe('span');
    expect(dragAndDropConnects.connectDropTarget.calls.argsFor(0)[0].type).toBe('li');
    expect(component.find('li').props().className).toBe('list-group-item');
  });

  it('should add the dragging class if isDragging', () => {
    props.isDragging = true;
    component = (0, _enzyme.shallow)(_react.default.createElement(_NavlinkForm.NavlinkForm, props));
    expect(component.find('li').props().className).toBe('list-group-item dragging');
  });

  it('should have an edit button to activate editing link mode', () => {
    component.find('button').first().props().onClick();
    expect(props.editLink).toHaveBeenCalledWith('newLink1');
  });

  it('should have a remove button to remove a link', () => {
    component.find('button').last().props().onClick();
    expect(props.removeLink).toHaveBeenCalledWith(1);
  });

  it('should have a title and URL fields', () => {
    expect(component.find(_reactReduxForm.Field).first().props().model).toBe('settings.navlinksData.links[1].title');
    expect(component.find(_reactReduxForm.Field).first().parent().props().className).toBe('input-group');
    expect(component.find(_reactReduxForm.Field).last().props().model).toBe('settings.navlinksData.links[1].url');
  });

  describe('validation error states', () => {
    it('should add error to root li and has-error to title input', () => {
      props.formState.$form.errors['links.1.title.required'] = true;
      component = (0, _enzyme.shallow)(_react.default.createElement(_NavlinkForm.NavlinkForm, props));

      expect(component.find('li').props().className).toBe('list-group-item error');
      expect(component.find(_reactReduxForm.Field).first().parent().props().className).toBe('input-group has-error');
    });
  });

  describe('mapStateToProps', () => {
    const settings = {
      navlinksFormState: 'formState',
      uiState: 'uiState' };


    it('should return the right props', () => {
      expect((0, _NavlinkForm.mapStateToProps)({ settings })).toEqual({ formState: 'formState', uiState: 'uiState' });
    });
  });
});