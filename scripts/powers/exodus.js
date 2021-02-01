const exodus = extend(UnitType, "exodus", {
        draw(unit){
                this.super$draw(unit);
                Draw.rect("Flare-Boss-Exodus-Mount", unit.x, unit.y);
        }
});
exodus.constructor = () => extend(UnitEntity, {});
