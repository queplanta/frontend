/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Navbar_me$ref: FragmentReference;
export type Navbar_me = {|
  +id: string,
  +username: string,
  +avatar: ?{|
    +url: string
  |},
  +isAuthenticated: ?boolean,
  +$refType: Navbar_me$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Navbar_me",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "username",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "avatar",
      "storageKey": "avatar(height:40,width:40)",
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 40,
          "type": "Int!"
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 40,
          "type": "Int!"
        }
      ],
      "concreteType": "File",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "isAuthenticated",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'cd0efb9c039fd3488e262e78bc40cbe8';
module.exports = node;
