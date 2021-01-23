// "Flare is now overpowered"
Events.on(ClientLoadEvent, b => {
    Vars.ui.showCustomConfirm(
        "Make flare boss?",
        "Are you sure you want to make a flare boss? This will buff it's stats by a lot. This also applies to air and ground units.",
        "No",
        "Yes",
        ()=>{
            print("flare is now mortal");
        },
        ()=>{
            UnitTypes.flare.health = 99999;
            UnitTypes.flare.armor = 99999;
            });
            Vars.content.units().each(e => {
            if(e.flying === true) e.health = 99999;
            if(e.flying === true) e.armor = 99999;
            if(e.flying === true) e.speed = 10;
            if(e.flying === false) e.speed = 0;
        }
    );
});

//flare bullet aoe
const flareAoeEffect = new Effect(20, e => {
  Draw.color(Color.white, Color.red, e.fin()); //color goes from white to red
  Lines.stroke(e.fout() * 5); //line thickness goes from 5 to 0
  Lines.circle(e.x, e.y, e.fin() * 10); //draw a circle whose radius goes from 0 to 10
});

UnitTypes.flare.weapons.get(0).bullet.hitEffect = flareAoeEffect;

//flare shoot aoe
const flareShootEffect = new Effect(15, e => {
  Draw.color(Color.red, Color.white, e.fin()); //color goes from red to white
  Lines.stroke(e.fout() * 2); //line thickness goes from 2 to 0
  Lines.circle(e.x, e.y, e.fin() * 8); //draw a circle whose radius goes from 0 to 8
});

UnitTypes.flare.weapons.get(0).bullet.shootEffect = flareShootEffect;

const flareCannon = extend(Weapon, {
  reload: 1000,
  x: 0,
  y: 0,
  shots: 3,
  shotDelay: 5,
  spacing: 5,
  mirror: false,
  alternate: false,
  rotate: true,
  shootSound: Sounds.plasmadrop
});

const flareCannonBullet = extend(MissileBulletType, {
  damage: 109420,
  speed: 9,
  homingPower: 0.09,
  lifetime: 1000,
  trailEffect: flareShootEffect,
  weaveMag: 0.6,
  hitSound: Sounds.explosion,
  homingRange: 1000,
  hitEffect: flareAoeEffect
});

flareCannon.bullet = flareCannonBullet;

flare.weapons.add(
  flareCannon,
);
