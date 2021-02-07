var powers = [
    "flare"
];

for(var power of powers) require("powers/" + power);

//units
require("powers/exodus");

//production
require("production/bannium-forge");

//items
require("items/bannium")
