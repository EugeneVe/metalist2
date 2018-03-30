var path = require( 'path' );
const  webpack = require('webpack');
const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const ROOT_PATH = path.resolve(__dirname, '../');
const NODE_ENV = process.env.NODE_ENV;

const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'client', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const baseHref = "";
const deployUrl = "";



module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true,
    "alias": {
      "rxjs/AsyncSubject": ROOT_PATH +"/node_modules/rxjs/_esm5/AsyncSubject.js",
      "rxjs/BehaviorSubject": ROOT_PATH +"/node_modules/rxjs/_esm5/BehaviorSubject.js",
      "rxjs/InnerSubscriber": ROOT_PATH +"/node_modules/rxjs/_esm5/InnerSubscriber.js",
      "rxjs/Notification": ROOT_PATH +"/node_modules/rxjs/_esm5/Notification.js",
      "rxjs/Observable": ROOT_PATH +"/node_modules/rxjs/_esm5/Observable.js",
      "rxjs/Observer": ROOT_PATH +"/node_modules/rxjs/_esm5/Observer.js",
      "rxjs/Operator": ROOT_PATH +"/node_modules/rxjs/_esm5/Operator.js",
      "rxjs/OuterSubscriber": ROOT_PATH +"/node_modules/rxjs/_esm5/OuterSubscriber.js",
      "rxjs/ReplaySubject": ROOT_PATH +"/node_modules/rxjs/_esm5/ReplaySubject.js",
      "rxjs/Rx": ROOT_PATH +"/node_modules/rxjs/_esm5/Rx.js",
      "rxjs/Scheduler": ROOT_PATH +"/node_modules/rxjs/_esm5/Scheduler.js",
      "rxjs/Subject": ROOT_PATH +"/node_modules/rxjs/_esm5/Subject.js",
      "rxjs/SubjectSubscription": ROOT_PATH +"/node_modules/rxjs/_esm5/SubjectSubscription.js",
      "rxjs/Subscriber": ROOT_PATH +"/node_modules/rxjs/_esm5/Subscriber.js",
      "rxjs/Subscription": ROOT_PATH +"/node_modules/rxjs/_esm5/Subscription.js",
      "rxjs/add/observable/bindCallback": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/bindCallback.js",
      "rxjs/add/observable/bindNodeCallback": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/bindNodeCallback.js",
      "rxjs/add/observable/combineLatest": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/combineLatest.js",
      "rxjs/add/observable/concat": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/concat.js",
      "rxjs/add/observable/defer": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/defer.js",
      "rxjs/add/observable/dom/ajax": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/dom/ajax.js",
      "rxjs/add/observable/dom/webSocket": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/dom/webSocket.js",
      "rxjs/add/observable/empty": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/empty.js",
      "rxjs/add/observable/forkJoin": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/forkJoin.js",
      "rxjs/add/observable/from": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/from.js",
      "rxjs/add/observable/fromEvent": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/fromEvent.js",
      "rxjs/add/observable/fromEventPattern": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/fromEventPattern.js",
      "rxjs/add/observable/fromPromise": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/fromPromise.js",
      "rxjs/add/observable/generate": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/generate.js",
      "rxjs/add/observable/if": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/if.js",
      "rxjs/add/observable/interval": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/interval.js",
      "rxjs/add/observable/merge": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/merge.js",
      "rxjs/add/observable/never": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/never.js",
      "rxjs/add/observable/of": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/of.js",
      "rxjs/add/observable/onErrorResumeNext": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/onErrorResumeNext.js",
      "rxjs/add/observable/pairs": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/pairs.js",
      "rxjs/add/observable/race": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/race.js",
      "rxjs/add/observable/range": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/range.js",
      "rxjs/add/observable/throw": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/throw.js",
      "rxjs/add/observable/timer": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/timer.js",
      "rxjs/add/observable/using": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/using.js",
      "rxjs/add/observable/zip": ROOT_PATH +"/node_modules/rxjs/_esm5/add/observable/zip.js",
      "rxjs/add/operator/audit": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/audit.js",
      "rxjs/add/operator/auditTime": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/auditTime.js",
      "rxjs/add/operator/buffer": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/buffer.js",
      "rxjs/add/operator/bufferCount": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/bufferCount.js",
      "rxjs/add/operator/bufferTime": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/bufferTime.js",
      "rxjs/add/operator/bufferToggle": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/bufferToggle.js",
      "rxjs/add/operator/bufferWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/bufferWhen.js",
      "rxjs/add/operator/catch": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/catch.js",
      "rxjs/add/operator/combineAll": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/combineAll.js",
      "rxjs/add/operator/combineLatest": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/combineLatest.js",
      "rxjs/add/operator/concat": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/concat.js",
      "rxjs/add/operator/concatAll": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/concatAll.js",
      "rxjs/add/operator/concatMap": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/concatMap.js",
      "rxjs/add/operator/concatMapTo": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/concatMapTo.js",
      "rxjs/add/operator/count": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/count.js",
      "rxjs/add/operator/debounce": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/debounce.js",
      "rxjs/add/operator/debounceTime": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/debounceTime.js",
      "rxjs/add/operator/defaultIfEmpty": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/defaultIfEmpty.js",
      "rxjs/add/operator/delay": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/delay.js",
      "rxjs/add/operator/delayWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/delayWhen.js",
      "rxjs/add/operator/dematerialize": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/dematerialize.js",
      "rxjs/add/operator/distinct": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/distinct.js",
      "rxjs/add/operator/distinctUntilChanged": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js",
      "rxjs/add/operator/distinctUntilKeyChanged": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/distinctUntilKeyChanged.js",
      "rxjs/add/operator/do": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/do.js",
      "rxjs/add/operator/elementAt": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/elementAt.js",
      "rxjs/add/operator/every": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/every.js",
      "rxjs/add/operator/exhaust": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/exhaust.js",
      "rxjs/add/operator/exhaustMap": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/exhaustMap.js",
      "rxjs/add/operator/expand": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/expand.js",
      "rxjs/add/operator/filter": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/filter.js",
      "rxjs/add/operator/finally": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/finally.js",
      "rxjs/add/operator/find": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/find.js",
      "rxjs/add/operator/findIndex": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/findIndex.js",
      "rxjs/add/operator/first": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/first.js",
      "rxjs/add/operator/groupBy": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/groupBy.js",
      "rxjs/add/operator/ignoreElements": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/ignoreElements.js",
      "rxjs/add/operator/isEmpty": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/isEmpty.js",
      "rxjs/add/operator/last": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/last.js",
      "rxjs/add/operator/let": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/let.js",
      "rxjs/add/operator/map": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/map.js",
      "rxjs/add/operator/mapTo": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/mapTo.js",
      "rxjs/add/operator/materialize": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/materialize.js",
      "rxjs/add/operator/max": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/max.js",
      "rxjs/add/operator/merge": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/merge.js",
      "rxjs/add/operator/mergeAll": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/mergeAll.js",
      "rxjs/add/operator/mergeMap": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/mergeMap.js",
      "rxjs/add/operator/mergeMapTo": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/mergeMapTo.js",
      "rxjs/add/operator/mergeScan": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/mergeScan.js",
      "rxjs/add/operator/min": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/min.js",
      "rxjs/add/operator/multicast": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/multicast.js",
      "rxjs/add/operator/observeOn": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/observeOn.js",
      "rxjs/add/operator/onErrorResumeNext": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/onErrorResumeNext.js",
      "rxjs/add/operator/pairwise": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/pairwise.js",
      "rxjs/add/operator/partition": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/partition.js",
      "rxjs/add/operator/pluck": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/pluck.js",
      "rxjs/add/operator/publish": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/publish.js",
      "rxjs/add/operator/publishBehavior": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/publishBehavior.js",
      "rxjs/add/operator/publishLast": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/publishLast.js",
      "rxjs/add/operator/publishReplay": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/publishReplay.js",
      "rxjs/add/operator/race": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/race.js",
      "rxjs/add/operator/reduce": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/reduce.js",
      "rxjs/add/operator/repeat": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/repeat.js",
      "rxjs/add/operator/repeatWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/repeatWhen.js",
      "rxjs/add/operator/retry": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/retry.js",
      "rxjs/add/operator/retryWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/retryWhen.js",
      "rxjs/add/operator/sample": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/sample.js",
      "rxjs/add/operator/sampleTime": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/sampleTime.js",
      "rxjs/add/operator/scan": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/scan.js",
      "rxjs/add/operator/sequenceEqual": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/sequenceEqual.js",
      "rxjs/add/operator/share": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/share.js",
      "rxjs/add/operator/shareReplay": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/shareReplay.js",
      "rxjs/add/operator/single": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/single.js",
      "rxjs/add/operator/skip": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/skip.js",
      "rxjs/add/operator/skipLast": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/skipLast.js",
      "rxjs/add/operator/skipUntil": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/skipUntil.js",
      "rxjs/add/operator/skipWhile": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/skipWhile.js",
      "rxjs/add/operator/startWith": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/startWith.js",
      "rxjs/add/operator/subscribeOn": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/subscribeOn.js",
      "rxjs/add/operator/switch": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/switch.js",
      "rxjs/add/operator/switchMap": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/switchMap.js",
      "rxjs/add/operator/switchMapTo": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/switchMapTo.js",
      "rxjs/add/operator/take": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/take.js",
      "rxjs/add/operator/takeLast": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/takeLast.js",
      "rxjs/add/operator/takeUntil": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/takeUntil.js",
      "rxjs/add/operator/takeWhile": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/takeWhile.js",
      "rxjs/add/operator/throttle": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/throttle.js",
      "rxjs/add/operator/throttleTime": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/throttleTime.js",
      "rxjs/add/operator/timeInterval": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/timeInterval.js",
      "rxjs/add/operator/timeout": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/timeout.js",
      "rxjs/add/operator/timeoutWith": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/timeoutWith.js",
      "rxjs/add/operator/timestamp": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/timestamp.js",
      "rxjs/add/operator/toArray": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/toArray.js",
      "rxjs/add/operator/toPromise": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/toPromise.js",
      "rxjs/add/operator/window": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/window.js",
      "rxjs/add/operator/windowCount": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/windowCount.js",
      "rxjs/add/operator/windowTime": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/windowTime.js",
      "rxjs/add/operator/windowToggle": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/windowToggle.js",
      "rxjs/add/operator/windowWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/windowWhen.js",
      "rxjs/add/operator/withLatestFrom": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/withLatestFrom.js",
      "rxjs/add/operator/zip": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/zip.js",
      "rxjs/add/operator/zipAll": ROOT_PATH +"/node_modules/rxjs/_esm5/add/operator/zipAll.js",
      "rxjs/interfaces": ROOT_PATH +"/node_modules/rxjs/_esm5/interfaces.js",
      "rxjs/observable/ArrayLikeObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/ArrayLikeObservable.js",
      "rxjs/observable/ArrayObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/ArrayObservable.js",
      "rxjs/observable/BoundCallbackObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/BoundCallbackObservable.js",
      "rxjs/observable/BoundNodeCallbackObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/BoundNodeCallbackObservable.js",
      "rxjs/observable/ConnectableObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/ConnectableObservable.js",
      "rxjs/observable/DeferObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/DeferObservable.js",
      "rxjs/observable/EmptyObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/EmptyObservable.js",
      "rxjs/observable/ErrorObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/ErrorObservable.js",
      "rxjs/observable/ForkJoinObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/ForkJoinObservable.js",
      "rxjs/observable/FromEventObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/FromEventObservable.js",
      "rxjs/observable/FromEventPatternObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/FromEventPatternObservable.js",
      "rxjs/observable/FromObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/FromObservable.js",
      "rxjs/observable/GenerateObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/GenerateObservable.js",
      "rxjs/observable/IfObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/IfObservable.js",
      "rxjs/observable/IntervalObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/IntervalObservable.js",
      "rxjs/observable/IteratorObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/IteratorObservable.js",
      "rxjs/observable/NeverObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/NeverObservable.js",
      "rxjs/observable/PairsObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/PairsObservable.js",
      "rxjs/observable/PromiseObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/PromiseObservable.js",
      "rxjs/observable/RangeObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/RangeObservable.js",
      "rxjs/observable/ScalarObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/ScalarObservable.js",
      "rxjs/observable/SubscribeOnObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/SubscribeOnObservable.js",
      "rxjs/observable/TimerObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/TimerObservable.js",
      "rxjs/observable/UsingObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/UsingObservable.js",
      "rxjs/observable/bindCallback": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/bindCallback.js",
      "rxjs/observable/bindNodeCallback": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/bindNodeCallback.js",
      "rxjs/observable/combineLatest": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/combineLatest.js",
      "rxjs/observable/concat": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/concat.js",
      "rxjs/observable/defer": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/defer.js",
      "rxjs/observable/dom/AjaxObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/dom/AjaxObservable.js",
      "rxjs/observable/dom/WebSocketSubject": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/dom/WebSocketSubject.js",
      "rxjs/observable/dom/ajax": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/dom/ajax.js",
      "rxjs/observable/dom/webSocket": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/dom/webSocket.js",
      "rxjs/observable/empty": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/empty.js",
      "rxjs/observable/forkJoin": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/forkJoin.js",
      "rxjs/observable/from": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/from.js",
      "rxjs/observable/fromEvent": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/fromEvent.js",
      "rxjs/observable/fromEventPattern": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/fromEventPattern.js",
      "rxjs/observable/fromPromise": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/fromPromise.js",
      "rxjs/observable/generate": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/generate.js",
      "rxjs/observable/if": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/if.js",
      "rxjs/observable/interval": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/interval.js",
      "rxjs/observable/merge": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/merge.js",
      "rxjs/observable/never": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/never.js",
      "rxjs/observable/of": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/of.js",
      "rxjs/observable/onErrorResumeNext": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/onErrorResumeNext.js",
      "rxjs/observable/pairs": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/pairs.js",
      "rxjs/observable/race": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/race.js",
      "rxjs/observable/range": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/range.js",
      "rxjs/observable/throw": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/throw.js",
      "rxjs/observable/timer": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/timer.js",
      "rxjs/observable/using": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/using.js",
      "rxjs/observable/zip": ROOT_PATH +"/node_modules/rxjs/_esm5/observable/zip.js",
      "rxjs/operator/audit": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/audit.js",
      "rxjs/operator/auditTime": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/auditTime.js",
      "rxjs/operator/buffer": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/buffer.js",
      "rxjs/operator/bufferCount": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/bufferCount.js",
      "rxjs/operator/bufferTime": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/bufferTime.js",
      "rxjs/operator/bufferToggle": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/bufferToggle.js",
      "rxjs/operator/bufferWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/bufferWhen.js",
      "rxjs/operator/catch": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/catch.js",
      "rxjs/operator/combineAll": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/combineAll.js",
      "rxjs/operator/combineLatest": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/combineLatest.js",
      "rxjs/operator/concat": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/concat.js",
      "rxjs/operator/concatAll": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/concatAll.js",
      "rxjs/operator/concatMap": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/concatMap.js",
      "rxjs/operator/concatMapTo": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/concatMapTo.js",
      "rxjs/operator/count": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/count.js",
      "rxjs/operator/debounce": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/debounce.js",
      "rxjs/operator/debounceTime": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/debounceTime.js",
      "rxjs/operator/defaultIfEmpty": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/defaultIfEmpty.js",
      "rxjs/operator/delay": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/delay.js",
      "rxjs/operator/delayWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/delayWhen.js",
      "rxjs/operator/dematerialize": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/dematerialize.js",
      "rxjs/operator/distinct": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/distinct.js",
      "rxjs/operator/distinctUntilChanged": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/distinctUntilChanged.js",
      "rxjs/operator/distinctUntilKeyChanged": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/distinctUntilKeyChanged.js",
      "rxjs/operator/do": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/do.js",
      "rxjs/operator/elementAt": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/elementAt.js",
      "rxjs/operator/every": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/every.js",
      "rxjs/operator/exhaust": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/exhaust.js",
      "rxjs/operator/exhaustMap": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/exhaustMap.js",
      "rxjs/operator/expand": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/expand.js",
      "rxjs/operator/filter": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/filter.js",
      "rxjs/operator/finally": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/finally.js",
      "rxjs/operator/find": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/find.js",
      "rxjs/operator/findIndex": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/findIndex.js",
      "rxjs/operator/first": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/first.js",
      "rxjs/operator/groupBy": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/groupBy.js",
      "rxjs/operator/ignoreElements": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/ignoreElements.js",
      "rxjs/operator/isEmpty": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/isEmpty.js",
      "rxjs/operator/last": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/last.js",
      "rxjs/operator/let": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/let.js",
      "rxjs/operator/map": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/map.js",
      "rxjs/operator/mapTo": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/mapTo.js",
      "rxjs/operator/materialize": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/materialize.js",
      "rxjs/operator/max": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/max.js",
      "rxjs/operator/merge": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/merge.js",
      "rxjs/operator/mergeAll": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/mergeAll.js",
      "rxjs/operator/mergeMap": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/mergeMap.js",
      "rxjs/operator/mergeMapTo": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/mergeMapTo.js",
      "rxjs/operator/mergeScan": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/mergeScan.js",
      "rxjs/operator/min": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/min.js",
      "rxjs/operator/multicast": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/multicast.js",
      "rxjs/operator/observeOn": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/observeOn.js",
      "rxjs/operator/onErrorResumeNext": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/onErrorResumeNext.js",
      "rxjs/operator/pairwise": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/pairwise.js",
      "rxjs/operator/partition": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/partition.js",
      "rxjs/operator/pluck": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/pluck.js",
      "rxjs/operator/publish": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/publish.js",
      "rxjs/operator/publishBehavior": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/publishBehavior.js",
      "rxjs/operator/publishLast": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/publishLast.js",
      "rxjs/operator/publishReplay": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/publishReplay.js",
      "rxjs/operator/race": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/race.js",
      "rxjs/operator/reduce": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/reduce.js",
      "rxjs/operator/repeat": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/repeat.js",
      "rxjs/operator/repeatWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/repeatWhen.js",
      "rxjs/operator/retry": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/retry.js",
      "rxjs/operator/retryWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/retryWhen.js",
      "rxjs/operator/sample": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/sample.js",
      "rxjs/operator/sampleTime": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/sampleTime.js",
      "rxjs/operator/scan": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/scan.js",
      "rxjs/operator/sequenceEqual": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/sequenceEqual.js",
      "rxjs/operator/share": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/share.js",
      "rxjs/operator/shareReplay": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/shareReplay.js",
      "rxjs/operator/single": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/single.js",
      "rxjs/operator/skip": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/skip.js",
      "rxjs/operator/skipLast": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/skipLast.js",
      "rxjs/operator/skipUntil": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/skipUntil.js",
      "rxjs/operator/skipWhile": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/skipWhile.js",
      "rxjs/operator/startWith": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/startWith.js",
      "rxjs/operator/subscribeOn": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/subscribeOn.js",
      "rxjs/operator/switch": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/switch.js",
      "rxjs/operator/switchMap": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/switchMap.js",
      "rxjs/operator/switchMapTo": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/switchMapTo.js",
      "rxjs/operator/take": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/take.js",
      "rxjs/operator/takeLast": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/takeLast.js",
      "rxjs/operator/takeUntil": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/takeUntil.js",
      "rxjs/operator/takeWhile": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/takeWhile.js",
      "rxjs/operator/throttle": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/throttle.js",
      "rxjs/operator/throttleTime": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/throttleTime.js",
      "rxjs/operator/timeInterval": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/timeInterval.js",
      "rxjs/operator/timeout": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/timeout.js",
      "rxjs/operator/timeoutWith": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/timeoutWith.js",
      "rxjs/operator/timestamp": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/timestamp.js",
      "rxjs/operator/toArray": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/toArray.js",
      "rxjs/operator/toPromise": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/toPromise.js",
      "rxjs/operator/window": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/window.js",
      "rxjs/operator/windowCount": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/windowCount.js",
      "rxjs/operator/windowTime": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/windowTime.js",
      "rxjs/operator/windowToggle": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/windowToggle.js",
      "rxjs/operator/windowWhen": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/windowWhen.js",
      "rxjs/operator/withLatestFrom": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/withLatestFrom.js",
      "rxjs/operator/zip": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/zip.js",
      "rxjs/operator/zipAll": ROOT_PATH +"/node_modules/rxjs/_esm5/operator/zipAll.js",
      "rxjs/scheduler/Action": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/Action.js",
      "rxjs/scheduler/AnimationFrameAction": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/AnimationFrameAction.js",
      "rxjs/scheduler/AnimationFrameScheduler": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/AnimationFrameScheduler.js",
      "rxjs/scheduler/AsapAction": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/AsapAction.js",
      "rxjs/scheduler/AsapScheduler": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/AsapScheduler.js",
      "rxjs/scheduler/AsyncAction": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/AsyncAction.js",
      "rxjs/scheduler/AsyncScheduler": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/AsyncScheduler.js",
      "rxjs/scheduler/QueueAction": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/QueueAction.js",
      "rxjs/scheduler/QueueScheduler": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/QueueScheduler.js",
      "rxjs/scheduler/VirtualTimeScheduler": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/VirtualTimeScheduler.js",
      "rxjs/scheduler/animationFrame": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/animationFrame.js",
      "rxjs/scheduler/asap": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/asap.js",
      "rxjs/scheduler/async": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/async.js",
      "rxjs/scheduler/queue": ROOT_PATH +"/node_modules/rxjs/_esm5/scheduler/queue.js",
      "rxjs/symbol/iterator": ROOT_PATH +"/node_modules/rxjs/_esm5/symbol/iterator.js",
      "rxjs/symbol/observable": ROOT_PATH +"/node_modules/rxjs/_esm5/symbol/observable.js",
      "rxjs/symbol/rxSubscriber": ROOT_PATH +"/node_modules/rxjs/_esm5/symbol/rxSubscriber.js",
      "rxjs/testing/ColdObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/testing/ColdObservable.js",
      "rxjs/testing/HotObservable": ROOT_PATH +"/node_modules/rxjs/_esm5/testing/HotObservable.js",
      "rxjs/testing/SubscriptionLog": ROOT_PATH +"/node_modules/rxjs/_esm5/testing/SubscriptionLog.js",
      "rxjs/testing/SubscriptionLoggable": ROOT_PATH +"/node_modules/rxjs/_esm5/testing/SubscriptionLoggable.js",
      "rxjs/testing/TestMessage": ROOT_PATH +"/node_modules/rxjs/_esm5/testing/TestMessage.js",
      "rxjs/testing/TestScheduler": ROOT_PATH +"/node_modules/rxjs/_esm5/testing/TestScheduler.js",
      "rxjs/util/AnimationFrame": ROOT_PATH +"/node_modules/rxjs/_esm5/util/AnimationFrame.js",
      "rxjs/util/ArgumentOutOfRangeError": ROOT_PATH +"/node_modules/rxjs/_esm5/util/ArgumentOutOfRangeError.js",
      "rxjs/util/EmptyError": ROOT_PATH +"/node_modules/rxjs/_esm5/util/EmptyError.js",
      "rxjs/util/FastMap": ROOT_PATH +"/node_modules/rxjs/_esm5/util/FastMap.js",
      "rxjs/util/Immediate": ROOT_PATH +"/node_modules/rxjs/_esm5/util/Immediate.js",
      "rxjs/util/Map": ROOT_PATH +"/node_modules/rxjs/_esm5/util/Map.js",
      "rxjs/util/MapPolyfill": ROOT_PATH +"/node_modules/rxjs/_esm5/util/MapPolyfill.js",
      "rxjs/util/ObjectUnsubscribedError": ROOT_PATH +"/node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js",
      "rxjs/util/Set": ROOT_PATH +"/node_modules/rxjs/_esm5/util/Set.js",
      "rxjs/util/TimeoutError": ROOT_PATH +"/node_modules/rxjs/_esm5/util/TimeoutError.js",
      "rxjs/util/UnsubscriptionError": ROOT_PATH +"/node_modules/rxjs/_esm5/util/UnsubscriptionError.js",
      "rxjs/util/applyMixins": ROOT_PATH +"/node_modules/rxjs/_esm5/util/applyMixins.js",
      "rxjs/util/assign": ROOT_PATH +"/node_modules/rxjs/_esm5/util/assign.js",
      "rxjs/util/errorObject": ROOT_PATH +"/node_modules/rxjs/_esm5/util/errorObject.js",
      "rxjs/util/identity": ROOT_PATH +"/node_modules/rxjs/_esm5/util/identity.js",
      "rxjs/util/isArray": ROOT_PATH +"/node_modules/rxjs/_esm5/util/isArray.js",
      "rxjs/util/isArrayLike": ROOT_PATH +"/node_modules/rxjs/_esm5/util/isArrayLike.js",
      "rxjs/util/isDate": ROOT_PATH +"/node_modules/rxjs/_esm5/util/isDate.js",
      "rxjs/util/isFunction": ROOT_PATH +"/node_modules/rxjs/_esm5/util/isFunction.js",
      "rxjs/util/isNumeric": ROOT_PATH +"/node_modules/rxjs/_esm5/util/isNumeric.js",
      "rxjs/util/isObject": ROOT_PATH +"/node_modules/rxjs/_esm5/util/isObject.js",
      "rxjs/util/isPromise": ROOT_PATH +"/node_modules/rxjs/_esm5/util/isPromise.js",
      "rxjs/util/isScheduler": ROOT_PATH +"/node_modules/rxjs/_esm5/util/isScheduler.js",
      "rxjs/util/noop": ROOT_PATH +"/node_modules/rxjs/_esm5/util/noop.js",
      "rxjs/util/not": ROOT_PATH +"/node_modules/rxjs/_esm5/util/not.js",
      "rxjs/util/pipe": ROOT_PATH +"/node_modules/rxjs/_esm5/util/pipe.js",
      "rxjs/util/root": ROOT_PATH +"/node_modules/rxjs/_esm5/util/root.js",
      "rxjs/util/subscribeToResult": ROOT_PATH +"/node_modules/rxjs/_esm5/util/subscribeToResult.js",
      "rxjs/util/toSubscriber": ROOT_PATH +"/node_modules/rxjs/_esm5/util/toSubscriber.js",
      "rxjs/util/tryCatch": ROOT_PATH +"/node_modules/rxjs/_esm5/util/tryCatch.js"
    },
    "mainFields": [
      "browser",
      "module",
      "main"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./client/main.ts"
    ],
    "polyfills": [
      "./client/polyfills.ts"
    ],
    "styles": [
      "./client/styles.css"
    ]

  },
  "plugins": [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        "context": "client",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "client",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      }
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};
