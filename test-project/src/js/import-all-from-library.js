import lodash from "lodash"; // Non-compliant: lodash is entirely loaded
import * as _ from "underscore"; // Non-compliant: underscore is entirely loaded

lodash.isEmpty("");
_.isEmpty("");
