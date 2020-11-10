function $(i) { return document.getElementById(i); }
/*
התאמת הקוד ללוח שנה עברי נעשה ע"י חזקי דערען
http://mylush.net.
אין להעתיק ללא רשות מפורשת
*/
function HolidayToString() { return '<span class="' + this.holiday_type + '">' + this.description + '</span>'; }
function Holiday(day, month, condition, description, type) { this.day = day; this.month = month; this.condition = condition; this.description = description; this.holiday_type = type ? type : 'holiday'; this.toString = HolidayToString; }
function CheckHanuka(gg) { var g = new Date; g.setYear(gg.getFullYear()); g.setMonth(gg.getMonth()); g.setDate(gg.getDate() - 3); var H = GregToHeb(g); return H[1] == 30; }
// Day, Month, Condition, Description, Style
var Holidays = Array(new Holiday(1, 1, 1, 'ראש השנה', 'yomtov'), new Holiday(2, 1, 1, 'ראש השנה', 'yomtov'), new Holiday(3, 1, 'dow!=7', 'צום גדליה', 'sadday'), new Holiday(4, 1, 'dow==1', 'צום גדליה (נדחה)', 'sadday'),
new Holiday(10, 1, 1, 'יום כיפור', 'yomtov'), new Holiday(15, 1, 1, 'סוכות', 'yomtov'), new Holiday(16, 1, 1, 'א חול המועד'), new Holiday(17, 1, 1, 'ב חול המועד'), new Holiday(18, 1, 1, 'ג חול המועד'), new Holiday(19, 1, 1, 'ד חול המועד'), new Holiday(20, 1, 1, 'ה חול המועד'), new Holiday(21, 1, 1, 'הושענא רבה'), new Holiday(22, 1, 1, 'שמחת תורה', 'yomtov'), new Holiday(25, 3, 1, 'חנוכה'), new Holiday(26, 3, 1, 'חנוכה'), new Holiday(27, 3, 1, 'חנוכה'), new Holiday(28, 3, 1, 'חנוכה'), new Holiday(29, 3, 1, 'חנוכה'), new Holiday(30, 3, 1, 'חנוכה'), new Holiday(1, 4, 1, 'חנוכה'), new Holiday(2, 4, 1, 'חנוכה'), new Holiday(3, 4, 'CheckHanuka(g)', 'חנוכה'), new Holiday(10, 4, 1, 'צום עשרה בטבת', 'sadday'), new Holiday(15, 5, 1, 'ראש השנה לאילנות'), new Holiday(11, 7, 'dow==5', 'תענית אסתר (מוקדם)', 'sadday'), new Holiday(13, 7, 'dow!=7', 'תענית אסתר', 'sadday'), new Holiday(14, 7, 1, 'פורים'), new Holiday(15, 7, 1, 'שושן פורים'), new Holiday(16, 7, 'dow==1', 'שושן פורים (משולש)'),
new Holiday(15, 8, 1, 'פסח', 'yomtov'), new Holiday(16, 8, 1, 'א חול המועד'), new Holiday(17, 8, 1, 'ב חול המועד'), new Holiday(18, 8, 1, 'ג חול המועד'), new Holiday(19, 8, 1, 'ד חול המועד'), new Holiday(20, 8, 1, 'ה חול המועד'), new Holiday(21, 8, 1, 'שביעי של פסח', 'yomtov'), new Holiday(26, 8, '(year>1958)&&(dow==5)', 'יום הזכרון לשואה ולגבורה (מוקדם)', 'sadday'), new Holiday(27, 8, '(year>1958)&&(dow<6)&&(dow>1)', 'יום הזכרון לשואה ולגבורה', 'sadday'), new Holiday(28, 9, '(year>1958)&&(dow==2)', 'יום הזכרון לשואה ולגבורה (נדחה)', 'sadday'), new Holiday(2, 9, '(year>1948)&&(dow==4)', 'יום הזכרון (מוקדם)', 'sadday'), new Holiday(3, 9, '(year>1948)&&(dow==4)', 'יום הזכרון (מוקדם)', 'sadday'), new Holiday(3, 9, '(year>1948)&&(dow==5)', 'יום העצמאות (מוקדם)'), new Holiday(4, 9, '((year>1948)&&(year<2004)&&(dow<5))||((year>2003)&&(dow==3))', 'יום הזכרון', 'sadday'), new Holiday(4, 9, 'year>1948&&dow==5', 'יום העצמאות (מוקדם)'), new Holiday(5, 9, '(year>1948&&year<2004&&dow<6)||(year>2003&&dow==4)', 'יום העצמאות'), new Holiday(5, 9, 'year>2003&&dow==2', 'יום הזכרון (נדחה)', 'sadday'), new Holiday(6, 9, 'year>2003&&dow==3', 'יום העצמאות (נדחה)'), new Holiday(18, 9, 1, 'ל"ג בעומר'), new Holiday(28, 9, 'year>1966', 'יום שחרור ירושלים'), new Holiday(6, 10, 1, 'שבועות', 'yomtov'), new Holiday(17, 11, 'dow!=7', 'צום שבעה עשר בתמוז', 'sadday'), new Holiday(18, 11, 'dow==1', 'צום שבעה עשר בתמוז (נדחה)', 'sadday'), new Holiday(9, 12, 'dow!=7', 'צום תשעה באב', 'sadday'), new Holiday(10, 12, 'dow==1', 'צום תשעה באב (נדחה)', 'sadday'), new Holiday(14, 6, 1, 'פורים קטן'));
function HDHoliday(curDate, hd, hm) {
    var dow = curDate.getDay() + 1; var year = curDate.getFullYear(); var g = curDate;
    // Summer time
    var sSummer = (dow == 6 && year > 2004 && ((g.getMonth() == 3 && g.getDate() == 1) || (g.getMonth() == 2 && g.getDate() > 25))) ?
    '<span class="info">שעון קיץ</span>' : '';
    var i;
    for (i = 0; i < Holidays.length; i++) {
        if (Holidays[i].month == hm && Holidays[i].day == hd && eval(Holidays[i].condition)) {
            if (sSummer) Holidays[i].description += '<br>' + sSummer; return Holidays[i];
        }
    }
    return sSummer;
}

function MonSinceFirstMolad(nYearH) {
    var nMonSinceFirstMolad; nYearH--;
    nMonSinceFirstMolad = Math.floor(nYearH / 19) * 235;
    nYearH = nYearH % 19; nMonSinceFirstMolad += 12 * nYearH;
    if (nYearH >= 17) {
        nMonSinceFirstMolad += 6
    } else if (nYearH >= 14) {
        nMonSinceFirstMolad += 5
    } else if (nYearH >= 11) {
        nMonSinceFirstMolad += 4
    } else if (nYearH >= 8) {
        nMonSinceFirstMolad += 3
    } else if (nYearH >= 6) {
        nMonSinceFirstMolad += 2
    } else if (nYearH >= 3) {
        nMonSinceFirstMolad += 1
    }
    return nMonSinceFirstMolad;
}


function IsLeapYear(nYearH) {
    var nYearInCycle

    nYearInCycle = nYearH % 19
    return (nYearInCycle == 3 ||
        nYearInCycle == 6 ||
        nYearInCycle == 8 ||
        nYearInCycle == 11 ||
        nYearInCycle == 14 ||
        nYearInCycle == 17 ||
        nYearInCycle == 0)
}

function Tishrei1(nYearH) {
    var nMonthsSinceFirstMolad
    var nChalakim
    var nHours
    var nDays
    var nDayOfWeek
    var dTishrei1

    nMonthsSinceFirstMolad = MonSinceFirstMolad(nYearH)
    nChalakim = 793 * nMonthsSinceFirstMolad
    nChalakim += 204

    nHours = Math.floor(nChalakim / 1080)
    nChalakim = nChalakim % 1080

    nHours += nMonthsSinceFirstMolad * 12
    nHours += 5

    nDays = Math.floor(nHours / 24)
    nHours = nHours % 24

    nDays += 29 * nMonthsSinceFirstMolad
    nDays += 2

    nDayOfWeek = nDays % 7

    if (!IsLeapYear(nYearH) &&
    nDayOfWeek == 3 &&
    (nHours * 1080) + nChalakim >= (9 * 1080) + 204) {
        nDayOfWeek = 5
        nDays += 2
    }
    else if (IsLeapYear(nYearH - 1) &&
        nDayOfWeek == 2 &&
        (nHours * 1080) + nChalakim >= (15 * 1080) + 589) {
        nDayOfWeek = 3
        nDays += 1
    }
    else {
        if (nHours >= 18) {
            nDayOfWeek += 1
            nDayOfWeek = nDayOfWeek % 7
            nDays += 1
        }
        if (nDayOfWeek == 1 ||
    nDayOfWeek == 4 ||
    nDayOfWeek == 6) {
            nDayOfWeek += 1
            nDayOfWeek = nDayOfWeek % 7
            nDays += 1
        }
    }

    nDays -= 2067025
    dTishrei1 = new Date(1900, 0, 1) // 2067025 days after creation
    dTishrei1.setDate(dTishrei1.getDate() + nDays)

    return dTishrei1
}

function LengthOfYear(nYearH) {
    var dThisTishrei1
    var dNextTishrei1
    var diff

    dThisTishrei1 = Tishrei1(nYearH)
    dNextTishrei1 = Tishrei1(nYearH + 1)
    diff = (dNextTishrei1 - dThisTishrei1) / (1000 * 60 * 60 * 24)
    return Math.round(diff)
}

function HebToGreg(nYearH, nMonthH, nDateH) {
    var nLengthOfYear
    var bLeap
    var dGreg
    var nMonth
    var nMonthLen
    var bHaser
    var bShalem

    bLeap = IsLeapYear(nYearH)
    nLengthOfYear = LengthOfYear(nYearH)

    bHaser = (nLengthOfYear == 353 || nLengthOfYear == 383)
    bShalem = (nLengthOfYear == 355 || nLengthOfYear == 385)

    dGreg = Tishrei1(nYearH)

    for (nMonth = 1; nMonth <= nMonthH - 1; nMonth++) {
        if (nMonth == 1 ||
    nMonth == 5 ||
    nMonth == 8 ||
    nMonth == 10 ||
    nMonth == 12) {
            nMonthLen = 30
        } else if (nMonth == 4 ||
            nMonth == 7 ||
            nMonth == 9 ||
            nMonth == 11 ||
            nMonth == 13) {
            nMonthLen = 29
        } else if (nMonth == 6) {
            nMonthLen = (bLeap ? 30 : 0)
        } else if (nMonth == 2) {
            nMonthLen = (bShalem ? 30 : 29)
        } else if (nMonth == 3) {
            nMonthLen = (bHaser ? 29 : 30)
        }
        dGreg.setDate(dGreg.getDate() + nMonthLen)
    }
    dGreg.setDate(dGreg.getDate() + nDateH - 1)
    return dGreg
}

function GregToHeb(dGreg) {
    var nYearH
    var nMonthH
    var nDateH
    var nOneMolad
    var nAvrgYear
    var nDays
    var dTishrei1
    var nLengthOfYear
    var bLeap
    var bHaser
    var bShalem
    var nMonthLen
    var bWhile
    var d1900 = new Date(1900, 0, 1)

    nOneMolad = 29 + (12 / 24) + (793 / (1080 * 24))
    nAvrgYear = nOneMolad * (235 / 19)
    nDays = Math.round((dGreg - d1900) / (24 * 60 * 60 * 1000))
    nDays += 2067025 // 2067025 days after creation

    nYearH = Math.floor(nDays / nAvrgYear) + 1
    dTishrei1 = Tishrei1(nYearH)

    if (SameDate(dTishrei1, dGreg)) {

        nMonthH = 1
        nDateH = 1
    }
    else {
        if (dTishrei1 < dGreg) {
            while (Tishrei1(nYearH + 1) <= dGreg) {
                nYearH += 1
            }
        }
        else {

            nYearH -= 1
            while (Tishrei1(nYearH) > dGreg) {
                nYearH -= 1
            }
        }

        nDays = (dGreg - Tishrei1(nYearH)) / (24 * 60 * 60 * 1000)
        nDays = Math.round(nDays)
        nLengthOfYear = LengthOfYear(nYearH)
        bHaser = nLengthOfYear == 353 || nLengthOfYear == 383
        bShalem = nLengthOfYear == 355 || nLengthOfYear == 385
        bLeap = IsLeapYear(nYearH)

        nMonthH = 1
        do {
            switch (nMonthH) {
                case 1:
                case 5:
                case 6:
                case 8:
                case 10:
                case 12:
                    nMonthLen = 30
                    break
                case 4:
                case 7:
                case 9:
                case 11:
                case 13:
                    nMonthLen = 29
                    break
                case 6: // Adar A (6) will be skipped on non-leap years
                    nMonthLen = 30
                    break
                case 2: // Cheshvan, see note above
                    nMonthLen = (bShalem ? 30 : 29)
                    break
                case 3: // Kislev, see note above
                    nMonthLen = (bHaser ? 29 : 30)
                    break
            }

            if (nDays >= nMonthLen) {
                bWhile = true
                if (bLeap || nMonthH != 5) {
                    nMonthH++
                }
                else {
                    nMonthH += 2
                }
                nDays -= nMonthLen
            }
            else {
                bWhile = false
            }
        } while (bWhile)
        nDateH = nDays + 1
    }
    var HAR = new Array(nMonthH, nDateH + 1, nYearH)
    return HAR
}

function SameDate(d1, d2) {
    return (d1.getFullYear() == d2.getFullYear() &&
        d1.getMonth() == d2.getMonth() &&
        d1.getDate() == d2.getDate())

}

function num2month(n) {
    switch (n) {
        case 0: return "ינואר"
            break
        case 1: return "פברואר"
            break
        case 2: return "מרס"
            break
        case 3: return "אפריל"
            break
        case 4: return "מאי"
            break
        case 5: return "יוני"
            break
        case 6: return "יולי"
            break
        case 7: return "אוגוסט"
            break
        case 8: return "ספטמבר"
            break
        case 9: return "אוקטובר"
            break
        case 10: return "נובמבר"
            break
        case 11: return "דצמבר"
            break
    }


}
function num2hmonth(num, Y) {
    var themonth;
    switch (num) {
        case 1:
            themonth = "תשרי"
            break
        case 2:
            themonth = "חשון"
            break
        case 3:
            themonth = "כסליו"
            break
        case 4:
            themonth = "טבת"
            break
        case 5:
            themonth = "שבט"
            break
        case 6:
            themonth = "אדר ראשון"
            break
        case 7:
            themonth = (IsLeapYear(Y) ? "אדר שני" : "אדר")
            break
        case 8:
            themonth = "ניסן"
            break
        case 9:
            themonth = "אייר"
            break
        case 10:
            themonth = "סיון"
            break
        case 11:
            themonth = "תמוז"
            break
        case 12:
            themonth = "אב"
            break
        case 13:
            themonth = "אלול"
            break
    }
    return themonth;
}

function FormatDate(dDate) {
    var sDate
    switch (dDate.getDay()) {
        case 0:
            sDate = "יום ראשון "
            break
        case 1:
            sDate = "יום שני "
            break
        case 2:
            sDate = "יום שלישי "
            break
        case 3:
            sDate = "יום רביעי "
            break
        case 4:
            sDate = "יום חמישי "
            break
        case 5:
            sDate = "יום שישי "
            break
        case 6:
            sDate = "שבת "
            break
    }
    sDate += dDate.getDate() + "/"
    sDate += (dDate.getMonth() + 1) + "/"
    sDate += dDate.getFullYear()
    return sDate
}
var letters1 = 'אבגדהוזחטי';
var letters2 = 'יכלמנסעפצק';
var letters3 = 'קרשת';
var letters4 = 'אבגדה';
function number2hebrew(num) {
    heb = "";
    while (num > 1000) {
        heb += letters4.charAt((num / 1000) - 1);
        heb += "'";
        num %= 1000;
    }
    while (num > 400) {
        heb += "ת";
        num -= 400;
    }
    if (num >= 100) {
        heb += letters3.charAt((num / 100) - 1);
        num %= 100;
    }
    if (num >= 10) {
        if (num == 15) {
            heb += 'טו';
            num = 0;
        }
        else if (num == 16) {
            heb += 'טז';
            num = 0;
        }
        else {
            heb += letters2.charAt((num / 10) - 1);
            num %= 10;

        }
    }
    if (num >= 1) {
        heb += letters1.charAt(num - 1);
    }
    if (heb.length > 1) {

        heb = heb.slice(0, heb.length - 1) + '"' + heb.charAt(heb.length - 1);
    }
    else { heb = heb + '\''; }
    return heb;
}
function nextLetter(letter) {
    var num = hebrew2number(letter);
    return number2hebrew(num + 1);
}
function previousLetter(letter) {
    var num = hebrew2number(letter);
    return num > 1 ? number2hebrew(num - 1) : "";
}
Date.prototype.toString = function () {
    return 'D' + this.getFullYear() + '-' + this.getMonth() + '-' + this.getDate();
}

function H2G(nYearH, nMonthH, nDateH) {
    nYearH = Number(nYearH)
    nMonthH = Number(nMonthH)
    nDateH = Number(nDateH)


    var strRes = FormatDate(HebToGreg(nYearH, nMonthH, nDateH));
    return strRes;
    ("<p>")
}
function G2H(nYearG, nMonthG, nDateG) {
    var nYearH
    var nMonthH
    var nDateH
    var dGreg

    nYearG = Number(nYearG)
    nMonthG = Number(nMonthG)
    nDateG = Number(nDateG)
    dGreg = new Date(nYearG, nMonthG - 1, nDateG)

    return GregToHeb(dGreg);
}
var THM;
var THD;
var THY;
e = $('myframe');
function startup() {

    if (window.screen.width > 1365) { $("caldiv").style.width = "600px"; $("n").style.cssText = "position: absolute; top: 400px; margin-right: 740px; width: 360px;"; $("p").style.cssText = "position: absolute; top: 400px; margin-right: -235px;width: 360px;"; }

    if (document != null && document != undefined)
        startu();
}
function startu() {
    try { if (localStorage.getItem("dir") == "ltr" && $("Ncal").dir == "rtl") { changedir() } } catch (err) { };
    loc = ['cal', 'Ncal', 'Pcal']
    for (i = 0; i < loc.length; i++) {
        row = 6;
        while (row < 43) {
            $(loc[i]).getElementsByTagName("td")[row].innerHTML = '';
            row++
        }

        $(loc[i]).rows[5].style.display = 'table-row';
        $(loc[i]).rows[6].style.display = 'table-row';
    }
    var sendd = new Date;
    sendd.setDate(sendd.getDate() - 1);

    var HAR = GregToHeb(sendd);
    THM = HAR[0]; THD = HAR[1]; THY = HAR[2];

    if (THY < 3861) {
        alert("לא ניתן לצפות בשנים מתחת למאה לספירה")
        THY = 3861;
    }
    bulid(THY, THM, HAR[1]);

}


function bulid(THY, THM, THD, loc) {
    var sep = "<br />";
    if (!loc) {
        sep = " ";
        loc = "cal";
        var cDate = HebToGreg(THY, THM, THD);
        pDate = new Date(HebToGreg(THY, THM, THD).setMonth(cDate.getMonth() - 1));
        nDate = new Date(HebToGreg(THY, THM, THD).setMonth(cDate.getMonth() + 1));
        var pHAR = GregToHeb(pDate);
        var nHAR = GregToHeb(nDate);
        bulid(pHAR[2], pHAR[0], pHAR[1], "Pcal")
        bulid(nHAR[2], nHAR[0], nHAR[1], "Ncal")

    }
    var todyG = new Date;

    var Gbegin = HebToGreg(THY, THM, THD);


    var HAR = GregToHeb(Gbegin);
    THM = HAR[0];
    THD = HAR[1];
    THY = HAR[2];

    $("theform").year.value = THY;
    $("theform").month.value = THM;
    HAR[1] = 1;


    var Gbegin = HebToGreg(THY, THM, HAR[1]);
    if (loc == "Pcal")
        $("ptitle").innerHTML = num2hmonth(THM, THY);
    if (loc == "Ncal")
        $("ntitle").innerHTML = num2hmonth(THM, THY);

    var row = 1;
    while (HAR[1] < 30) {
        var Grun = HebToGreg(THY, THM, HAR[1]);
        //var vac = ((Grun.getMonth()==6 || Grun.getMonth() == 7) && Grun.getDay() == 3 && row ==3) ?'<br /><div class="vac"><button onClick="window.open(\'http://www.hotelscombined.co.il/he/?a_aid=39595&label=mylush\')">פרגן חופשה</button></div>':'';
        if (Grun.getDate() == todyG.getDate() && Grun.getMonth() == todyG.getMonth() && Grun.getFullYear() == todyG.getFullYear()) {

            // $("taarich").innerHTML = 'יום ' + $(loc).rows[0].cells[todyG.getDay()].innerHTML + ', ' + number2hebrew(HAR[1]) + ' ' + num2hmonth(THM, THY) + ' ' + number2hebrew(THY) + ', ' + todyG.getDate() + '/' + (todyG.getMonth() + 1) + '/' + todyG.getFullYear();
            if (HDHoliday(Grun, HAR[1], THM) != '') { $("taarich").innerHTML += ', ' + HDHoliday(Grun, HAR[1], THM); }
            $(loc).rows[row].cells[Grun.getDay()].innerHTML = '<span class="number">' + number2hebrew(HAR[1]) + '</span><br><span class="hebrew">' + Grun.getDate() + sep +
            num2month(Grun.getMonth()) + '</span><br />' + HDHoliday(Grun, HAR[1], THM) + '<div id="' + Grun.toString() + '"class="personal" CONTENTEDITABLE="true" onblur="localStorage.setItem(this.id,this.innerHTML);"></div>';
            $(loc).rows[row].cells[Grun.getDay()].id = "curcal";
        } else {
            $(loc).rows[row].cells[Grun.getDay()].innerHTML = '<span class="number">' + number2hebrew(HAR[1]) + '</span><br><span class="hebrew">' + Grun.getDate() + sep +
            num2month(Grun.getMonth()) + '</span><br />' + HDHoliday(Grun, HAR[1], THM) + '<div id="' + Grun.toString() + '"class="personal" CONTENTEDITABLE="true" onblur="localStorage.setItem(this.id,this.innerHTML);"></div>';
            $(loc).rows[row].cells[Grun.getDay()].id = "";
        }
        try {
            if (localStorage.getItem(Grun.toString()) != null) {
                $(Grun.toString()).innerHTML = localStorage.getItem(Grun.toString());
            }
        } catch (err) { }
        // + ' ' + Grun.getFullYear().toString().substring(2,4);
        if (Grun.getDay() == 6) { row++ }
        HAR[1]++
    }
    Grun.setDate(Grun.getDate() + 1);
    var checkHM = GregToHeb(Grun);
    if (checkHM[0] == THM) {
        if (Grun.getDate() == todyG.getDate() && Grun.getMonth() == todyG.getMonth() && Grun.getFullYear() == todyG.getFullYear()) {
            $("taarich").innerHTML = 'יום ' + $('cal').rows[0].cells[todyG.getDay()].innerHTML + ', ' + number2hebrew(HAR[1]) + ' ' + num2hmonth(THM, THY) + ' ' + number2hebrew(THY) + ', ' + todyG.getDate() + '/' + (todyG.getMonth() + 1) + '/' + todyG.getFullYear();
            if (HDHoliday(Grun, HAR[1], THM) != '') { $("taarich").innerHTML += ', ' + HDHoliday(Grun, HAR[1], THM); }
            $(loc).rows[row].cells[Grun.getDay()].innerHTML = '<span class="number">' + number2hebrew(HAR[1]) + '</span><br><span class="hebrew">' + Grun.getDate() + sep +
            num2month(Grun.getMonth()) + '</span><br />' + HDHoliday(Grun, HAR[1], THM) + '<div id="' + Grun.toString() + '"class="personal" CONTENTEDITABLE="true" onblur="localStorage.setItem(this.id,this.innerHTML);"></div>';
            $(loc).rows[row].cells[Grun.getDay()].id = "curcal";
        } else {
            $(loc).rows[row].cells[Grun.getDay()].innerHTML = '<span class="number">' + number2hebrew(HAR[1]) + '</span><br><span class="hebrew">' + Grun.getDate() + sep +
            num2month(Grun.getMonth()) + '</span><br />' + HDHoliday(Grun, HAR[1], THM) + '<div id="' + Grun.toString() + '"class="personal" CONTENTEDITABLE="true" onblur="localStorage.setItem(this.id,this.innerHTML);"></div>';
            $(loc).rows[row].cells[Grun.getDay()].id = "";
        }
        try {
            if (localStorage.getItem(Grun.toString()) != null) {
                $(Grun.toString()).innerHTML = localStorage.getItem(Grun.toString());
            }
        } catch (err) { } // + ' ' + Grun.getFullYear().toString().substring(2,4);

    }
    else {
        Grun.setDate(Grun.getDate() - 1);

    }
    if (row < 6 || (row == 6 && Grun.getDay() == 6)) {
        $(loc).rows[6].style.display = 'none';
    }
    if (loc == "cal") {
        $("hebrew_title").innerHTML = num2hmonth(THM, THY) + ' / ' + num2month(Gbegin.getMonth());
        if (Gbegin.getMonth() != Grun.getMonth()) {
            $("hebrew_title").innerHTML += "-" + num2month(Grun.getMonth());
        }

        $("georgian_title").innerHTML = number2hebrew(THY) + ' / ' + Gbegin.getFullYear();
        if (Gbegin.getFullYear() != Grun.getFullYear()) {
            $("georgian_title").innerHTML += "-" + Grun.getFullYear();
        }
    }
}

function NextPrev(ym, delta) {
    if ($("Ncal").dir == "ltr") { delta = delta == -1 ? 1 : -1; }
    var obj = (ym == 'y') ? $("theform").year : $("theform").month;
    //alert ( Number(obj.value) + delta ) ;
    if (ym == 'm' && Number(obj.value) + delta <= 0) {
        obj.value = 13;
        $("theform").year.value--;
    }
    else
        if (ym == 'm' && Number(obj.value) + delta > 13) {
            obj.value = 1;
            $("theform").year.value++;
        }
        else obj.value = Number(obj.value) + delta;
    if (!(IsLeapYear($("theform").year.value)) && delta == -1 && $("theform").month.value == 6) {
        obj.value = Number(obj.value) + delta;
    }
    subform($("theform").year.value, $("theform").month.value);
}

function subform(THY, THM) {
    loc = ['cal', 'Ncal', 'Pcal']
    for (i = 0; i < loc.length; i++) {
        row = 6;
        while (row < 43) {
            $(loc[i]).getElementsByTagName("td")[row].innerHTML = '';
            row++
        }

        $(loc[i]).rows[5].style.display = 'table-row';
        $(loc[i]).rows[6].style.display = 'table-row';
    }
    bulid(THY, THM, 12);
}

function subformI() { subform($("theform").year.value, $("theform").month.value); }
if ($('cal'))
    startup();
function changedir() {
    x = $("cal"); p = $("Pcal"); n = $("Ncal"); var cd = $("cd");
    if (x.dir == "ltr") {
        x.dir = "rtl"; p.dir = "rtl"; n.dir = "rtl";
        cd.innerHTML = "משמאל לימין";
        try { localStorage.setItem("dir", "rtl"); } catch (err) { } 
    }
    else { x.dir = "ltr"; p.dir = "ltr"; n.dir = "ltr"; cd.innerHTML = "מימין לשמאל"; try { localStorage.setItem("dir", "ltr"); } catch (err) { } }
    p.id = "Ncal"; n.id = "Pcal";
    nt = $("ntitle"); $("ptitle").id = "ntitle";
    nt.id = "ptitle"; startu();
}
