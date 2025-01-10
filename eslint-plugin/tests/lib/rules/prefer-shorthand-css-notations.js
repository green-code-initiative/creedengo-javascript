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

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/prefer-shorthand-css-notations");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const createError = (property) => ({
  messageId: "PreferShorthandCSSNotation",
  data: { property },
  type: "JSXAttribute",
});

ruleTester.run("prefer-shorthand-css-notations", rule, {
  valid: [
    "<div class='my-class'/>",
    "<div style={{ animation: 'example 5s linear 2s infinite alternate' }}/>",
    "<div style={{ background: 'border-box red' }}/>",
    "<div style={{ border: '2px dotted' }}/>",
    "<div style={{ column: '3 100px' }}/>",
    "<div style={{ columnRule: '4px double #ff00ff' }}/>",
    "<div style={{ flex: '1 0 auto' }}/>",
    "<h1 style={{ font: 'italic bold 18px/150% Arial, sans-serif' }}/>",
    "<div style={{ grid: '1fr 2fr / row minmax(100px, auto) 200px' }}/>",
    "<div style={{ gridTemplate: '1fr 2fr' }}/>",
    "<div style={{ justifyItems: 'stretch' }}/>",
    "<div style={{ listStyle: 'georgian inside' }}/>",
    "<div style={{ margin: '10px 3px 8px 5px' }}/>",
    "<div style={{ offset: 'path(M 50 80 C 150 -20 250 180 350 80) 150px' }}/>",
    "<div style={{ outline: 'inset thick' }}/>",
    "<div style={{ overflow: 'visible hidden' }}/>",
    "<div style={{ padding: '10px 3px 8px 5px' }}/>",
    "<div style={{ placeContent: 'end stretch' }}/>",
    "<div style={{ placeItems: 'end stretch' }}/>",
    "<div style={{ placeSelf: 'end stretch' }}/>",
    "<div style={{ textDecoration: 'underline solid #f00' }}/>",
    "<div style={{ transition: 'width 35s ease-in-out 0s' }}/>",
    {
      code: "<div style={{ animationName: 'example', animationDuration: '5s' }}/>",
      options: [{ disableProperties: ["animation"] }],
    },
  ],
  invalid: [
    {
      code: "<div style={{ animationName: 'example', animationDuration: '5s' }}/>",
      errors: [createError("animation")],
    },
    {
      code: "<div style={{ backgroundColor:'#000', backgroundImage: 'url(images/bg.png)', backgroundRepeat: 'no-repeat', backgroundPosition:'left top' }}/>",
      errors: [createError("background")],
    },
    {
      code: "<div style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#000000' }}/>",
      errors: [createError("border")],
    },
    {
      code: "<div style={{ columnWidth: '100px', columnCount: 3 }}/>",
      errors: [createError("column")],
    },
    {
      code: "<div style={{ columnRuleWidth: '4px', columnRuleStyle: 'double', columnRuleColor:'#ff00ff'}}/>",
      errors: [createError("columnRule")],
    },
    {
      code: "<div style={{ flexGrow: 1, flexShrink: 0, flexBasis: 'auto' }}/>",
      errors: [createError("flex")],
    },
    {
      code: "<h1 style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 18, lineHeight: '150%', fontFamily: 'Arial,sans-serif' }}/>",
      errors: [createError("font")],
    },
    {
      code: "<div style={{ gridTemplateColumns: '1fr', gridAutoFlow: 'row', gridAutoRows:'minmax(100px, auto)', gridAutoColumns: '200px' }}/>",
      errors: [createError("grid")],
    },
    {
      code: "<div style={{ gridTemplateColumns: '1fr', gridTemplateRows: '2fr' }}/>",
      errors: [createError("gridTemplate")],
    },
    {
      code: "<ul style={{ listStyleType: 'disc', listStylePosition: 'inside', listStyleImage: 'url(disc.png)' }}/>",
      errors: [createError("listStyle")],
    },
    {
      code: "<div style={{ marginTop: 10, marginBottom: 8, marginRight: 3, marginLeft: 5 }}/>",
      errors: [createError("margin")],
    },
    {
      code: "<h1 style={{ offsetPath: 'path(M 50 80 C 150 -20 250 180 350 80)', offsetPosition: '50%' }}/>",
      errors: [createError("offset")],
    },
    {
      code: " <div style={{ outlineWidth: 1, outlineStyle: 'solid', outlineColor: '#000000' }}/>",
      errors: [createError("outline")],
    },
    {
      code: "<div style={{ overflowX: 'visible', overflowY: 'hidden' }}/>",
      errors: [createError("overflow")],
    },
    {
      code: "<div style={{ paddingTop: 10, paddingBottom: 8, paddingRight: 3, paddingLeft: 5 }}/>",
      errors: [createError("padding")],
    },
    {
      code: "<div style={{ alignContent: 'end', justifyContent: 'stretch' }}/>",
      errors: [createError("placeContent")],
    },
    {
      code: "<div style={{ alignItems: 'end', justifyItems: 'stretch' }}/>",
      errors: [createError("placeItems")],
    },
    {
      code: "<div style={{ alignSelf: 'end', justifySelf: 'stretch' }}/>",
      errors: [createError("placeSelf")],
    },
    {
      code: "<div style={{ textDecorationStyle: 'solid', textDecorationColor: '#f00', textDecorationLine: 'underline' }}/>",
      errors: [createError("textDecoration")],
    },
    {
      code: "<div style={{ transitionProperty: 'width', transitionDuration:'35s' }}/>",
      errors: [createError("transition")],
    },
  ],
});
