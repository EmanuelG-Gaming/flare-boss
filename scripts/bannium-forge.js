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
