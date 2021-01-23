//flare bullet aoe
const flareAoeEffect = newEffect(20, e => {
    Draw.color(Color.white, Color.red, e.fin()); //color goes from white to red
    Lines.stroke(e.fout() * 5); //line thickness goes from 5 to 0
    Lines.circle(e.x, e.y, e.fin() * 10); //draw a circle whose radius goes from 0 to 10
});

UnitTypes.flare.weapons.get(0).bullet.hitEffect = flareAoeEffect;
