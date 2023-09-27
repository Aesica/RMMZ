If you find these helpful, feel free to support me on Patreon:
https://www.patreon.com/aesica

## Aesica's RMMZ Plugins - Terms of Use

- Aesica's plugins (hereafter referred to as "the plugins") are free for game developers (hereafter referred to as "developer", "developers", or "you") to use in both free and commercial game projects (hereafter referred to as "game" or "games") as long as Aesica is given credit somewhere in the game's credits.
- Forked, ported, edited, or redistributed versions of the plugins (hereafter referred to as "fork" or "forks") are fine as long as: 1. Aesica is retained in the credits of the forks, 2. The forks must remain free, 3. The forks must remain open-source, 4. The forks may NOT be obfuscated either in part or in whole, and 5. The forks must retain an unmodified version of these licensing terms in their @help section, as either a link to https://github.com/Aesica/RMMZ/blob/master/README.md or as a text copy of the terms of use section located at that URL.
- You may NOT remove "Aesica" from the @author section, you may NOT remove any links to Aesica's github repo from the @help section, and you may NOT attempt to otherwise pass my work off as your own (come on, we all know that's a dick move, so don't be one~)
- While you are free to modify and use them in your games as needed, you may NOT attempt to bypass any of these terms by using a game (such as, but not limited to, a sample project) or similar means to specifically distribute the plugins or forks to other developers, or to any third parties who will eventually distribute them to other developers.
- A copy of your game (once completed) would be nice so I can see how my plugins are being used, but it's not at all required.
- **To credit, list my name (Aesica) in the game's credits under your programming/code/scripting section, or under "Programming" or "Scripting" or "Coding" if you don't yet have a such a section.**

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

### AES_MZ_BattlerGauge
Info:  Allows for battlers (enemies and players) to display gauges for hp, mp, tp, tpb, or even custom parameters.

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
