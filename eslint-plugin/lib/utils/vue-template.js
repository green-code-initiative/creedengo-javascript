/*
 * creedengo JavaScript plugin - Provides rules to reduce the environmental footprint of your JavaScript programs
 * Copyright © 2023 Green Code Initiative (https://green-code-initiative.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

/**
 * Returns the lowercase tag name of a `vue-eslint-parser` template AST node
 * (VElement), accounting for the various shapes `node.name` can take.
 *
 * @param {object} node - a VElement node, or its VElement parent
 * @returns {string|undefined}
 */
function getVueElementName(node) {
  const rawName =
    typeof node?.name === "string"
      ? node.name
      : node?.name?.name || node?.rawName;
  return rawName?.toLowerCase();
}

/**
 * Finds a static `VAttribute` by name on a VElement's start tag.
 * Directives and bindings (e.g. `:style`) are not matched since they are
 * not `VAttribute` nodes.
 *
 * @param {object} node - a VElement node
 * @param {string} attrName
 * @returns {object|undefined}
 */
function getVueAttribute(node, attrName) {
  return node.startTag.attributes.find(
    (attr) =>
      attr.type === "VAttribute" &&
      attr.key?.name?.toLowerCase?.() === attrName,
  );
}

/**
 * Builds the `defineTemplateBodyVisitor` visitor object for a rule so Vue
 * `.vue` templates are analyzed the same way as JSX. Returns an empty
 * object when the current parser doesn't expose Vue template services,
 * so it can always be spread into a rule's returned visitor.
 *
 * @param {import('eslint').Rule.RuleContext} context
 * @param {object} visitor - template body AST visitor (e.g. `{ VElement(node) {} }`)
 * @returns {object}
 */
function defineVueTemplateVisitor(context, visitor) {
  const parserServices =
    context.parserServices || context.sourceCode?.parserServices;

  return parserServices?.defineTemplateBodyVisitor
    ? parserServices.defineTemplateBodyVisitor(visitor)
    : {};
}

module.exports = {
  getVueElementName,
  getVueAttribute,
  defineVueTemplateVisitor,
};
