const Koa = require("koa");
const app = new Koa();

let fileData =
  "<html>\n" +
  "  <head>\n" +
  "    <title>Google Sheets API Quickstart</title>\n" +
  "    <meta charset='utf-8' />\n" +
  "  </head>\n" +
  "  <body>\n" +
  "    <p>Google Sheets API Quickstart</p>\n" +
  "\n" +
  "    <!--Add buttons to initiate auth sequence and sign out-->\n" +
  '    <button id="authorize-button" style="display: none;">Authorize</button>\n' +
  '    <button id="signout-button" style="display: none;">Sign Out</button>\n' +
  "\n" +
  '    <pre id="content"></pre>\n' +
  "\n" +
  '    <script type="text/javascript">\n' +
  "      // Client ID and API key from the Developer Console\n" +
  "      var CLIENT_ID = '769067592560-mkjt9jv59e7sfubu69o4unp4jf4blhfq.apps.googleusercontent.com';\n" +
  "      var API_KEY = 'AIzaSyDWmOXXMOQay1QcfMBvysWlBHP9WG55Lp0';\n" +
  "\n" +
  "      // Array of API discovery doc URLs for APIs used by the quickstart\n" +
  '      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];\n' +
  "\n" +
  "      // Authorization scopes required by the API; multiple scopes can be\n" +
  "      // included, separated by spaces.\n" +
  '      var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";\n' +
  "\n" +
  "      var authorizeButton = document.getElementById('authorize-button');\n" +
  "      var signoutButton = document.getElementById('signout-button');\n" +
  "\n" +
  "      /**\n" +
  "       *  On load, called to load the auth2 library and API client library.\n" +
  "       */\n" +
  "      function handleClientLoad() {\n" +
  "        gapi.load('client:auth2', initClient);\n" +
  "      }\n" +
  "\n" +
  "      /**\n" +
  "       *  Initializes the API client library and sets up sign-in state\n" +
  "       *  listeners.\n" +
  "       */\n" +
  "      function initClient() {\n" +
  "        gapi.client.init({\n" +
  "          apiKey: API_KEY,\n" +
  "          clientId: CLIENT_ID,\n" +
  "          discoveryDocs: DISCOVERY_DOCS,\n" +
  "          scope: SCOPES\n" +
  "        }).then(function () {\n" +
  "          // Listen for sign-in state changes.\n" +
  "          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);\n" +
  "\n" +
  "          // Handle the initial sign-in state.\n" +
  "          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());\n" +
  "          authorizeButton.onclick = handleAuthClick;\n" +
  "          signoutButton.onclick = handleSignoutClick;\n" +
  "        });\n" +
  "      }\n" +
  "\n" +
  "      /**\n" +
  "       *  Called when the signed in status changes, to update the UI\n" +
  "       *  appropriately. After a sign-in, the API is called.\n" +
  "       */\n" +
  "      function updateSigninStatus(isSignedIn) {\n" +
  "        if (isSignedIn) {\n" +
  "          authorizeButton.style.display = 'none';\n" +
  "          signoutButton.style.display = 'block';\n" +
  "          listMajors();\n" +
  "        } else {\n" +
  "          authorizeButton.style.display = 'block';\n" +
  "          signoutButton.style.display = 'none';\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      /**\n" +
  "       *  Sign in the user upon button click.\n" +
  "       */\n" +
  "      function handleAuthClick(event) {\n" +
  "        gapi.auth2.getAuthInstance().signIn();\n" +
  "      }\n" +
  "\n" +
  "      /**\n" +
  "       *  Sign out the user upon button click.\n" +
  "       */\n" +
  "      function handleSignoutClick(event) {\n" +
  "        gapi.auth2.getAuthInstance().signOut();\n" +
  "      }\n" +
  "\n" +
  "      /**\n" +
  "       * Append a pre element to the body containing the given message\n" +
  "       * as its text node. Used to display the results of the API call.\n" +
  "       *\n" +
  "       * @param {string} message Text to be placed in pre element.\n" +
  "       */\n" +
  "      function appendPre(message) {\n" +
  "        var pre = document.getElementById('content');\n" +
  "        var textContent = document.createTextNode(message + '</br>');\n" +
  "        pre.appendChild(textContent);\n" +
  "      }\n" +
  "\n" +
  "      /**\n" +
  "       * Print the names and majors of students in a sample spreadsheet:\n" +
  "       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit\n" +
  "       */\n" +
  "      function listMajors() {\n" +
  "        gapi.client.sheets.spreadsheets.values.get({\n" +
  "          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',\n" +
  "          range: 'Class Data!A2:E',\n" +
  "        }).then(function(response) {\n" +
  "          var range = response.result;\n" +
  "          if (range.values.length > 0) {\n" +
  "            appendPre('Name, Major:');\n" +
  "            for (i = 0; i < range.values.length; i++) {\n" +
  "              var row = range.values[i];\n" +
  "              // Print columns A and E, which correspond to indices 0 and 4.\n" +
  "              appendPre(row[0] + ', ' + row[4]);\n" +
  "            }\n" +
  "          } else {\n" +
  "            appendPre('No data found.');\n" +
  "          }\n" +
  "        }, function(response) {\n" +
  "          appendPre('Error: ' + response.result.error.message);\n" +
  "        });\n" +
  "      }\n" +
  "\n" +
  "    </script>\n" +
  "\n" +
  '    <script async defer src="https://apis.google.com/js/api.js"\n' +
  '      onload="this.onload=function(){};handleClientLoad()"\n' +
  "      onreadystatechange=\"if (this.readyState === 'complete') this.onload()\">\n" +
  "    </script>\n" +
  "  </body>\n" +
  "</html>\n";

app.use(async ctx => {
  ctx.body = fileData;
});

app.listen(process.env.PORT || 3000);
