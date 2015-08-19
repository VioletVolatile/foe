
Scenes.Vaughn.Tasks = {};

Scenes.Vaughn.Tasks.OnTask = function() { //TODO add tasks
	return Scenes.Vaughn.Tasks.Lockpicks.OnTask() ||
		Scenes.Vaughn.Tasks.Snitch.OnTask();
}

Scenes.Vaughn.Tasks.AnyTaskAvailable = function() { //TODO add tasks
	return Scenes.Vaughn.Tasks.Lockpicks.Available() ||
		Scenes.Vaughn.Tasks.Snitch.Available();
}

Scenes.Vaughn.Tasks.StartTask = function() { //TODO add tasks
	if(Scenes.Vaughn.Tasks.Lockpicks.Available())
		Scenes.Vaughn.Tasks.Lockpicks.Start();
	else if(Scenes.Vaughn.Tasks.Snitch.Available())
		Scenes.Vaughn.Tasks.Snitch.Start();
}

Scenes.Vaughn.Tasks.TaskPrompt = function() {
	var parse = {
		
	};
	
	Text.Clear();
	if(Scenes.Vaughn.Tasks.AnyTaskAvailable()) {
		Text.Add("<i>“So, you’re interested in seeing some action? Young people, full of drive and fire… well, I’m not about to stop you from doing what an operative’s supposed to do.”</i> Vaughn thinks a moment, then smiles. <i>“Just so it happens, there’s something that came up which needs handling, and it has to be done the next day. You interested? Remember, you’ll be on the clock if I hand the assignment to you, so don’t accept responsibility for anything that you’re not willing to see through. You’re still thinking of going out there?”</i>", parse);
		Text.Flush();
		
		//[Yes][No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			tooltip : "Yes, you’ll take it.",
			func : function() {
				Text.Clear();
				Text.Add("<i>“All right, then. Let’s see what the boss-man wants me to hand down to you today…”</i>", parse);
				Text.Flush();
				
				Gui.NextPrompt(Scenes.Vaughn.Tasks.StartTask);
			}, enabled : true
		});
		options.push({ nameStr : "No",
			tooltip : "No, you’re not sure if you can see the task through.",
			func : function() {
				Text.Clear();
				Text.Add("Vaughn nods and shrugs at your words. <i>“Better that you say upfront that you can’t do it, rather than accept the job and get creamed, then leave everyone else to pick up the pieces. It’s no big deal; I’ll just pass along the task to someone who’s in the clear. You get points in my book for being honest about it.”</i>", parse);
				Text.NL();
				Text.Add("Points? Is he keeping score?", parse);
				Text.NL();
				Text.Add("<i>“Might be, might not be,”</i> Vaughn replies with a completely straight face. <i>“Now, was there something else you wanted of me?”</i>", parse);
				Text.Flush();
				
				Scenes.Vaughn.Prompt();
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
	else {
		Text.Add("<i>“Hmm.”</i> Vaughn takes his gaze off you and thinks for a moment. <i>“Don’t imagine I’ve got anything for you at the moment; the other operatives pretty much have all our bases covered and the boss-man’s been in a thinking mood, as opposed to a doing one. Maybe you should go out there and move things along - stir up the hive, as they say. That should create all sorts of opportunities for us to get our fingers into some more pies.”</i>", parse);
		Text.NL();
		Text.Add("All right, then. You’ll ask later.", parse);
		Text.NL();
		Text.Add("<i>“Don’t just come calling around these parts,”</i> Vaughn calls out after you as you leave. <i>“I’m just one fellow, you know. Pretty sure there’re other folks in camp who could use a hand or two anytime - just have to ask around until you find them.”</i>", parse);
		Text.Flush();
		
		Scenes.Vaughn.Prompt();
	}
}


Scenes.Vaughn.Tasks.Lockpicks = {};
Scenes.Vaughn.Tasks.Lockpicks.Available = function() {
	if(vaughn.flags["Met"] >= Vaughn.Met.OnTaskLockpicks) return false;
	return true;
}
Scenes.Vaughn.Tasks.Lockpicks.OnTask = function() {
	return vaughn.flags["Met"] == Vaughn.Met.OnTaskLockpicks;
}
Scenes.Vaughn.Tasks.Lockpicks.Completed = function() {
	return vaughn.flags["Met"] >= Vaughn.Met.CompletedLockpicks;
}

//No special requirements. Player should already have access to castle grounds.
//Note to Alder: refer to castle grounds docs. Create flag to see if player has inadvertently met Elodie via castle grounds exploration for use in this.
//Block that exploration scene if this scene has been viewed.
//TODO Note for far future: Do not enable this if/when Majid has been run out of Rigard.
Scenes.Vaughn.Tasks.Lockpicks.Start = function() {
	var parse = {
		playername : player.name
	};
	
	Text.Clear();
	Text.Add("<i>“Right, then.”</i> Vaughn pulls down the brim of his hat, turns, and heads for a door at the base of the watchtower. <i>“The boss-man’s decided to let you cut your teeth on something straightforward and simple, so give me a moment here.”</i>", parse);
	Text.NL();
	Text.Add("With that, Vaughn boots open the door and heads inside, lighting a candle in a holder by the doorway as he does so. The base of the watchtower is occupied by a storeroom of sorts, and as you look on, Vaughn picks out a leather pouch from one of the shelves before tossing it to you in a lazy arc.", parse);
	Text.NL();
	Text.Add("<i>“Here, catch.”</i>", parse);
	Text.NL();
	Text.Add("You do so. Whatever’s in the pouch is cold and hard, clearly made from metal, and they jingle as they hit the palm of your hand.", parse);
	Text.NL();
	Text.Add("<i>“Fresh from upriver,”</i> Vaughn explains as he closes the storeroom door behind him with a flourish and adjusts his hat. <i>“Quality thieves’ tools.”</i>", parse);
	Text.NL();
	Text.Add("Oh? You undo the string that holds the pouch closed, and are faced with quite the menagerie of interesting implements: various pieces of metal bent in interesting ways, a sharp, silent glass cutter, a hammer no longer than the width of your palm, and other more… exotic-looking things.", parse);
	Text.NL();
	if(party.InParty(terry)) {
		parse["foxvixen"] = terry.mfPronoun("fox", "vixen");
		parse["himher"] = terry.himher();
		
		Text.Add("<i>“Hmph,”</i> Terry says with a disdainful sniff, the [foxvixen] peering over your shoulder to scrutinize the toolset. <i>“Amateurs.”</i>", parse);
		Text.NL();
		Text.Add("Is that supposed to mean anything?", parse);
		Text.NL();
		Text.Add("<i>“Weeelll… I suppose they’ll do - assuming that you aren’t actually going after a mark that’s got any serious security. Yeah, they’ll get the job done in most cases. Most. And if they’re not going to be enough, then you’d be wanting a professional handling it.”</i>", parse);
		Text.NL();
		Text.Add("Like [himher], then?", parse);
		Text.NL();
		Text.Add("<i>“You know what? Forget I said anything.”</i>", parse);
		Text.NL();
		Text.Add("Maybe you will, and maybe you won’t. You’ll be keeping that in mind for later…", parse);
		Text.NL();
	}
	Text.Add("<i>“Anyway,”</i> Vaughn continues, <i>“we need these delivered to one of our people in the castle. Word’s had it that you’ve recently gained access to the castle grounds, so you’re the most obvious courier we have on hand.”</i>", parse);
	Text.NL();
	Text.Add("How would he know that, anyway?", parse);
	Text.NL();
	Text.Add("<i>“We have eyes and ears in the city that most overlook. Now, while it’s not a matter of life and death, we’d still like these delivered promptly. Just for this first task, you get a little leeway when it comes to time, but I hope that you don’t abuse said leeway. We’d all like to get off to a good start here, get moving on the right foot.”</i>", parse);
	Text.NL();
	Text.Add("Oh, so he’s going easy on you, is he?", parse);
	Text.NL();
	Text.Add("Vaughn shrugs and pulls the brim of his hat over his eyes. <i>“Could be. Learn to walk before you try to run, as the old saying goes.”</i>", parse);
	Text.NL();
	Text.Add("All right, you get his point. Now, who are you supposed to pass these along to, where are you going to meet him or her, and how will you recognize each other?", parse);
	Text.NL();
	Text.Add("<i>“We’ve got someone in the castle proper, girl by the name of Elodie; that’s who you need to hand these to. Every day in the evening, she gets let out of the castle for an hour or so to settle her personal affairs in the city. Get yourself to the small park to the west of the castle, and she’ll be on the bench by the pond. As for recognizing each other… there’s a reason we have a sign, you know.”</i>", parse);
	Text.NL();
	Text.Add("Right, right. You’re just getting used to this whole outlaw business yourself.", parse);
	Text.NL();
	Text.Add("<i>“Which is why we’re trying to ease you in all nice-like.”</i> Vaughn thinks a moment, then shakes his head. <i>“That’s the long and short of it, [playername]. Go there in the evening, small park to the west of the castle. Girl by the name of Elodie, pretty young, likely to be dressed all formal-like, because castle servant, you see. Hand her the thieves’ tools, then come back to me for a debrief.”</i>", parse);
	Text.NL();
	Text.Add("All right, that sounds straightforward enough. You’ll be there and back without too much trouble.", parse);
	Text.NL();
	Text.Add("<i>“Right. High Command is counting on you to work hard in forwarding the cause, and all that other motivational stuff I’m supposed to be saying, but I honestly think is a bunch of crap. Have fun out there, and don’t come back to me before the job is done.”</i>", parse);
	Text.Flush();
	
	world.TimeStep({hour: 1});
	
	vaughn.taskTimer = new Time(0, 0, 3, 0, 0);
	
	party.Inv().AddItem(Items.Quest.OutlawLockpicks);
	
	vaughn.flags["Met"] = Vaughn.Met.OnTaskLockpicks;
	
	Gui.NextPrompt();
	//#add “Tools” option to castle grounds.
}

Scenes.Vaughn.Tasks.Lockpicks.ElodieAvailable = function() {
	return world.time.hour >= 16 && world.time.hour < 21;
}

//Triggered in castle grounds
Scenes.Vaughn.Tasks.Lockpicks.MeetingElodie = function() {
	var parse = {
		playername : player.name
	};
	
	Text.Clear();
	//Correct time
	if(!Scenes.Vaughn.Tasks.Lockpicks.ElodieAvailable()) {
		Text.Add("You arrive at the park and spy the bench by the pond, but there’s currently no one sitting on it at the moment, let alone someone who could be your contact. What was the meeting time again? Sometime in the evening? Maybe you should come back then.", parse);
		Text.Flush();
		
		world.TimeStep({minute: 10});
		
		Gui.NextPrompt();
		return;
	}
	
	var metElodie = rigard.flags["Nobles"] & Rigard.Nobles.Elodie;
	
	Text.Add("Evening lends a calm air to the castle grounds, and you arrive at the park as instructed. With the day drawing to a close, servants and nobles alike are enjoying what small amount of free time there’s to be had - this close to the castle proper, extra care is taken by the groundskeepers to ensure the flowerbeds are pristine and the lakes clear.", parse);
	Text.NL();
	Text.Add("<b>“No walking on the grass”</b> - elsewhere, that might be a joke, but it wouldn’t do to test the resolve of the patrols that’re charged with enforcing such.", parse);
	Text.NL();
	Text.Add("After a little looking around, you spy the bench that Vaughn singled out - an elegantly carved two-seater facing a small pond. Seated on it is a young woman, a small brown bag full of breadcrumbs in her hands as she reaches into it and scatters them onto the water’s surface, much to the local ducks’ delight.", parse);
	Text.NL();
	if(metElodie) {
		Text.Add("You recognize her immediately: the maid who was staring at you on the streets of the castle grounds some time back. She’s with the outlaws? Well, it would explain why she was eyeing you, or how she managed to blend into the crowd so effortlessly. The result of plenty of practice, no doubt.", parse);
		Text.NL();
		Text.Add("Well, it seems like you’ll get the chance to confront her, regardless of how either of you feels about it.", parse);
		Text.NL();
		Text.Add("Clearly, she’s felt your gaze upon her, for she looks up and meets your eyes, brushing a few stray strands of rust-brown hair out of the way. You do your best to be discreet in quickly sketching the outlaws’ symbol in the air, then let out the breath you’d been holding when she quickly sketches the three-fingered paw back at you and picks up her headdress from the bench.", parse);
		Text.NL();
		Text.Add("<i>“Ah, so my suspicions were right. You <b>are</b> with us, then.”</i>", parse);
		Text.NL();
		Text.Add("What kind of suspicions did she have about you that she was staring at you in the street?", parse);
		Text.NL();
		Text.Add("<i>“The kind someone in my position should have when an unknown quantity turns up. Now hurry, beside me. And don’t be so self-conscious, you’re drawing attention.”</i>", parse);
	}
	else {
		Text.Add("You take a moment to size up the young woman. Dressed in a long-sleeved blouse, apron and long skirts all dyed in the royal colors, there’s little doubt that she’s a servant of some sort - her outfit just screams “maid”, although to whom and in what standing, you’re not completely sure.", parse);
		Text.NL();
		Text.Add("Judging by the white linen gloves she’s wearing and the headdress lying on the bench beside her, though, you’re guessing that she does serve someone quite important for her daily dress to require such. Neat and clean, but deliberately muted, her attire’s clearly designed to be presentable and elegant without running the risk of outshining any important personages nearby.", parse);
		Text.NL();
		Text.Add("All in all, she looks really young - couldn’t be more than eighteen or nineteen, which only makes her ample bosom stand out on her still maturing frame. A touch of morph blood in her veins, perhaps? A silvered brooch pinned on her breast marks her as being in the castle’s employ which is probably why she’s been left largely alone while waiting for you. Raucous though the local lads may be, they presumably know enough to run the risk of displeasing someone within the castle.", parse);
		Text.NL();
		Text.Add("Clearly, she’s felt your gaze upon her, for she looks up and meets your eyes, brushing a few stray strands of rust-brown hair out of the way. You do your best to be discreet in quickly sketching the outlaws’ symbol in the air, then let out the breath you’d been holding when she quickly sketches the three-fingered paw back at you and picks up her headdress from the bench.", parse);
		Text.NL();
		Text.Add("<i>“Hurry, beside me. And don’t be so self-conscious, you’re drawing attention.”</i>", parse);
	}
	Text.NL();
	Text.Add("Well, that’s an invitation if you ever had one. Easing yourself onto the bench beside her, you lean back and try to look nonchalant as she continues feeding the ducks.", parse);
	Text.NL();
	Text.Add("She’s Elodie?", parse);
	Text.NL();
	Text.Add("<i>“Yes, and you’re [playername], the one who came through the portal. You have them?”</i>", parse);
	Text.NL();
	Text.Add("Wordlessly, you produce the bag of thieves’ tools and slide them across to Elodie. She palms the bag, draws it open and peers inside, scrutinizing its contents before tying it closed and tucking it away into her apron.", parse);
	Text.NL();
	Text.Add("<i>“Send the badger my regards.”</i>", parse);
	Text.NL();
	Text.Add("Brusque, isn’t she? Since there’s the possibility that you’re going to be working together from now on, shouldn’t you at least introduce yourselves properly?", parse);
	Text.NL();
	Text.Add("Elodie doesn’t reply immediately, instead looking about her for… well, you’re not sure what it is she’s looking for. The ducks quack happily as she throws another handful of breadcrumbs onto the lake’s surface. <i>“Right. The next person I’m supposed to meet this evening isn’t here yet, so I’ve some time to spare. I’m Elodie, handmaiden to the Queen - or rather, one of the many handmaidens to the Queen.”</i>", parse);
	Text.NL();
	Text.Add("Right. That would explain the fancy outfit.", parse);
	Text.NL();
	Text.Add("<i>“This isn’t ‘fancy’. Trust me, you haven’t seen fancy when it comes to what goes on within the castle.”</i>", parse);
	Text.NL();
	Text.Add("Fine, fine. Still, it surprises you that the outlaws would have someone so close to the royal family. With someone in Elodie’s position, you’d have thought they’d have made a move by now. Is that what the thieves’ tools are for?", parse);
	Text.NL();
	Text.Add("<i>“How much do you know about Majid?”</i> Elodie replies. <i>“Do you know, for example, that before he became vizier to our good king Rewyn, he was a common criminal?”</i>", parse);
	Text.NL();
	Text.Add("No… you didn’t know that. Come to think about it, you don’t really know that much about his past, even though everything you’ve heard about him tends to be bad news.", parse);
	Text.NL();
	Text.Add("<i>“Oh, he was somewhat high up, as criminals reckon themselves. Nevertheless, our dear vizier was a criminal all the same, and I have little doubt he still is.”</i> She jangles the pouch in her apron. <i>“The evidence I need is close, I’m sure of that. All I have to do is actually get my hands on it…”</i>", parse);
	Text.NL();
	Text.Add("Well, good luck with that.", parse);
	Text.NL();
	Text.Add("<i>“Yes.”</i> She looks around once more, then eyes you. <i>“I suggest that you be on your way soon. My next contact is about to arrive. Say hello to the people in the forest for me.”</i>", parse);
	Text.NL();
	Text.Add("Right. You just need to ask one more thing… there isn’t any way that she could help get you into the castle, is there?", parse);
	Text.NL();
	Text.Add("<i>“No. Let’s put it in perspective: it took me seven years to work my way up from scullery girl to handmaiden to the Queen, during which I took more than a few liberties which I realize could have gone very, very badly for me had I been less lucky. Getting into the castle isn’t something that’s easily done. You’re obviously resourceful to worm your way into the grounds on such short notice, but I can’t help you with this one.”</i>", parse);
	Text.NL();
	Text.Add("All right. Well, there doesn’t seem like there’s anything else for you here. Standing up, you dust off your seat and leave the park just in time to see a well-dressed man take a seat besides Elodie and strike up a conversation, just like you did. As you look on, her previously hard demeanor quickly melts away into one of shy, girlish innocence at the drop of a hat, a changing of masks. The last glimpse you have of Elodie is that of her squeaking in surprise and giggling nervously as her contact pinches her butt.", parse);
	Text.NL();
	Text.Add("Seems like her evenings are quite busy… well, it’s none of your business. Time to head back and report in, then.", parse);
	Text.Flush();
	
	party.Inv().RemoveItem(Items.Quest.OutlawLockpicks);
	
	vaughn.flags["Met"] = Vaughn.Met.LockpicksElodie;
	
	world.TimeStep({hour: 1});
	
	Gui.NextPrompt();
}

//Automatically triggers when approaching Vaughn after completing the task.
Scenes.Vaughn.Tasks.Lockpicks.Debrief = function() {
	var parse = {
		playername : player.name
	};
	
	Text.Clear();
	Text.Add("<i>“Ah, you’re back.”</i> Vaughn tips his hat at you as you approach. <i>“Passed them along just fine, didn’t you?”</i>", parse);
	Text.NL();
	Text.Add("Yes, you did.", parse);
	Text.NL();
	if(vaughn.taskTimer.Expired()) {
		Text.Add("<i>“Right, right. Remember what I said about not taking your time and acting as if everything’s going to wait forever until you go and start things? Well, perhaps you didn’t, because those picks arrived later than they ought to have.</i>", parse);
		Text.NL();
		Text.Add("<i>“It’s not too much of a problem now - better late than never, as some say - but from here on out, late is going to be never. You’ll want to be punctual, because if you act like someone who can’t be relied upon, don’t be surprised when people don’t rely on you to get the job done.”</i>", parse);
		Text.NL();
		Text.Add("Right, right, you’ll be punctual from here on out.", parse);
		Text.NL();
		Text.Add("<i>“As I said, it’s better to not accept and let others do the job than accept and not show up. I mean it - people are going to be very, <b>very</b> upset if you waste all their hard work just because you showed up late. Consider this fair warning; this isn’t your family’s business, as the saying goes. Now, back to the point. What were you about to say?”</i>", parse);
		Text.NL();
	}
	else {
		outlaws.relation.IncreaseStat(100, 1);
	}
	Text.Add("Seems like even the castle isn’t free of the shenanigans that’re sweeping the kingdom.", parse);
	Text.NL();
	Text.Add("Vaughn removes his hat and wipes his brow, swivelling his ears in your direction. <i>“What? You mean the place where the people responsible for all this crap live is supposed to be free of the crap itself? Spirits forbid, you’d have expected them to know not to shit where they eat, but hey, seems like it’s just the opposite. I don’t envy Elodie, but that girl’s got some fire within her. She’s the only person we’ve got inside the castle, and that took years to set up.”</i>", parse);
	Text.NL();
	Text.Add("You were told as much, yes.", parse);
	Text.NL();
	Text.Add("<i>“Well, that seems to wrap it up. I do hope that girl doesn’t get in over her head - she has a thing for anything remotely related to the vizier, but there’s no stopping her.</i>", parse);
	Text.NL();
	Text.Add("<i>“As for you, [playername], I can’t give you much in return, but maybe you should head down to Raine’s and get something hot to eat. I’ll indent a bottle of moonshine in your name; it’s the least I can do. Amazing what you can do with water, wild fruit and a little sugar - just remember to turn in the bottles when you’re done. Glass is hard to come by these days.”</i>", parse);
	Text.NL();
	Text.Add("With that, he plonks his hat onto his head once more, and lights up a cigarette before heading into the watchtower’s confines.", parse);
	Text.Flush();
	
	vaughn.flags["Met"] = Vaughn.Met.CompletedLockpicks;
	
	outlaws.relation.IncreaseStat(100, 3);
	
	world.TimeStep({hour: 1});
	
	Gui.NextPrompt();
}


Scenes.Vaughn.Tasks.Snitch = {};
Scenes.Vaughn.Tasks.Snitch.Available = function() {
	if(vaughn.flags["Met"] >= Vaughn.Met.CompletedSnitch) return false;
	return true;
}
Scenes.Vaughn.Tasks.Snitch.OnTask = function() {
	return vaughn.flags["Met"] == Vaughn.Met.OnTaskSnitch;
}
Scenes.Vaughn.Tasks.Snitch.Completed = function() {
	return vaughn.flags["Met"] >= Vaughn.Met.CompletedSnitch;
}

//Disable this and jump ahead to task 3 if Miranda has been permanently recruited.
Scenes.Vaughn.Tasks.Snitch.Start = function() {
	var parse = {
		playername : player.name
	};
	
	Text.Clear();
	Text.Add("<i>“All right, then. Let’s see how good you are at a little sneaking about, then.”</i>", parse);
	Text.NL();
	Text.Add("What does he have in mind? Is he going to ask you to filch something?", parse);
	Text.NL();
	Text.Add("Vaughn grins. <i>“Actually, just the opposite. The boss-man would like you to put something where it shouldn’t be.”</i>", parse);
	Text.NL();
	Text.Add("That does sound interesting. Why, he should tell you more about what he has in mind.", parse);
	Text.NL();
	Text.Add("<i>“We’ve had a little problem with a certain constable in the City Watch shaking down the beggars on the streets, keeping them from even the usual spots which by tacit agreement, they’re allowed to ply their trade. Fellow by the name of Terrell… seriously, what kind of guy shakes down beggars for two coins’ worth of protection money?</i>", parse);
	Text.NL();
	Text.Add("<i>“Needless to say, the beggars are rather fed up with the situation, and since they’re our eyes and ears on the streets, it’s behooved the boss-man to step in and offer his support. Stand up for the poor and dispossessed, you know? Play the noble spirit and dish out a little justice?”</i>", parse);
	Text.NL();
	Text.Add("What a lofty goal. Vaughn and you lock eyes for a moment, then his grin twists into a smirk as he reaches into his vest and pulls out a folded slip of rough, stained paper. He thrusts it at you, and you catch it. Unfolding the paper, it’s a hand-drawn map of several blocks in the residential district, with lines drawn in the streets and times scribbled on the margins. You look up at Vaughn, and he shrugs.", parse);
	Text.NL();
	Text.Add("<i>“Funny thing about a corrupt fellow, I’ve noticed, is how he can’t keep it contained to just one or two instances. No, once a bastard goes on the take, he tends to grab as much as he can get. What you’re holding in your hands shows a number of surprise inspections on various establishments which took place place in the last week, establishments which were suspected of running illegal, untaxed games of chance. Oddly enough, despite the information they had, the City Watch turned up nothing in their raids.”</i>", parse);
	Text.NL();
	Text.Add("Terrell?", parse);
	Text.NL();
	Text.Add("<i>“Now you’re catching on. He sold out the watch, gave away the patrol route, and for what? A handful of coins? Frankly, we’re doing the watch a favor. If he’d kept to pushing around the poor and homeless, no one’d given a fuck. As it is, though… fellow’s overextended himself, and that makes it so much easier for us to take him down. As it stands, getting his bill of sale to the gambling dens was tricker than we’d expected, but we have him now.</i>", parse);
	Text.NL();
	parse["num"] = (world.time.hour < 12) ? "two" : "three";
	Text.Add("<i>“There’s going to be a locker inspection at the City Watch headquarters at six in the evening [num] days from now. Now, we aren’t about to show our faces around the City Watch headquarters, but they don’t know you. Get in there before then, plant this evidence in his locker, and step back to watch the fireworks. Now, I don’t know how to find his locker or how you’ll get into his things, so you’ll be alone in that regard. Nevertheless, it’s the best way for his superiors to sniff him out in a natural fashion, and we’d prefer that by far.”</i>", parse);
	Text.NL();
	Text.Add("If the evidence is solid, then why shouldn’t you just walk into the commander’s office and slam it down on the desk? It should stand on its own merits, shouldn’t it?", parse);
	Text.NL();
	Text.Add("Quirking an eyebrow, Vaughn stares at you for a good half-minute or so, then bursts out in laughter. <i>“Oh, that’s a good one, [playername]. For a moment there, I thought you were actually serious. I mean, who thinks the watch is going to take some stranger’s word over one of their own? Really really good joke, you nearly got me.”</i>", parse);
	Text.NL();
	Text.Add("Um… okay.", parse);
	Text.NL();
	Text.Add("<i>“All right, then. You’ve got your orders, don’t come back to me until you’ve got something to report.”</i> Vaughn dismisses you with a wave of a hand. <i>“Oh, and stay out of trouble. Things have been getting worse and worse in Rigard of late, and I’d rather not see you end up on the inside of a cell - or worse. Good luck.”</i>", parse);
	Text.NL();
	//TODO: This kinda doesn't work with reqruited Miranda
	Text.Add("As you walk away, though, you can’t help but wonder about what Vaughn said. Sure, you may not know many of the watch personally, but you’re pretty sure Miranda’s on the straight and narrow. If the map is as solid evidence as Vaughn claims it is, then you should be able to talk Miranda around to your point of view. The more you consider the idea, the more it sounds like a viable alternative to sneaking into the City Watch headquarters - and probably easier, too, especially if you’re not confident that you’re skilled enough to not get caught in the act.", parse);
	Text.NL();
	if(miranda.Nasty()) {
		Text.Add("Of course, given that the two of you aren’t on the best of terms at the moment, you might have to do more than just talk her into listening to you.", parse);
		Text.NL();
	}
	Text.Add("Well, what happens next is up to you. It’s not as if you don’t know where to find the City Watch headquarters… that, or Miranda when she’s off-duty.", parse);
	Text.Flush();
	
	world.TimeStep({hour: 1});
	
	vaughn.flags["Met"] = Vaughn.Met.OnTaskSnitch;
	
	var step = world.time.TimeToHour(18);
	if(world.time.hour < 12)
		vaughn.taskTimer = new Time(0, 0, 2, step.hour, step.minute);
	else
		vaughn.taskTimer = new Time(0, 0, 3, step.hour, step.minute);
	
	//#add Evidence option to Miranda at the Maidens' Bane.
	//#add Evidence option to City Watch grounds.
	
	Gui.NextPrompt();
}

Scenes.Vaughn.Tasks.Snitch.MirandaTalk = function(options, onDuty) {
	if(vaughn.taskTimer.Expired()) return;
	if(vaughn.flags["Met"] == Vaughn.Met.OnTaskSnitch && miranda.flags["Snitch"] == 0) {
		options.push({ nameStr : "Snitch",
			tooltip : "Present your evidence against Terrell to Miranda and ask the dobie if anything can be done.",
			func : function() {
				Scenes.Vaughn.Tasks.Snitch.Miranda(onDuty);
			}, enabled : true
		});
	}
}

Scenes.Vaughn.Tasks.Snitch.Miranda = function(onDuty) {
	var parse = {
		playername : player.name
	};
	
	Text.Clear();
	if(onDuty) {
		Text.Add("You take a look around, spotting several of Miranda’s colleagues nearby. Perhaps you should try to find somewhere more private to present her with Vaughn’s evidence. It’ll definitely be easier to sway her if she’s on her own, if it comes to that.", parse);
		Text.Flush();
		//Just leave it at that, the old menu stays
		return;
	}
	//else #else, Triggered at the Maidens’ Bane
	
	parse = player.ParserTags(parse);
	
	Text.Add("Well, you’re here, Miranda’s here, and no one’s looking directly at the both of you. You’ve decided on doing this, might as well get it over with. Convincing Miranda to take action without asking too many inconvenient questions might not be the easiest of tasks, but it’s still more appealing than tampering with someone’s possessions in the City Watch headquarters.", parse);
	Text.NL();
	Text.Add("Let’s see whether you get off on the right foot, then. Calling over a serving wench, you order a couple of drinks, then settle in as they’re brought to your table.", parse);
	Text.NL();
	if(miranda.Nice()) {
		Text.Add("<i>“Ho!”</i> Miranda exclaims as you pull the evidence out of your possessions. <i>“What’s this we have here?”</i>", parse);
		Text.NL();
		Text.Add("Slowly, you unfold the paper and explain to Miranda what all this is supposed to mean. Does she have any memory of the most recent crackdown on illegal gambling dens?", parse);
		Text.NL();
		Text.Add("<i>“I’m not surprised that you heard about it - everyone down at the yard’s been grumbling about it day and night. Of course I still remember it clear as day - my feet still hurt from tramping up and down the streets, rushing from place to place. And for what? Nothing at all. We had good info. We’d been watching each one for a week at least. And when we finally come in to shut them down and round them up, suddenly everything’s just hunky-dory.”</i> The dobie makes a show of spitting onto the table. <i>“All that time wasted, and for what? They’ll move their shows somewhere else, and we’ll have to find them all over again. Could take weeks. Months.”</i>", parse);
		Text.NL();
		Text.Add("Right, right. Seeing as how Miranda’s exhausted all her vitriol for now, you deem it safe to draw her attention to the paper. Does that handwriting seem familiar? Maybe the times scribbled in the margins? Or the city block - or at least, you think that’s what it is - depicted here in crudely-drawn squares and rectangles?", parse);
		Text.NL();
		Text.Add("The dobie frowns at you over her drink. <i>“What’re you getting at, [playername]? That’s -”</i>", parse);
		Text.NL();
		Text.Add("All of a sudden, Miranda’s eyes harden, and she pushes her drink away, the entirety of her attention focused on the little scrap of paper laid out in front of her. She reads it all the way through, then once more, and a final time. Taking her tankard in hand, Miranda slowly tightens her grip - you can actually see the dobie’s knuckles tighten under skin and fur until the tankard crumples and folds in her hand. Cheap beer spills out from the container’s remains, wetting the table - you rush to pull Vaughn’s evidence out of the way and urge her to calm down before she breaks the table, too.", parse);
		Text.NL();
		Text.Add("Miranda clearly chafes at the thought of calming herself, but acquiesces while you call for someone to clean up the mess and add the broken tankard to your tab. <i>“I knew it. One might’ve been chance. Two would’ve been suspicious - but every single sting we were supposed to make that day being bummed out like that? Someone sold us out!”</i>", parse);
		Text.NL();
		Text.Add("Right. Does she have an idea of who it is?", parse);
		Text.NL();
		Text.Add("<i>“Think so.”</i> Miranda looks down at the paper again and claps one meaty fist against the other’s palm. <i>“Look, the bastard even had the times when we were expected to arrive - since the times were only mentioned at last week’s muster, that narrows it down to those present then, and there’s only one bastard amongst those who writes like that. I never liked him… bastard. Can I have this thing?”</i>", parse);
		Text.NL();
		Text.Add("Why, of course. You’re more than willing to let her have the evidence - you were supposed to plant it anyway, so it’s not as if Vaughn’s expecting you to return it to him. Smiling, you tell Miranda she’s more than welcome to have it. She’ll need something to show her superiors, after all.", parse);
		Text.NL();
		Text.Add("Miranda growls and pockets the paper. <i>“First thing once I get back to the yard, I’m kicking down the door to the commander’s office and planting this straight on the desk, but first, a drink for the nerves. Feel fit to bust one any moment now - you kind of expect thugs and their sort to have no sense of decency, but when it’s one of our own…</i>", parse);
		Text.NL();
		Text.Add("<i>“Got to ask you, though. Where’d you find this? Doesn’t seem like it’s the sort of thing one finds lying around. I know you wandering types have your ways - I used to find all sorts of crazy shit back in my time with the Black Hounds - but I still gotta ask.”</i>", parse);
		Text.NL();
		Text.Add("And right on cue, the inconvenient question. While Miranda might be more reasonable than most of the City Watch, you’re not quite about to confess to her you’re with the outlaws - even if she didn’t want to lock you up, she’d be obligated to, and you know her well enough to bet on her fulfilling that obligation. That leaves either refusing to answer the question, or outright lying to her, regrettable as it may be.", parse);
		Text.NL();
		Text.Add("Decisions, decisions…", parse);
		Text.Flush();
		
		//[Refuse][Lie]
		var options = new Array();
		options.push({ nameStr : "Refuse",
			tooltip : "You’re not going to deceive her, but you’re not going to tell the whole truth, either.",
			func : function() {
				Text.Clear();
				Text.Add("A friend, you tell Miranda. You can’t reveal his name because that would get him into trouble - he spoke to you trusting that he wouldn’t be snitched on. The evidence is good, and you’re willing to stake your reputation on it.", parse);
				Text.NL();
				Text.Add("<i>“Snitches get stitches, as they say in the slums,”</i> Miranda agrees morosely. Her replacement drink arrives, and throwing back her head, she gulps down half the tankard in one go. <i>“I understand, but that means if the commander starts asking questions, I’ll have to name you as the snitch instead of whoever passed this to you - no problems there, right?”</i>", parse);
				Text.NL();
				Text.Add("You <i>did</i> just say you were willing to stake your reputation on it. To be frank, if it weren’t for the fact that another watchman would have greater clout and a better grip on the situation, you’d have walked into the yard yourself instead of seeking her out.", parse);
				Text.NL();
				Text.Add("<i>“Yeah, I get what you’re saying. Good old doggy here, she’ll carry your papers where they need to go. Y’know, what with you not knowing who was selling us out, I’m kinda glad you came to me.”</i>", parse);
				Text.NL();
				Text.Add("You reply that while she may be many things, you know that Miranda isn’t a sell-out.", parse);
				Text.NL();
				Text.Add("<i>“Aw, shucks. Flattery isn’t going to get you anywhere with me, you know.”</i> Miranda polishes off the rest of her drink, then slams the empty tankard on the table. It takes a couple of tries for her to get Vaughn’s evidence folded up again, but at last she manages it. <i>“Thanks for passing this along and thinking of me, though. I’ll definitely remember this.”</i>", parse);
				
				miranda.relation.IncreaseStat(100, 5);
				
				PrintDefaultOptions();
			}, enabled : true
		});
		options.push({ nameStr : "Lie",
			tooltip : "What’s a little white lie? Justice is served, and you don’t want to see the inside of a cell.",
			func : function() {
				Text.Clear();
				Text.Add("Right. You quickly try and think of a plausible lie, and tell Miranda that you got the evidence off one of the den’s employees who’s harboring a grudge against his current boss. Now, you have to watch out for your informants, so you’re not going to tell Miranda just <i>who</i> it is, but suffice to say that while it took a little effort, it certainly wasn’t impossible for said informant to get the bill of sale.", parse);
				Text.NL();
				Text.Add("<i>“That’s it?”</i> Miranda’s replacement drink arrives, and the dobie takes it in hand, peering into the beer’s murky, foamy depths before quaffing half the tankard in one go. <i>“And here I was, thinking you were going to cook up some cock-and-bull story full of details, instead of just that.”</i>", parse);
				Text.NL();
				Text.Add("What? Were you supposed to have done that? You thought to keep it short and to the point, since you know that she’s not the kind to take nicely to any kind of bullshitting on anyone’s part.", parse);
				Text.NL();
				Text.Add("<i>“No, no. That’s actually how a good number of stakeouts get started in the first place - someone we know and trust comes up and tips us off. Much like what you’re doing right now, although of course I haven’t known you as long as some of those ‘good citizens’ we know.”</i>", parse);
				Text.NL();
				Text.Add("But she believes that your information is good?", parse);
				Text.NL();
				Text.Add("<i>“The times, the locations… right down to the patrol route, it all checks out. You couldn’t have come up with this on your own, [playername], you weren’t at the muster when we all discussed these. You must’ve gotten your hands on this somehow, and it wasn’t from one of us.”</i> Miranda nods, then polishes off the rest of her drink. <i>“Although I’ll say, if I get egg - or worse - on my face because of you, then you know who I’m going to be looking for…”</i>", parse);
				
				miranda.relation.IncreaseStat(100, 3);
				
				PrintDefaultOptions();
			}, enabled : true
		});
		
		Gui.Callstack.push(function() {
			Text.NL();
			Text.Add("Right. You sip at your drink, and watch Miranda shuffle out of her seat. She’s going already?", parse);
			Text.NL();
			Text.Add("<i>“Terrell, the bastard…I’d love to stay and drink some more, [playername], but this is more important than you’d imagine. Aria’s tits, we’re the <b>City Watch</b>, not the Royal Guard. We may not have fancy livery or talk all fancy, but we’ve got what counts. Our swords may not be shiny, but they’re damn well sharp - and most importantly, we’re supposed to have each others’ backs.”</i>", parse);
			Text.NL();
			Text.Add("With that, Miranda reaches into her pockets and draws out a handful of coins. <i>“For you,”</i> the dobie says, muttering to herself. <i>“Pay for my drink and the broken crap, and buy yourself a couple of drinks, okay? You’ve just done me a big favor. Now, if you don’t mind, I’ve got some heads to crack…”</i>", parse);
			Text.NL();
			Text.Add("You watch Miranda storm off, and the palpable heaviness in the air lifts with her passing. Yeah… regardless of what happens next, Terrell’s fate isn’t one that you’d wish upon anyone. By the look of things, you can probably head back to Vaughn and tell him of your success, even if you didn’t come by it the way he expected.", parse);
			Text.Flush();
			
			if(miranda.Attitude() < Miranda.Attitude.Nice)
				miranda.flags["Attitude"] = Miranda.Attitude.Nice;
			
			world.TimeStep({hour: 1});
			
			vaughn.flags["Met"] = Vaughn.Met.SnitchMirandaSuccess;
			miranda.flags["Snitch"] |= Miranda.Snitch.SnitchedOnSnitch;
			
			miranda.snitchTimer = vaughn.taskTimer.Clone();
			
			Gui.NextPrompt();
		});
		
		Gui.SetButtonsFromList(options, false, null);
	}
	else {
		Text.Add("<i>“Why’re you being so nice to me all of a sudden?”</i> Miranda practically snarls, the dobie eyeing you suspiciously as a serving wench brings the both of you your drinks - tankards of cheap beer, by the looks of it. <i>“You want something from me, don’t you?”</i>", parse);
		Text.NL();
		Text.Add("Well, it’s not that you <i>want</i> something from her, but if she could give you her attention for a moment… biting your lip, you draw out Vaughn’s evidence and hope that she’s in an accepting mood this evening.", parse);
		Text.NL();
		Text.Add("Unfortunately, she isn’t. Miranda turns away from you without even so much as looking at what’s in your hands or touching her drink. <i>“Not interested.”</i>", parse);
		Text.NL();
		Text.Add("Damn it, can she just get over it for a moment and pay you mind for ten minutes? She can go straight back to being ornery after hearing you out and you can take things from there, but this is important!", parse);
		Text.NL();
		Text.Add("<i>“Oh? Important?”</i>", parse);
		Text.NL();
		Text.Add("Yes, important.", parse);
		Text.NL();
		Text.Add("<i>“How important?”</i>", parse);
		Text.NL();
		Text.Add("<i>Very</i> important.", parse);
		Text.NL();
		Text.Add("Miranda snorts, the dobie folding her arms under her bosom. <i>“That important, eh? Well, if it’s so important to you, I’m sure you wouldn’t mind sucking me off. Can’t think straight, not with an itch in my dick, and if this crap is so important to you, then you can put up with it for a little while.”</i>", parse);
		Text.NL();
		Text.Add("Hey, wait a minute -", parse);
		Text.NL();
		Text.Add("<i>“Thought you said it was important,”</i> Miranda replies, the dobie’s muzzle twisting in a crude leer. <i>“So you can put up with your distaste of my dick and suck me off under the table here and now, or you can forget about whatever it is you want to bother me about.”</i>", parse);
		Text.NL();
		Text.Add("Seems like Miranda’s in a positively foul mood, and entreating with her any further is probably only going to make things worse; she’s clearly intent on punishing you for walking out of her. So… what are you going to do now? Are you going to give in to the dobie’s demand for you to blow her, or not?", parse);
		Text.Flush();
		
		//[Yes][No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			tooltip : "If that’s what she wants…",
			func : function() {
				Text.Clear();
				Text.Add("You wait in stony silence for a few minutes, the hubbub of the Maiden’s Bane swirling about the two of you, but Miranda really isn’t going to relent.", parse);
				Text.NL();
				Text.Add("Fine. If this is what it’ll take, then you’ll do it.", parse);
				Text.NL();
				Text.Add("<i>“So, it <b>is</b> that important to you,”</i> Miranda sneers. <i>“Get under and start sucking, slut.”</i>", parse);
				Text.NL();
				parse["l"] = player.HasLegs() ? "on all fours - the table’s not even high enough for you to sit on your knees -" : "and dirty";
				Text.Add("Blowing a canid guardswoman under the table in a crowded bar… somehow, you get a distinct sense of deja vu about this whole thing. Well, you’ve decided to do this, time to get it over with; the less you dwell on it, the less it’ll hurt. You push aside your chair, get down [l] and crawl under the table. The floor of the Maiden’s Bane, while not exactly filthy, isn’t what you’d call clean, and it’s dark and ever so slightly damp under the old table. While all you can see from here is other peoples’ feet, you get the distinct impression that everyone else in the barroom can see you - and even if they couldn’t, it’s not as if they’re not going to figure out what’s going on.", parse);
				Text.NL();
				Text.Add("Before you know it, Miranda already has her shaft out, emerging from her uniform like a thick, juicy sausage. Guess she’s no stranger to the motions - with a lazy grunt, she spreads her legs wide open, letting you take in the full implications of what you’ve just agreed to do. Pushing forward her throbbing shaft, Miranda rubs it against your lips, letting you get a good taste of dobie dick, complete with a bead of pre-cum at the top. Is the thought of getting back at you making her <i>that</i> excited?", parse);
				Text.NL();
				parse["h"] = player.Hair().Bald() ? "head" : "hair";
				if(player.Slut() < 50) {
					Text.Add("You instinctively try to turn your head away at the sheer size of that massive member, but Miranda reaches under the table and grabs you by the [h], forcing your attention back where she wants it.", parse);
					Text.NL();
					Text.Add("<i>“Open up, you wimp. You picked the fight with me, now accept your punishment,”</i> she snarls, then yanks hard on your [h]. As you open your mouth to gasp from the sudden movement, the dobie guardswoman thrusts forward, plunging her cock between your lips and ramming it against the back of your throat, making you gag. Your eyes bulge at the sheer <i>girth</i> you’re forced to take in your maw, its taste coating your tongue and filling your nose, but Miranda doesn’t care. <i>“There, now suck! I'll beat you if you try to bite!”</i>", parse);
					Text.NL();
					Text.Add("Judging by the sheer vindictive edge in her voice, she clearly means every word of it, too. Feeling Miranda’s ramrod-straight shaft slip in and out of your gullet, you hold your proverbial nose and begin.", parse);
				}
				else {
					Text.Add("Despite how massive it is, your eyes can’t help but be drawn to Miranda’s member. While the more sensible portion of your mind - or at least, what’s left of it - helpfully suggests that putting that in your mouth probably isn’t the best of ideas, the rest of you has other ideas. Besides, if you’re going to have to do this, you might as well enjoy it.", parse);
					Text.NL();
					Text.Add("Seizing hold of that dobie dong, you let your fingers play over its heated, pulsating length even as Miranda pats you on the head like an animal.", parse);
					Text.NL();
					Text.Add("<i>“I thought you hated dick?”</i> the guardswoman jeers. <i>“Or is it just my dick that’s so disgusting to you? I don’t know whether I should be even more disgusted with you, or just plain honored.</i>", parse);
					Text.NL();
					Text.Add("<i>“Now start sucking, slut.”</i>", parse);
					Text.NL();
					Text.Add("She wants you to suck? Fine, you’ll suck alright.", parse);
				}
				Text.NL();
				Text.Add("With a muffled moan, you relax your mouth and throat as best as you can to get the job done and give your tongue space to at least try and do <i>something</i>. It’s hard, considering that it’s hard to even breathe, ", parse);
				if(player.sexlevel >= 3) {
					Text.Add("but you at least manage to get some wiggle room around Miranda’s mountainous shaft and run your tongue along the base of her shaft as she thrusts back and forth.", parse);
					Text.NL();
					Text.Add("<i>“Not too shabby,”</i> Miranda grunts as she works away, her words punctuated by small gasps of breath. <i>“Knew you’d come around to my way of thinking sooner or later, slut.”</i>", parse);
				}
				else {
					Text.Add("and it’s quite the futile endeavor - your mouth simply isn’t flexible enough for that. Not as if you could protest, even if you’d the mind to - all you can do is to go with the flow and try your best to prevent yourself from choking, or even worse, throwing up.", parse);
				}
				Text.NL();
				Text.Add("Miranda stifles a moan, her doggy dick hardening even more until you can distinctly feel every ridge and pulsing vein against your tongue and the roof of your mouth. There’s little doubt her intention is to make this short and sharp, but even so, you’re surprised when she picks up the pace, steady pounding turning into a frenzied ramming as if she were in a race to get herself off as quickly as possible.", parse);
				Text.NL();
				Text.Add("Clearly, Miranda’s decided that your grace period is over, and begins to skullfuck you vigorously, taking this opportunity to vent her accumulated frustrations on your person. You can’t quite see anything above the dobie’s waist, but by the way the chair she’s sitting on is creaking and the occasional thumping from the table’s surface above, she’s trying to steady herself; judging by how hard your head is being slapped back with each of Miranda’s thrusts, you’re not surprised.", parse);
				Text.NL();
				Text.Add("There’s not much you can do now but ride this one out - slightly disoriented by the rapid, violent movements your head and neck are being subjected to, you’re taken by surprise when Miranda cums hard and fast. Next thing you know, a meaty hand is pressing into your face, separating you from Miranda’s shaft with an audible pop.", parse);
				Text.NL();
				Text.Add("<i>“Oh no, you don’t get to swallow and hide it,”</i> the dobie growls. <i>“I want everyone in the barroom to see you painted all over. That should be a laugh.”</i>", parse);
				Text.NL();
				parse["arm"] = player.Armor() ? Text.Parse(" and gets into your [armor]", parse) : "";
				Text.Add("Not that you have the time or presence of mind to reply - you can actually hear the drinks rattle on the table above you as Miranda blasts load after load of thick, steaming cum all over your face and [breasts]. It seeps into your clothing[arm], leaving a distinct slippery stickiness all over your [skin] before dripping onto the wooden floor. Whoever’s slated to clean this up afterwards is going to have a nasty time dealing with the thick pool of spunk that’s gathering about the table legs.", parse);
				Text.NL();
				Text.Add("<i>“Fine, we’re done. Get up. Clean yourself off if you want - there’s no way you’re making yourself look good now.”</i>", parse);
				Text.NL();
				Text.Add("It’s over already? That was quicker than you’d expected, if rather more intense. Still reeling from the intensity of the facefuck you’ve just received, cum dribbling from your chin and neck, you shuffle out from under the table and wipe yourself off with the back of your hand. As Miranda predicted, the effort is pretty much useless at actually getting you to anywhere nearing presentable, and it results in is more people staring at you. Thankfully - or not - the onlookers have the good graces to turn away quickly when they realize what’s happening, leaving you and Miranda to stew in the aftermath of your hasty blowjob.", parse);
				Text.NL();
				Text.Add("<i>“Right.”</i> Miranda grins nastily at you, then leans back in her seat before polishing off the last of her beer. You note that she hasn’t bothered to put her dick back in her pants yet, perhaps to mock you. <i>“Let’s see what you’ve got for me, then. This is going to be good.”</i>", parse);
				Text.NL();
				Text.Add("What? Oh, right. What you came here for in the first place. Grimacing, you pull out Vaughn’s evidence once more, and slap it down on the table. By some miracle, it’s managed to escape unscathed, and Miranda takes it in her hands before unfolding it. The dobie’s lips move silently as she scans the paper - you hadn’t thought it possible that she could be any madder than she was already, but her expression steadily darkens like an ominous stormcloud. By the time she’s finished poring over the paper, Miranda looks practically rabid and ready to kill at the drop of a hat.", parse);
				Text.NL();
				Text.Add("<i>“Another drink!”</i> she barks at the closest serving wench. <i>“Not the cheap crap, but give me the distilled stuff from the cellar. And make it quick.”</i>", parse);
				Text.NL();
				Text.Add("As the poor girl scurries off, Miranda reads through Vaughn’s evidence once more, only pausing to shoot you the occasional suspicious glance through narrowed eyes. When the drink arrives, Miranda waves off the girl as she attempts to serve, snatches the freshly opened bottle and chugs several mouthfuls in one go.", parse);
				Text.NL();
				Text.Add("<i>“No. This can’t be right. It can’t be... but it explains so much. How each and every one of the dens we hit had managed to pack in their stuff by the time we came. The damn bastards, they seemed overly smug… there was a snitch amongst those who’d turned up at muster for the briefing the other day, and I think I damn well know who.</i>", parse);
				Text.NL();
				Text.Add("<i>“How the fuck did you get your hands on this?”</i>", parse);
				Text.NL();
				Text.Add("The only thing that’d probably make Miranda any more pissed than she currently is would be to tell her that you’re with the outlaws, and yet you know she’s got a nose for bullshit. You pare down the story as much as you think’s necessary, saying that your source would rather stay unnamed, but you’ll take responsibility for the evidence’s veracity if needed. Miranda doesn’t look wholly convinced, but at last she nods with a soft growl. It’s a little surprising at how easily she swallowed your words, but you <i>did</i> just blow her, and it’s clear she’s not exactly balanced at the moment.", parse);
				Text.NL();
				Text.Add("<i>“Fine. I get it. Most people who tip us off don’t want to be named, because snitches get stitches, as everyone knows - and I’m going to personally give some to that snitch the moment I get back to the yard. Them gambling dens have enough problems with those crooks squabbling over who gets to be top dog, this is probably one of those again. If you’re going to take responsibility for this…”</i> Miranda lets her voice trail off for a moment. <i>“Fuck it. I can’t believe this, but there’s no doubt it’s his handwriting. I’d recognize that chicken scrawl anywhere.”</i>", parse);
				Text.NL();
				Text.Add("You put on your most innocent face. Whose handwriting?", parse);
				Text.NL();
				Text.Add("<i>“That’s for me to know and for you to shut the fuck up about. This is watch business now, and it goes all the way up to the commander.”</i> By now, Miranda’s dick has softened enough for her to shove it back into her pants, which she does before standing up. <i>“I’m getting back to the watch house. No time to waste.”</i>", parse);
				Text.NL();
				Text.Add("With that, the dobie kicks in her chair and makes to leave, but not before turning back to you.", parse);
				Text.NL();
				Text.Add("<i>“You know, [playername], you sucked me off and you gave me a lead into why our stings have been coming up empty all the time of late. If this goes down right… well, this is bigger than just you and me. I’m willing to call it even between us if you are.", parse);
				Text.NL();
				Text.Add("Huh, now that’s a surprise. You wouldn’t have imagined it’d be like Miranda to let you off this easily, but she did say the words loud and clear. It’s an opportunity that you might not get easily again, should you pass it up…", parse);
				Text.Flush();
				
				vaughn.flags["Met"] = Vaughn.Met.SnitchMirandaSuccess;
				miranda.flags["Snitch"] |= Miranda.Snitch.SnitchedOnSnitch;
				miranda.flags["Snitch"] |= Miranda.Snitch.Sexed;
				
				miranda.snitchTimer = vaughn.taskTimer.Clone();
				
				world.TimeStep({hour: 2});
				
				//[Yes][No]
				var options = new Array();
				options.push({ nameStr : "Yes",
					tooltip : "Yeah, you’ve had enough of this. Time to call the score even… for now.",
					func : function() {
						Text.Clear();
						Text.Add("Fine, fine. Having Miranda mad at you all the time was exhausting on the nerves, anyways - getting her off your back would be a small relief.", parse);
						Text.NL();
						Text.Add("<i>“Hmph. Don’t think that this means I’m going to start wagging my tail when you get close. All we’re now is even - and hopefully, you’ve learned better than to piss me off again.”</i> Miranda smacks one meaty fist against a palm. <i>“Now, if you’ll excuse me, I have some business to take care of.”</i>", parse);
						Text.NL();
						Text.Add("With that, she turns and storms away, leaving you alone in the Maiden’s Bane.", parse);
						Text.Flush();
						
						miranda.flags["Attitude"] = Miranda.Attitude.Neutral;
						
						miranda.relation.IncreaseStat(100, 5);
						
						Gui.NextPrompt();
					}, enabled : true
				});
				options.push({ nameStr : "No",
					tooltip : "Refuse to call it quits.",
					func : function() {
						Text.Clear();
						Text.Add("Miranda shows you her teeth. <i>“Well, if that’s the way you want it, asshole. More fun for me, I suppose. Guess I’ll be facefucking your slutty little mouth for a little while longer, or maybe that’s what you want? Not now, though. I’ll deal with you later, after I’ve finished cracking some skulls back at the yard.”</i>", parse);
						Text.NL();
						Text.Add("With that, the dobie turns and storms off, leaving you wondering if continuing to receive Miranda’s enmity was the best of ideas.", parse);
						Text.Flush();
						
						Gui.NextPrompt();
					}, enabled : true
				});
				Gui.SetButtonsFromList(options, false, null);
			}, enabled : true
		});
		options.push({ nameStr : "No",
			tooltip : "No. You’re not standing for this. You’ll take your chances at the watch headquarters.",
			func : function() {
				Text.Clear();
				Text.Add("Screw this. While you might have expected that Miranda would be a hard sell, you hadn’t expected her to be <i>this</i> vindictive. Leaving your drink untouched, you quickly pay for it and stand up, making for the door.", parse);
				Text.NL();
				Text.Add("<i>“Running away again?”</i> Miranda jeers from behind you. You don’t look back. <i>“You’re really that afraid of a dick? It’s not as if it’ll bite you.”</i>", parse);
				Text.NL();
				Text.Add("No, it might not bite you, but it’ll damn well do worse. Ah, fuck - this was a bad idea, anyway. You’ll just take your chances at the watch headquarters.", parse);
				Text.Flush();
				
				world.TimeStep({minute: 30});
				
				miranda.flags["Snitch"] |= Miranda.Snitch.RefusedSex;
				
				Gui.NextPrompt();
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
}

//Triggered via [Evidence] - Break into the watchmens’ lockers and plant the evidence. while in the City Watch area.
Scenes.Vaughn.Tasks.Snitch.PlantEvidence = function() {
	var parse = {
		playername : player.name
	};
	
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	Text.Add("Right. No moment like the present. To say that trying to get up to shenanigans here makes one tense, when the place is crawling with watchmen day and night - well, that’s an understatement if you ever heard of one. Still, you’ve got to keep your cool - if anyone starts asking what you’re doing here, you’ll probably say… hmm… that’s you’re looking for Miranda. Yeah, that sounds about as good a cover story as you’ll be able to pass off.", parse);
	Text.NL();
	Text.Add("Finding the locker room isn’t too hard, though. You figure that it’s got to be reasonably close to the barracks for easy access by the watchmen coming on and off shift, so that’s where you begin. Thankfully, most of the off-duty watchmen are currently taken in by a running game of Cavalcade, so it’s relatively easy to slip past them and deeper into the building. Sure, you may not have done anything yet, but the fewer people remember that you were here, the better. With that thought in mind, you nip into the locker room, doing your best to look like you have every right to be there even though you aren’t formally with the City Watch.", parse);
	Text.NL();
	Text.Add("The room itself is plain and sparse. Clearly, it was built when the watch was much smaller in strength than it’s today. While the lockers aren’t actually rusting - the City Watch has at least <i>that</i> much discipline - they’ve nevertheless gained a tarnish with age that no amount of metal polish and lemon juice will remove. This, of course, might have something to do with how closely they’re packed together in neat rows, with barely enough space for one to move between them comfortably.", parse);
	Text.NL();
	Text.Add("The middle of the room is occupied by a number of benches, on which several off-duty watchmen are lounging and chatting.", parse);
	Text.NL();
	Text.Add("You weigh your odds as you scan the names on the lockers, trying to find Terrell’s - no such luck yet, although you do spot one with the name “Miranda” stenciled on it. The cramped conditions in the locker room probably mean that you’ll have some modicum of cover while trying to break into his things, although how effective it’ll be when the place is crawling with watchmen coming and going is another matter.", parse);
	parse["comp"] = party.Num() == 2 ? party.Get(1).name : "your companions";
	if(party.Num() > 1)
		Text.Add(" You could use [comp] to obscure the view along the long, narrow lines of lockers, too.", parse);
	Text.NL();
	Text.Add("Then there’s the matter of actually getting into Terrell’s things. By the looks of it, each locker is uniform in both make and lock, and a brief inspection of the locks reveals them to be of a simple turnbolt mechanism. There’s enough space that you might be able to slide a card or something between frame and door to jimmy the lock both ways, or if you’ve the aptitude to do so, you could try picking the lock proper. Either that, or maybe if you had enough skill, you could magic the lock open, will the bolt to rise or play with a bit of air…", parse);
	Text.NL();
	if(party.InParty(terry)) {
		Text.Add("Of course, why bother with all this when you’ve got Terry with you? [HeShe]’s a professional thief, you could just ask [himher] to do the job for you and get it over with.", parse);
		Text.NL();
	}
	Text.Add("While most of the off-duty watchmen might be occupied with the dice game out in the barracks, anyone might come around any time and start asking inconvenient questions. You probably don’t have too much time to make your move, so you ought to choose your next action carefully.", parse);
	Text.Flush();
	
	var rogue = Jobs.Rogue.Unlocked(player);
	
	//[Lock][Magic][Terry]
	var options = new Array();
	options.push({ nameStr : "Lock",
		tooltip : Text.Parse("[Jimmy] the lock.", {Jimmy: rogue ? "Pick" : "Jimmy"}),
		func : function() {
			Text.Clear();
			if(rogue) {
				Text.Add("Well, no time to waste. You stoop and quickly inspect the lock one last time, then get to work. Having been trained in the ways of the rogue, you find the attempt easier than most might expect, but success is by no means guaranteed.", parse);
			}
			else {
				Text.Add("Well, you aren’t making any progress standing around like this. Stooping to give the lock one last inspection, you work as best as you can to get the bolt lifted. The locker may not be the most sturdily made, but it’s still a worthy enough opponent that it might give you a little trouble.", parse);
			}
			Text.NL();
			
			var dex = player.Dex() + Math.random() * 20;
			dex += rogue ? 20 : 0;
			
			var check = 60;
			
			if(DEBUG) {
				Text.Add("Dex check: [dex][r] vs [check]", {dex:dex, check:check, r:rogue?" (bonus for Rogue)":""}, 'bold');
				Text.NL();
			}
			//#lock success
			if(dex >= check) {
				Text.Add("Moments tick by, and with each one that passes, your heart beats a little faster. Is someone going to look down the line of lockers and see what you’re up to? Your fingers begin to shake a little, but you get things under control, and at last, at last - there’s a faint but satisfying <i>thunk</i> of the bolt lifting and you take hold of the locker door and pull it open.", parse);
				Text.NL();
				Text.Add("Right. Where to put the evidence so that it looks natural? You eye the locker’s contents - a few sets of uniforms, cleaning tools for said uniforms, what looks like a dried snack in a tied paper bag - ah, looks like there’re some notebooks near the back. You flip through them, hoping to find something incriminating, but Terrell clearly isn’t enough of an idiot to leave something like that in his locker moments before the inspection. Boy, is he going to be surprised.", parse);
				Text.NL();
				Text.Add("Stuffing Vaughn’s evidence between the notebook’s pages, you quickly set everything back as it was - slipping the deadbolt down is far easier than lifting it, and you waste no time slipping out of the locker room and from the watch headquarters altogether. The resulting fireworks might be fun to watch, but they’re probably much safer when viewed at a distance - you don’t want to risk anyone remembering that you were around earlier in the day.", parse);
				Text.NL();
				Text.Add("With nothing left for you here, perhaps it’d be best to report back to Vaughn and let him know the job’s done.", parse);
				
				vaughn.flags["Met"] = Vaughn.Met.SnitchWatchhousSuccess;
			}
			else {
				Text.Add("Perhaps too worthy an opponent, in fact. Fumbling leads to frustration, which only leads to more fumbling - while you manage to lift the bolt slightly on a couple of tries, it always evades your efforts at the last moment and falls down onto the latch.", parse);
				Text.NL();
				Text.Add("You’re running out of time, and keenly aware of that fact. The watchmen in the barracks outside are going to be finishing their game soon, judging by the sound of their raised voices and enthusiastic whoops, and your breath whistles through your gritted teeth as your final attempt subsides into failure.", parse);
				Text.NL();
				Text.Add("Footsteps. The locker room will be flooded with tired, exhilarated watchmen in a matter of moments - even if you’d the locker door open before you right now, there’d be no time to plant the evidence. Quickly, you nip away from the line and slip out just in time to avoid a dog-tired patrol stomping in from the streets.", parse);
				Text.NL();
				Text.Add("You’re probably not going to get another chance to be alone in the barracks for some time now… but at least you tried. Best to head back to Vaughn and hope he isn’t too hard on you for your failure.", parse);
				
				vaughn.flags["Met"] = Vaughn.Met.SnitchWatchhousFail;
			}
			Text.Flush();
			
			world.TimeStep({minute: 30});
			
			Gui.NextPrompt();
		}, enabled : true
	});
	var mage = Jobs.Mage.Unlocked(player);
	if(mage) {
		options.push({ nameStr : "Magic",
			tooltip : "Try and get the bolt to lift with a bit of magic.",
			func : function() {
				Text.Clear();
				parse["phisher"] = player.mfTrue("his", "her");
				Text.Add("Right. Getting a bolt to move quietly and silently… that should be child’s play for someone who can conjure up fire with a snap of [phisher] fingers, right? You size up your opponent one last time - while it would be easier to blast the door open as opposed to the finesse required to stealthily lift the bolt, it’d also create no end of unfortunate repercussions you’d rather avoid.", parse);
				Text.NL();
				Text.Add("Well, you’re wasting time standing around here. Narrowing your eyes, you focus your concentration and begin.", parse);
				Text.NL();
				
				var mag = player.Int() + Math.random() * 20;
				var magStage2 = Scenes.Global.MagicStage2();
				if(magStage2) mag += 20;

				var check = 50;
				
				if(DEBUG) {
					Text.Add("Int check: [mag][m] vs [check]", {mag:mag, check:check, m:magStage2?" (bonus for tier 2 magic)":""}, 'bold');
					Text.NL();
				}
				if(mag >= check) {
					Text.Add("The going is slow but steady. Too quickly and you’ll make a whole lot of noise, too slow and you might lost your grip, sending the bolt clattering back into place. Through the narrow slit between door and frame, you watch a glint of metal rise and finally, a gentle tug on the door has the locker open and bare for your perusal.", parse);
					Text.NL();
					Text.Add("Great. Time to find a good place to plant the evidence before you’re discovered - Terrell’s locker is full of spare uniform sets, a boot-cleaning kit, a small tin of brass polish, what looks like an oily snack in a brown paper bag - entirely mundane and boring stuff. You’re just about considering whether to simply slip the papers into the breast pocket of his uniform when you notice a small stack of notebooks buried near the back. ", parse);
					Text.NL();
					Text.Add("Now <i>those</i> look interesting. While flipping through them doesn’t reveal anything incriminating in and of itself amidst the pages - mostly old patrol logs and notes - it’d make a good and believable place for you to plant Vaughn’s papers. Wasting no time, you slip them between the notebooks’ pages, then do your best to arrange everything like it was before closing the door. Turning the bolt down is easy - all you need is a little push, and it falls back into the latch with a clang.", parse);
					Text.NL();
					Text.Add("Maybe a little too loud for comfort, but you don’t need to be too worried about that anymore. Quickly, you nip out of the locker room and through the barracks, and not one moment too soon; the watchmen are just about done with their game of dice, and various whoops of excitement denote the conclusion of the last round. You don’t look back - best that everyone forget that you were ever here today…", parse);
					Text.NL();
					Text.Add("Well, that seems to be that. You’re not about to hang around when the fireworks go off - perhaps you should head back to the outlaws’ and report in to Vaughn. It’d probably be safer for you that way.", parse);
					
					vaughn.flags["Met"] = Vaughn.Met.SnitchWatchhousSuccess;
				}
				else {
					Text.Add("Try as you might, your concentration keeps slipping - that damned bolt will rise just a little, then teasingly plonk straight back onto the latch. Not that the mounting frustration is doing any wonders for your concentration, and that in turn causes more mistakes until your breath is coming through your gritted teeth. You don’t have much time to do this, and you’re keenly aware of that fact - the locker room being sparsely occupied right now is probably a lucky fluke, all things considered.", parse);
					Text.NL();
					Text.Add("All of a sudden, there’s a loud clang from the lock, the sound of the bolt striking something with considerable force. Had you meant to do that? You don’t remember so, but you must have - and with quite the amount of noise, too.", parse);
					Text.NL();
					Text.Add("Footsteps, not just from the barracks, but within the room itself - perhaps you ought to have been paying more attention to your surroundings, but it’s too late for that now as you nip out from the line of lockers and out of the locker room even as the footsteps begin to converge upon Terrell’s locker. Damn it! For a second or two, blowing the locker’s door wide open seems like a good idea in retrospect…", parse);
					Text.NL();
					Text.Add("No time to lose, though - the watchmen know something’s up, and you’d rather not have anyone inconveniently remember that you were snooping about today. It’s only when you’re out of the watch house and on the street by the walls that you dare to catch your breath and look back.", parse);
					Text.NL();
					Text.Add("Well, fireworks sure’ve went off, but not quite the ones you expected. Seems like there’s no hope of successfully getting the job done now, not with the City Watch alerted to your shenanigans - perhaps it’d be best if you headed back to Vaughn and see what he has to say.", parse);
					
					vaughn.flags["Met"] = Vaughn.Met.SnitchWatchhousFail;
				}
				Text.Flush();
			
				world.TimeStep({minute: 30});
				
				Gui.NextPrompt();
			}, enabled : true
		});
	}
	if(party.InParty(terry)) {
		options.push({ nameStr : "Terry",
			tooltip : "Have Terry open the locker for you.",
			func : function() {
				Text.Clear();
				Text.Add("<i>“Really?”</i> Terry moans in an exaggerated display of exasperation. <i>“That? You want me to work on that flimsy old thing? My talents are wasted here, I tell you.”</i>", parse);
				Text.NL();
				Text.Add("Well, if it’s that simple, [heshe] should have no trouble getting it done. Or do you have to command [himher] to do it?", parse);
				Text.NL();
				parse["bitterly"] = terry.Relation() < 30 ? " bitterly" : "";
				parse["MasterMistress"] = player.mfTrue("Master", "Mistress");
				parse["foxvixen"] = terry.mfPronoun("fox", "vixen");
				Text.Add("<i>“Yeah, yeah,”</i> Terry replies, unshouldering [hisher] pack, chuckling[bitterly]. <i>“Your wish is my command, <b>[MasterMistress]</b>. Only problem would be all these eyes about, they’re making me nervous. Cover me while I work, will you?”</i>", parse);
				Text.NL();
				Text.Add("You stand on one side, hopefully obscuring Terry from anyone happening to peek down the long row of lockers. The [foxvixen] works away industriously, and in about half a minute, there’s a faint click and the locker door swings open.", parse);
				Text.NL();
				Text.Add("<i>“All done. As I said, child’s play to anyone who knows what [heshe]’s doing.”</i>", parse);
				Text.NL();
				Text.Add("You pet Terry on the head and praise [himher] for being such a clever little [foxvixen]. Certainly, choosing to take [himher] along on this little field trip was a good decision.", parse);
				Text.NL();
				Text.Add("<i>“Yeah, yeah.”</i> Terry shrugs off the praised with feigned indifference. <i>“Hurry up before someone notices that we’re not supposed to be here, will you?”</i>", parse);
				Text.NL();
				Text.Add("Right, right. Flinging open the locker, you’re greeted with a - well, it’s not a mess, but you wouldn’t call it neat, either. A couple sets of uniform take up most of the space, along with some needle and thread, boot polish, a brush… pretty standard for a watchman’s locker, really.", parse);
				Text.NL();
				Text.Add("You root around a bit, trying to find where Terrell keeps his personal belongings, and find a small corner in which a couple of notebooks have been stashed, along with a couple of letters of a more personal nature. Flipping through the notebooks reveals nothing incriminating in and of itself - mostly that the fellow’s pretty good at writing reports - but it looks like as good a place as any to plant Vaughn’s evidence.", parse);
				Text.NL();
				Text.Add("<i>“Hurry up!”</i> Terry whispers from beside you. <i>“Make up your mind!”</i>", parse);
				Text.NL();
				Text.Add("[HeShe] has a point. Seeing no better spot, you stick the evidence in between the notebook’s pages and quickly and quietly shut the locker door. Terry works [hisher] magic with [hisher] tools once more, and the door’s firmly locked again.", parse);
				Text.NL();
				Text.Add("Mission accomplished, time to get out of here - bringing Terry and [hisher] expertise along really made this a whole lot smoother than it could’ve been otherwise. Some of the watchmen still at their dice game look up at you as you leave, and you give them what you hope is a friendly smile and wave before slipping out of the watch headquarters. You shouldn’t be anywhere nearby when the sparks start to fly - best to head back to Vaughn and see what he has to say.", parse);
				Text.Flush();
				
				vaughn.flags["Met"] = Vaughn.Met.SnitchWatchhousSuccess;
				
				world.TimeStep({minute: 30});
				
				Gui.NextPrompt();
			}, enabled : true
		});
	}
	Gui.SetButtonsFromList(options, false, null);
}

Scenes.Vaughn.Tasks.Snitch.DebriefAvailable = function() {
	return vaughn.flags["Met"] > Vaughn.Met.OnTaskSnitch &&
		vaughn.flags["Met"] < Vaughn.Met.CompletedSnitch;
}

Scenes.Vaughn.Tasks.Snitch.Debrief = function() {
	var parse = {
		playername : player.name
	};
	
	Text.Clear();
	if(vaughn.flags["Met"] == Vaughn.Met.SnitchMirandaSuccess) {
		Text.Add("<i>“Right! So you’re back,”</i> Vaughn says, greeting you with a tip of his hat. <i>“I heard from our eyes on the street that quite the raucous caucus took place down at the Watch headquarters a little while ago. Quite the magnificent one, by all accounts. I wish I’d been there to see it myself, but duty calls and all.”</i>", parse);
		Text.NL();
		Text.Add("Why, there was some kind of shake-up? Oh dear. It certainly had nothing to do with you; it’s not as if you were even anywhere near the place when things went down.", parse);
		Text.NL();
		Text.Add("Vaughn chortles, a sharp yipping sound. <i>“Oh, that’s true all right. Seems like one of their members somehow managed to get her hands on a certain piece of evidence, then made a beeline for the commander’s office. I hear there was a bit of a dust-up involved, and Terrell, the poor bastard, is currently stuck with the drunks and shifts in a holding cell while his case is being looked at.”</i>", parse);
		Text.NL();
		Text.Add("Corruption in the City Watch? How terrible. Good thing that they were willing to clean up their act, and all the better that it was one of their own who did the unmasking.", parse);
		Text.NL();
		Text.Add("<i>“Either way, the bastard’s not going to be harassing the poor and downtrodden for a while yet. Permanently, I hope.”</i> Vaughn takes a deep breath, and lets it all out in a huge, contented sigh. <i>“You know, [playername], that was quite unexpected of you. I wouldn’t have gone to the City Watch myself, even if they’re less crooked than the Royal Guard.”</i>", parse);
		Text.NL();
		Text.Add("Oh, but you didn’t just go to the watch. You went to one of them whom you trusted to keep to the straight and narrow. That’s a big difference there.", parse);
		Text.NL();
		Text.Add("<i>“Indeed. Watchmen who don’t take bullshit were never that many to begin with, and they’re practically a dying breed nowadays.</i>", parse);
		
		Scenes.Vaughn.Tasks.Snitch.DebriefSuccess(parse);
	}
	//Use this if the player opted to go to the watch headquarters and succeeded in planting the evidence.
	else if(vaughn.flags["Met"] == Vaughn.Met.SnitchWatchhousSuccess) {
		Text.Add("<i>“Ah, you’re back,”</i> Vaughn says, greeting you with a tip of his hat. The fox-morph seems uncharacteristically merry, and you have a guess as to why. <i>“Did you have a good time?”</i>", parse);
		Text.NL();
		Text.Add("It was quite the wonderful time. You didn’t dare to hang around to watch the fireworks like he suggested, but unless Terrell got back to his locker, found where you’d hidden the evidence and disposed of it - quite the unlikely case - then one could consider this mission accomplished.", parse);
		Text.NL();
		Text.Add("<i>“And so it was. We gave instructions to our people on the street to keep our dear friend busy for the day, up to the point where he was almost late for the inspection. Good times, good times. By all accounts, the reaction was quite… intense on both sides. No one likes a snitch, and that goes double for watchmen. Our people didn’t manage to find out what happened afterwards, but one can only assume he’s going to be off the streets for a little while yet, or at least until the investigation’s concluded.</i>", parse);
		
		Scenes.Vaughn.Tasks.Snitch.DebriefSuccess(parse);
	}
	//Failure (Caught at Watch HQ)
	else {
		Text.Add("As you approach, Vaughn tilts his head up to look you in the eye. <i>“Welcome back, [playername]. Allow me to extend my condolences.”</i>", parse);
		Text.NL();
		Text.Add("What, does he know already?", parse);
		Text.NL();
		Text.Add("<i>“We had people watching the watch house for activity, good or bad. They’re rather quick and reliable at what they do - I got word a couple hours before you arrived.”</i>", parse);
		Text.NL();
		Text.Add("Ugh. That’s fast.", parse);
		Text.NL();
		Text.Add("<i>“And perhaps now you understand why a son of a bitch like Terrell pissing off the little people we rely on is such a big deal to us.”</i>", parse);
		Text.NL();
		Text.Add("Yeah, about that…", parse);
		Text.NL();
		Text.Add("Vaughn shrugs and waves off your imminent apology. <i>“Eh, the job was a crapshoot anyways. Getting into the watch house and planting it… Maria could’ve managed it, but some of the watchmen know her face. Still, I’d have hoped that you’d be able to do it, but you tried and failed. Yeah, sure, the boss-man would say that you failed anyway, but you didn’t chicken out, and that’s a point in your favor.”</i>", parse);
		Text.NL();
		Text.Add("How nice of him. Well, what happens now?", parse);
		Text.NL();
		Text.Add("<i>“We find another way to use this damning evidence. Either that, or if it takes too long… as I said, corrupt bastards like Terrell will take all that they think they can grab, and he’s not the kind who’s smart enough to cover his tracks consistently. I have a feeling that he’ll slip up again before long.</i>", parse);
		
		Scenes.Vaughn.Tasks.Snitch.DebriefFailure(parse);
	}
}

Scenes.Vaughn.Tasks.Snitch.OutOfTime = function() {
	return Scenes.Vaughn.Tasks.Snitch.OnTask() && vaughn.taskTimer.Expired();
}

Scenes.Vaughn.Tasks.Snitch.DebriefOutOfTime = function() {
	var parse = {
		playername : player.name
	};
	
	Text.Clear();
	Text.Add("By the time you can see Vaughn’s face, it’s clear that he’s not happy with you. The fox-morph is practically fuming as he eyes your approach, his hat shifting slightly as the ears underneath swivel this way and that.", parse);
	Text.NL();
	Text.Add("<i>“So, finally decided to turn up, did you?”</i>", parse);
	Text.NL();
	Text.Add("Now, wait a second here. If -", parse);
	Text.NL();
	Text.Add("<i>“Either you chickened out, or you couldn’t be bothered, <b>or</b> you’re the kind who thinks that nothing important will ever happen if you don’t personally go there and make it happen,”</i> Vaughn snaps in reply, cutting off your words. <i>“I’d rather believe the first of you rather than the third, ‘cause while I can understand a coward, I’ve no patience for assholes.”</i>", parse);
	Text.NL();
	Text.Add("Yeah, he’s not in a listening mood, and to be fair, he has every right to be mad with you.", parse);
	Text.NL();
	Text.Add("<i>“If you couldn’t turn up, you needn’t have given your word. All it’d have taken would be to say ‘hey, I don’t think I can do this, pass it along to someone else.’ That’s all it’d have taken. Now, we’ve got to clean up your mess, and I don’t like it one bit.</i>", parse);
	Text.NL();
	Text.Add("<i>“Sure, as I said, corrupt bastards like Terrell will take all that they think they can grab, and he’s not the kind who’s smart enough to cover his tracks consistently. I have a feeling that he’ll slip up again before long. Still, that doesn’t excuse you not showing up - we had people watching the watchmen for hours on end, waiting to see the fireworks, and they never got the show that they were promised.”</i>", parse);
	Text.NL();
	Text.Add("He had people watching?", parse);
	Text.NL();
	Text.Add("<i>“Well, yes, and they were more than willing to come, ‘cause they thought that the bastard was going to get his dues. Seems like they were disappointed, but them’s the breaks.</i>", parse);
	
	outlaws.relation.DecreaseStat(0, -4);
	
	Scenes.Vaughn.Tasks.Snitch.DebriefFailure(parse);
}

Scenes.Vaughn.Tasks.Snitch.DebriefSuccess = function(parse) {
	Text.NL();
	Text.Add("<i>“Well, that seems like that’s that,”</i> Vaughn says. <i>“Your help’s much appreciated, and with any luck, Terrell’s going to find himself in quite a bit of hot soup for the foreseeable future. Justice is served, righteousness prevails, and all that other stuff I’m supposed to say but I was never really very good at.”</i>", parse);
	Text.NL();
	Text.Add("Oh, it was a pleasure.", parse);
	Text.NL();
	Text.Add("<i>“Dunno if it’s a pleasure or not, but it damn well felt good to receive the news of the bastard’s demise. Here, it’s not much, but I set these aside for you from the last consignment which came in. We don’t have any actual <b>money</b> to spare at the moment, so goods is all that I can reward you with.”</i>", parse);
	Text.NL();
	
	Text.Add("Received 5x Energy Potions.<br/>", parse, 'bold');
	Text.Add("Received 5x Speed Potions.", parse, 'bold');
	
	Text.NL();
	
	party.Inv().AddItem(Items.Combat.EPotion, 5);
	party.Inv().AddItem(Items.Combat.SpeedPotion, 5);
	
	outlaws.relation.IncreaseStat(100, 3);
	
	Text.Add("<i>“I think that’s all I have for you at the moment, [playername]. Stay safe out there, and check back in sometime with me. I may have something else for you later on.”</i>", parse);
	Text.Flush();
	
	vaughn.flags["Met"] = Vaughn.Met.CompletedSnitch;
	
	world.TimeStep({hour: 1});
	
	Gui.NextPrompt();
}

Scenes.Vaughn.Tasks.Snitch.DebriefFailure = function(parse) {
	Text.NL();
	Text.Add("<i>“One more thing. You still have the evidence, don’t you?”</i>", parse);
	Text.NL();
	Text.Add("Well, yes, at least you still have that. Vaughn sticks out his hand, and you press the paper into his gloved palm. He mumbles something that’s neither here nor there, then snorts.", parse);
	Text.NL();
	Text.Add("<i>“Fine. At least we still can probably put this to good use in due time… although that time should be soon, and the plan probably won’t involve you, [playername]. You had your break and you blew it, so that’s that; at least we’re more than capable of rolling with the punches here.</i>", parse);
	Text.NL();
	Text.Add("<i>“Now, I’ve got nothing else for you, so just move along. Maybe in the future you’ll be given the opportunity to get back into the boss-man’s good graces, but right now, I’ve got to get Maria over and discuss how to best go about cleaning up your mess.”</i>", parse);
	Text.NL();
	Text.Add("With that, he turns away from you and storms into the darkness of the camp, leaving you to stew in your failure.", parse);
	Text.Flush();
	
	vaughn.flags["Met"] = Vaughn.Met.CompletedSnitch;
	
	world.TimeStep({hour: 1});
	
	Gui.NextPrompt();
}