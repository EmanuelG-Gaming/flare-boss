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

// flare image for armor xd
load(){
  this.teamRegion = Core.atlas.find("flare");
},
setStats(){
  this.super$setStats();
    
  this.stats.remove(Stat.armor);
  const flare = new StatValue({
    display(table){
      let size = 8 * 2.5;
      table.image(Core.atlas.find("flare")).size(size * 2, size);
    }
  });
  this.stats.add(Stat.armor, flare);
}
    
// Flare mount
const flareMount = extend(Weapon, {
  reload: 250,
  x: 32,
  y: 0,
  shots: 1,
  shotDelay: 5,
  spacing: 5,
  mirror: true,
  alternate: false,
  rotate: true, 
  shootSound: Sounds.plasmadrop
});

//flare bullet aoe
const flareAoeEffect = new Effect(20, e => {
  Draw.color(Color.white, Color.red, e.fin()); //color goes from white to red
  Lines.stroke(e.fout() * 5); //line thickness goes from 5 to 0
  Lines.circle(e.x, e.y, e.fin() * 10); //draw a circle whose radius goes from 0 to 10
});

//flare missile aoe
const flareMissileEffect = new Effect(50, e => {
  Draw.color(Color.red, Color.white, e.fin()); //color goes from red to white
  Fill.circle(e.x, e.y, e.fin() * 35); //draw a circle whose radius goes from 0 to 35
  Draw.color(Color.white, Color.white, e.fin()); //color goes from white to white
  Lines.stroke(e.fout() * 20); //line thickness goes from 20 to 0
  Lines.circle(e.x, e.y, e.fin() * 50); //draw a circle whose radius goes from 0 to 50
});

UnitTypes.flare.weapons.get(0).bullet.hitEffect = flareAoeEffect;

//flare shoot aoe
const flareShootEffect = new Effect(15, e => {
  Draw.color(Color.red, Color.white, e.fin()); //color goes from red to white
  Lines.stroke(e.fout() * 2); //line thickness goes from 2 to 0
  Lines.circle(e.x, e.y, e.fin() * 8); //draw a circle whose radius goes from 0 to 8
});

const flareMarkedEffect = new Effect(100, e => {
    Draw.color(Color.white);
    Lines.line(
        e.x + e.fout() * -20,
        e.y + e.fout() * -20,
        e.x + e.fout() * 20,
        e.y + e.fout() * 20
    );
    Lines.line(
        e.x + e.fout() * -20,
        e.y + e.fout() * 20,
        e.x + e.fout() * 20,
        e.y + e.fout() * -20
    );
    Fill.circle(e.x, e.y, e.fout() * 20);
    Timer.schedule(() => {
        var t = extend(Teamc, {});
        Bullets.fragSurge.create(t, e.x, e.y, Mathf.random());
    }, 1);
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

const flareMarker = extend(Weapon, {
  reload: 2000,
  x: 0,
  y: -2,
  shots: 1,
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
  hitEffect: flareMissileEffect
});

const flareMarkerBullet = extend(MissileBulletType, {
  damage: 0,
  speed: 9,
  homingPower: 0.09,
  lifetime: 1000,
  trailEffect: Fx.none,
  weaveMag: 0.6,
  hitSound: Sounds.explosion,
  homingRange: 1000,
  hitEffect: flareMarkedEffect
});

const flareMountBullet = extend(LaserBulletType, {
  length: 500,
  width: 50,
  lightningSpacing: 10,
  lightningDelay: 0.5,
  lifetime: 40,
  damage: 100000,
  lightningColor: Pal.heal,
  colors: [ Pal.heal, Color.red ],
  shootEffect: flareShootEffect
});

UnitTypes.flare.weapons.add(
  flareCannon,
  flareMarker,
  flareMount
);

flareCannon.bullet = flareCannonBullet;
flareMarker.bullet = flareMarkerBullet;
flareMount.bullet = flareMountBullet;
