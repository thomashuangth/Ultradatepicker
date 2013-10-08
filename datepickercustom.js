"use strict";

var datepicker = $('.datepicker'),
	data = $('.datepicker .data'),
	calendar = $('.datepicker .calendar'),
	previous = $('.datepicker .calendar .datechoice button:first-child'),
	next = $('.datepicker .calendar .datechoice button:nth-child(4)'),
	month = $('.datepicker .calendar .datechoice select:nth-child(2)'),
	year = $('.datepicker .calendar .datechoice select:nth-child(3)'),
	table = $('.datepicker .calendar table'),
	td = document.getElementsByTagName('td'),
	languagechoice = $('.generator form select:first-child'),
	firstday = $('.generator form select:nth-child(3)'),
	formatdate = $('.generator form select:nth-child(5)'),
	i = 0,
	monthnumber;

var language = ["English", "French"], 
	allmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 
	allday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], 
	monthname, 
	yearnumber,
	formatdatechoice,
	datespecialchar = "/";

var date = new Date();
var today = date.getDate();
var thismonth = date.getMonth();
var thisyear = date.getFullYear();
var monthselected = thismonth;

for(i=0; i<language.length; i++)
{
	languagechoice.append("<option value='"+language[i]+"'>"+language[i]+"</option>");
}

initialize();
setdefault();

/*============================================================*/

data.focus(function()
{
	var $this = $(this);
	$this.parent().siblings('.calendar').toggleClass("visible");
	dateshifting($this);
	if($this.val())
	{
		var datepart = $this.val().split(datespecialchar),
		theday = datepart[0],
		themonth = datepart[1],
		theyear = datepart[2];

		month = $this.parents('.datepicker').find('.calendar .datechoice select:nth-child(2)');
		year = $this.parents('.datepicker').find('.calendar .datechoice select:nth-child(3)');

		if(month.val() == allmonth[themonth-1] && year.val() == theyear)
		{
			var emptycase = dateshifting($this);
			var rightcase = +theday+emptycase-1;
			var td = $this.parents('.datepicker').find('.calendar table td');
			td[rightcase].classList.add("selected");
		}
	}
})

languagechoice.change(function()
{
	changelanguage();
	initialize();
	setdefault();
});

formatdate.change(function()
{
	formatdatechoice = $(this).val();
	if(formatdatechoice == "01/01/2000") datespecialchar = "/";
	if(formatdatechoice == "01-01-2000") datespecialchar = "-";
});

data.keyup(function()
{
	var $this = $(this);
	if($this.val())
	{
		var datepart = $this.val().split(datespecialchar),
		theday = datepart[0],
		themonth = datepart[1],
		theyear = datepart[2];

		month = $this.parent().siblings('.calendar').find('.datechoice select:nth-child(2)');
		year = $this.parent().siblings('.calendar').find('.datechoice select:nth-child(3)');
		
		month.val(allmonth[+themonth-1]);
		year.val(theyear);
		monthname = month.val();
		yearnumber = year.val();
		monthselected = allmonth.indexOf(month.val());
		dateshifting($this);
		if(String(theyear).length == 4 && theday && themonth )
		{
			var emptycase = dateshifting($this);
			var rightcase = +theday+emptycase-1;
			var td = $this.parents('.datepicker').find('.calendar table td');
			td[rightcase].classList.add("selected");
		}
	}
		else
	{
		setdefault();
		dateshifting($this);
	}
})

calendar.click(function()
{
	var $this = $(this);

	if($this.parents('.datepicker').find('.data').val())
	{
		var datepart = $this.parents('.datepicker').find('.data').val().split(datespecialchar),
		theday = datepart[0],
		themonth = datepart[1],
		theyear = datepart[2];

		month = $this.find('.datechoice select:nth-child(2)');
		year = $this.find('.datechoice select:nth-child(3)');

		if(month.val() == allmonth[themonth-1] && year.val() == theyear)
		{
			var emptycase = dateshifting($this);
			var rightcase = +theday+emptycase-1;
			var td = $this.parents('.datepicker').find('.calendar table td');
			td[rightcase].classList.add("selected");
		}
	}
});

month.change(function() 
{
	var $this = $(this);
	monthname = $this.val();
	yearnumber = $this.next().val();
	monthselected = allmonth.indexOf($this.val());
	dateshifting($this);
});

year.change(function() 
{
	var $this = $(this);
	monthname = $this.before().val();
	yearnumber = $this.val();
	dateshifting($this);
});

next.click(function() 
{
	var $this = $(this);
	monthselected = allmonth.indexOf($this.siblings('select:nth-child(2)').val());
	yearnumber = $this.siblings('select:nth-child(3)').val();
	monthselected += 1;
	if(monthselected > 11)
	{
		monthselected -= 12;
		yearnumber++;
	}
	$this.siblings('select:nth-child(2)').val(allmonth[monthselected]);
	monthname = $this.siblings('select:nth-child(2)').val();
	$this.prev().val(yearnumber);
	dateshifting($this);
});

previous.click(function() 
{
	var $this = $(this);
	monthselected = allmonth.indexOf($this.siblings('select:nth-child(2)').val());
	yearnumber = $this.siblings('select:nth-child(3)').val();
	monthselected -= 1;
	if(monthselected < 0)
	{
		monthselected += 12;
		yearnumber--;
	}
	$this.next().val(allmonth[monthselected]);
	monthname = $this.next().val();
	$this.siblings('select:nth-child(3)').val(yearnumber);
	dateshifting($this);
});

/*============================================================*/

function initialize()
{
	firstday.text("");
	month.text("");
	year.text("");
	for(i=0; i<7; i++)
	{
		firstday.append("<option value='"+allday[i]+"'>"+allday[i]+"</option>");
		table.append("<tr></tr>");
	}

	for(i=0; i<12; i++)
	{
		month.append("<option value='"+allmonth[i]+"'>"+allmonth[i]+"</option>")
		;
	}
	for(i=1900; i<2100; i++)
	{
		year.append("<option value='"+i+"'>"+i+"</option>");
	}
}

function setdefault()
{
	month.val(allmonth[thismonth]);
	year.val(thisyear);
	monthname = month.val();
	yearnumber = year.val();
	formatdatechoice = formatdate.val();
}

function changelanguage()
{
	if(languagechoice.val() == "English")
	{
		allmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		allday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	}
	else if(languagechoice.val() == "French")
	{
		allmonth = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
		allday = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
	}
}

function dateshifting($this)
{
	var shift = allday.indexOf(firstday.val());
	weekdayprint(shift, $this);
	var emptycase = affiche(shift, $this);
	var td = $this.parents('.datepicker').find('.calendar table td');

	if(td[0].innerHTML > 1) 
	{
		shift -= 7;
		return affiche(shift, $this);
	}
	return emptycase;
}

function weekdayprint(shiftday, $this)
{
	var count = 0;
	var weekday = $this.parents('.datepicker').find('.calendar table tr:first-child');
	weekday.text("");
	while(count<7)
	{
		if(shiftday>6) shiftday -= 7;
		weekday.append("<th>"+allday[shiftday].substr(0,3)+"</th>");
		shiftday++;
		count++;
	}
}

function affiche(shift, $this)
{
	switch (monthname) {
		case allmonth[0]:
			monthnumber = 1;
			break;
		case allmonth[1]:
			monthnumber = 2;
			break;
		case allmonth[2]:
			monthnumber = 3;
			break;
		case allmonth[3]:
			monthnumber = 4;
			break;
		case allmonth[4]:
			monthnumber = 5;
			break;
		case allmonth[5]:
			monthnumber = 6;
			break;
		case allmonth[6]:
			monthnumber = 7;
			break;
		case allmonth[7]:
			monthnumber = 8;
			break;
		case allmonth[8]:
			monthnumber = 9;
			break;
		case allmonth[9]:
			monthnumber = 10;
			break;
		case allmonth[10]:
			monthnumber = 11;
			break;
		case allmonth[11]:
			monthnumber = 12;
			break;
		default:
			break;
	}

	var c = Math.floor((14-monthnumber)/12);
	var y = yearnumber-c;
	var m = monthnumber + 12*c - 2;
	var day = Math.floor(( 1 + y + Math.floor(y/4) - Math.floor(y/100) + y/400 + Math.floor(31*m/12) ) % 7) - shift;
	var emptycase = 0;

	//Délimite le dernier jour du mois
	if(monthname == allmonth[0] || monthname == allmonth[2] || monthname == allmonth[4] || monthname == allmonth[6] || monthname == allmonth[7] || monthname == allmonth[9] || monthname == allmonth[11])
	{
		var limitday = 31;
	}
	else if(monthname == allmonth[1])
	{
		if (yearnumber%4 == 0 && yearnumber%100 != 0 || yearnumber%400 == 0)
		{
			var limitday = 29;
		}
		else var limitday = 28;
	}
	else
	{
			var limitday = 30;
	}

	// Affichage des jours
	for (var i=1; i<7; i++)
	{
		var realchild = i+1;
		var tr = $this.parents('.datepicker').find('.calendar table tr:nth-child('+realchild+')');

		tr.text(""); //Initialise le tableau
		for(var j = 1+7*(i-1)-day; j < 1+7*(i-1)-day+7; j++)
		{
			if(j <= 0 || j > limitday)
			{
				if(j <= 0 ) tr.append("<td></td>");
			}
			else
			{

				tr.append("<td onclick='newdate("+j+", $(this).parent());'>"+j+"</td>");
			}
			
		}
	}

	var td = $this.parents('.datepicker').find('.calendar table td');
	for(var i=0; i<td.length; i++)
	{
		if(td[i].innerHTML) td[i].classList.add("hov");
		else 
		{
			emptycase += 1;
			td[i].style.background = "none";
		}
		if(td[i].innerHTML == today && monthnumber == thismonth+1 && yearnumber == thisyear)
		{
			td[i].style.background = "rgba(241,196,15,0.7)";
			td[i].style.color = "white";
		}
		else
		{
			td[i].style.background = "rgba(200,200,200,0.3);";
			td[i].style.color = "white";
		}
		
	}
	return emptycase;
}

function newdate(day, $this)
{
	var emptycase = dateshifting($this);
	var rightcase = +day+emptycase-1;
	var td = $this.parents('.datepicker').find('.calendar table td');
	td[rightcase].classList.add("selected");
	var specialchar = datespecialchar;

	var monthnumber = allmonth.indexOf($this.parents('.datepicker').find('.calendar .datechoice select:nth-child(2)').val())+1;
	var yearnumber = $this.parents('.datepicker').find('.calendar .datechoice select:nth-child(3)').val();

	if(String(day).length<2) day = "0"+day;
	if(String(monthnumber).length<2) monthnumber = "0"+monthnumber;
	$this.parents('.datepicker').find('form .data').val(day+specialchar+monthnumber+specialchar+yearnumber);
	$this.parents('.datepicker').find('.calendar').removeClass("visible");
}
