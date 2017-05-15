/* Configuration file for the server */
var config = {};

// Database
config.db = {};
config.db.tools = {};

// Jira
config.jira = {};
config.jira.api = {};
config.jira.toolSupport = {};

// Server Config
config.httpPort = 8081;
config.httpsPort = 8443;
config.secretKey = "xxxx-xxxx-xxxx";

// MongoDB config
config.db.username = "xxx";
config.db.password = "xxx";
config.db.tools.path = "mongodb://localhost:27017/portal";

// JIRA Config
// URL to use for JIRA REST API calls (dev/prod)
config.jira.url = "dev-jira";

// API endpoints
config.jira.api.user = "/rest/api/2/user";
config.jira.api.login = "/rest/auth/1/session";
config.jira.api.issue = "/rest/api/2/issue";

// Project/Issue
config.jira.toolSupport.projectId = 10300;
config.jira.toolSupport.requestId = 11200;
config.jira.toolSupport.changeId = 11201;

module.exports = config;