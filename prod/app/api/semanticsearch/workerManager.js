"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.WorkerManager = void 0;var _events = _interopRequireDefault(require("events"));
var _worker = _interopRequireDefault(require("./worker"));
var _statuses = require("./statuses");
var _model = _interopRequireDefault(require("./model"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const NUM_WORKERS = 3;

class WorkerManager extends _events.default {
  constructor() {
    super();
    this.workers = {};
  }

  get currentWorkersCount() {
    return Object.keys(this.workers).length;
  }

  get canAddWorker() {
    return this.currentWorkersCount < NUM_WORKERS;
  }

  async start() {
    let searchesToStart = await _model.default.get(
    { status: _statuses.IN_PROGRESS }, '', { limit: NUM_WORKERS });
    const remainingSlots = NUM_WORKERS - searchesToStart.length;
    if (remainingSlots > 0) {
      const pendingSearches = await _model.default.get(
      { status: _statuses.PENDING }, '', { limit: remainingSlots });
      searchesToStart = [...searchesToStart, ...pendingSearches];
    }
    searchesToStart.forEach(newSearch => this.notifyNewSearch(newSearch._id));
  }

  notifyNewSearch(searchId) {
    if (this.canAddWorker) {
      const worker = new _worker.default(searchId);
      worker.on('done', () => this.onWorkerDone(searchId));
      worker.on('update', update => this.onWorkerUpdate(searchId, update));
      worker.on('error', error => this.onWorkerError(searchId, error));
      this.workers[searchId] = worker;
      worker.start();
    }
  }

  async onWorkerDone(searchId) {
    this.emit('searchDone', searchId);
    this.deleteAndReplaceWorker(searchId);
  }

  async onWorkerError(searchId, error) {
    this.emit('searchError', searchId, error);
    this.deleteAndReplaceWorker(searchId);
  }

  onWorkerUpdate(searchId, update) {
    this.emit('searchUpdated', searchId, update);
  }

  deleteAndReplaceWorker(searchId) {
    delete this.workers[searchId];
    this.startNewSearchIfFree();
  }

  async startNewSearchIfFree() {
    if (this.canAddWorker) {
      const currentSearches = Object.keys(this.workers);
      let [newSearch] = await _model.default.get({ status: _statuses.IN_PROGRESS, _id: { $nin: currentSearches } }, '', { limit: 1 });
      if (!newSearch) {
        [newSearch] = await _model.default.get({ status: _statuses.PENDING }, '', { limit: 1 });
      }
      if (newSearch) {
        this.notifyNewSearch(newSearch._id);
      }
    }
  }}exports.WorkerManager = WorkerManager;


const workerManager = new WorkerManager();var _default =

workerManager;exports.default = _default;