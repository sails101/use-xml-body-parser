# use-xml-body-parser

> Note: custom body parser config is broken in Sails <= v0.12.1.  This example will work with version 0.12.2 onward.

Quick demonstration of overriding the default body parser in Sails (Skipper) to allow parsing XML bodies.  All of the relevant code is in the `config/http.js` file.  To test, `npm install` and `sails lift`, then use the `POST /echo` route provided in `config/routes.js`, e.g.:

```
curl -H "Content-Type: application/xml" -X POST --data "<root>XML is x-citing</root>" http://localhost:1337/echo
```

should respond with:

```
{
  "root": "XML is x-citing"
}
```
