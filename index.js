const Uuid = require('uuid/v4');
const Archiver = require('archiver');
const Async = require("async");
const Request = require('request');
const Path = require('path');
const Url = require('url');
const Querystring = require('querystring');
const Express = require('express');
const FormidableMiddleware = require('express-formidable');

const app = Express();
app.use(FormidableMiddleware());

function respondWithArchive(res, urls) {
  const archive = Archiver('zip');
  archive.store = true;
  archive.pipe(res);
  res.setHeader('Content-disposition', `attachment; filename=${Uuid()}.zip`);
  res.setHeader('Content-type', 'application/zip');

  Async.eachSeries(urls, (url, next) => {
    request = Request.get(url);
    request.on('end', next)
    archive.append(request, { name: Querystring.decode(Path.basename(Url.parse(url).pathname)) });
  }, () => archive.finalize())
}

app.get('/zip', (req, res) => respondWithArchive(res, req.query.urls.split(',')));
app.post('/zip', (req, res) => respondWithArchive(res, req.fields.urls.split(',')));

app.listen(process.env.PORT || 3000);