var _               = require('underscore'),
    request         = require('request'),
    querystring     = require('querystring'),
    async           = require('async'),
    entities        = require('he');

// Globals
var apiBase = 'https://translation.googleapis.com/language/translate/v2/',
    maxGetQueryLen = 4500,
    maxSegments = 100,
    concurrentLimit = 10; // Max num concurrent requests. Can be overridden by passing a new limit when requiring module

////
//  SEND REQUEST
////

// Closure that returns a function for making a
// GET request to Google with an apiKey
var getRequestWithApi = function(apiKey) {
  return function(path, data, done) {
    var url = apiBase + path + '?' + querystring.stringify(_.extend({ 'key': apiKey }, data));
    request.get(url, globalResponseHandler({ url: url }, done));
  };
};

var postRequestWithApi = function(apiKey) {
  return function(path, data, done) {
    var requestData = {
      url: apiBase + path,
      method: 'POST',
      form: querystring.stringify(_.extend({ 'key': apiKey }, data)),
      headers: {
        'X-HTTP-Method-Override': 'GET'
      }
    };
    request(requestData, globalResponseHandler(requestData, done));
  };
};

////
//   RESPONSE HANDLERS
////

var globalResponseHandler = function(request, done) {
  return function(err, res, body) {
    var msg;

    if (!done || !_.isFunction(done)) return;

    // Catch connection errors
    if (err || !res || res.statusCode !== 200) return done({
      error: err,
      response: res,
      body: body,
      request: request,
      toString: function() {
        return err ? err.toString() : '';
      },
    }, null);

    // Try to parse response
    var parsedBody = null;
    try {
      parsedBody = JSON.parse(body);
    } catch(e) {
      err = 'Could not parse response from Google: ' + (body || 'null');
      return done(err, null);
    }

    // Return response
    done(null, parsedBody);
  };
};

var parseTranslations = function(originalStrings, done) {
  return function(err, data) {
    if (err) return done(err, null);

    // Remove nesting
    data = data.data;
    data = data.translations ? data.translations : data;

    // Add originalText to response
    originalStrings.forEach(function(s, i){
      if (data[i]) _.extend(data[i], { originalText: s });
    });

    // Decode html entities
    data = data.map(function(translation){
      translation.translatedText = entities.decode(translation.translatedText);
      return translation;
    });

    // Return nested languages array
    done(null, data);
  };
};

var parseSupportedLanguages = function(done) {
  return function(err, languages) {
    if (err) return done(err, null);
    languages = languages.data.languages;
    if (languages[0] && !languages[0].name) languages = _.pluck(languages, 'language');
    done(null, languages);
  };
};

var parseLanguageDetections = function(originalStrings, done) {
  return function(err, data) {
    if (err) return done(err, null);

    // Remove nesting and parse
    data = data.data && data.data.detections ? data.data.detections : data;
    if (data.length > 1) {
      data = data.map(function(d){ return d[0]; });
    } else {
      data = data[0];
    }

    // Add originalText to response
    originalStrings.forEach(function(s, i){
      if (data[i]) _.extend(data[i], { originalText: s });
    });

    done(null, data);
  };
};

var shouldSplitSegments = function(strings) {
  if (!Array.isArray(strings)) return false;

  // Google allows a maximum of 128 segments
  if (strings.length > maxSegments) return true;

  // Google allows max of 5k characters
  return encodeURIComponent(strings.join(',')).length > maxGetQueryLen && strings.length !== 1;
};

////
//  HELPERS
////

// Return array of arrays that are short enough for Google to handle
var splitArraysForGoogle = function(arr, result) {
  if (arr.length > maxSegments || (encodeURIComponent(arr.join(',')).length > maxGetQueryLen && arr.length !== 1)) {
    var mid = Math.floor(arr.length / 2);
    splitArraysForGoogle(arr.slice(0, mid), result);
    splitArraysForGoogle(arr.slice(mid, arr.length), result);
  } else {
    result.push(arr);
  }
};

////
//   PUBLIC API
////

module.exports = function(apiKey, options) {
  options = options || {}
  var requestOptions = options.requestOptions || {}
  if( _.keys( requestOptions ).length > 0 ) {
    request = request.defaults( requestOptions );
  }

  // Set new concurrent limit for async calls if specified
  concurrentLimit = options.concurrentLimit || concurrentLimit;

  var get = getRequestWithApi(apiKey),
      post = postRequestWithApi(apiKey),
      api = {};


  // TRANSLATE

  api.translate = function(strings, sourceLang, targetLang, done) {
    // Make sourceLang optional
    if (!done) {
      done = targetLang;
      targetLang = sourceLang;
      sourceLang = null;
    }
    
    if (!_.isFunction(done)) return console.log('No callback defined');
    if (typeof strings !== 'string' && !Array.isArray(strings)) return done('Input source must be a string or array of strings');
    if (typeof targetLang !== 'string') return done('No target language specified. Must be a string');

    // Split into multiple calls if string array is longer than allowed by Google (5k for POST)
    var stringSets;
    if (shouldSplitSegments(strings)) {
      stringSets = [];
      splitArraysForGoogle(strings, stringSets);
    } else if (!Array.isArray(strings)) {
      stringSets = [[strings]];
    } else {
      stringSets = [strings];
    }

    // Request options
    var data = { target: targetLang };
    if (sourceLang) data.source = sourceLang;

    // Run queries async
    async.mapLimit(stringSets, concurrentLimit, function(stringSet, done) {

      post('', _.extend({ q: stringSet }, data), parseTranslations(stringSet, done));

    }, function(err, translations) {
      if (err) return done(err);

      // Merge and return translation
      translations = _.flatten(translations);
      if (translations.length === 1) translations = translations[0];
      done(null, translations);
    });

  };


  // GET SUPPORTED LANGUAGES

  api.getSupportedLanguages = function(target, done) {
    // Data param is optional
    if (_.isFunction(target)) {
      done = target;
      target = {};
    } else {
      target = { target: target };
    }
    if (!_.isFunction(done)) return console.log('No callback defined');

    get('languages', target, parseSupportedLanguages(done));
  };


  // DETECT LANGUAGES

  api.detectLanguage = function(strings, done) {
    if (!done) return console.log('No callback defined');
    if (typeof strings !== 'string' && !Array.isArray(strings)) return done('Input source must be a string or array of strings');

    // Split into multiple calls if string array is longer than allowed by Google (5k for POST)
    var stringSets;
    if (shouldSplitSegments(strings)) {
      stringSets = [];
      splitArraysForGoogle(strings, stringSets);
    } else if (!Array.isArray(strings)) {
      stringSets = [[strings]];
    } else {
      stringSets = [strings];
    }

    // Run queries async
    async.mapLimit(stringSets, concurrentLimit, function(stringSet, done) {

      post('detect', { q: stringSet }, parseLanguageDetections(stringSet, done));

    }, function(err, detections) {
      if (err) return done(err);

      // Merge arrays and return detections
      detections = _.flatten(detections);
      if (detections.length === 1) detections = detections[0];
      done(null, detections);

    });

  };

  ////
  //   RETURN API
  ////

  return {
    translate:                api.translate,
    getSupportedLanguages:    api.getSupportedLanguages,
    detectLanguage:           api.detectLanguage
  };

};
