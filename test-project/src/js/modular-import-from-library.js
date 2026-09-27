import { orderBy } from "lodash"; // Non-compliant: import of the main path of a bad library

import * as _ from "underscore"; // Non-compliant: import by namespace of a bad library

import isEmpty from "lodash/isEmpty"; // Compliant

orderBy([], [], []);
_.allKeys([]);
isEmpty("");
