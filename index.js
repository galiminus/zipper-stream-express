const Uuid = require('uuid/v4');
const Archiver = require('archiver');
const Async = require("async");
const Request = require('request');
const Path = require('path');
const Url = require('url');
const Express = require('express');

const app = Express();

app.get('/zip', function (req, res) {
  const archive = Archiver('zip');
  archive.store = true;
  archive.pipe(res);
  res.setHeader('Content-disposition', `attachment; filename=${Uuid()}.zip`);
  res.setHeader('Content-type', 'application/zip');

  Async.eachSeries(req.query.urls.split(','), (url, next) => {
    request = Request.get(url);
    request.on('end', next)
    archive.append(request, { name: Path.basename(Url.parse(url).pathname) });
  }, () => archive.finalize())
})

app.listen(process.env.PORT || 3000);