var Aesica = Aesica || {};
Aesica.BattlerGauge = Aesica.BattlerGauge || {};
Aesica.BattlerGauge.version = 2.0;
Aesica.BattlerGauge.name = "AES_MZ_BattlerGauge";
Aesica.BattlerGauge.pluginParameters = PluginManager.parameters(Aesica.BattlerGauge.name);
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.battlerGaugeVersion = 2.3;
var Imported = Imported || {};
Imported[Aesica.BattlerGauge.name] = true;
/*:
* @target MZ
* @plugindesc v2.0 Add gauges to actors or enemies during battle
* @author Aesica
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* ----------------------------------------------------------------------
*
* Adds gauges for hp, mp, tp, or any/all of the above to enemies in battle.
* Custom resources added by other plugins can also be displayed, as long as that
* resource can be accessed on a battler as a property or is a fixed value (such
* as 100 for tp)
*
* So if you added a resource to your game called "skill points" with methods:
*    battler.sp 
*    battler.msp
* a gauge for those could be added using "sp" and "msp" respectively, however:
*    battler.sp()
*    battler.msp()
* cannot be read by this plugin.
*
* Color codes:  All color code plugin paramters can be either a window skin text
* color code, such as 21, or an RGB color code such as #ff8844
*
* ATB gauge:  If using this plugin's ATB gauge for Yanfly's ATB plugin
* (YEP_X_BattleSysATB) you'll need to place this plugin below it in your plugin
* list so it can load the ATB gauge color scheme.  If placed above
* YEP_X_BattleSysATB, or if YEP_X_BattleSysATB is not loaded, then the ATB gauge
* portion will be disabled automatically, regardless of plugin setting.
*
* If an enemy has a zero maximum value for a gauge stat (such as 0 max mp) then
* that gauge will be hidden for that foe.  You can also hide specific gauges on
* foes using the following Enemy note tags:
*
* <Hide Gauge n>
* Hide the specified gauge (0, 1, 2, etc)
* Under the plugin's default gauge settings:
* <Hide Gauge 0> // hides the HP gauge on a foe
* <Hide Gauge 1> // hides the MP gauge on a foe
* <Hide Gauge 2> // hides the TP gauge on a foe
*
* <Hide All Gauges>
* Hide all gauges for this specific enemy
*
* <Hide Time Gauge>
* Hides the enemy's ATB gauge (YEP_X_BattleSysATB required to use this gauge)
*
* <Boss Gauge>
* Uses the boss gauge width instead of the standard width for this battler
*
* @param Player Gauge Width
* @type number
* @min 0
* @desc The width in pixels for gauges.  0: Disable player gauges
* @default 0
*
* @param Enemy Gauge Width
* @type number
* @min 0
* @desc The width in pixels for gauges.  0: Disable enemy gauges
* @default 75
*
* @param Boss Gauge Width
* @type number
* @min 0
* @desc The width in pixels for boss gauges
* @default 125
*
* @param Gauge Height
* @desc The height in pixels for gauges
* @type number
* @min 1
* @default 6
*
* @param Gauge Padding
* @desc Padding in pixels between gauges
* @type number
* @min -50
* @max 50
* @default -1
*
* @param Position
* @desc Position of gauge in relation to enemy sprite
* @type boolean
* @on Top
* @off Bottom
* @default false
*
* @param Y Offset
* @desc Offset of Y position
* @type number
* @min -999
* @max 999
* @default -16
*
* @param Drop Delay
* @desc Delay to show recent damage dealt.  0: disable
* @type number
* @min 0
* @default 30
*
* @param Gauges
* @desc List of Enemy stats to be displayed as gauges
* @type struct<BattlerGauge>[]
* @default ["{\"Current Stat\":\"hp\",\"Max Stat\":\"mhp\",\"Gauge Color 1\":\"20\",\"Gauge Color 2\":\"21\",\"Gauge Color 3\":\"#ff0000\"}","{\"Current Stat\":\"mp\",\"Max Stat\":\"mmp\",\"Gauge Color 1\":\"22\",\"Gauge Color 2\":\"23\",\"Gauge Color 3\":\"#0000ff\"}","{\"Current Stat\":\"tp\",\"Max Stat\":\"100\",\"Gauge Color 1\":\"28\",\"Gauge Color 2\":\"29\",\"Gauge Color 3\":\"#00ff00\"}"]
*
* @param TPB Gauge Settings
* @desc Customize the TPB gauge settings
* @type struct<TPBGauge>
* @default {"Enable TPB Gauges":"true","Flash When Full":"true","Color 1":"26","Color 2":"27","Full Color 1":"14","Full Color 2":"6","Charge Color 1":"2","Charge Color 2":"10","Haste Color 1":"11","Haste Color 2":"3","Slow Color 1":"12","Slow Color 2":"4","Stop Color 1":"7","Stop Color 2":"8"}
*
*/
/*~struct~TPBGauge:
*
* @param Enable TPB Gauges
* @desc Sets whether or not TPB gauges are shown on battlers (time-progress battles only)
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Flash When Full
* @desc Sets whether or not the TPB gauge flashes when full
* @type boolean
* @on Flash
* @off Don't Flash
* @default true
*
* @param Color 1
* @desc Color 1 for TPB gauge
* @default 26
*
* @param Color 2
* @desc Color 2 for TPB gauge
* @default 27
*
* @param Full Color 1
* @desc Color 1 for TPB gauge when full
* @default 14
*
* @param Full Color 2
* @desc Color 2 for TPB gauge when full
* @default 6
*
* @param Charge Color 1
* @desc Color 1 for TPB gauge when charging
* @default 2
*
* @param Charge Color 2
* @desc Color 2 for TPB gauge when charging
* @default 10
*
* @param Haste Color 1
* @desc Color 1 for TPB gauge when hasted
* @default 11
*
* @param Haste Color 2
* @desc Color 2 for TPB gauge when hasted
* @default 3
*
* @param Slow Color 1
* @desc Color 1 for TPB gauge when slowed
* @default 12
*
* @param Slow Color 2
* @desc Color 2 for TPB gauge when slowed
* @default 4
*
* @param Stop Color 1
* @desc Color 1 for TPB gauge when stopped
* @default 7
*
* @param Stop Color 2
* @desc Color 2 for TPB gauge when stopped
* @default 8
*
*/
/*~struct~BattlerGauge:
* @param Current Stat
* @desc Current value of stat tied to gauge (hp, mp, tp, etc)
* 
* @param Max Stat
* @desc Max value of stat tied to gauge (hp, mp, 100, etc) can be fixed value or battler stat
* 
* @param Gauge Color 1
* @desc Gauge color 1
*
* @param Gauge Color 2
* @desc Gauge color 2
*
* @param Gauge Color 3
* @desc Gauge color 3, for showing drops in value
* 
*/
(function($$)
{
/**-------------------------------------------------------------------	
	Aesica.Toolkit: Note tag parsing & utility functions
//-------------------------------------------------------------------*/
	if ((Aesica.Toolkit.version || 0) < Aesica.Toolkit.battlerGaugeVersion)
	{
		Aesica.Toolkit.version = Aesica.Toolkit.battlerGaugeVersion;
		Aesica.Toolkit.versionList = function()
		{
			let result = [];
			for (let i in Aesica.Toolkit) if (typeof Aesica.Toolkit[i] === "number" && i !== "version") result.push({"ver": Aesica.Toolkit[i], "key": i});
			result = result.sort((a, b) => b.ver - a.ver);
			return this.version + ": latest version\n-----\n" + result.reduce(function(r, obj){ return r += obj.ver + ": " + obj.key + "\n"; }, "");
		};
		Aesica.Toolkit.evalErrorLog = function(e, value)
		{
			console.log("Aesica.Toolkit: Eval Error");
			console.log("<Offending Eval>");
			console.log(value);
			console.log("</Offending Eval>");
			console.log(e.stack);
		}
		Aesica.Toolkit.makeLookupTable = function(stringArray)
		{
			let result = {};
			for (let [i, obj] of stringArray.entries()) result[obj.toLowerCase()] = i;
			return result;
		};
		Aesica.Toolkit.tagExists = function(tag){ return (this.note || "").tagExists(tag); };
		Aesica.Toolkit.getTag = function(tag, defaultValue){ return String(this.note || "").getTag(tag, defaultValue); };
		Aesica.Toolkit.getTagList = function(tag)
		{
			let tagData = Aesica.Toolkit.getTag.call(this, tag)
			let unit, rx, match, result = [];
			if (tagData)
			{
				tagData = tagData.split("\n");
				rx = /([A-Za-z0-9]+):[ ]*"([^"]+)"/gi;
				for (i in tagData)
				{
					unit = {};
					while (match = rx.exec(tagData[i]))
					{
						unit[match[1]] = isNaN(+match[2]) ? match[2].trim() : +match[2];
					}
					result[i] = unit;
				}
			}
			return result;
		};
		Aesica.Toolkit.hexColorMath = function(baseColor, colorMod, operation)
		{
			const color1 = String(baseColor).parseColor();
			const color2 = "#000000";
			let colorSet1 = [color1[1] + color1[2], color1[3] + color1[4], color1[5] + color1[6]];
			let colorSet2;
			if (typeof colorMod === "number") colorSet2 = [colorMod, colorMod, colorMod];
			else if (typeof colorMod === "string") colorSet2 = [color2[1] + color2[2], color2[3] + color2[4], color2[5] + color2[6]].map(x => parseInt(x, 16));
			else colorSet2 = [0, 0, 0];
			let result = "#";
			operation = operation.toLowerCase();
			for (let [index, i] of colorSet1.entries())
			{
				if (operation === "-" || operation === "subtract") result += Math.round(parseInt(i, 16) - colorSet2[index]).clamp(0, 0xff).toString(16).padStart(2, "0");
				else if (operation === "*" || operation === "multiply") result += Math.round(parseInt(i, 16) * colorSet2[index]).clamp(0, 0xff).toString(16).padStart(2, "0");
				else if (operation === "/" || operation === "divide") result += Math.round(parseInt(i, 16) / colorSet2[index]).clamp(0, 0xff).toString(16).padStart(2, "0");
				else if (operation === "%" || operation === "modulo") result += Math.round(parseInt(i, 16) % colorSet2[index]).clamp(0, 0xff).toString(16).padStart(2, "0");
				else if (operation === "^" || operation === "pow") result += Math.round(Math.pow(parseInt(i, 16), colorSet2[index])).clamp(0, 0xff).toString(16).padStart(2, "0");
				else result += Math.round(parseInt(i, 16) + colorSet2[index]).clamp(0, 0xff).toString(16).padStart(2, "0");
			}
			return result;
		};
		Aesica.Toolkit.runFormulaEval = function(a, b, code)
		{
			let result = 0;
			const user = a;
			const target = b;
			const v = $gameVariables._data;
			const s = $gameSwitches._data;
			let damage, dmg, heal, gravity, variance, d, d4, d6, d8, d10, d12, d20, d100;
			if (Imported.AES_MZ_BattleCore)
			{
				damage = dmg = Aesica.BattleCore.damage;
				heal = Aesica.BattleCore.heal;
				gravity = Aesica.BattleCore.gravity;
				variance = Aesica.BattleCore.variance;
				d = Aesica.BattleCore.d;
				d4 = Aesica.BattleCore.d4;
				d6 = Aesica.BattleCore.d6;
				d8 = Aesica.BattleCore.d8;
				d10 = Aesica.BattleCore.d10;
				d12 = Aesica.BattleCore.d12;
				d20 = Aesica.BattleCore.d20;
				d100 = Aesica.BattleCore.d100;
			}
			try
			{
				result = Math.floor(+eval(code)) || 0;
			}
			catch(e)
			{
				Aesica.Toolkit.evalErrorLog(e, code);
				result = 0;
			}
			return Math.floor(result);
		};
		Aesica.Toolkit.digitGroup = function(value)
		{
			let result = value;
			if (typeof value === "number")
			{
				if (isNaN(value)) result = "NaN";
				else if (Math.abs(value) === Infinity) result = "∞";
				else if (Math.abs(value) < 1000000) result = value.toLocaleString();
				else if (Math.abs(value) < 1000000000) result = Math.floor(value / 1000).toLocaleString() + "K";
				else if (Math.abs(value) < 1000000000000) result = Math.floor(value / 1000000).toLocaleString() + "M";
				else if (Math.abs(value) < 1000000000000000) result = Math.floor(value / 1000000000).toLocaleString() + "T";
				else if (Math.abs(value) < 1000000000000000000)  result = Math.floor(value / 1000000000000).toLocaleString() + "Q";
				else if (Math.abs(value) < 10 ** 100) result = "Less than a googol"; // now I'm just screwing around :D
				else result = "Less than a googolplex";
			}
			else result = value.toString();
			return result;
		};		
		String.prototype.toBoolean = function(){ return this.toLowerCase() === "true" ? true : false; };
		String.prototype.toPercent = function(multiplier=1, multiplyIfPercentOnly=true)
		{
			value = this.trim();
			let isPercent = value[value.length - 1] === "%" ? true : false;
			let result = value;
			if (isPercent)
			{
				result = +value.slice(0, -1) * 0.01 * multiplier;
			}
			else result = +result * (multiplyIfPercentOnly ? 1 : multiplier); // skip multiplier if it isn't a percentage value
			return result;
		};
		String.prototype.tagExists = function(tag){ return RegExp("<" + tag + "(?::[^>]+)?>", "i").test(this); };
		String.prototype.getTag = function(tag, defaultValue)
		{
			let result = false;
			let exists = this.tagExists(tag);
			if (exists)
			{
				if (this.tagExists("\\/" + tag)) result = this.match(RegExp("<" + tag + ">([^]+)<\\/" + tag + ">", "i"));
				else result = this.match(RegExp("<" + tag + ":[ ]*([^>]+)>", "i"));
			}
			return result ? result[1].trim() : (defaultValue !== undefined ? defaultValue : exists);
		};
		String.prototype.parseColor = function()
		{
			let c = this.trim();
			let rx = /^#[A-Fa-f0-9]{3,6}$/;
			let result;
			if (rx.test(c))	result = c.length < 7 ? c[0] + c[1] + c[1] + c[2] + c[2] + c[3] + c[3] : c;
			else result = +c || 0;
			return result;
		};
		Array.prototype.toSoundObject = function()
		{
			const arr = this.map(x => String(x).trim());
			return {"name":arr[0], "volume":(isNaN(+arr[1]) ? 100 : +arr[1] || 0).clamp(0, 100), "pitch":(+arr[2] || 100).clamp(50, 150), "pan":(+arr[3] || 0).clamp(-100, 100)};
		};
		Object.defineProperty(Array.prototype, "toSoundObject", { enumerable: false });		
		Number.prototype.parseColor = function(){ return ColorManager.textColor(this); };
		JSON.safeParse = function(jsonData)
		{
			jsonData = String(jsonData || "");
			let result;
			try
			{
				result = JSON.parse(jsonData);
			}
			catch(e)
			{
				console.log("Aesica.Toolkit: Invalid JSON data:");
				console.log("<Offending JSON>");
				console.log(jsonData);
				console.log("</Offending JSON>");
				console.log(e.stack);
			}

			return result;
		};
		Game_BattlerBase.prototype.getTag = function(tag, deepScan=false)
		{
			let value = [];
			let isActor = this.isActor();
			let actor = isActor ? this.actor() : this.enemy();
			let equip, state;
			if (Aesica.Toolkit.tagExists.call(actor, tag)) value.push(Aesica.Toolkit.getTag.call(actor, tag));
			if (deepScan)
			{
				if (isActor)
				{
					if (Aesica.Toolkit.tagExists.call($dataClasses[this._classId], tag)) value.push(Aesica.Toolkit.getTag.call($dataClasses[this._classId], tag));
					equip = this.weapons().concat(this.armors());
					for (i in equip){ if (Aesica.Toolkit.tagExists.call(equip[i], tag)) value.push(Aesica.Toolkit.getTag.call(equip[i], tag)); }
				}
				state = this.states();
				for (i in state){ if (Aesica.Toolkit.tagExists.call(state[i], tag)) value.push(Aesica.Toolkit.getTag.call(state[i], tag)); }
			}
			return deepScan ? value : (value[0] ? value[0] : false);
		};
		Game_Event.prototype.getFirstComment = function()
		{
			let result = null;
			let page = this.page();
			if (page)
			{
				if (page.list[0].code === 108)
				{
					result = page.list[0].parameters[0] || "";
					let line = 1;
					while (page.list[line].code === 408)
					{
						result += "\n" + (page.list[line].parameters[0] || "");
						line++;
					}
				}					
			}
			return result;
		};
		Game_Event.prototype.getTag = function(tag)
		{
			let result = false;
			this._tagCache = this._tagCache || [];
			if (this._pageIndex >= 0)
			{
				let page = this._tagCache[this._pageIndex] = this._tagCache[this._pageIndex] || {};
				result = page[tag];
				if (result === undefined)
				{
					let comment = this.getFirstComment();
					if (comment) result = comment.getTag(tag);
					if (!result) result = this.event().note.getTag(tag);
					page[tag] = result;
				}
			}
			return result;
		};
		$$.ColorManager_textColor = ColorManager.textColor;
		ColorManager.textColor = function(n){ return isNaN(+n) ? n : $$.ColorManager_textColor.call(this, n); };
		Graphics.printAdvancedError = function(e)
		{
			let stackTrace = e.stack.split("\n");
			stackTrace.splice(0, 1);
			stackTrace = stackTrace.map(x => x.replace(/\([^\/]*\/\/(?:[^\/]*\/)*/, "(")).join("<br />");
			let headerDiv = document.createElement("div");
			headerDiv.style = "position: static; text-align: left; font-weight: bold; margin-bottom: " + this._realScale + "em";
			headerDiv.innerHTML = "<span style='font-size: 300%; color: #ff8888'>:(&nbsp;&nbsp;</span><span style='color: #ffff88'>This game has encountered an unexpected error</span>";
			Graphics.printError.call(this, e.name, e.message, e);
			let stackDiv = document.createElement("div")
			stackDiv.innerHTML = "<span style='color: #ff8888'>" + e.name + ":</span> <span style='color: #ffaaaa'>" + e.message + "</span><br /><br />" + stackTrace;
			stackDiv.style = "position: static; margin-left: " + (3.5 * this._realScale) + "em; text-align: left; margin-top: " + this._realScale + "em";
			let footerDiv = document.createElement("div");
			footerDiv.style = "position: static; text-align: center; font-weight: bold; margin-top: " + this._realScale + "em";
			footerDiv.innerHTML = "<p style='color: #ffff88'>Please report it to the developer so they can fix it</p><a style='color: #88ff88; border-radius: 5px; border: 1px solid #fff; padding: 0.3em; background-color: #111; cursor: pointer;' onclick='location.reload(); return false'>Press F5 or click here to restart the game</a>";
			this._errorPrinter.style.position = "absolute";
			this._errorPrinter.style.top = (5 * this._realScale) + "em";
			this._errorPrinter.style.width = (window.innerWidth * 0.9) + "px";
			this._errorPrinter.innerHTML = "";
			this._errorPrinter.appendChild(headerDiv);
			this._errorPrinter.appendChild(stackDiv);
			this._errorPrinter.appendChild(footerDiv);
			Graphics._updateErrorPrinter();
		};		
		SceneManager.catchException = function(e)
		{
			if (e instanceof Error) Graphics.printAdvancedError(e);
			else if (e instanceof Array && e[0] === "LoadError") this.catchLoadError(e);
			else this.catchUnknownError(e);
			AudioManager.stopAll();
			this.stop();
		};
	}	
/**-------------------------------------------------------------------	
	Plugin Params
//-------------------------------------------------------------------*/
	$$.initColorParam = (function(value)
	{		
		if (String(value).substr(0, 1) !== "#") value = +value || 0;
		return value;
	});
	$$.pluginParameters = PluginManager.parameters(Aesica.BattlerGauge.name);
	$$.params = {};
	$$.params.playerGaugeWidth = +$$.pluginParameters["Player Gauge Width"] || 0;
	$$.params.enemyGaugeWidth = +$$.pluginParameters["Enemy Gauge Width"] || 0;
	$$.params.bossGaugeWidth = +$$.pluginParameters["Boss Gauge Width"] || 0;
	$$.params.gaugeHeight = +$$.pluginParameters["Gauge Height"] || 1;
	$$.params.gaugePadding = +$$.pluginParameters["Gauge Padding"] || 0;
	$$.params.position = String($$.pluginParameters["Position"]).toLowerCase() === "false" ? false : true;
	$$.params.yOffset = +$$.pluginParameters["Y Offset"] || 0;
	$$.params.dropDelay = +$$.pluginParameters["Drop Delay"] || 0;
	$$.params.tpbGauge = (function(raw)
	{
		let result = {};
		let data = null;
		try
		{
			data = JSON.parse(raw);
		}
		catch(e)
		{
			console.log("AES_MZ_BattlerGauge: Invalid plugin paramters for TPB gauge settings!");
		}
		if (data)
		{
			result.isTpbGauge = true;
			result.current = "tpbChargeTime";
			result.max = 1;
			result.enabled = String(data["Enable TPB Gauges"]).toBoolean();;
			result.flashWhenFull = String(data["Flash When Full"]).toBoolean();;
			result.color1 = data["Color 1"];
			result.color2 = data["Color 2"];
			result.color3 = "#000000"; // temp
			result.colorSlow1 = data["Slow Color 1"];
			result.colorSlow2 = data["Slow Color 2"];
			result.colorHaste1 = data["Haste Color 1"];
			result.colorHaste2 = data["Haste Color 2"];
			result.colorStop1 = data["Stop Color 1"];
			result.colorStop2 = data["Stop Color 2"];
			result.colorFull1 = data["Full Color 1"];
			result.colorFull2 = data["Full Color 2"];
			result.colorCharge1 = data["Charge Color 1"];
			result.colorCharge2 = data["Charge Color 2"];
		}
		return result;
	})($$.pluginParameters["TPB Gauge Settings"]);
	$$.params.gauges = (function(value)
	{
		var result = [];
		var raw;
		try
		{
			raw = JSON.parse(value);
			for (i in raw)
			{
				raw[i] = JSON.parse(raw[i]);
				result[i] = {};
				result[i].current = raw[i]["Current Stat"];
				result[i].max = +raw[i]["Max Stat"] || raw[i]["Max Stat"];
				result[i].color1 = $$.initColorParam(raw[i]["Gauge Color 1"]);
				result[i].color2 = $$.initColorParam(raw[i]["Gauge Color 2"]);
				result[i].color3 = $$.initColorParam(raw[i]["Gauge Color 3"]);
			}
		}
		catch(e)
		{
			console.log("AES_BattlerGauge: Invalid JSON in Gauges parameter")
			console.log(e.stack);
			console.log(value);
		}		
		return result;
	})($$.pluginParameters["Gauges"]);	
/**-------------------------------------------------------------------	
	Battler gauges
//-------------------------------------------------------------------*/
	Game_Battler.prototype.agiModifier = function()
	{
		let baseAgi = this.paramBase(6) + this.paramPlus(6);
		let result = this.canMove() ? this.agi / baseAgi : 0;
		if (baseAgi >= this.paramMax(6) && this.agi >= this.paramMax(6)) result = 1;
		return result;
	};
	Game_BattlerBase.prototype.showGauge = function()
	{
		return this.isAlive();
	};
	Game_Battler.prototype.setSprite = function(spriteId)
	{
		this._spriteCacheIndex = spriteId;
	};
	Object.defineProperties(Game_Battler.prototype, 
	{
		spriteX: { get: function(){ return this._spriteCacheIndex ? BattleManager._spriteList[this._spriteCacheIndex].x : 0; }, configurable: true },
		spriteY: { get: function(){ return this._spriteCacheIndex ? BattleManager._spriteList[this._spriteCacheIndex].y : 0; }, configurable: true },
	});
	$$.Sprite_Battler_update = Sprite_Battler.prototype.update;
	Sprite_Battler.prototype.update = function()
	{
		$$.Sprite_Battler_update.call(this);
		this.initGauges();
	};
	$$.Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
	Sprite_Battler.prototype.setBattler = function(battler)
	{
		BattleManager._spriteList = BattleManager._spriteList || {};
		$$.Sprite_Battler_setBattler.call(this, battler);
		if (battler)
		{
			var value = (battler.isEnemy() ? 100000 : 200000) + battler.friendsUnit().members().indexOf(battler);
			BattleManager._spriteList[value] = this;
			battler.setSprite(value);
		}
	};
	Sprite_Battler.prototype.initGauges = function()
	{
		if (this._battler && !this._gaugeExists)
		{
			if ((this._battler.isEnemy() && $$.params.enemyGaugeWidth > 0) || (this._battler.isActor() && $$.params.playerGaugeWidth > 0 && $gameSystem.isSideView()))
			{
				this._battlerGauge = new Window_BattlerGauge();
				this._battlerGauge.linkBattler(this._battler);
				this.parent.parent.addChild(this._battlerGauge);
				this._gaugeExists = true;
			}
		}
	};
	function Sprite_BattlerGauge()
	{
		this.initialize.apply(this, arguments);
	};
	function Sprite_Test(){ this.initialize.apply(this, arguments); };
	Sprite_Test.prototype = Object.create(Sprite_Gauge.prototype);
	Sprite_Test.prototype.constructor = Sprite_Test;
	
	Sprite_BattlerGauge.prototype = Object.create(Sprite_Gauge.prototype);
	Sprite_BattlerGauge.prototype.constructor = Sprite_BattlerGauge;
	Sprite_BattlerGauge.prototype.setup = function(battler, statData)
	{
		this._battler = battler;
		this._data = {...statData};
		this._data.color1 = ColorManager.textColor(this._data.color1.parseColor());
		this._data.color2 = ColorManager.textColor(this._data.color2.parseColor());
		this._data.color3 = ColorManager.textColor(this._data.color3.parseColor());
		this._data.dropValue = 0;
		this._data.dropTimer = 0;
		this._data.previousValue = 0;		
		this._value = this.currentValue();
		this._maxValue = this.currentMaxValue();
		this._gaugeWidth = this.gaugeWidth();
		this._gaugeHeight = this.gaugeHeight();
		if (this._data.isTpbGauge)
		{
			this._data.colorHaste1 = ColorManager.textColor(this._data.colorHaste1.parseColor());
			this._data.colorHaste2 = ColorManager.textColor(this._data.colorHaste2.parseColor());
			this._data.colorSlow1 = ColorManager.textColor(this._data.colorSlow1.parseColor());
			this._data.colorSlow2 = ColorManager.textColor(this._data.colorSlow2.parseColor());
			this._data.colorStop1 = ColorManager.textColor(this._data.colorStop1.parseColor());
			this._data.colorStop2 = ColorManager.textColor(this._data.colorStop2.parseColor());
			this._data.colorCharge1 = ColorManager.textColor(this._data.colorCharge1.parseColor());
			this._data.colorCharge2 = ColorManager.textColor(this._data.colorCharge2.parseColor());
			this._data.colorFull1 = ColorManager.textColor(this._data.colorFull1.parseColor());
			this._data.colorFull2 = ColorManager.textColor(this._data.colorFull2.parseColor());
		}
		this.updateBitmap();
	};
	Sprite_BattlerGauge.prototype.currentValue = function()
	{
		let result = NaN;
		if (this._battler)
		{
			if (typeof this._data.current === "number") result = this._data.current;
			else result = typeof this._battler[this._data.current] === "function" ? this._battler[this._data.current]() : this._battler[this._data.current];
		}
		return result;
	};
	Sprite_BattlerGauge.prototype.currentMaxValue = function()
	{
		let result = NaN;
		if (this._battler)
			if (typeof this._data.max === "number") result = this._data.max;
			else result = typeof this._battler[this._data.max] === "function" ? this._battler[this._data.max]() : this._battler[this._data.max];
		return result;
	};
	Sprite_BattlerGauge.prototype.label = function(){ return ""; };
	Sprite_BattlerGauge.prototype.gaugeBackColor = function() {
		return ColorManager.gaugeBackColor();
	};
	Sprite_BattlerGauge.prototype.gaugeColor1 = function()
	{
		let result, agiMod;
		if (this._battler)
		{
			if (this._data.isTpbGauge)
			{
				agiMod = this._battler.agiModifier();
				if (this._battler._tpbState === "casting") result = this._data.colorCharge1;
				else if (this._battler._tpbChargeTime === 1) result = this._data.colorFull1;
				else if (agiMod === 0) result = this._data.colorStop1;
				else if (agiMod > 1) result = this._data.colorHaste1;
				else if (agiMod < 1) result = this._data.colorSlow1;
				else result = this._data.color1;
			}
			else result = this._data.color1;
		}
		return result || "#000000";;
	};
	Sprite_BattlerGauge.prototype.gaugeColor2 = function()
	{
		let result, agiMod;
		if (this._battler)
		{
			if (this._data.isTpbGauge)
			{
				agiMod = this._battler.agiModifier();
				if (this._battler._tpbState === "casting") result = this._data.colorCharge2;
				else if (this._battler._tpbChargeTime === 1) result = this._data.colorFull2;
				else if (agiMod === 0) result = this._data.colorStop2;
				else if (agiMod > 1) result = this._data.colorHaste2;
				else if (agiMod < 1) result = this._data.colorSlow2;
				else result = this._data.color2;
			}
			else result = this._data.color2;
		}
		return result || "#000000";;
	};
	Sprite_BattlerGauge.prototype.drawGauge = function() {
		const gaugeWidth = this.gaugeWidth();
		const gaugeHeight = this.gaugeHeight();
		if (gaugeWidth > 0) this.drawGaugeRect(0, 0, gaugeWidth, gaugeHeight);
	};
	Sprite_BattlerGauge.prototype.gaugeWidth = function()
	{
		let result = this._gaugeWidth;
		if (result === undefined && this._battler)
		{
			if (this._battler.isActor()) result = $$.params.playerGaugeWidth;
			else if (this._battler.getTag("Boss Gauge")) result = $$.params.bossGaugeWidth;
			else result = $$.params.enemyGaugeWidth;
			this._gaugeWidth = result;
		}
		return result;
	};
	Sprite_BattlerGauge.prototype.gaugeHeight = function(){ return $$.params.gaugeHeight; };
	Sprite_BattlerGauge.prototype.redraw = function()
	{
		this.bitmap.clear();
		const currentValue = this.currentValue();
		if (!isNaN(currentValue)) this.drawGauge();
	};
	Sprite_BattlerGauge.prototype.updateBitmap = function()
	{
		if (this._battler && this._data.isTpbGauge)
		{
			if (this._battler._tpbState === "casting")
			{
				this._data.current = "_tpbCastTime";
				this._data.max = "tpbRequiredCastTime";
			}
			else
			{
				this._data.current = "_tpbChargeTime";
				this._data.max = 1;
			}
		}
		Sprite_Gauge.prototype.updateBitmap.call(this);
	}
	
	
	function Window_BattlerGauge()
	{
		this.initialize.apply(this, arguments);
	};
	Window_BattlerGauge.prototype = Object.create(Window_Base.prototype);
	Window_BattlerGauge.prototype.constructor = Window_BattlerGauge;
	Window_BattlerGauge.prototype.initialize = function()
	{
		Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, 150, 150));
		this._battler = null;
		this._gauges = [];
		this._atbGauge = null;
		this.setBackgroundType(2);
	};
	
	Window_BattlerGauge.prototype.linkBattler = function(battler)
	{
		let gauge, stat, max, testValue, height = 0;
		this.createContents();
		this._battler = battler;
		this._gauges = [];
		let hideTag = battler.getTag("Hide Gauge", true).join(",").split(",").map(x => x.trim());
		if (!hideTag.contains("all"))
		{
			for (i in $$.params.gauges)
			{
				stat = $$.params.gauges[i];
				if ((battler[stat.max] > 0 || stat.max > 0 || (typeof battler[stat.max] === "function" && battler[stat.max]() > 0)) && !hideTag.contains(i))
				{
					gauge = new Sprite_BattlerGauge();
					gauge.setup(battler, stat);
					gauge.y = height;
					this._gauges.push(gauge);
					this.addInnerChild(gauge);
					height += $$.params.gaugeHeight + $$.params.gaugePadding;
				}
			}
			if ($$.params.tpbGauge.enabled && !hideTag.contains("tpb"))
			{
				gauge = new Sprite_BattlerGauge();
				gauge.setup(battler, $$.params.tpbGauge);
				gauge.y = height;
				this._gauges.push(gauge);
				this.addInnerChild(gauge);
				height += $$.params.gaugeHeight;
			}
			this.width = gauge.gaugeWidth() + $gameSystem.windowPadding() * 2;
			this.height = height + $gameSystem.windowPadding() * 2;
		}
	}

	Window_BattlerGauge.prototype.update = function()
	{
		if (this._battler.isAppeared() && this._battler.isAlive())
		{
			this.visible = true;
			this.updatePosition();
			Window_Base.prototype.update.call(this);
		}
		else this.visible = false;
	}
	Window_BattlerGauge.prototype.updatePosition = function()
	{
		this.x = this._battler.spriteX - this.width * 0.5;
		this.y = this._battler.spriteY + ($$.params.position ? -this._battler.spriteHeight() - this.height : 0) + $$.params.yOffset;
	}
	/*
	Window_BattlerGauge.prototype.updateContents = function()
	{
		var gauges = this._gauges;
		var x = 0;
		var y = 0;
		var max, current, battler = this._battler;
		if (battler)
		{
			if (battler.isAlive())
			{
				this.contentsOpacity = 255;
				for (i in gauges)
				{
					current = typeof gauges[i].current === "number" ? gauges[i].current : battler[gauges[i].current];
					max = typeof gauges[i].max === "number" ? gauges[i].max : battler[gauges[i].max];
					if ($$.params.dropDelay > 0)
					{
						if (current < gauges[i].previousValue)
						{
							gauges[i].dropTimer = $$.params.dropDelay;
							gauges[i].previousValue = current;
						}
						if (gauges[i].dropTimer > 0) gauges[i].dropTimer--;
						if (gauges[i].dropTimer === 0) gauges[i].previousValue = gauges[i].dropValue = current || 0;
					}
					//this.drawGauge(x, y, this._gaugeWidth, $$.params.gaugeHeight, gauges[i].dropValue / max, current / max, gauges[i].color3, gauges[i].color3, gauges[i].color1, gauges[i].color2);
					// xxx
					y += $$.params.gaugeHeight + $$.params.gaugePadding + $$.params.gaugeLineThickness * 2;
				}
				if (this._atbGauge) this.drawAtbGauge(x, y, this._gaugeWidth, $$.params.gaugeHeight);
			}
			else if (this.contentsOpacity > 0) this.contentsOpacity  =- 1;
		}
	}
	Window_BattlerGauge.prototype.drawGauge = function(x, y, width, height, rate1, rate2, color1a, color1b, color2a, color2b)
	{
		if (isNaN(rate1)) rate1 = 0;
		if (isNaN(rate2)) rate2 = 0;
		var fillW1 = Math.floor(width * rate1);
		var fillW2 = Math.floor(width * rate2);
		var border = $$.params.gaugeLineThickness;
		this.contents.fillRect(x, y, width + border * 2, height + border * 2, $$.params.backColor);
		if (rate1 > rate2) this.contents.gradientFillRect(x + border, y + border, fillW1, height, color1a, color1b);
		this.contents.gradientFillRect(x + border, y + border, fillW2, height, color2a, color2b);
	}
	Window_BattlerGauge.prototype.drawAtbGauge = function(x, y, width, height)
	{
		var battler = this._battler;
		var speedRate = battler.atbSpeedRate();
		var rate1 = battler.atbRate();
		var rate2 = battler._atbCharging ? battler.atbChargeRate() : 0;
		var color1, color2, color3, color4;
		var yepAtbGauge = this._atbGauge;
		if (rate2 === 0)
		{
			if (speedRate === 0)
			{
				color1 = yepAtbGauge.colorStop1;
				color2 = yepAtbGauge.colorStop2;
			}
			else if (speedRate > 1)
			{
				color1 = yepAtbGauge.colorHaste1;
				color2 = yepAtbGauge.colorHaste2;
			}
			else if (speedRate < 1)
			{
				color1 = yepAtbGauge.colorSlow1;
				color2 = yepAtbGauge.colorSlow2;
			}
			else
			{
				color1 = yepAtbGauge.colorNormal1;
				color2 = yepAtbGauge.colorNormal2;
			}
			color3 = color4 = $$.params.backColor;
		}
		else
		{
			color1 = yepAtbGauge.colorFull1;
			color2 = yepAtbGauge.colorFull2;
			color3 = yepAtbGauge.colorCharge1;
			color4 = yepAtbGauge.colorCharge2;
		}
		this.drawGauge(x, y, width, height, rate1, rate2, color1, color2, color3, color4);
	}*/
})(Aesica.BattlerGauge);