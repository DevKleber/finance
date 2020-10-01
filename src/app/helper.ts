import { Injectable } from "@angular/core";
import { NotificationService } from "./shared/messages/notification.service";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class Helper {
	constructor(
		private notificationService: NotificationService,
		private sanitizer: DomSanitizer
	) {}
	typeFile = {
		image: ["jpg", "png", "jpeg", "svg"],
		document: [
			"pdf",
			"msword",
			"vnd.oasis.opendocument.text",
			"vnd.openxmlformats-officedocument.wordprocessingml.document",
			"vnd.ms-excel",
		],
	};

	findButtonbyTextContentAndChange(text, newText) {
		var buttons = document.querySelectorAll("button");
		for (var i = 0, l = buttons.length; i < l; i++) {
			if (buttons[i].firstChild.nodeValue == text) {
				buttons[i].firstChild.nodeValue = newText;
			}
		}
	}
	findbyTextContentAndAddClass(type, text, newClass) {
		var buttons = document.querySelectorAll(type);

		for (var i = 0, l = buttons.length; i < l; i++) {
			// var position = buttons[i].className.indexOf("textfindInClass");
			if (buttons[i].firstChild.nodeValue == text) {
				buttons[i].className = buttons[i].className + " " + newClass;
			}
		}
	}
	findAndRemoveClassByName(className) {
		let item = document.getElementsByClassName(className);

		if (item.length > 0) {
			item[0].classList.remove(className);
		}
	}

	retira_acentos(string) {
		return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	getTime() {
		var date = new Date();

		var seconds = String(date.getSeconds()).padStart(2, "0");
		var minutes = String(date.getMinutes()).padStart(2, "0");
		var hour = String(date.getHours()).padStart(2, "0");

		return `${hour}:${minutes}:${seconds}`;
	}
	getTimestampNow() {
		var date = new Date();

		var dd = String(date.getDate()).padStart(2, "0");
		var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = date.getFullYear();

		var seconds = String(date.getSeconds()).padStart(2, "0");
		var minutes = String(date.getMinutes()).padStart(2, "0");
		var hour = String(date.getHours()).padStart(2, "0");

		return `${yyyy}-${mm}-${dd} ${hour}:${minutes}:${seconds}`;
	}
	detectCard(card) {
		let detected, types;
		detected = null;
		types = [
			[
				"elo",
				[
					"401178",
					"401179",
					"431274",
					"438935",
					"451416",
					"457393",
					"457631",
					"457632",
					"498405",
					"498410",
					"498411",
					"498412",
					"498418",
					"498419",
					"498420",
					"498421",
					"498422",
					"498427",
					"498428",
					"498429",
					"498432",
					"498433",
					"498472",
					"498473",
					"498487",
					"498493",
					"498494",
					"498497",
					"498498",
					"504175",
					"506699",
					"506700",
					"506701",
					"506702",
					"506703",
					"506704",
					"506705",
					"506706",
					"506707",
					"506708",
					"506709",
					"506710",
					"506711",
					"506712",
					"506713",
					"506714",
					"506715",
					"506716",
					"506717",
					"506718",
					"506719",
					"506720",
					"506721",
					"506722",
					"506723",
					"506724",
					"506725",
					"506726",
					"506727",
					"506728",
					"506729",
					"506730",
					"506731",
					"506732",
					"506733",
					"506734",
					"506735",
					"506736",
					"506737",
					"506738",
					"506739",
					"506740",
					"506741",
					"506742",
					"506743",
					"506744",
					"506745",
					"506746",
					"506747",
					"506748",
					"506749",
					"506750",
					"506751",
					"506752",
					"506753",
					"506754",
					"506755",
					"506756",
					"506757",
					"506758",
					"506759",
					"506760",
					"506761",
					"506762",
					"506763",
					"506764",
					"506765",
					"506766",
					"506767",
					"506768",
					"506769",
					"506770",
					"506771",
					"506772",
					"506773",
					"506774",
					"506775",
					"506776",
					"506777",
					"506778",
					"509000",
					"509001",
					"509002",
					"509003",
					"509004",
					"509005",
					"509006",
					"509007",
					"509008",
					"509009",
					"509010",
					"509011",
					"509012",
					"509013",
					"509014",
					"509015",
					"509016",
					"509017",
					"509018",
					"509019",
					"509020",
					"509021",
					"509022",
					"509023",
					"509024",
					"509025",
					"509026",
					"509027",
					"509028",
					"509029",
					"509030",
					"509031",
					"509032",
					"509033",
					"509034",
					"509035",
					"509036",
					"509037",
					"509038",
					"509039",
					"509040",
					"509041",
					"509042",
					"509043",
					"509044",
					"509045",
					"509046",
					"509047",
					"509048",
					"509049",
					"509050",
					"509051",
					"509052",
					"509053",
					"509054",
					"509055",
					"509056",
					"509057",
					"509058",
					"509059",
					"509060",
					"509061",
					"509062",
					"509063",
					"509064",
					"509065",
					"509066",
					"509067",
					"509068",
					"509069",
					"509070",
					"509071",
					"509072",
					"509073",
					"509074",
					"509075",
					"509076",
					"509077",
					"509078",
					"509079",
					"509080",
					"509081",
					"509082",
					"509083",
					"509084",
					"509085",
					"509086",
					"509087",
					"509088",
					"509089",
					"509090",
					"509091",
					"509092",
					"509093",
					"509094",
					"509095",
					"509096",
					"509097",
					"509098",
					"509099",
					"509100",
					"509101",
					"509102",
					"509103",
					"509104",
					"509105",
					"509106",
					"509107",
					"509108",
					"509109",
					"509110",
					"509111",
					"509112",
					"509113",
					"509114",
					"509115",
					"509116",
					"509117",
					"509118",
					"509119",
					"509120",
					"509121",
					"509122",
					"509123",
					"509124",
					"509125",
					"509126",
					"509127",
					"509128",
					"509129",
					"509130",
					"509131",
					"509132",
					"509133",
					"509134",
					"509135",
					"509136",
					"509137",
					"509138",
					"509139",
					"509140",
					"509141",
					"509142",
					"509143",
					"509144",
					"509145",
					"509146",
					"509147",
					"509148",
					"509149",
					"509150",
					"509151",
					"509152",
					"509153",
					"509154",
					"509155",
					"509156",
					"509157",
					"509158",
					"509159",
					"509160",
					"509161",
					"509162",
					"509163",
					"509164",
					"509165",
					"509166",
					"509167",
					"509168",
					"509169",
					"509170",
					"509171",
					"509172",
					"509173",
					"509174",
					"509175",
					"509176",
					"509177",
					"509178",
					"509179",
					"509180",
					"509181",
					"509182",
					"509183",
					"509184",
					"509185",
					"509186",
					"509187",
					"509188",
					"509189",
					"509190",
					"509191",
					"509192",
					"509193",
					"509194",
					"509195",
					"509196",
					"509197",
					"509198",
					"509199",
					"509200",
					"509201",
					"509202",
					"509203",
					"509204",
					"509205",
					"509206",
					"509207",
					"509208",
					"509209",
					"509210",
					"509211",
					"509212",
					"509213",
					"509214",
					"509215",
					"509216",
					"509217",
					"509218",
					"509219",
					"509220",
					"509221",
					"509222",
					"509223",
					"509224",
					"509225",
					"509226",
					"509227",
					"509228",
					"509229",
					"509230",
					"509231",
					"509232",
					"509233",
					"509234",
					"509235",
					"509236",
					"509237",
					"509238",
					"509239",
					"509240",
					"509241",
					"509242",
					"509243",
					"509244",
					"509245",
					"509246",
					"509247",
					"509248",
					"509249",
					"509250",
					"509251",
					"509252",
					"509253",
					"509254",
					"509255",
					"509256",
					"509257",
					"509258",
					"509259",
					"509260",
					"509261",
					"509262",
					"509263",
					"509264",
					"509265",
					"509266",
					"509267",
					"509268",
					"509269",
					"509270",
					"509271",
					"509272",
					"509273",
					"509274",
					"509275",
					"509276",
					"509277",
					"509278",
					"509279",
					"509280",
					"509281",
					"509282",
					"509283",
					"509284",
					"509285",
					"509286",
					"509287",
					"509288",
					"509289",
					"509290",
					"509291",
					"509292",
					"509293",
					"509294",
					"509295",
					"509296",
					"509297",
					"509298",
					"509299",
					"509300",
					"509301",
					"509302",
					"509303",
					"509304",
					"509305",
					"509306",
					"509307",
					"509308",
					"509309",
					"509310",
					"509311",
					"509312",
					"509313",
					"509314",
					"509315",
					"509316",
					"509317",
					"509318",
					"509319",
					"509320",
					"509321",
					"509322",
					"509323",
					"509324",
					"509325",
					"509326",
					"509327",
					"509328",
					"509329",
					"509330",
					"509331",
					"509332",
					"509333",
					"509334",
					"509335",
					"509336",
					"509337",
					"509338",
					"509339",
					"509340",
					"509341",
					"509342",
					"509343",
					"509344",
					"509345",
					"509346",
					"509347",
					"509348",
					"509349",
					"509350",
					"509351",
					"509352",
					"509353",
					"509354",
					"509355",
					"509356",
					"509357",
					"509358",
					"509359",
					"509360",
					"509361",
					"509362",
					"509363",
					"509364",
					"509365",
					"509366",
					"509367",
					"509368",
					"509369",
					"509370",
					"509371",
					"509372",
					"509373",
					"509374",
					"509375",
					"509376",
					"509377",
					"509378",
					"509379",
					"509380",
					"509381",
					"509382",
					"509383",
					"509384",
					"509385",
					"509386",
					"509387",
					"509388",
					"509389",
					"509390",
					"509391",
					"509392",
					"509393",
					"509394",
					"509395",
					"509396",
					"509397",
					"509398",
					"509399",
					"509400",
					"509401",
					"509402",
					"509403",
					"509404",
					"509405",
					"509406",
					"509407",
					"509408",
					"509409",
					"509410",
					"509411",
					"509412",
					"509413",
					"509414",
					"509415",
					"509416",
					"509417",
					"509418",
					"509419",
					"509420",
					"509421",
					"509422",
					"509423",
					"509424",
					"509425",
					"509426",
					"509427",
					"509428",
					"509429",
					"509430",
					"509431",
					"509432",
					"509433",
					"509434",
					"509435",
					"509436",
					"509437",
					"509438",
					"509439",
					"509440",
					"509441",
					"509442",
					"509443",
					"509444",
					"509445",
					"509446",
					"509447",
					"509448",
					"509449",
					"509450",
					"509451",
					"509452",
					"509453",
					"509454",
					"509455",
					"509456",
					"509457",
					"509458",
					"509459",
					"509460",
					"509461",
					"509462",
					"509463",
					"509464",
					"509465",
					"509466",
					"509467",
					"509468",
					"509469",
					"509470",
					"509471",
					"509472",
					"509473",
					"509474",
					"509475",
					"509476",
					"509477",
					"509478",
					"509479",
					"509480",
					"509481",
					"509482",
					"509483",
					"509484",
					"509485",
					"509486",
					"509487",
					"509488",
					"509489",
					"509490",
					"509491",
					"509492",
					"509493",
					"509494",
					"509495",
					"509496",
					"509497",
					"509498",
					"509499",
					"509500",
					"509501",
					"509502",
					"509503",
					"509504",
					"509505",
					"509506",
					"509507",
					"509508",
					"509509",
					"509510",
					"509511",
					"509512",
					"509513",
					"509514",
					"509515",
					"509516",
					"509517",
					"509518",
					"509519",
					"509520",
					"509521",
					"509522",
					"509523",
					"509524",
					"509525",
					"509526",
					"509527",
					"509528",
					"509529",
					"509530",
					"509531",
					"509532",
					"509533",
					"509534",
					"509535",
					"509536",
					"509537",
					"509538",
					"509539",
					"509540",
					"509541",
					"509542",
					"509543",
					"509544",
					"509545",
					"509546",
					"509547",
					"509548",
					"509549",
					"509550",
					"509551",
					"509552",
					"509553",
					"509554",
					"509555",
					"509556",
					"509557",
					"509558",
					"509559",
					"509560",
					"509561",
					"509562",
					"509563",
					"509564",
					"509565",
					"509566",
					"509567",
					"509568",
					"509569",
					"509570",
					"509571",
					"509572",
					"509573",
					"509574",
					"509575",
					"509576",
					"509577",
					"509578",
					"509579",
					"509580",
					"509581",
					"509582",
					"509583",
					"509584",
					"509585",
					"509586",
					"509587",
					"509588",
					"509589",
					"509590",
					"509591",
					"509592",
					"509593",
					"509594",
					"509595",
					"509596",
					"509597",
					"509598",
					"509599",
					"509600",
					"509601",
					"509602",
					"509603",
					"509604",
					"509605",
					"509606",
					"509607",
					"509608",
					"509609",
					"509610",
					"509611",
					"509612",
					"509613",
					"509614",
					"509615",
					"509616",
					"509617",
					"509618",
					"509619",
					"509620",
					"509621",
					"509622",
					"509623",
					"509624",
					"509625",
					"509626",
					"509627",
					"509628",
					"509629",
					"509630",
					"509631",
					"509632",
					"509633",
					"509634",
					"509635",
					"509636",
					"509637",
					"509638",
					"509639",
					"509640",
					"509641",
					"509642",
					"509643",
					"509644",
					"509645",
					"509646",
					"509647",
					"509648",
					"509649",
					"509650",
					"509651",
					"509652",
					"509653",
					"509654",
					"509655",
					"509656",
					"509657",
					"509658",
					"509659",
					"509660",
					"509661",
					"509662",
					"509663",
					"509664",
					"509665",
					"509666",
					"509667",
					"509668",
					"509669",
					"509670",
					"509671",
					"509672",
					"509673",
					"509674",
					"509675",
					"509676",
					"509677",
					"509678",
					"509679",
					"509680",
					"509681",
					"509682",
					"509683",
					"509684",
					"509685",
					"509686",
					"509687",
					"509688",
					"509689",
					"509690",
					"509691",
					"509692",
					"509693",
					"509694",
					"509695",
					"509696",
					"509697",
					"509698",
					"509699",
					"509700",
					"509701",
					"509702",
					"509703",
					"509704",
					"509705",
					"509706",
					"509707",
					"509708",
					"509709",
					"509710",
					"509711",
					"509712",
					"509713",
					"509714",
					"509715",
					"509716",
					"509717",
					"509718",
					"509719",
					"509720",
					"509721",
					"509722",
					"509723",
					"509724",
					"509725",
					"509726",
					"509727",
					"509728",
					"509729",
					"509730",
					"509731",
					"509732",
					"509733",
					"509734",
					"509735",
					"509736",
					"509737",
					"509738",
					"509739",
					"509740",
					"509741",
					"509742",
					"509743",
					"509744",
					"509745",
					"509746",
					"509747",
					"509748",
					"509749",
					"509750",
					"509751",
					"509752",
					"509753",
					"509754",
					"509755",
					"509756",
					"509757",
					"509758",
					"509759",
					"509760",
					"509761",
					"509762",
					"509763",
					"509764",
					"509765",
					"509766",
					"509767",
					"509768",
					"509769",
					"509770",
					"509771",
					"509772",
					"509773",
					"509774",
					"509775",
					"509776",
					"509777",
					"509778",
					"509779",
					"509780",
					"509781",
					"509782",
					"509783",
					"509784",
					"509785",
					"509786",
					"509787",
					"509788",
					"509789",
					"509790",
					"509791",
					"509792",
					"509793",
					"509794",
					"509795",
					"509796",
					"509797",
					"509798",
					"509799",
					"509800",
					"509801",
					"509802",
					"509803",
					"509804",
					"509805",
					"509806",
					"509807",
					"509808",
					"509809",
					"509810",
					"509811",
					"509812",
					"509813",
					"509814",
					"509815",
					"509816",
					"509817",
					"509818",
					"509819",
					"509820",
					"509821",
					"509822",
					"509823",
					"509824",
					"509825",
					"509826",
					"509827",
					"509828",
					"509829",
					"509830",
					"509831",
					"509832",
					"509833",
					"509834",
					"509835",
					"509836",
					"509837",
					"509838",
					"509839",
					"509840",
					"509841",
					"509842",
					"509843",
					"509844",
					"509845",
					"509846",
					"509847",
					"509848",
					"509849",
					"509850",
					"509851",
					"509852",
					"509853",
					"509854",
					"509855",
					"509856",
					"509857",
					"509858",
					"509859",
					"509860",
					"509861",
					"509862",
					"509863",
					"509864",
					"509865",
					"509866",
					"509867",
					"509868",
					"509869",
					"509870",
					"509871",
					"509872",
					"509873",
					"509874",
					"509875",
					"509876",
					"509877",
					"509878",
					"509879",
					"509880",
					"509881",
					"509882",
					"509883",
					"509884",
					"509885",
					"509886",
					"509887",
					"509888",
					"509889",
					"509890",
					"509891",
					"509892",
					"509893",
					"509894",
					"509895",
					"509896",
					"509897",
					"509898",
					"509899",
					"509900",
					"509901",
					"509902",
					"509903",
					"509904",
					"509905",
					"509906",
					"509907",
					"509908",
					"509909",
					"509910",
					"509911",
					"509912",
					"509913",
					"509914",
					"509915",
					"509916",
					"509917",
					"509918",
					"509919",
					"509920",
					"509921",
					"509922",
					"509923",
					"509924",
					"509925",
					"509926",
					"509927",
					"509928",
					"509929",
					"509930",
					"509931",
					"509932",
					"509933",
					"509934",
					"509935",
					"509936",
					"509937",
					"509938",
					"509939",
					"509940",
					"509941",
					"509942",
					"509943",
					"509944",
					"509945",
					"509946",
					"509947",
					"509948",
					"509949",
					"509950",
					"509951",
					"509952",
					"509953",
					"509954",
					"509955",
					"509956",
					"509957",
					"509958",
					"509959",
					"509960",
					"509961",
					"509962",
					"509963",
					"509964",
					"509965",
					"509966",
					"509967",
					"509968",
					"509969",
					"509970",
					"509971",
					"509972",
					"509973",
					"509974",
					"509975",
					"509976",
					"509977",
					"509978",
					"509979",
					"509980",
					"509981",
					"509982",
					"509983",
					"509984",
					"509985",
					"509986",
					"509987",
					"509988",
					"509989",
					"509990",
					"509991",
					"509992",
					"509993",
					"509994",
					"509995",
					"509996",
					"509997",
					"509998",
					"509999",
					"627780",
					"636297",
					"636368",
					"650031",
					"650032",
					"650033",
					"650035",
					"650036",
					"650037",
					"650038",
					"650039",
					"650040",
					"650041",
					"650042",
					"650043",
					"650044",
					"650045",
					"650046",
					"650047",
					"650048",
					"650049",
					"650050",
					"650051",
					"650405",
					"650406",
					"650407",
					"650408",
					"650409",
					"650410",
					"650411",
					"650412",
					"650413",
					"650414",
					"650415",
					"650416",
					"650417",
					"650418",
					"650419",
					"650420",
					"650421",
					"650422",
					"650423",
					"650424",
					"650425",
					"650426",
					"650427",
					"650428",
					"650429",
					"650430",
					"650431",
					"650432",
					"650433",
					"650434",
					"650435",
					"650436",
					"650437",
					"650438",
					"650439",
					"650485",
					"650486",
					"650487",
					"650488",
					"650489",
					"650490",
					"650491",
					"650492",
					"650493",
					"650494",
					"650495",
					"650496",
					"650497",
					"650498",
					"650499",
					"650500",
					"650501",
					"650502",
					"650503",
					"650504",
					"650505",
					"650506",
					"650507",
					"650508",
					"650509",
					"650510",
					"650511",
					"650512",
					"650513",
					"650514",
					"650515",
					"650516",
					"650517",
					"650518",
					"650519",
					"650520",
					"650521",
					"650522",
					"650523",
					"650524",
					"650525",
					"650526",
					"650527",
					"650528",
					"650529",
					"650530",
					"650531",
					"650532",
					"650533",
					"650534",
					"650535",
					"650536",
					"650537",
					"650538",
					"650541",
					"650542",
					"650543",
					"650544",
					"650545",
					"650546",
					"650547",
					"650548",
					"650549",
					"650550",
					"650551",
					"650552",
					"650553",
					"650554",
					"650555",
					"650556",
					"650557",
					"650558",
					"650559",
					"650560",
					"650561",
					"650562",
					"650563",
					"650564",
					"650565",
					"650566",
					"650567",
					"650568",
					"650569",
					"650570",
					"650571",
					"650572",
					"650573",
					"650574",
					"650575",
					"650576",
					"650577",
					"650578",
					"650579",
					"650580",
					"650581",
					"650582",
					"650583",
					"650584",
					"650585",
					"650586",
					"650587",
					"650588",
					"650589",
					"650590",
					"650591",
					"650592",
					"650593",
					"650594",
					"650595",
					"650596",
					"650597",
					"650598",
					"650700",
					"650701",
					"650702",
					"650703",
					"650704",
					"650705",
					"650706",
					"650707",
					"650708",
					"650709",
					"650710",
					"650711",
					"650712",
					"650713",
					"650714",
					"650715",
					"650716",
					"650717",
					"650718",
					"650720",
					"650721",
					"650722",
					"650723",
					"650724",
					"650725",
					"650726",
					"650727",
					"650901",
					"650902",
					"650903",
					"650904",
					"650905",
					"650906",
					"650907",
					"650908",
					"650909",
					"650910",
					"650911",
					"650912",
					"650913",
					"650914",
					"650915",
					"650916",
					"650917",
					"650918",
					"650919",
					"650920",
					"651652",
					"651653",
					"651654",
					"651655",
					"651656",
					"651657",
					"651658",
					"651659",
					"651660",
					"651661",
					"651662",
					"651663",
					"651664",
					"651665",
					"651666",
					"651667",
					"651668",
					"651669",
					"651670",
					"651671",
					"651672",
					"651673",
					"651674",
					"651675",
					"651676",
					"651677",
					"651678",
					"651679",
					"655000",
					"655001",
					"655002",
					"655003",
					"655004",
					"655005",
					"655006",
					"655007",
					"655008",
					"655009",
					"655010",
					"655011",
					"655012",
					"655013",
					"655014",
					"655015",
					"655016",
					"655017",
					"655018",
					"655019",
					"655021",
					"655022",
					"655023",
					"655024",
					"655025",
					"655026",
					"655027",
					"655028",
					"655029",
					"655030",
					"655031",
					"655032",
					"655033",
					"655034",
					"655035",
					"655036",
					"655037",
					"655038",
					"655039",
					"655040",
					"655041",
					"655042",
					"655043",
					"655044",
					"655045",
					"655046",
					"655047",
					"655048",
					"655049",
					"655050",
					"655051",
					"655052",
					"655053",
					"655054",
					"655055",
					"655056",
					"655057",
					"655058",
				],
			],
			["discover", ["6011", "622", "64", "65"]],
			["hipercard", ["384100", "384140", "384160", "60"]],
			["diners", ["301", "305", "36", "38"]],
			["amex", ["34", "37"]],
			["aura", ["50"]],
			["jcb", ["35"]],
			["visa", ["4"]],
			["mastercard", ["5", "2"]],
		];
		for (let type of types) {
			for (let pattern of type[1]) {
				if (!detected && String(card).startsWith(pattern)) {
					detected = type[0];
				}
			}
		}
		return detected;
	}

	encrypt(dados) {
		dados = dados.replace(/A/g, "গ");
		dados = dados.replace(/B/g, "খ");
		dados = dados.replace(/C/g, "ক");
		dados = dados.replace(/D/g, "ঔ");
		dados = dados.replace(/E/g, "ও");
		dados = dados.replace(/F/g, "ঐ");
		dados = dados.replace(/G/g, "এ");
		dados = dados.replace(/H/g, "ঌ");
		dados = dados.replace(/I/g, "ঋ");
		dados = dados.replace(/J/g, "ঊ");
		dados = dados.replace(/K/g, "উ");
		dados = dados.replace(/L/g, "ঈ");
		dados = dados.replace(/M/g, "ই");
		dados = dados.replace(/N/g, "আ");
		dados = dados.replace(/O/g, "অ");
		dados = dados.replace(/P/g, "ॿ");
		dados = dados.replace(/Q/g, "ॾ");
		dados = dados.replace(/R/g, "ॼ");
		dados = dados.replace(/S/g, "ॻ");
		dados = dados.replace(/T/g, "ॲ");
		dados = dados.replace(/U/g, "९");
		dados = dados.replace(/V/g, "७");
		dados = dados.replace(/W/g, "ॠ");
		dados = dados.replace(/X/g, "ॡ");
		dados = dados.replace(/Y/g, "फ़");
		dados = dados.replace(/Z/g, "ॐ");

		dados = dados.replace(/a/g, "अ");
		dados = dados.replace(/b/g, "आ");
		dados = dados.replace(/c/g, "इ");
		dados = dados.replace(/d/g, "ई");

		dados = dados.replace(/e/g, "उ");
		dados = dados.replace(/f/g, "ऊ");
		dados = dados.replace(/g/g, "ऋ");
		dados = dados.replace(/h/g, "ऌ");
		dados = dados.replace(/i/g, "ऍ");
		dados = dados.replace(/j/g, "ऎ");
		dados = dados.replace(/k/g, "ए");
		dados = dados.replace(/l/g, "ऐ");
		dados = dados.replace(/m/g, "ঙ");
		dados = dados.replace(/n/g, "ঘ");
		dados = dados.replace(/o/g, "ओ");
		dados = dados.replace(/p/g, "औ");
		dados = dados.replace(/q/g, "क");
		dados = dados.replace(/r/g, "ख");
		dados = dados.replace(/s/g, "ग");
		dados = dados.replace(/t/g, "घ");
		dados = dados.replace(/u/g, "ङ");
		dados = dados.replace(/v/g, "च");
		dados = dados.replace(/w/g, "छ");
		dados = dados.replace(/x/g, "ज");
		dados = dados.replace(/y/g, "झ");
		dados = dados.replace(/z/g, "ञ");

		dados = dados.replace(/á/g, "ट");
		dados = dados.replace(/é/g, "य");
		dados = dados.replace(/í/g, "म");
		dados = dados.replace(/ó/g, "भ");
		dados = dados.replace(/ú/g, "ब");

		dados = dados.replace(/à/g, "फ");
		dados = dados.replace(/è/g, "प");
		dados = dados.replace(/ì/g, "ऩ");
		dados = dados.replace(/ò/g, "न");
		dados = dados.replace(/ù/g, "ध");

		dados = dados.replace(/ã/g, "द");
		dados = dados.replace(/õ/g, "थ");

		dados = dados.replace(/ç/g, "त");

		dados = dados.replace(/ê/g, "ण");

		dados = dados.replace(/ /g, "߷");

		dados = dados.replace(/"/g, "रू");
		dados = dados.replace(/{/g, "कु");
		dados = dados.replace(/}/g, "ञ्");
		dados = dados.replace(/:/g, "बा");
		dados = dados.replace(/,/g, "र");

		return dados;
	}
	decrypt(dados) {
		var result;
		dados = dados.replace(/গ/g, "A");
		dados = dados.replace(/খ/g, "B");
		dados = dados.replace(/ক/g, "C");
		dados = dados.replace(/ঔ/g, "D");
		dados = dados.replace(/ও/g, "E");
		dados = dados.replace(/ঐ/g, "F");
		dados = dados.replace(/এ/g, "G");
		dados = dados.replace(/ঌ/g, "H");
		dados = dados.replace(/ঋ/g, "I");
		dados = dados.replace(/ঊ/g, "J");
		dados = dados.replace(/উ/g, "K");
		dados = dados.replace(/ঈ/g, "L");
		dados = dados.replace(/ই/g, "M");
		dados = dados.replace(/আ/g, "N");
		dados = dados.replace(/অ/g, "O");
		dados = dados.replace(/ॿ/g, "P");
		dados = dados.replace(/ॾ/g, "Q");
		dados = dados.replace(/ॼ/g, "R");
		dados = dados.replace(/ॻ/g, "S");
		dados = dados.replace(/ॲ/g, "T");
		dados = dados.replace(/९/g, "U");
		dados = dados.replace(/७/g, "V");
		dados = dados.replace(/ॠ/g, "W");
		dados = dados.replace(/ॡ/g, "X");
		dados = dados.replace(/फ़/g, "Y");
		dados = dados.replace(/ॐ/g, "Z");

		dados = dados.replace(/अ/g, "a");
		dados = dados.replace(/आ/g, "b");
		dados = dados.replace(/इ/g, "c");
		dados = dados.replace(/ई/g, "d");
		dados = dados.replace(/उ/g, "e");
		dados = dados.replace(/ऊ/g, "f");
		dados = dados.replace(/ऋ/g, "g");
		dados = dados.replace(/ऌ/g, "h");
		dados = dados.replace(/ऍ/g, "i");
		dados = dados.replace(/ऎ/g, "j");
		dados = dados.replace(/ए/g, "k");
		dados = dados.replace(/ऐ/g, "l");
		dados = dados.replace(/ঙ/g, "m");
		dados = dados.replace(/ঘ/g, "n");
		dados = dados.replace(/ओ/g, "o");
		dados = dados.replace(/औ/g, "p");
		dados = dados.replace(/क/g, "q");
		dados = dados.replace(/ख/g, "r");
		dados = dados.replace(/ग/g, "s");
		dados = dados.replace(/घ/g, "t");
		dados = dados.replace(/ङ/g, "u");
		dados = dados.replace(/च/g, "v");
		dados = dados.replace(/छ/g, "w");
		dados = dados.replace(/ज/g, "x");
		dados = dados.replace(/झ/g, "y");
		dados = dados.replace(/ञ/g, "z");

		dados = dados.replace(/ट/g, "á");
		dados = dados.replace(/य/g, "é");
		dados = dados.replace(/म/g, "í");
		dados = dados.replace(/भ/g, "ó");
		dados = dados.replace(/ब/g, "ú");

		dados = dados.replace(/फ/g, "à");
		dados = dados.replace(/प/g, "è");
		dados = dados.replace(/ऩ/g, "ì");
		dados = dados.replace(/न/g, "ò");
		dados = dados.replace(/ध/g, "ù");

		dados = dados.replace(/द/g, "ã");
		dados = dados.replace(/थ/g, "õ");

		dados = dados.replace(/त/g, "ç");

		dados = dados.replace(/ण/g, "ê");

		dados = dados.replace(/߷/g, " ");

		dados = dados.replace(/Գ/g, "0");
		dados = dados.replace(/Բ/g, "1");
		dados = dados.replace(/Ա/g, "2");
		dados = dados.replace(/Ѿ/g, "3");
		dados = dados.replace(/Ѽ/g, "4");
		dados = dados.replace(/Ϫ/g, "5");
		dados = dados.replace(/ϟ/g, "6");
		dados = dados.replace(/ƨ/g, "7");
		dados = dados.replace(/Ʀ/g, "8");
		dados = dados.replace(/ƣ/g, "9");

		dados = dados.replace(/रू/g, '"');
		dados = dados.replace(/कु/g, "{");
		dados = dados.replace(/ञ्/g, "}");
		dados = dados.replace(/बा/g, ":");
		dados = dados.replace(/र/g, ",");

		return dados;
	}
	expressaoRegularMaskCEST() {
		return [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
	}
	expressaoRegularMaskNCM() {
		return [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
	}
	expressaoRegularMaskTelefone() {
		return [
			"(",
			/[0-9]/,
			/\d/,
			")",
			" ",
			/\d/,
			" ",
			/\d/,
			/\d/,
			/\d/,
			/\d/,
			" ",
			"-",
			" ",
			/\d/,
			/\d/,
			/\d/,
			/\d/,
		];
	}
	expressaoRegularMaskCEP() {
		return [/[0-9]/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
	}
	expressaoRegularMaskCPF() {
		return [
			/[0-9]/,
			/\d/,
			/\d/,
			".",
			/\d/,
			/\d/,
			/\d/,
			".",
			/\d/,
			/\d/,
			/\d/,
			"-",
			/\d/,
			/\d/,
		];
	}
	expressaoRegularMaskCFOP() {
		return [/[0-9]/, /\d/, /\d/, /\d/];
	}
	expressaoRegularMaskCNPJ() {
		return [
			/[0-9]/,
			/\d/,
			".",
			/\d/,
			/\d/,
			/\d/,
			".",
			/\d/,
			/\d/,
			/\d/,
			"/",
			/\d/,
			/\d/,
			/\d/,
			/\d/,
			"-",
			/\d/,
			/\d/,
		];
	}
	formBuilderValidatorsEmail() {
		return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	}
	validaCPFCNPJ(cpfcnpj) {
		var cpfcnpjJustNumbers = cpfcnpj.replace(/\D/g, "");

		if (cpfcnpjJustNumbers.length == 11) {
			var cpf = cpfcnpjJustNumbers;
			if (
				!cpf ||
				cpf.length != 11 ||
				cpf == "00000000000" ||
				cpf == "11111111111" ||
				cpf == "22222222222" ||
				cpf == "33333333333" ||
				cpf == "44444444444" ||
				cpf == "55555555555" ||
				cpf == "66666666666" ||
				cpf == "77777777777" ||
				cpf == "88888888888" ||
				cpf == "99999999999"
			)
				return false;
			var soma = 0;
			var resto;
			for (var i = 1; i <= 9; i++)
				soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
			resto = (soma * 10) % 11;
			if (resto == 10 || resto == 11) resto = 0;
			if (resto != parseInt(cpf.substring(9, 10))) return false;
			soma = 0;
			for (var i = 1; i <= 10; i++)
				soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
			resto = (soma * 10) % 11;
			if (resto == 10 || resto == 11) resto = 0;
			if (resto != parseInt(cpf.substring(10, 11))) return false;
			return true;
		} else if (cpfcnpjJustNumbers.length == 14) {
			var cnpj = cpfcnpjJustNumbers;
			if (
				!cnpj ||
				cnpj.length != 14 ||
				cnpj == "00000000000000" ||
				cnpj == "11111111111111" ||
				cnpj == "22222222222222" ||
				cnpj == "33333333333333" ||
				cnpj == "44444444444444" ||
				cnpj == "55555555555555" ||
				cnpj == "66666666666666" ||
				cnpj == "77777777777777" ||
				cnpj == "88888888888888" ||
				cnpj == "99999999999999"
			)
				return false;
			var tamanho = cnpj.length - 2;
			var numeros = cnpj.substring(0, tamanho);
			var digitos = cnpj.substring(tamanho);
			var soma = 0;
			var pos = tamanho - 7;
			for (var i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2) pos = 9;
			}
			var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
			if (resultado != digitos.charAt(0)) return false;
			tamanho = tamanho + 1;
			numeros = cnpj.substring(0, tamanho);
			soma = 0;
			pos = tamanho - 7;
			for (var i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2) pos = 9;
			}
			resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
			if (resultado != digitos.charAt(1)) return false;
			return true;
		}
	}
	extensoesPermitidasCertificados(event) {
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		var allowed = ["pfx", "p12"];
		return allowed.indexOf(extensao.toLowerCase()) > -1;
	}
	extensoesProibidas(event) {
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		var deny = [
			"html",
			"exe",
			"js",
			"py",
			"php",
			"cc",
			"cpp",
			"cxx",
			"c",
			"c++",
			"h",
			"hh",
			"hpp",
			"hxx",
			"h++",
			"c++",
			"jar",
			"java",
			"deb",
			"tar",
			"zip",
		];
		return deny.indexOf(extensao.toLowerCase()) > -1;
	}
	extensoesValidasAnexos(event) {
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		var days = [
			"pdf",
			"png",
			"jpg",
			"jpeg",
			,
			"doc",
			"docs",
			"docx",
			"xlsx",
			"xls",
		];
		return days.indexOf(extensao.toLowerCase()) > -1;
	}
	getExtensionOfFile(name) {
		return name.split(".").pop();
	}

	onFileChangedAll(event, type = "image") {
		let findFile = false;

		if (event.target.files[0] == undefined) {
			return false;
		}
		// console.log(event.target.files);
		var selectedFile: any[] = [];
		var urlImg: any[] = [];
		for (let file of event.target.files) {
			for (let ext of this.typeFile[type]) {
				if (file.type.includes(ext)) {
					findFile = true;
					let tmppath = URL.createObjectURL(file);
					urlImg.push(this.sanitizer.bypassSecurityTrustUrl(tmppath));
					selectedFile.push(file);
				}
			}
		}
		if (!findFile) {
			return false;
		}
		// console.log(selectedFile);

		if (selectedFile.length == 1) {
			const selectF = selectedFile.shift();
			const urlI = urlImg.shift();
			return { selectedFile: selectF, urlImg: urlI };
		}
		return { selectedFile, urlImg };
	}
	onFileChanged(event) {
		if (this.extensoesProibidas(event)) {
			this.notificationService.notifySweet("Arquivo Proibido");
			return false;
		}
		var tmppath = URL.createObjectURL(event.target.files[0]);
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		let img;
		switch (extensao) {
			case "png":
			case "jpg":
			case "jpeg":
				img = tmppath;
				break;
			default:
				img = "/assets/img/file/" + extensao + ".svg";
				break;
		}
		let selectedFile = event.target.files[0];
		let dados: object = { img: img, selectedFile: selectedFile };

		return dados;
	}
	onFileSet(no_documento) {
		let extensao = this.getExtensionOfFile(no_documento);
		let img;
		switch (extensao) {
			case "png":
			case "jpg":
			case "jpeg":
				img = no_documento;
				break;
			default:
				img = "/assets/img/file/" + extensao + ".svg";
				break;
		}
		return img;
	}

	/**
	 * Qual coluna mostrar na table
	 */
	setColumnsShow(ar = null, remover = [], naomostrar = null) {
		if (ar.length > 0) {
			let columns = this.getColumnsByArray(ar);
			if (remover.length > 0) {
				for (let rm of remover) {
					delete columns[rm];
				}
			}
			ar = [];
			Object.keys(columns).forEach((v) => {
				columns[v] = { name: columns[v], show: true };
			});
			if (naomostrar.length > 0) {
				for (let n of naomostrar) {
					columns[n] = { name: columns[n], show: false };
				}
			}
			return columns;
		}
	}

	/**
	 *
	 * Bloco destindo a ordenar a lista .
	 *
	 */
	orderby(column, ar, order) {
		Object.keys(order).forEach(function (key) {
			if (column == key) {
				ar.sort((a, b) =>
					a[key] > b[key]
						? order[key] == "desc"
							? -1
							: 1
						: order[key] == "desc"
						? 1
						: -1
				);
				order[key] = order[key] == "desc" ? "asc" : "desc";
			} else {
				order[key] = "";
			}
		});
		return ar;
	}

	getColumnsByArray(ar) {
		if (ar === "undefined") {
			return {};
		}
		if (ar.length > 0) {
			ar = ar[0];
		}

		let columns = {};
		Object.keys(ar).forEach(function (key) {
			columns[key] = "";
		});
		return columns;
	}
	getColumnsTrue(col) {
		if (col === "undefined") {
			return {};
		}
		if (col.length > 0) {
			col = col[0];
		}

		let columns = {};
		Object.keys(col).forEach(function (key) {
			if (col[key].show == true) {
				columns[key] = col[key];
			}
		});
		return columns;
	}
	// fim Bloco destindo a ordenar a lista.

	formatarDataParaCompararNoBanco(data) {
		if (data) {
			let dia = data.getDate().toString();
			let diaF = dia.length == 1 ? "0" + dia : dia;
			let mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
			let mesF = mes.length == 1 ? "0" + mes : mes;
			let anoF = data.getFullYear();
			return anoF + "-" + mesF + "-" + diaF;
		}
	}
}
