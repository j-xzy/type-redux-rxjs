const { Observable } = require('rxjs');
const ajax = jest.genMockFromModule('rxjs/ajax');

ajax.ajax.getJSON = () => new Observable((subscriber) => {
  subscriber.next([1, 2, 3]);
});

module.exports = ajax;