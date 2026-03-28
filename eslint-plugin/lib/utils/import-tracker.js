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
 * Creates a shared import tracker used by rules that need to fire on
 * `importedObj.method()` only when `importedObj` was actually imported
 * from a known library.
 *
 * Returns the shared `importedObjects` map (localName → forbidden methods)
 * and a ready-to-use `ImportDeclaration` AST visitor that populates it.
 * Rules can spread the returned object directly into their visitor map.
 *
 * @param {Record<string, string[]>} libraryMethods
 *   Map of library name → list of forbidden method names.
 * @returns {{ importedObjects: Map<string, string[]>, ImportDeclaration: Function }}
 */
function createDefaultImportsTracker(libraryMethods) {
  /** @type {Map<string, string[]>} */
  const importedObjects = new Map();

  function ImportDeclaration(node) {
    const methods = libraryMethods[node.source.value];
    if (!methods) return;

    for (const specifier of node.specifiers) {
      const localName = specifier.local.name;
      if (!importedObjects.has(localName)) {
        importedObjects.set(localName, []);
      }
      importedObjects.get(localName).push(...methods);
    }
  }

  return { importedObjects, ImportDeclaration };
}

module.exports = { createDefaultImportsTracker };
