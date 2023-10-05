const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const { verifyDownloadTasks } = require ('cy-verify-downloads')


module.exports = defineConfig({
  projectId: 'x19jy6',
  e2e: {
    setupNodeEvents(on, config) {
      on ('task', {downloadFile})
      on ('task', {verifyDownloadTasks})
    },
  },
});
