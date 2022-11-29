const promptSync = require("prompt-sync")
const open = require("open")

const prompt = promptSync({ sigint: true })

module.exports = {open, prompt}