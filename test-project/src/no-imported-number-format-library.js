import numbro from "numbro";
import { parse, format } from "numerable"; // Non-compliant: usage of external library to format number

numbro(1000).format({thousandSeparated: true}); // Non-compliant: usage of external library to format number

let variable = numbro(1000);
variable.format({thousandSeparated: true}); // Non-compliant: usage of external library to format number

numbro(2000).add(1000); // Compliant

new Intl.NumberFormat().format(1000); // Compliant

format(28);
parse("29"); // Compliant
