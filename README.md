If you find these helpful, feel free to support me on Patreon:
https://www.patreon.com/aesica

## Aesica's RMMZ Plugins - Terms of Use

- Aesica's plugins (hereafter referred to as "the plugins") are free for game developers (hereafter referred to as "you" or "your") to use in both free and commercial game projects (hereafter referred to as "game" or "games") as long as Aesica (hereafter referred to as "I" and "my") is given credit.
- Edited, forked or redistributed versions of these plugins (hereafter referred to as "copies") are fine as long as: 1. I am retained in the credits of any copies, 2. The copies must remain free, 3. The copies must remain open-source, and 4. The copies must also retain an unmodified version of these licensing terms.
- You may NOT remove my name from the @author section, you may NOT remove any links to my github repo or my patreon page from the @help section, and you may NOT attempt to otherwise pass my work off as your own (come on, we all know that's a dick move, so don't be one~)
- A copy of your game (once completed) would be nice so I can see how my scripts are being used, but it's not required.
- **Regarding AES_MZ_LootBox (still under construction) specifically:**  You are NOT authorized to use AES_MZ_LootBox.js or copies thereof (hereafter refered to as "the lootbox plugin") to create microtransaction-based loot box systems in any game. This includes, but is not limited to, prize packs or keys (items required to open prize packs) that are purchased with real-world money or with a currency that is awarded as a direct (or indirect) result of spending real-world money via microtransactions. In short, the lootbox plugin is fine for use in games as long as those games aren't designed around profiting off the mechanics of the loot box plugin. This limitation supercedes any of the other terms and conditions listed here.

## How to Credit Me
- List my name (Aesica) in your game's credits under your scripts/code section, or under "Scripting" if you don't yet have a scripting section.  Easy peasy, right? :D

## Compatibility with visustella plugins
The closed-source, obfuscated nature of the visustella plugin suite, as well as the plugins' role as a loss leader/advertisement for paid plugin developers, is not something I wish to condone or stand behind as an advocate for free and open-source software.  So, unlike with my MV plugins, compatibility with the visustella plugin suite is not a concern and I won't be going out of my way to ensure it.  That said, if I can make a given plugin work with the visustella plugin suite after completion, I'll outline the instructions required to do so in the plugin's description.

Sorry if that's a disappointment to anyone, but on the bright side, it means I'll have a greater degree of flexibility and more potential features.

## Features and Changelog

### AES_MZ_CommandControl
Info:  Allows for all sorts of actor battle command manipulations and enhancements

**Initial Version:  2.0**
- Able to enable/disable attack, guard, and item globally or on an per character/class/equip/state basis
- Can replace the attack command, optionally requiring certain conditions to be met in order to do so
- Able to move certain commands, such as guard, over to a left or right sub-menu
- Can re-order commands by type (attack, limit, single, skills, guard, item, etc)
- Can unleash special abilities when using basic attack, based on certain conditions combined with random chance
- Can seal the item command on an actor/class/equip/state
- Can set single skills on the actor command window, similar to attack
- Able to repurpose TP into a limit break resource, showing a special command once TP reaches a certain threshold--either temporarily overwriting the attack command or appearing as an extra, temporary command in the actor command window
- Can apply states when an actor guards in addition to the standard guard effect.  These effects can be applied to either the user or even the entire party



### AES_MZ_CustomMP
Info:  Allows for MP labels and gauges to be modified on an per-class basis.  Among other things

**9/9/2020 - 1.85**
- Fixed a bug where the after battle recovery effects were being invoked twice

**Initial Version:  1.8**
- Change the colors of the MP gauge
- Change the colors and label of the MP cost displayed for skills
- Modify how RecoverAll behaves in relation to HP and MP
- Add HP and MP recovery (or loss) after battle
- Allow MP to be recovered when taking damage, filterable by type
- Allow MP to be recovered when dealing damage, filterable by type
- Displays MP and TP costs properly together when both are part of a skill's cost
- Hide MP regen
