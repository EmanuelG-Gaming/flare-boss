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
            UnitTypes.flare.weapons.get(0).bullet.StatusEffect = sapped;
            });
            Vars.content.units().each(e => {
            if(e.flying === true) e.health = 99999;
            if(e.flying === true) e.armor = 99999;
            if(e.flying === true) e.speed = 10;
            if(e.flying === false) e.speed = 0;
        }
    );
});
