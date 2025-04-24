"use strict";

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
  configEmoji: [["flat/recommended", "✅"]],
  postprocess: (doc) => {
    return doc.replace(/✅\s*✅/gu, "✅");
  },
};

module.exports = config;
