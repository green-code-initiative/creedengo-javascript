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

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Ensures Angular component's changeDetection is set to OnPush",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      preferOnPushComponentChangeDetection:
        "The component's changeDetection value should be set to OnPush",
    },
    schema: [],
  },
  create(context) {
    /**
     * Check if a decorator is a @Component decorator
     * @param {Object} decorator - The decorator node
     * @returns {boolean}
     */
    const isComponentDecorator = (decorator) => {
      if (decorator.type !== "Decorator") {
        return false;
      }

      const expression = decorator.expression;
      // Check for @Component() syntax
      if (
        expression.type === "CallExpression" &&
        expression.callee.type === "Identifier" &&
        expression.callee.name === "Component"
      ) {
        return true;
      }

      return false;
    };

    /**
     * Check if a node is a changeDetection property
     * @param {Object} node - The property node
     * @returns {boolean}
     */
    const isChangeDetectionProperty = (node) => {
      return (
        node.type === "Property" &&
        ((node.key.type === "Identifier" &&
          node.key.name === "changeDetection") ||
          (node.key.type === "Literal" && node.key.value === "changeDetection"))
      );
    };

    /**
     * Check if the value is ChangeDetectionStrategy.OnPush
     * @param {Object} value - The value node
     * @returns {boolean}
     */
    const isOnPushStrategy = (value) => {
      // Check for ChangeDetectionStrategy.OnPush
      if (
        value.type === "MemberExpression" &&
        value.object.type === "Identifier" &&
        value.object.name === "ChangeDetectionStrategy" &&
        value.property.type === "Identifier" &&
        value.property.name === "OnPush"
      ) {
        return true;
      }

      return false;
    };

    /**
     * Find the changeDetection property in the component config
     * @param {Object} configObject - The object expression from @Component()
     * @returns {Object|null}
     */
    const findChangeDetectionProperty = (configObject) => {
      if (configObject.type !== "ObjectExpression") {
        return null;
      }

      return configObject.properties.find(isChangeDetectionProperty);
    };

    return {
      ClassDeclaration(node) {
        // Check if this class has a @Component decorator
        const componentDecorator = node.decorators?.find(isComponentDecorator);

        if (!componentDecorator) {
          return;
        }

        // Get the object passed to @Component()
        const decoratorCall = componentDecorator.expression;
        if (decoratorCall.type !== "CallExpression") {
          return;
        }

        // Check if decorator has arguments (the config object)
        if (decoratorCall.arguments.length === 0) {
          // @Component() with no arguments - no changeDetection property
          context.report({
            node: componentDecorator,
            messageId: "preferOnPushComponentChangeDetection",
          });
          return;
        }

        const configObject = decoratorCall.arguments[0];
        const changeDetectionProp = findChangeDetectionProperty(configObject);

        if (!changeDetectionProp) {
          // changeDetection property not found
          context.report({
            node: componentDecorator,
            messageId: "preferOnPushComponentChangeDetection",
          });
        } else if (!isOnPushStrategy(changeDetectionProp.value)) {
          // changeDetection exists but is not OnPush
          context.report({
            node: changeDetectionProp,
            messageId: "preferOnPushComponentChangeDetection",
          });
        }
      },
    };
  },
};
