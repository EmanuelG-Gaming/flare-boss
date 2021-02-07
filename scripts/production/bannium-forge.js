//bannium-forge
const bannium-forge = extendContent(GenericCrafter, "bannium-forge", {
        load() {
                this.super$load();		
                this.regions = [];		
                this.regions[1] = Core.atlas.find(this.name + "-liquid");		
                this.regions[2] = Core.atlas.find(this.name + "-top");
        }
});
bannium-forge.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild, bannium-forge, {
        draw() {
            Draw.rect(bannium-forge.regions[0], this.x, this.y);
	          var liquid = bannium-forge.consumes.get(ConsumeType.liquid).liquid;
	          Drawf.liquid(bannium-forge.regions[1], this.x, this.y, this.liquids.get(liquid) / bannium-forge.liquidCapacity, Liquids.cryofluid.color);
                      Draw.rect(bannium-forge.regions[2], this.x, this.y);
        }
});

// General stats
craftTime: 300,
  ambientSound: Sounds.none,
  hasPower: true,
  baseExplosiveness: 5,
  itemCapacity: 15,
  outputItem: new ItemStack(Vars.content.getByName(ContentType.item, "flare-boss-bannium"), 1),
  size: 2
});

/**
  * requirements:[
  *   silicon/800
  *   plastanium/420
  *   copper/6942
  *   thorium/900
  *   surge-alloy/990
  * ] 
*/
// bannium-forge.requirements(Category.crafting, ItemStack.with(Items.silicon, 800, Items.plastanium, 420, Items.copper, 6942, Items.thorium, 900, Items.surgeAlloy, 990));
bannium-forge.requirements = ItemStack.with(Items.silicon, 800, Items.plastanium, 420, Items.copper, 6942, Items.thorium, 900, Items.surgeAlloy, 990);
bannium-forge.category = Category.crafting;
bannium-forge.buildVisibility = BuildVisibility.shown;

// ah yes, 25 of alot of materials
bannium-forge.consumes.power(20);
bannium-forge.consumes.items(ItemStack.with(Items.surgeAlloy, 25, Items.silicon, 25, Items.plastanium, 25, Items.graphite, 25, Items.copper, 25, Items.lead, 25, Items.sporePod, 25));
