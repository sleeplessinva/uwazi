"use strict";var _entities = _interopRequireDefault(require("../../entities"));
var _jasmineHelpers = require("../../utils/jasmineHelpers");
var _routes = _interopRequireDefault(require("../routes.js"));
var _instrumentRoutes = _interopRequireDefault(require("../../utils/instrumentRoutes"));
var _search = _interopRequireDefault(require("../search"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


describe('search routes', () => {
  let routes;

  beforeEach(() => {
    routes = (0, _instrumentRoutes.default)(_routes.default);
  });

  describe('/api/search/count_by_template', () => {
    it('should have a validation schema', () => {
      expect(routes.get.validation('/api/search/count_by_template')).toMatchSnapshot();
    });

    it('should return count of search using a specific template', done => {
      spyOn(_entities.default, 'countByTemplate').and.returnValue(new Promise(resolve => resolve(2)));
      const req = { query: { templateId: 'templateId' } };

      routes.get('/api/search/count_by_template', req).
      then(response => {
        expect(response).toEqual(2);
        done();
      }).
      catch((0, _jasmineHelpers.catchErrors)(done));
    });
  });

  describe('/api/search', () => {
    beforeEach(() => {
      spyOn(_search.default, 'search').and.returnValue(new Promise(resolve => resolve('results')));
      spyOn(_search.default, 'searchGeolocations').and.returnValue(new Promise(resolve => resolve('geolocation results')));
    });

    const assessSearch = async (req, action, expectedResults, expectedArgs) => {
      const response = await routes.get('/api/search', req);
      expect(_search.default[action]).toHaveBeenCalledWith(...expectedArgs);
      expect(response).toEqual(expectedResults);
    };

    it('should have a validation schema', () => {
      expect(routes.get.validation('/api/search')).toMatchSnapshot();
    });

    it('should search search and return the results', async () => {
      const filtersValue = JSON.stringify({ property: 'property' });
      const types = JSON.stringify(['ruling', 'judgement']);
      const fields = JSON.stringify(['field1', 'field2']);
      const req = { query: { searchTerm: 'test', filters: filtersValue, types, fields }, language: 'es', user: 'user' };

      const expectedArgs = [
      { searchTerm: 'test', filters: { property: 'property' }, types: ['ruling', 'judgement'], fields: ['field1', 'field2'] },
      'es',
      'user'];

      await assessSearch(req, 'search', 'results', expectedArgs);
    });

    describe('when has no filters or types', () => {
      it('should search search and return the results', async () => {
        const req = { query: {}, language: 'es', user: 'user' };
        await assessSearch(req, 'search', 'results', [{}, 'es', 'user']);
      });
    });

    describe('geolocation search', () => {
      it('should point to searchGeolocations', async () => {
        const req = { query: { geolocation: true }, language: 'es', user: 'user' };
        await assessSearch(req, 'searchGeolocations', 'geolocation results', [{ geolocation: true }, 'es', 'user']);
      });
    });
  });

  describe('/api/search_snippets', () => {
    it('should have a validation schema', () => {
      expect(routes.get.validation('/api/search_snippets')).toMatchSnapshot();
    });

    it('should search', done => {
      spyOn(_search.default, 'searchSnippets').and.returnValue(new Promise(resolve => resolve('results')));
      const req = { query: { searchTerm: 'test', id: 'id' }, language: 'es' };

      routes.get('/api/search_snippets', req).
      then(response => {
        expect(response).toEqual('results');
        expect(_search.default.searchSnippets).toHaveBeenCalledWith('test', 'id', 'es');
        done();
      }).
      catch((0, _jasmineHelpers.catchErrors)(done));
    });
  });

  describe('/api/search/unpublished', () => {
    it('should search', done => {
      spyOn(_search.default, 'getUploadsByUser').and.returnValue(new Promise(resolve => resolve('results')));
      const req = { query: { searchTerm: 'test', id: 'id' }, language: 'es' };

      routes.get('/api/search/unpublished', req).
      then(response => {
        expect(response).toEqual({ rows: 'results' });
        done();
      }).
      catch((0, _jasmineHelpers.catchErrors)(done));
    });
  });
});